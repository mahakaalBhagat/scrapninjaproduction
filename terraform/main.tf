terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket         = "scrapninja-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "ap-south-1"
    encrypt        = true
    dynamodb_table = "scrapninja-terraform-locks"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Environment = var.environment
      Project     = "scrapninja"
      ManagedBy   = "terraform"
      CostCenter  = "operations"
    }
  }
}

# ─────────────────────────────────────────────────────────────
# VPC & NETWORKING
# ─────────────────────────────────────────────────────────────

module "vpc" {
  source = "./modules/vpc"

  environment     = var.environment
  vpc_cidr        = "10.0.0.0/16"
  public_subnets = [
    { cidr = "10.0.1.0/24", az = "${var.aws_region}a" },
    { cidr = "10.0.2.0/24", az = "${var.aws_region}b" }
  ]
  private_subnets = [
    { cidr = "10.0.3.0/24", az = "${var.aws_region}a" },
    { cidr = "10.0.4.0/24", az = "${var.aws_region}b" }
  ]
  enable_nat_gateway = true
  enable_vpn_gateway = false
}

# ─────────────────────────────────────────────────────────────
# SECURITY GROUPS
# ─────────────────────────────────────────────────────────────

module "security_groups" {
  source = "./modules/security-groups"

  environment = var.environment
  vpc_id      = module.vpc.vpc_id

  alb_ingress_rules = [
    { from_port = 80, to_port = 80, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] },
    { from_port = 443, to_port = 443, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }
  ]

  backend_ingress_rules = [
    { from_port = 8080, to_port = 8090, protocol = "tcp", security_group_id = "alb" },
    { from_port = 5432, to_port = 5432, protocol = "tcp", security_group_id = "backend" },
    { from_port = 6379, to_port = 6379, protocol = "tcp", security_group_id = "backend" }
  ]

  database_ingress_rules = [
    { from_port = 5432, to_port = 5432, protocol = "tcp", security_group_id = "backend" }
  ]
}

# ─────────────────────────────────────────────────────────────
# RDS DATABASE (PostgreSQL - Single-AZ for cost savings)
# ─────────────────────────────────────────────────────────────

module "rds" {
  source = "./modules/rds"

  environment                = var.environment
  db_instance_class          = "db.t3.micro"
  allocated_storage           = 20
  db_name                    = "appdb"
  db_username                = "admin"
  db_password                = var.db_password
  multi_az                   = false  # SAVES 50% - Single-AZ only
  backup_retention_period    = 7
  db_subnet_group_name       = module.vpc.db_subnet_group_name
  vpc_security_group_ids     = [module.security_groups.database_sg_id]
  skip_final_snapshot        = false
  final_snapshot_identifier  = "scrapninja-db-final-snapshot-${formatdate("YYYY-MM-DD-hhmm", timestamp())}"
  publicly_accessible        = false
  storage_encrypted          = true
  iops                       = 3000
  storage_type               = "gp3"

  tags = {
    CostOptimization = "single-az"
    BackupPolicy     = "7-days"
  }
}

# ─────────────────────────────────────────────────────────────
# ELASTICACHE REDIS (OPTION 1: Self-hosted on EC2 is cheaper)
# For now, we'll use a small instance - can switch to ElastiCache later
# ─────────────────────────────────────────────────────────────

# EC2 Instance for Redis (self-hosted - 80% cheaper than ElastiCache)
resource "aws_instance" "redis_server" {
  ami                    = data.aws_ami.amazon_linux_2.id
  instance_type          = "t3.micro"
  subnet_id              = module.vpc.private_subnets[0]
  vpc_security_group_ids = [module.security_groups.redis_sg_id]

  user_data = base64encode(file("${path.module}/scripts/install-redis.sh"))

  root_block_device {
    volume_type           = "gp3"
    volume_size           = 8
    delete_on_termination = true
    encrypted             = true
  }

  tags = {
    Name = "scrapninja-redis-server"
  }
}

# Get latest Amazon Linux 2 AMI
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }

  filter {
    name   = "state"
    values = ["available"]
  }
}

# ─────────────────────────────────────────────────────────────
# SQS QUEUE (Replaces Kafka - 99% cost reduction)
# ─────────────────────────────────────────────────────────────

module "sqs" {
  source = "./modules/sqs"

