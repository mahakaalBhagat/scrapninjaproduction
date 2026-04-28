@echo off
REM ScrapNinja Development Environment Setup Script for Windows
REM This script downloads and installs Java 21 JDK and Maven

echo.
echo ============================================
echo ScrapNinja Development Environment Setup
echo ============================================
echo.
echo This script will download and install:
echo - Java 21 JDK (Eclipse Temurin)
echo - Maven 3.9.6
echo.
pause

REM Create temp directory for downloads
set TEMP_DIR=%TEMP%\scrapninja_setup
mkdir "%TEMP_DIR%" 2>nul

REM Check if Java is already installed
java -version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Java is already installed:
    java -version
    goto MAVEN_INSTALL
) else (
    echo Java not found. Installing Java 21 JDK...
)

REM Download Java 21 (Eclipse Temurin - OpenJDK)
echo Downloading Java 21 JDK (this may take a few minutes)...
set JAVA_URL=https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2%%2B13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.msi
set JAVA_INSTALLER=%TEMP_DIR%\java21.msi

REM Using PowerShell to download
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.2+13/OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.msi', '%JAVA_INSTALLER%')}" 2>nul

if exist "%JAVA_INSTALLER%" (
    echo Installing Java 21...
    start /wait msiexec.exe /i "%JAVA_INSTALLER%" /quiet /norestart
    echo Java 21 installed. Please restart your terminal and run this script again.
    pause
    exit /b
) else (
    echo Failed to download Java. Please visit:
    echo https://github.com/adoptium/temurin21-binaries/releases
    echo Download: OpenJDK21U-jdk_x64_windows_hotspot_21.0.x_xx.msi
    echo Then run this script again.
    pause
    exit /b 1
)

:MAVEN_INSTALL
mvn -version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Maven is already installed:
    mvn -version
    goto SUCCESS
) else (
    echo Maven not found. Installing Maven 3.9.6...
)

REM Download Maven
echo Downloading Maven 3.9.6...
set MAVEN_URL=https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip
set MAVEN_ZIP=%TEMP_DIR%\maven.zip
set MAVEN_INSTALL_DIR=C:\Program Files\apache-maven-3.9.6

REM Using PowerShell to download Maven
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('%MAVEN_URL%', '%MAVEN_ZIP%')}" 2>nul

if exist "%MAVEN_ZIP%" (
    echo Extracting Maven...
    REM Check if 7-Zip is available
    if exist "C:\Program Files\7-Zip\7z.exe" (
        "C:\Program Files\7-Zip\7z.exe" x "%MAVEN_ZIP%" -o"C:\Program Files\" -y >nul
    ) else (
        REM Use PowerShell for extraction
        powershell -Command "Expand-Archive -Path '%MAVEN_ZIP%' -DestinationPath 'C:\Program Files\' -Force"
    )
    
    echo Maven extracted to %MAVEN_INSTALL_DIR%
    
    REM Add Maven to PATH
    echo Adding Maven to system PATH...
    setx MAVEN_HOME "%MAVEN_INSTALL_DIR%"
    setx PATH "%PATH%;%MAVEN_INSTALL_DIR%\bin"
    
    echo.
    echo Maven installed successfully!
    echo Please restart your terminal and run: mvn -version
) else (
    echo Failed to download Maven. Please visit:
    echo https://maven.apache.org/download.cgi
    echo Download: apache-maven-3.9.6-bin.zip
    echo Extract to: C:\Program Files\
    pause
    exit /b 1
)

:SUCCESS
echo.
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo You can now run:
echo   cd C:\Users\nalin\Desktop\scapninja\backend
echo   mvn clean install
echo.
pause
