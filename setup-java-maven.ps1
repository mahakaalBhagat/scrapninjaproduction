# ScrapNinja Development Environment Setup Script (PowerShell Version)
# Requires: PowerShell 5.0+, Administrator privileges for PATH modifications

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "ScrapNinja Development Environment Setup" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "This script will install:"
Write-Host "  • Java 21 JDK (Temurin/OpenJDK)" -ForegroundColor Cyan
Write-Host "  • Maven 3.9.6" -ForegroundColor Cyan
Write-Host ""

# Check if running as administrator
$IsAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")
if (-not $IsAdmin) {
    Write-Host "WARNING: This script should be run as Administrator for PATH modifications." -ForegroundColor Yellow
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
}

# Create temporary directory
$TempDir = Join-Path $env:TEMP "scrapninja_setup"
New-Item -ItemType Directory -Path $TempDir -Force | Out-Null

# Function to download files with progress
function Download-File {
    param(
        [string]$Url,
        [string]$FilePath,
        [string]$Description
    )
    
    Write-Host "Downloading $Description..." -ForegroundColor Cyan
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        $WebClient = New-Object System.Net.WebClient
        $WebClient.DownloadFile($Url, $FilePath)
        Write-Host "✓ Downloaded successfully" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "✗ Download failed: $_" -ForegroundColor Red
        return $false
    }
}

# Check Java installation
Write-Host ""
Write-Host "Checking Java installation..." -ForegroundColor Cyan
try {
    $JavaVersion = java -version 2>&1 | Select-Object -First 1
    Write-Host "✓ Java already installed: $JavaVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Java not found. Installing Java 21 JDK..." -ForegroundColor Yellow
    
    $JavaUrl = "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%2B13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.msi"
    $JavaInstaller = Join-Path $TempDir "java21.msi"
    
    if (Download-File $JavaUrl $JavaInstaller "Java 21 JDK") {
        Write-Host "Installing Java 21..." -ForegroundColor Cyan
        Start-Process -FilePath $JavaInstaller -ArgumentList "/quiet", "/norestart" -Wait
        Write-Host "✓ Java 21 installed. Please close and reopen PowerShell to reload PATH." -ForegroundColor Green
        Write-Host "Then run this script again to install Maven." -ForegroundColor Yellow
        Read-Host "Press Enter to exit"
        exit 0
    }
}

# Check Maven installation
Write-Host ""
Write-Host "Checking Maven installation..." -ForegroundColor Cyan
try {
    $MavenVersion = mvn -version 2>&1 | Select-Object -First 1
    Write-Host "✓ Maven already installed: $MavenVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Maven not found. Installing Maven 3.9.6..." -ForegroundColor Yellow
    
    $MavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
    $MavenZip = Join-Path $TempDir "maven.zip"
    $MavenInstallDir = "C:\Program Files\apache-maven-3.9.6"
    
    if (Download-File $MavenUrl $MavenZip "Maven 3.9.6") {
        Write-Host "Extracting Maven..." -ForegroundColor Cyan
        Expand-Archive -Path $MavenZip -DestinationPath "C:\Program Files\" -Force
        Write-Host "✓ Maven extracted" -ForegroundColor Green
        
        Write-Host "Configuring Maven in system PATH..." -ForegroundColor Cyan
        [Environment]::SetEnvironmentVariable("MAVEN_HOME", $MavenInstallDir, "Machine")
        $CurrentPath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
        $MavenBinPath = Join-Path $MavenInstallDir "bin"
        if ($CurrentPath -notlike "*$MavenBinPath*") {
            [Environment]::SetEnvironmentVariable("PATH", "$CurrentPath;$MavenBinPath", "Machine")
        }
        Write-Host "✓ Maven configured in system PATH" -ForegroundColor Green
    }
}

# Final verification
Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Close and reopen PowerShell to reload environment variables" -ForegroundColor White
Write-Host "2. Navigate to the backend directory:" -ForegroundColor White
Write-Host "   cd 'C:\Users\nalin\Desktop\scapninja\backend'" -ForegroundColor Yellow
Write-Host "3. Build the project:" -ForegroundColor White
Write-Host "   mvn clean install" -ForegroundColor Yellow
Write-Host ""

Read-Host "Press Enter to exit"
