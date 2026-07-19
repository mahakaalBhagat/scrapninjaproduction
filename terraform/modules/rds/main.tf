# RDS Module
resource "aws_db_instance" "postgres" {
  identifier          = "scrapninja-db-${var.environment}"
  engine              = "postgres"
  engine_version      = "14.7"
  instance_class      = var.db_instance_class
  allocated_storage   = var.allocated_storage
  storage_type        = var.storage_type
  iops                = var.iops
  
  db_name  = var.db_name
  username = var.db_username
  password = var.db_password
  
  multi_az               = var.multi_az
  publicly_accessible    = var.publicly_accessible
  storage_encrypted      = var.storage_encrypted
  skip_final_snapshot    = var.skip_final_snapshot
  final_snapshot_identifier = var.final_snapshot_identifier
  
  backup_retention_period = var.backup_retention_period
  backup_window          = "03:00-04:00"
  maintenance_window     = "sun:04:00-sun:05:00"
  
  db_subnet_group_name   = var.db_subnet_group_name
  vpc_security_group_ids = var.vpc_security_group_ids
  
  parameter_group_name = aws_db_parameter_group.postgres.name
  
  tags = {
    Name = "scrapninja-postgres-${var.environment}"
  }
}

resource "aws_db_parameter_group" "postgres" {
  name   = "scrapninja-pg-params-${var.environment}"
  family = "postgres14"

  parameter {
    name  = "log_statement"
    value = "all"
  }

  parameter {
    name  = "log_min_duration_statement"
    value = "1000"
  }

  tags = {
    Name = "scrapninja-pg-params"
  }
}

output "endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "instance_id" {
  value = aws_db_instance.postgres.id
}

output "arn" {
  value = aws_db_instance.postgres.arn
}
