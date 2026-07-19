# AWS SETUP & DEPLOYMENT GUIDE FOR SCRAPNINJA
## Cost-Optimized Production Deployment (Target: $5k/month budget)

---

## **PREREQUISITES**

Before you start, ensure you have:

1. **AWS Account**: New account (ID: 396287094911)
2. **AWS CLI** installed: https://aws.amazon.com/cli/
3. **Terraform** installed: https://www.terraform.io/downloads
4. **Docker** installed (for building images locally)
5. **Git** with your repository cloned
6. **IAM User** with AdministratorAccess permissions

---

## **STEP 1: Configure AWS CLI**

```bash
aws configure
# Enter:
# - AWS Access Key ID: [your-access-key]
# - AWS Secret Access Key: [your-secret-key]
# - Default region: ap-south-1 (Mumbai - lowest cost for India)
# - Default output format: json
```

Verify configuration:
```bash
aws sts get-caller-identity
```

Expected output:
```json
{
    "UserId": "...",
    "Account": "396287094911",
    "Arn": "arn:aws:iam::396287094911:user/..."
}
```

---

## **STEP 2: Create S3 Bucket for Terraform State**

```bash
# Create bucket
aws s3api create-bucket \
  --bucket scrapninja-terraform-state \
  --region ap-south-1 \
  --create-bucket-configuration LocationConstraint=ap-south-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket scrapninja-terraform-state \
  --versioning-configuration Status=Enabled

# Block public access
aws s3api put-public-access-block \
  --bucket scrapninja-terraform-state \
  --public-access-block-configuration \
  "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket scrapninja-terraform-state \
  --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
```

---

## **STEP 3: Initialize Terraform**

```bash
cd terraform

# Initialize Terraform
terraform init

# Validate configuration
terraform validate

# Format code
terraform fmt -recursive
```

---

## **STEP 4: Create terraform.tfvars File**

Create `terraform/terraform.tfvars`:

```hcl
aws_region   = "ap-south-1"
environment  = "production"
domain_name  = "scrapninja.com"

# Generate strong password: openssl rand -base64 32
db_password  = "YOUR_GENERATED_SECURE_PASSWORD_HERE"

alert_email  = "admin@scrapninja.com"
enable_backups = true
instance_count = 2

tags = {
  Project    = "ScrapNinja"
  Environment = "Production"
  CostCenter = "Operations"
}
```

---

## **STEP 5: Plan Terraform Deployment**

```bash
terraform plan -out=tfplan

# Review the plan (should show ~30-40 resources to be created)
# Check the estimated costs
```

---

## **STEP 6: Deploy Infrastructure**

```bash
# Apply the plan
terraform apply tfplan

# Wait for completion (10-15 minutes)
# This will:
# ✅ Create VPC with subnets
# ✅ Create RDS PostgreSQL (single-AZ)
# ✅ Create SQS queue (replaces Kafka)
# ✅ Create EC2 instances with auto-scaling
# ✅ Create ALB
# ✅ Create S3 bucket + CloudFront
# ✅ Create Route53 DNS
# ✅ Create security groups
```

---

## **STEP 7: Capture Terraform Outputs**

After deployment, capture the outputs:

```bash
terraform output -raw alb_dns_name
terraform output -raw rds_endpoint
terraform output -raw sqs_queue_url
terraform output -raw s3_bucket_name
```

Save these values - you'll need them for configuration.

---

## **STEP 8: Build Backend Docker Images**

