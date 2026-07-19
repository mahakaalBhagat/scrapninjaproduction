# AWS DEPLOYMENT AUTOMATION SCRIPT FOR SCRAPNINJA (PowerShell)
# This script automates the entire AWS deployment process on Windows

param(
    [string]$AwsRegion = "ap-south-1",
    [string]$Environment = "production",
    [string]$DomainName = "scrapninja.com",
    [string]$AlertEmail = "admin@scrapninja.com"
)

$ErrorActionPreference = "Stop"

$ProjectName = "scrapninja"
$StateS3Bucket = "${ProjectName}-terraform-state"

Write-Host "================================================" -ForegroundColor Green
Write-Host "ScrapNinja AWS Deployment Automation (PowerShell)" -ForegroundColor Green
Write-Host "Target Budget: $5k/month" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

# Check prerequisites
Write-Host "`nChecking prerequisites..." -ForegroundColor Yellow

$prerequisites = @("aws", "terraform", "docker")

foreach ($tool in $prerequisites) {
    try {
        if ($tool -eq "aws") {
            $version = aws --version 2>&1 | Select-Object -First 1
        } else {
            $version = & $tool --version 2>&1 | Select-Object -First 1
        }
        Write-Host "✓ $tool installed: $version" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ $tool not found. Please install it first." -ForegroundColor Red
        exit 1
    }
}

# Verify AWS credentials
Write-Host "`nVerifying AWS credentials..." -ForegroundColor Yellow
$accountId = (aws sts get-caller-identity --query Account --output text)
Write-Host "✓ AWS Account: $accountId" -ForegroundColor Green

# Configuration
Write-Host "`nConfiguration:" -ForegroundColor Yellow
Write-Host "  Region: $AwsRegion"
Write-Host "  Project: $ProjectName"
Write-Host "  Environment: $Environment"
Write-Host "  Domain: $DomainName"

# Step 1: Create Terraform state bucket
Write-Host "`n[STEP 1] Creating Terraform state bucket..." -ForegroundColor Yellow

