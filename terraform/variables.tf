variable "aws_region" {
  description = "AWS region to deploy to"
  type        = string
  default     = "ap-south-1"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
  
  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be one of: production, staging, development."
  }
}

variable "domain_name" {
  description = "Domain name for the application"
  type        = string
  default     = "scrapninja.com"
}

variable "db_password" {
  description = "RDS database password"
  type        = string
  sensitive   = true
  
  validation {
    condition     = length(var.db_password) >= 12
    error_message = "Database password must be at least 12 characters long."
  }
}

variable "alert_email" {
  description = "Email address for CloudWatch alarms"
  type        = string
  default     = "admin@scrapninja.com"
}

variable "enable_backups" {
  description = "Enable AWS Backup for RDS and EBS"
  type        = bool
  default     = true
}

variable "instance_count" {
  description = "Number of backend instances to run"
  type        = number
  default     = 2
  
  validation {
    condition     = var.instance_count >= 1 && var.instance_count <= 10
    error_message = "Instance count must be between 1 and 10."
  }
}

variable "tags" {
  description = "Additional tags to apply to all resources"
  type        = map(string)
  default = {
    Project     = "ScrapNinja"
    ManagedBy   = "Terraform"
    CostCenter  = "Operations"
  }
}