```bash
cd ..

# Create ECR repositories
aws ecr create-repository \
  --repository-name scrapninja/auth-service \
  --region ap-south-1

aws ecr create-repository \
  --repository-name scrapninja/api-gateway \
  --region ap-south-1

aws ecr create-repository \
  --repository-name scrapninja/enquiry-service \
  --region ap-south-1

aws ecr create-repository \
  --repository-name scrapninja/pickup-service \
  --region ap-south-1

aws ecr create-repository \
  --repository-name scrapninja/pricing-service \
  --region ap-south-1

aws ecr create-repository \
  --repository-name scrapninja/location-service \
  --region ap-south-1

# Login to ECR
aws ecr get-login-password --region ap-south-1 | \
  docker login --username AWS --password-stdin 396287094911.dkr.ecr.ap-south-1.amazonaws.com

# Build and push images
cd backend/auth-service
docker build -t scrapninja/auth-service:latest .
docker tag scrapninja/auth-service:latest \
  396287094911.dkr.ecr.ap-south-1.amazonaws.com/scrapninja/auth-service:latest
docker push 396287094911.dkr.ecr.ap-south-1.amazonaws.com/scrapninja/auth-service:latest

# Repeat for other services...
```

---

## **STEP 9: Configure EC2 Instances**

SSH into each EC2 instance:

```bash
# Get EC2 IP
aws ec2 describe-instances \
  --filters "Name=instance-state-name,Values=running" \
  --query 'Reservations[*].Instances[*].{ID:InstanceId,PublicIP:PublicIpAddress}' \
  --region ap-south-1

# SSH into instance
ssh -i your-key.pem ec2-user@PUBLIC_IP

# Pull latest code and start services
cd /opt/scrapninjaproduction
git pull origin main

# Create .env file
cat > .env << 'EOF'
RDS_ENDPOINT=your-rds-endpoint.rds.amazonaws.com
REDIS_HOST=your-redis-ip
AWS_SQS_QUEUE_URL=your-sqs-url
AWS_S3_BUCKET=your-s3-bucket
AWS_REGION=ap-south-1
DB_PASSWORD=your-db-password
EOF

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

---

## **STEP 10: Deploy Frontend to S3 + CloudFront**

```bash
cd frontend

# Build
npm run build

# Sync to S3
aws s3 sync out/ \
  s3://your-s3-bucket-name/ \
  --delete \
  --cache-control "max-age=31536000,public" \
  --exclude "*.html" \
  --metadata-directive REPLACE

# Set cache for HTML (short TTL)
aws s3 sync out/ \
  s3://your-s3-bucket-name/ \
  --delete \
  --cache-control "max-age=3600,public" \
  --include "*.html" \
  --content-type "text/html" \
  --metadata-directive REPLACE

# Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DIST_ID \
  --paths "/*"
```

---

## **STEP 11: Configure Domain in GoDaddy**

Update your GoDaddy DNS records:

1. **A Record** → Point to ALB DNS name
2. **CNAME** → Point to CloudFront domain for static files
3. **SSL Certificate** → Already issued by AWS ACM

Update in GoDaddy:
- Log in to GoDaddy
- Go to your domain
- DNS Management
- Update records to point to AWS infrastructure

---

## **STEP 12: Verify Deployment**

```bash
# Test API Gateway
curl https://api.scrapninja.com/health

# Test S3 + CloudFront
curl https://cdn.scrapninja.com/index.html

# Check RDS connectivity
aws rds describe-db-instances \
  --query 'DBInstances[0].Endpoint' \
  --region ap-south-1

# Monitor Auto-scaling
aws autoscaling describe-auto-scaling-groups \
  --auto-scaling-group-names scrapninja-asg \
  --region ap-south-1
```

---

## **STEP 13: Setup Monitoring & Alerts**

```bash
# Create SNS topic for alerts
aws sns create-topic --name scrapninja-alerts

# Subscribe your email
aws sns subscribe \
  --topic-arn arn:aws:sns:ap-south-1:396287094911:scrapninja-alerts \
  --protocol email \
  --notification-endpoint admin@scrapninja.com

# Create CloudWatch alarms
aws cloudwatch put-metric-alarm \
  --alarm-name scrapninja-high-cpu \
  --alarm-description "Alert when CPU > 80%" \
  --metric-name CPUUtilization \
  --namespace AWS/EC2 \
  --statistic Average \
  --period 300 \
  --threshold 80 \
  --comparison-operator GreaterThanThreshold \
  --evaluation-periods 2 \
  --alarm-actions arn:aws:sns:ap-south-1:396287094911:scrapninja-alerts