try {
    aws s3 ls "s3://${StateS3Bucket}" --region $AwsRegion 2>$null
    Write-Host "✓ Bucket already exists: $StateS3Bucket" -ForegroundColor Green
}
catch {
    Write-Host "Creating bucket: $StateS3Bucket"
    
    aws s3api create-bucket `
        --bucket $StateS3Bucket `
        --region $AwsRegion `
        --create-bucket-configuration LocationConstraint=$AwsRegion
    
    # Enable versioning
    aws s3api put-bucket-versioning `
        --bucket $StateS3Bucket `
        --versioning-configuration Status=Enabled
    
    # Block public access
    $blockConfig = @{
        BlockPublicAcls = $true
        IgnorePublicAcls = $true
        BlockPublicPolicy = $true
        RestrictPublicBuckets = $true
    } | ConvertTo-Json
    
    aws s3api put-public-access-block `
        --bucket $StateS3Bucket `
        --public-access-block-configuration $blockConfig
    
    Write-Host "✓ Bucket created and configured" -ForegroundColor Green
}

# Step 2: Initialize Terraform
Write-Host "`n[STEP 2] Initializing Terraform..." -ForegroundColor Yellow

Set-Location terraform

terraform init

Write-Host "✓ Terraform initialized" -ForegroundColor Green

# Step 3: Validate Terraform
Write-Host "`n[STEP 3] Validating Terraform configuration..." -ForegroundColor Yellow

terraform validate

Write-Host "✓ Terraform configuration valid" -ForegroundColor Green

# Step 4: Create tfvars if not exists
Write-Host "`n[STEP 4] Checking terraform.tfvars..." -ForegroundColor Yellow

if (-Not (Test-Path "terraform.tfvars")) {
    Write-Host "terraform.tfvars not found. Creating with defaults..." -ForegroundColor Yellow
    
    # Generate strong password
    $bytes = New-Object byte[] 32
    $rng = [System.Security.Cryptography.RNGCryptoServiceProvider]::new()
    $rng.GetBytes($bytes)
    $dbPassword = [Convert]::ToBase64String($bytes)
    
    $tfvarsContent = @"
aws_region   = "$AwsRegion"
environment  = "$Environment"
domain_name  = "$DomainName"
db_password  = "$dbPassword"
alert_email  = "$AlertEmail"
enable_backups = true
instance_count = 2
"@
    
    Set-Content -Path "terraform.tfvars" -Value $tfvarsContent
    
    Write-Host "✓ terraform.tfvars created" -ForegroundColor Green
    Write-Host "Database Password: $dbPassword" -ForegroundColor Yellow
    Write-Host "⚠️  IMPORTANT: Save this password safely!" -ForegroundColor Yellow
}
else {
    Write-Host "✓ terraform.tfvars already exists" -ForegroundColor Green
}

# Step 5: Plan deployment
Write-Host "`n[STEP 5] Planning infrastructure deployment..." -ForegroundColor Yellow

terraform plan -out=tfplan

Write-Host "✓ Plan completed" -ForegroundColor Green

# Step 6: Ask for confirmation
Write-Host "`n[STEP 6] Review the plan above." -ForegroundColor Yellow
$continue = Read-Host "Do you want to proceed with deployment? (yes/no)"

if ($continue -ne "yes") {
    Write-Host "Deployment cancelled" -ForegroundColor Red
    exit 1
}

# Step 7: Apply deployment
Write-Host "`n[STEP 7] Deploying infrastructure..." -ForegroundColor Yellow
Write-Host "This will take 10-15 minutes..." -ForegroundColor Yellow

terraform apply tfplan

Write-Host "✓ Infrastructure deployed successfully" -ForegroundColor Green

# Step 8: Export outputs
Write-Host "`n[STEP 8] Exporting infrastructure outputs..." -ForegroundColor Yellow

$albDns = terraform output -raw alb_dns_name
$rdsEndpoint = terraform output -raw rds_endpoint
$sqsQueueUrl = terraform output -raw sqs_queue_url
$s3Bucket = terraform output -raw s3_bucket_name

Write-Host "Infrastructure Details:" -ForegroundColor Green
Write-Host "  ALB DNS: $albDns"
Write-Host "  RDS Endpoint: $rdsEndpoint"
Write-Host "  SQS Queue: $sqsQueueUrl"
Write-Host "  S3 Bucket: $s3Bucket"

# Save to file
$envContent = @"
ALB_DNS=$albDns
RDS_ENDPOINT=$rdsEndpoint
SQS_QUEUE_URL=$sqsQueueUrl
S3_BUCKET=$s3Bucket
AWS_REGION=$AwsRegion
ACCOUNT_ID=$accountId
"@

Set-Content -Path "../DEPLOYMENT_OUTPUTS.env" -Value $envContent

Write-Host "✓ Outputs saved to DEPLOYMENT_OUTPUTS.env" -ForegroundColor Green

# Step 9: Create ECR repositories
Write-Host "`n[STEP 9] Creating ECR repositories..." -ForegroundColor Yellow

$services = @("auth-service", "api-gateway", "enquiry-service", "pickup-service", "pricing-service", "location-service")

foreach ($service in $services) {
    $repoName = "${ProjectName}/${service}"
    
    try {
        aws ecr describe-repositories --repository-names $repoName --region $AwsRegion 2>$null
        Write-Host "✓ Repository exists: $repoName" -ForegroundColor Green
    }
    catch {
        Write-Host "Creating repository: $repoName"
        aws ecr create-repository `
            --repository-name $repoName `
            --region $AwsRegion `
            --tags Key=Project,Value=ScrapNinja
        Write-Host "✓ Repository created: $repoName" -ForegroundColor Green
    }
}

# Step 10: Summary
Write-Host "`n================================================" -ForegroundColor Green
Write-Host "Deployment Complete! ✓" -ForegroundColor Green
Write-Host "================================================" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Get EC2 IPs:"
Write-Host "   aws ec2 describe-instances --filters 'Name=instance-state-name,Values=running' --query 'Reservations[*].Instances[*].{ID:InstanceId,PublicIP:PublicIpAddress}' --region $AwsRegion"
Write-Host "2. SSH into EC2 and deploy services"
Write-Host "3. Deploy frontend: npm run build && aws s3 sync out/ s3://$s3Bucket/"
Write-Host "4. Update GoDaddy DNS to point to: $albDns"
Write-Host "5. Test endpoints once DNS propagates"

Write-Host "`nMonthly Cost Estimate: ~`$5,000" -ForegroundColor Yellow
Write-Host "Outputs saved to: DEPLOYMENT_OUTPUTS.env" -ForegroundColor Yellow
Write-Host "`nFor detailed steps, see AWS_DEPLOYMENT_GUIDE.md" -ForegroundColor Green