  environment             = var.environment
  queue_name              = "scrapninja-events"
  visibility_timeout_seconds = 30
  message_retention_seconds  = 1209600  # 14 days
  receive_wait_time_seconds  = 20
  
  dlq_enabled             = true
  dlq_max_receive_count   = 3

  tags = {
    Service = "messaging"
    CostOptimization = "replaces-kafka"
  }
}

# ─────────────────────────────────────────────────────────────
# IAM ROLES & POLICIES
# ─────────────────────────────────────────────────────────────

module "iam" {
  source = "./modules/iam"

  environment = var.environment
  
  # Backend EC2 permissions
  backend_services = {
    services = ["ec2.amazonaws.com"]
    permissions = [
      "s3:GetObject",
      "s3:PutObject",
      "s3:ListBucket",
      "sqs:SendMessage",
      "sqs:ReceiveMessage",
      "sqs:DeleteMessage",
      "sqs:GetQueueUrl",
      "rds-db:connect",
      "logs:CreateLogGroup",
      "logs:CreateLogStream",
      "logs:PutLogEvents",
      "cloudwatch:PutMetricData",
      "ec2:DescribeInstances",
      "secretsmanager:GetSecretValue"
    ]
  }
}

# ─────────────────────────────────────────────────────────────
# APPLICATION LOAD BALANCER
# ─────────────────────────────────────────────────────────────

module "alb" {
  source = "./modules/alb"

  environment         = var.environment
  vpc_id              = module.vpc.vpc_id
  subnets             = module.vpc.public_subnets
  security_group_id   = module.security_groups.alb_sg_id
  
  # Target group configuration
  target_port         = 8080
  target_protocol     = "HTTP"
  health_check_path   = "/health"
  health_check_interval = 30
  health_check_timeout  = 5
  healthy_threshold     = 2
  unhealthy_threshold   = 2

  tags = {
    Service = "load-balancing"
  }
}

# ─────────────────────────────────────────────────────────────
# EC2 LAUNCH TEMPLATE & AUTO-SCALING
# ─────────────────────────────────────────────────────────────

module "compute" {
  source = "./modules/compute"

  environment         = var.environment
  ami_id              = data.aws_ami.amazon_linux_2.id
  instance_type       = "t3.small"
  iam_instance_profile = module.iam.backend_instance_profile_name
  security_group_id   = module.security_groups.backend_sg_id
  
  # User data for deployment
  user_data = base64encode(templatefile("${path.module}/scripts/backend-init.sh", {
    rds_endpoint         = module.rds.endpoint
    redis_endpoint       = "${aws_instance.redis_server.private_ip}:6379"
    sqs_queue_url        = module.sqs.queue_url
    sqs_queue_name       = module.sqs.queue_name
    s3_bucket            = module.s3.bucket_name
    aws_region           = var.aws_region
    environment          = var.environment
  }))

  root_volume_size    = 30
  root_volume_type    = "gp3"
  root_volume_iops    = 3000

  # Auto-scaling configuration
  asg_min_size         = 1
  asg_desired_capacity = 2
  asg_max_size         = 4
  asg_health_check_type = "ELB"
  asg_health_check_grace_period = 300
  asg_vpc_zone_identifier = module.vpc.private_subnets

  # Target group for ALB
  target_group_arn    = module.alb.target_group_arn

  # Scaling policies
  scale_up_threshold    = 70    # CPU > 70%
  scale_down_threshold  = 30    # CPU < 30%
  scale_up_adjustment   = 1
  scale_down_adjustment = -1

  tags = {
    Service = "backend"
    CostOptimization = "t3-small-burstable"
  }
}

# ─────────────────────────────────────────────────────────────
# S3 BUCKET FOR STATIC FILES & UPLOADS
# ─────────────────────────────────────────────────────────────

module "s3" {
  source = "./modules/s3"

  environment       = var.environment
  bucket_name       = "scrapninja-static-${data.aws_caller_identity.current.account_id}"
  
  versioning_enabled = true
  block_public_access = true
  
  lifecycle_rules = [
    {
      id     = "delete-old-versions"
      status = "Enabled"
      noncurrent_version_expiration_days = 30
    },
    {
      id     = "delete-temp-files"
      status = "Enabled"
      prefix = "temp/"
      expiration_days = 7
    }
  ]

