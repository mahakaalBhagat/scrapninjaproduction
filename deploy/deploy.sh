#!/bin/bash

# AWS DEPLOYMENT AUTOMATION SCRIPT FOR SCRAPNINJA
# This script automates the entire AWS deployment process

set -e

echo "================================================"
echo "ScrapNinja AWS Deployment Automation"
echo "Target Budget: $5k/month"
echo "================================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "\n${YELLOW}Checking prerequisites...${NC}"

if ! command -v aws &> /dev/null; then
    echo -e "${RED}AWS CLI not found. Please install it first.${NC}"
    exit 1
fi

if ! command -v terraform &> /dev/null; then
    echo -e "${RED}Terraform not found. Please install it first.${NC}"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Docker not found. Please install it first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ All prerequisites installed${NC}"

# Verify AWS credentials
echo -e "\n${YELLOW}Verifying AWS credentials...${NC}"
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo -e "${GREEN}✓ AWS Account: $ACCOUNT_ID${NC}"

# Set variables
AWS_REGION="ap-south-1"
PROJECT_NAME="scrapninja"
ENVIRONMENT="production"

echo -e "\n${YELLOW}Configuration:${NC}"
echo "  Region: $AWS_REGION"
echo "  Project: $PROJECT_NAME"
echo "  Environment: $ENVIRONMENT"

# Step 1: Create Terraform state bucket
echo -e "\n${YELLOW}[STEP 1] Creating Terraform state bucket...${NC}"

STATE_BUCKET="${PROJECT_NAME}-terraform-state"

if aws s3 ls "s3://${STATE_BUCKET}" 2>/dev/null; then
    echo -e "${GREEN}✓ Bucket already exists: ${STATE_BUCKET}${NC}"
else
    echo "Creating bucket: ${STATE_BUCKET}"
    aws s3api create-bucket \
        --bucket ${STATE_BUCKET} \
        --region ${AWS_REGION} \
        --create-bucket-configuration LocationConstraint=${AWS_REGION}
    
    # Enable versioning
    aws s3api put-bucket-versioning \
        --bucket ${STATE_BUCKET} \
        --versioning-configuration Status=Enabled
    
    # Block public access
    aws s3api put-public-access-block \
        --bucket ${STATE_BUCKET} \
        --public-access-block-configuration \
        "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
    
    # Enable encryption
    aws s3api put-bucket-encryption \
        --bucket ${STATE_BUCKET} \
        --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
    
    echo -e "${GREEN}✓ Bucket created and configured${NC}"
fi

# Step 2: Initialize Terraform
echo -e "\n${YELLOW}[STEP 2] Initializing Terraform...${NC}"

cd terraform

terraform init

echo -e "${GREEN}✓ Terraform initialized${NC}"

# Step 3: Validate Terraform
echo -e "\n${YELLOW}[STEP 3] Validating Terraform configuration...${NC}"

terraform validate

echo -e "${GREEN}✓ Terraform configuration valid${NC}"

# Step 4: Create tfvars if not exists
echo -e "\n${YELLOW}[STEP 4] Checking terraform.tfvars...${NC}"

if [ ! -f terraform.tfvars ]; then
    echo -e "${YELLOW}terraform.tfvars not found. Creating with defaults...${NC}"
    
    # Generate strong password
    DB_PASSWORD=$(openssl rand -base64 32)
    
    cat > terraform.tfvars << EOF
aws_region   = "${AWS_REGION}"
environment  = "${ENVIRONMENT}"
domain_name  = "scrapninja.com"
db_password  = "${DB_PASSWORD}"
alert_email  = "admin@scrapninja.com"
enable_backups = true
instance_count = 2
EOF
    
    echo -e "${GREEN}✓ terraform.tfvars created${NC}"
    echo -e "${YELLOW}Database Password: ${DB_PASSWORD}${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANT: Save this password safely!${NC}"
else
    echo -e "${GREEN}✓ terraform.tfvars already exists${NC}"
fi

# Step 5: Plan deployment
echo -e "\n${YELLOW}[STEP 5] Planning infrastructure deployment...${NC}"

terraform plan -out=tfplan

echo -e "${GREEN}✓ Plan completed${NC}"

# Step 6: Ask for confirmation
echo -e "\n${YELLOW}Review the plan above. Do you want to proceed with deployment? (yes/no)${NC}"
read -r CONFIRM

if [ "$CONFIRM" != "yes" ]; then
    echo -e "${RED}Deployment cancelled${NC}"
    exit 1
fi

# Step 7: Apply deployment
echo -e "\n${YELLOW}[STEP 6] Deploying infrastructure...${NC}"
echo -e "${YELLOW}This will take 10-15 minutes...${NC}"

