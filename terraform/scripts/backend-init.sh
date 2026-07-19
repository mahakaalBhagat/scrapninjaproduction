#!/bin/bash
# Backend EC2 Initialization Script
# This script runs when EC2 instances start to deploy the application

set -e

echo "Starting ScrapNinja Backend Deployment..."

# Update system packages
yum update -y
yum install -y \
    docker \
    git \
    curl \
    wget \
    java-17-amazon-corretto-devel \
    maven

# Start Docker daemon
systemctl start docker
systemctl enable docker

# Add ec2-user to docker group
usermod -a -G docker ec2-user

# Create application directory
mkdir -p /opt/scrapninjaproduction
cd /opt/scrapninjaproduction

# Clone repository (use deploy key or HTTPS with token)
git clone https://github.com/mahakaalBhagat/scrapninjaproduction.git .

# Pull latest code
git pull origin main

# Create environment file from template
cat > .env << 'EOF'
# Database
DB_HOST=${rds_endpoint}
DB_PORT=5432
DB_NAME=appdb
DB_USER=admin
DB_PASSWORD=${db_password}

# AWS
AWS_REGION=${aws_region}
AWS_SQS_QUEUE_URL=${sqs_queue_url}
AWS_SQS_QUEUE_NAME=${sqs_queue_name}
AWS_S3_BUCKET=${s3_bucket}

# Redis
REDIS_HOST=${redis_endpoint}
REDIS_PORT=6379

# App Configuration
APP_ENV=production
APP_DEBUG=false

# Service Endpoints
AUTH_SERVICE_URL=http://localhost:8080
API_GATEWAY_URL=http://localhost:9000
ENQUIRY_SERVICE_URL=http://localhost:8081
PICKUP_SERVICE_URL=http://localhost:8082
PRICING_SERVICE_URL=http://localhost:8083
LOCATION_SERVICE_URL=http://localhost:8084
VENDOR_SERVICE_URL=http://localhost:8085

# CORS
CORS_ORIGIN=https://scrapninja.com,https://*.scrapninja.com

# Logging
LOG_LEVEL=info
LOG_FORMAT=json

# CloudWatch
ENABLE_CLOUDWATCH=true
CLOUDWATCH_NAMESPACE=ScrapNinja
EOF

# Build Docker images
echo "Building Docker images..."
docker-compose -f docker-compose.prod.yml build

# Pull Docker images from ECR (if already built and pushed)
# aws ecr get-login-password --region ${aws_region} | \
#     docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${aws_region}.amazonaws.com

# docker pull ${ACCOUNT_ID}.dkr.ecr.${aws_region}.amazonaws.com/scrapninja/auth-service:latest
# docker pull ${ACCOUNT_ID}.dkr.ecr.${aws_region}.amazonaws.com/scrapninja/api-gateway:latest
# etc...

# Start services with production compose file
echo "Starting services..."
docker-compose -f docker-compose.prod.yml up -d

# Wait for services to be ready
echo "Waiting for services to start..."
sleep 30

# Check health
echo "Checking service health..."

for port in 8080 8081 8082 8083 8084 9000; do
    if curl -f http://localhost:$port/health > /dev/null 2>&1; then
        echo "✓ Service on port $port is healthy"
    else
        echo "✗ Service on port $port failed health check"
    fi
done

# Install CloudWatch agent (for monitoring)
wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm
rpm -U ./amazon-cloudwatch-agent.rpm

# Create CloudWatch agent configuration
cat > /opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json << 'CFGEOF'
{
  "metrics": {
    "namespace": "ScrapNinja",
    "metrics_collected": {
      "cpu": {
        "measurement": [
          {
            "name": "cpu_usage_idle",
            "rename": "CPU_IDLE",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60
      },
      "disk": {
        "measurement": [
          {
            "name": "used_percent",
            "rename": "DISK_USED",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60,
        "resources": [
          "*"
        ]
      },
      "mem": {
        "measurement": [
          {
            "name": "mem_used_percent",
            "rename": "MEM_USED",
            "unit": "Percent"
          }
        ],
        "metrics_collection_interval": 60
      }
    }
  },
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/scrapninja.log",
            "log_group_name": "/scrapninja/application",
            "log_stream_name": "{instance_id}"
          },
          {
            "file_path": "/var/log/docker",
            "log_group_name": "/scrapninja/docker",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
CFGEOF

# Start CloudWatch agent
/opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl \
    -a fetch-config \
    -m ec2 \
    -s \
    -c file:/opt/aws/amazon-cloudwatch-agent/etc/amazon-cloudwatch-agent.json

# Create systemd service to auto-start docker-compose on reboot
cat > /etc/systemd/system/scrapninja.service << 'SVCEOF'
[Unit]
Description=ScrapNinja Backend Services
After=docker.service
Requires=docker.service

[Service]
Type=simple
User=root
WorkingDirectory=/opt/scrapninjaproduction
ExecStart=/usr/local/bin/docker-compose -f docker-compose.prod.yml up
ExecStop=/usr/local/bin/docker-compose -f docker-compose.prod.yml down
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SVCEOF

# Enable and start the service
systemctl daemon-reload
systemctl enable scrapninja.service

# Setup log rotation
cat > /etc/logrotate.d/scrapninja << 'LOGEOF'
/var/log/scrapninja.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 0644 root root
    sharedscripts
    postrotate
        systemctl reload scrapninja.service > /dev/null 2>&1 || true
    endscript
}
LOGEOF

# Pull latest code periodically (optional)
# cat > /etc/cron.daily/scrapninja-update << 'CRONEOF'
# #!/bin/bash
# cd /opt/scrapninjaproduction
# git pull origin main
# docker-compose -f docker-compose.prod.yml up -d
# CRONEOF
# chmod +x /etc/cron.daily/scrapninja-update

echo "✓ Backend deployment completed successfully!"
echo "Services are running on:"
echo "  - API Gateway: http://localhost:9000"
echo "  - Auth Service: http://localhost:8080"
echo "  - Enquiry Service: http://localhost:8081"
echo "  - Pickup Service: http://localhost:8082"
echo "  - Pricing Service: http://localhost:8083"
echo "  - Location Service: http://localhost:8084"