  cors_rules = [
    {
      allowed_headers = ["*"]
      allowed_methods = ["GET", "PUT", "POST", "DELETE"]
      allowed_origins = ["https://scrapninja.com", "https://*.scrapninja.com"]
      expose_headers  = ["ETag"]
      max_age_seconds = 3000
    }
  ]

  tags = {
    Service = "static-storage"
  }
}

# ─────────────────────────────────────────────────────────────
# CLOUDFRONT CDN (SAVES 50% on bandwidth)
# ─────────────────────────────────────────────────────────────

module "cloudfront" {
  source = "./modules/cloudfront"

  environment         = var.environment
  s3_bucket_domain    = module.s3.bucket_regional_domain_name
  s3_bucket_id        = module.s3.bucket_id
  
  origin_access_identity_arn = module.s3.oai_arn

  # Cache behaviors
  default_ttl        = 86400      # 1 day
  max_ttl            = 31536000   # 1 year
  compress           = true
  
  # Price class - use 200 to exclude most expensive regions
  price_class        = "PriceClass_200"
  
  viewer_protocol_policy = "redirect-to-https"
  allowed_methods   = ["GET", "HEAD"]
  cached_methods    = ["GET", "HEAD"]

  tags = {
    Service = "cdn"
    CostOptimization = "bandwidth-reduction"
  }
}

# ─────────────────────────────────────────────────────────────
# ROUTE53 DNS
# ─────────────────────────────────────────────────────────────

module "route53" {
  source = "./modules/route53"

  environment      = var.environment
  domain_name      = var.domain_name
  
  alb_dns_name     = module.alb.dns_name
  alb_zone_id      = module.alb.zone_id
  
  cloudfront_domain_name = module.cloudfront.domain_name
  cloudfront_zone_id     = module.cloudfront.zone_id

  tags = {
    Service = "dns"
  }
}

# ─────────────────────────────────────────────────────────────
# ACM SSL CERTIFICATE (FREE)
# ─────────────────────────────────────────────────────────────

module "acm" {
  source = "./modules/acm"

  environment   = var.environment
  domain_name   = var.domain_name
  zone_id       = module.route53.zone_id

  tags = {
    Service = "ssl"
  }
}

# ─────────────────────────────────────────────────────────────
# CLOUDWATCH MONITORING & ALARMS
# ─────────────────────────────────────────────────────────────

module "monitoring" {
  source = "./modules/monitoring"

  environment    = var.environment
  
  # ALB metrics
  alb_arn_suffix = module.alb.arn_suffix
  
  # RDS metrics
  rds_instance_id = module.rds.instance_id
  
  # EC2 Auto-scaling
  asg_name = module.compute.asg_name
  
  # SQS metrics
  sqs_queue_name = module.sqs.queue_name

  # SNS topic for alerts
  alert_email = var.alert_email

  tags = {
    Service = "monitoring"
  }
}

# ─────────────────────────────────────────────────────────────
# AWS BACKUP (Optional - for disaster recovery)
# ─────────────────────────────────────────────────────────────

module "backup" {
  source = "./modules/backup"

  environment        = var.environment
  enable_backups     = var.enable_backups
  
  rds_instance_arn   = module.rds.arn
  backup_retention_days = 7

  tags = {
    Service = "backup"
  }
}

# ─────────────────────────────────────────────────────────────
# OUTPUTS
# ─────────────────────────────────────────────────────────────

output "alb_dns_name" {
  description = "DNS name of the load balancer"
  value       = module.alb.dns_name
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = module.cloudfront.domain_name
}

output "rds_endpoint" {
  description = "RDS database endpoint"
  value       = module.rds.endpoint
  sensitive   = true
}

output "redis_endpoint" {
  description = "Redis server endpoint"
  value       = "${aws_instance.redis_server.private_ip}:6379"
  sensitive   = true
}

output "sqs_queue_url" {
  description = "SQS queue URL"
  value       = module.sqs.queue_url
}

output "s3_bucket_name" {
  description = "S3 bucket for static files"
  value       = module.s3.bucket_name
}

output "s3_bucket_arn" {
  description = "S3 bucket ARN"
  value       = module.s3.bucket_arn
}

data "aws_caller_identity" "current" {}
