#!/bin/bash
# ScrapNinja Backend Setup Script
# This script automates database and service setup

echo "🚀 ScrapNinja Backend Setup Script"
echo "=================================="

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check MySQL
echo ""
echo -e "${YELLOW}📋 Checking MySQL...${NC}"
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL not found. Please install MySQL 8.0+${NC}"
    exit 1
fi
echo -e "${GREEN}✅ MySQL found${NC}"

# Create database
echo ""
echo -e "${YELLOW}📁 Creating database 'appdb'...${NC}"
mysql -u root -p << EOF
CREATE DATABASE IF NOT EXISTS appdb;
CREATE USER IF NOT EXISTS 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON appdb.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
EOF
echo -e "${GREEN}✅ Database created${NC}"

# Run schema
echo ""
echo -e "${YELLOW}🗄️  Loading DATABASE_SCHEMA.sql...${NC}"
if [ -f "backend/DATABASE_SCHEMA.sql" ]; then
    mysql -u admin -p admin appdb < backend/DATABASE_SCHEMA.sql
    echo -e "${GREEN}✅ Schema loaded successfully${NC}"
else
    echo -e "${RED}❌ DATABASE_SCHEMA.sql not found${NC}"
    exit 1
fi

# Run init script
echo ""
echo -e "${YELLOW}⚙️  Running init-db.sql...${NC}"
if [ -f "backend/init-db.sql" ]; then
    mysql -u admin -p admin appdb < backend/init-db.sql
    echo -e "${GREEN}✅ Init script executed${NC}"
else
    echo -e "${YELLOW}⚠️  init-db.sql not found (optional)${NC}"
fi

# Verify
echo ""
echo -e "${YELLOW}✔️  Verifying database...${NC}"
ITEM_COUNT=$(mysql -u admin -p admin -e "USE appdb; SELECT COUNT(*) FROM scrap_items.items;" 2>/dev/null | tail -1)
CAT_COUNT=$(mysql -u admin -p admin -e "USE appdb; SELECT COUNT(*) FROM scrap_items.categories;" 2>/dev/null | tail -1)

echo -e "${GREEN}✅ Database verification:${NC}"
echo "   - Items loaded: $ITEM_COUNT"
echo "   - Categories: $CAT_COUNT"

# Build service
echo ""
echo -e "${YELLOW}🔨 Building Scrap Items Service...${NC}"
cd backend/scrap-items-service
if mvn clean install > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Service built successfully${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
cd ../..

# Summary
echo ""
echo "=================================="
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo "=================================="
echo ""
echo -e "${YELLOW}📡 To start the service:${NC}"
echo "   cd backend/scrap-items-service"
echo "   mvn spring-boot:run"
echo ""
echo -e "${YELLOW}🌐 Service will run at:${NC}"
echo "   http://localhost:8085/scrap-items-service"
echo ""
echo -e "${YELLOW}💾 Database connection:${NC}"
echo "   Host: localhost:3306"
echo "   User: admin"
echo "   Password: admin"
echo "   Database: appdb"
echo ""
echo -e "${YELLOW}🔍 View database GUI:${NC}"
echo "   MySQL Workbench or phpMyAdmin"
echo ""