```

---

## **COST BREAKDOWN**

```
Monthly Costs (Target: ~$5,000)
├─ RDS PostgreSQL (t3.micro, single-AZ): $60
├─ EC2 t3.small × 2 (auto-scaling): $44
├─ NAT Gateway: $32
├─ Application Load Balancer: $16
├─ SQS (replaces Kafka): $100
├─ S3 Storage: $5
├─ CloudFront CDN: $100-200
├─ Route53 DNS: $1
├─ CloudWatch: $30
├─ Backups & Snapshots: $30
├─ AWS Support (Business): $100
└─ Reserve for traffic spikes: $4,500
   ───────────────────────────
   TOTAL: ~$5,000 ✅
```

---

## **OPTIMIZATION TIPS FOR FURTHER COST REDUCTION**

### **If over budget:**

1. **Reduce EC2 instances** to 1 (use t3.micro) - saves ~$44/month
2. **Switch to SQS Standard** (already doing) vs FIFO - saves $200-300/month
3. **Reduce data transfer** - compress APIs, use caching - saves $100-200/month
4. **Use spot instances** for non-critical services - saves 70%
5. **Reserved Instances** - 1-year commitment saves ~40%
6. **Archive old logs** to S3 Glacier - saves $50-100/month

### **If under budget (scale up):**

1. Add read replicas for RDS - $60/month each
2. Add multi-AZ for HA - $60/month
3. Upgrade to db.t3.small - $30/month
4. Add WAF protection - $5/month
5. Use Elasticache for Redis - adds $50/month (vs self-hosted $15)

---

## **MONITORING DASHBOARDS**

Access CloudWatch dashboard:
```
AWS Console → CloudWatch → Dashboards → Create dashboard
```

Add widgets for:
- ALB request count & latency
- RDS CPU, connections, storage
- EC2 CPU & memory
- SQS messages
- Error rates & latency percentiles

---

## **ROLLING BACK CHANGES**

If something goes wrong:

```bash
# Destroy all infrastructure
terraform destroy -auto-approve

# Warning: This deletes EVERYTHING
# Make sure you have backups!
```

---

## **NEXT STEPS**

- [ ] Configure AWS CLI
- [ ] Create Terraform state bucket
- [ ] Create tfvars file with passwords
- [ ] Run terraform plan
- [ ] Review infrastructure design
- [ ] Apply terraform
- [ ] Build and push Docker images to ECR
- [ ] Deploy to EC2
- [ ] Deploy frontend to S3
- [ ] Update GoDaddy DNS
- [ ] Test all endpoints
- [ ] Monitor costs in AWS Billing Dashboard
- [ ] Set up alerts

---

## **SUPPORT & TROUBLESHOOTING**

### **Common Issues:**

**Terraform fails to apply**
- Check AWS credentials: `aws sts get-caller-identity`
- Verify region: `aws configure list`
- Check quotas: https://console.aws.amazon.com/servicequotas

**EC2 instances not starting**
- Check security groups allow traffic
- Verify IAM role has necessary permissions
- Check user data logs: `/var/log/cloud-init-output.log`

**Database connection failed**
- Verify RDS security group allows port 5432
- Check endpoint in EC2: `nc -zv rds-endpoint 5432`
- Verify credentials in .env

**SQS messages not processing**
- Check SQS queue URL is correct
- Verify IAM role has SQS permissions
- Check Dead Letter Queue for failed messages

---

## **CONTACT & RESOURCES**

- AWS Documentation: https://docs.aws.amazon.com/
- Terraform AWS Provider: https://registry.terraform.io/providers/hashicorp/aws/latest/docs
- ScrapNinja Repo: https://github.com/mahakaalBhagat/scrapninjaproduction

---

**Last Updated**: 2026-07-19
**Cost Optimized**: 20k → 5k/month ✅
