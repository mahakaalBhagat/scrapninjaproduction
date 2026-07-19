@echo off
REM ScrapNinja Backend Setup Script for Windows
REM This script automates database and service setup

echo.
echo ========================================
echo 🚀 ScrapNinja Backend Setup Script
echo ========================================
echo.

REM Check if MySQL is installed
echo 📋 Checking MySQL installation...
where mysql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ MySQL not found. Please install MySQL 8.0+
    pause
    exit /b 1
)
echo ✅ MySQL found
echo.

REM Create database and user
echo 📁 Creating database 'appdb'...
mysql -u root -p^
 -e "CREATE DATABASE IF NOT EXISTS appdb;"^
 -e "CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin';"^
 -e "GRANT ALL PRIVILEGES ON appdb.* TO 'admin'@'localhost';"^
 -e "FLUSH PRIVILEGES;"
echo ✅ Database created
echo.

REM Load schema
echo 🗄️  Loading DATABASE_SCHEMA.sql...
if exist "backend\DATABASE_SCHEMA.sql" (
    mysql -u admin -p admin appdb < backend\DATABASE_SCHEMA.sql
    echo ✅ Schema loaded successfully
) else (
    echo ❌ DATABASE_SCHEMA.sql not found
    pause
    exit /b 1
)
echo.

REM Run init script
echo ⚙️  Running init-db.sql...
if exist "backend\init-db.sql" (
    mysql -u admin -p admin appdb < backend\init-db.sql
    echo ✅ Init script executed
) else (
    echo ⚠️  init-db.sql not found (optional)
)
echo.

REM Verify database
echo ✔️  Verifying database...
mysql -u admin -p admin -e "USE appdb; SELECT COUNT(*) as total_items FROM scrap_items.items;" 2>nul
echo.

REM Build service
echo 🔨 Building Scrap Items Service...
cd backend\scrap-items-service
call mvn clean install
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)
cd ..\..
echo ✅ Service built successfully
echo.

REM Summary
echo ========================================
echo ✅ Setup Complete!
echo ========================================
echo.
echo 📡 To start the service:
echo    cd backend\scrap-items-service
echo    mvn spring-boot:run
echo.
echo 🌐 Service will run at:
echo    http://localhost:8085/scrap-items-service
echo.
echo 💾 Database connection:
echo    Host: localhost:3306
echo    User: admin
echo    Password: admin
echo    Database: appdb
echo.
echo 🔍 View database GUI:
echo    MySQL Workbench or phpMyAdmin
echo.
echo 📚 See BACKEND_QUICK_START.md for more details
echo.
pause