terraform apply tfplan

echo -e "${GREEN}✓ Infrastructure deployed successfully${NC}"

# Step 8: Export outputs
echo -e "\n${YELLOW}[STEP 7] Exporting infrastructure outputs...${NC}"

ALB_DNS=$(terraform output -raw alb_dns_name)
RDS_ENDPOINT=$(terraform output -raw rds_endpoint)
SQS_QUEUE_URL=$(terraform output -raw sqs_queue_url)
S3_BUCKET=$(terraform output -raw s3_bucket_name)

echo -e "${GREEN}Infrastructure Details:${NC}"
echo "  ALB DNS: ${ALB_DNS}"
echo "  RDS Endpoint: ${RDS_ENDPOINT}"
echo "  SQS Queue: ${SQS_QUEUE_URL}"
echo "  S3 Bucket: ${S3_BUCKET}"

# Save to file
cat > ../DEPLOYMENT_OUTPUTS.env << EOF
ALB_DNS=${ALB_DNS}
RDS_ENDPOINT=${RDS_ENDPOINT}
SQS_QUEUE_URL=${SQS_QUEUE_URL}
S3_BUCKET=${S3_BUCKET}
AWS_REGION=${AWS_REGION}
ACCOUNT_ID=${ACCOUNT_ID}
EOF

echo -e "${GREEN}✓ Outputs saved to DEPLOYMENT_OUTPUTS.env${NC}"

# Step 9: Create ECR repositories
echo -e "\n${YELLOW}[STEP 8] Creating ECR repositories...${NC}"

SERVICES=("auth-service" "api-gateway" "enquiry-service" "pickup-service" "pricing-service" "location-service")

for SERVICE in "${SERVICES[@]}"; do
    REPO_NAME="${PROJECT_NAME}/${SERVICE}"
    
    if aws ecr describe-repositories --repository-names "${REPO_NAME}" --region ${AWS_REGION} 2>/dev/null; then
        echo -e "${GREEN}✓ Repository exists: ${REPO_NAME}${NC}"
    else
        echo "Creating repository: ${REPO_NAME}"
        aws ecr create-repository \
            --repository-name "${REPO_NAME}" \
            --region ${AWS_REGION} \
            --tags Key=Project,Value=ScrapNinja
        echo -e "${GREEN}✓ Repository created: ${REPO_NAME}${NC}"
    fi
done

# Step 10: Login to ECR
echo -e "\n${YELLOW}[STEP 9] Logging in to ECR...${NC}"

aws ecr get-login-password --region ${AWS_REGION} | \
    docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo -e "${GREEN}✓ Logged in to ECR${NC}"

# Step 11: Build and push Docker images
echo -e "\n${YELLOW}[STEP 10] Building and pushing Docker images...${NC}"
echo -e "${YELLOW}This will take 5-10 minutes...${NC}"

cd ../backend

for SERVICE in "${SERVICES[@]}"; do
    if [ -d "${SERVICE}" ]; then
        echo -e "${YELLOW}Building ${SERVICE}...${NC}"
        
        cd "${SERVICE}"
        
        # Build image
        docker build -t ${PROJECT_NAME}/${SERVICE}:latest .
        
        # Tag image
        docker tag ${PROJECT_NAME}/${SERVICE}:latest \
            ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}/${SERVICE}:latest
        
        # Push image
        docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${PROJECT_NAME}/${SERVICE}:latest
        
        echo -e "${GREEN}✓ Pushed ${SERVICE}${NC}"
        
        cd ..
    fi
done

cd ..

# Summary
echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}Deployment Complete! ✓${NC}"
echo -e "${GREEN}================================================${NC}"

echo -e "\n${YELLOW}Next Steps:${NC}"
echo "1. Get EC2 IPs: aws ec2 describe-instances --filters 'Name=instance-state-name,Values=running' --query 'Reservations[*].Instances[*].{ID:InstanceId,PublicIP:PublicIpAddress}' --region ${AWS_REGION}"
echo "2. SSH into EC2 and deploy services"
echo "3. Deploy frontend: npm run build && aws s3 sync out/ s3://${S3_BUCKET}/"
echo "4. Update GoDaddy DNS to point to: ${ALB_DNS}"
echo "5. Test endpoints once DNS propagates"

echo -e "\n${YELLOW}Monthly Cost Estimate: ~\$5,000${NC}"
echo -e "${YELLOW}Outputs saved to: DEPLOYMENT_OUTPUTS.env${NC}"

echo -e "\n${GREEN}For detailed steps, see AWS_DEPLOYMENT_GUIDE.md${NC}"
