# 🚀 SCRAPNINJA BACKEND - QUICK START GUIDE

## 📂 Database & Backend File Locations

### Files Created for You:
```
backend/
├── DATABASE_SCHEMA.sql             ✅ Complete database schema (CREATED)
├── scrap-items-service/            ✅ New microservice (CREATED)
│   ├── pom.xml                     ✅ Maven configuration
│   ├── src/main/
│   │   ├── java/com/scrapninja/scrapitems/
│   │   │   ├── ScrapItemsServiceApplication.java    ✅ Main app
│   │   │   ├── entity/
│   │   │   │   ├── ScrapCategory.java              ✅ Category entity
│   │   │   │   ├── ScrapItem.java                  ✅ Item entity
│   │   │   │   ├── UserListing.java                ✅ User listing entity
│   │   │   │   └── ListingStatus.java              ✅ Status enum
│   │   │   ├── repository/
│   │   │   │   ├── ScrapCategoryRepository.java    ✅ Category repository
│   │   │   │   ├── ScrapItemRepository.java        ✅ Item repository
│   │   │   │   └── UserListingRepository.java      ✅ Listing repository
│   │   │   ├── service/
│   │   │   │   ├── ScrapItemService.java           ✅ Business logic for items
│   │   │   │   └── UserListingService.java         ✅ Business logic for listings
│   │   │   ├── controller/
│   │   │   │   ├── ScrapItemController.java        ✅ REST endpoints
│   │   │   │   └── UserListingController.java      ✅ REST endpoints
│   │   │   ├── dto/
│   │   │   │   └── UserListingRequest.java         ✅ Request DTO
│   │   │   └── exception/
│   │   │       └── ResourceNotFoundException.java  ✅ Custom exception
│   │   └── resources/
│   │       └── application.yml                     ✅ Spring Boot config
```

---

## 🗄️ DATABASE LOCATION & ACCESS

### Database Details
```
Name:     appdb
Type:     MySQL 8.0
Host:     localhost
Port:     3306
User:     admin
Password: admin
```

### View Database (3 Options)

#### Option 1: Command Line (MySQL)
```bash
mysql -u admin -p appdb
# Password: admin

# Then run SQL queries:
SHOW TABLES FROM scrap_items;
SELECT * FROM scrap_items.items;
SELECT * FROM scrap_items.categories;
```

#### Option 2: phpMyAdmin (GUI in Browser)
```
If using Docker:
http://localhost:8081/phpmyadmin

User: admin
Password: admin
```

#### Option 3: MySQL Workbench (Desktop Application)
```
1. Download: https://dev.mysql.com/downloads/workbench/
2. New Connection:
   - Connection Name: ScrapNinja
   - Hostname: 127.0.0.1
   - Port: 3306
   - Username: admin
   - Password: admin
3. Click "Test Connection"
4. Double-click to open
5. See all schemas and tables
```

---

## 🗄️ DATABASE SCHEMA STRUCTURE

### 8 Microservice Schemas

```
┌─────────────────────────────────────────────────────────┐
│                    Database: appdb                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────┐  ┌──────────────────┐            │
│  │  auth schema    │  │  scrap_items     │  [★ NEW]   │
│  ├─────────────────┤  ├──────────────────┤            │
│  │ · users (5 cols)│  │ · categories     │            │
│  └─────────────────┘  │ · items          │            │
│                       │ · user_listings  │            │
│  ┌─────────────────┐  │ · transactions   │            │
│  │  vendor schema  │  └──────────────────┘            │
│  ├─────────────────┤                                  │
│  │ · vendor_apps   │  ┌──────────────────┐            │
│  └─────────────────┘  │  rider schema    │  [★ NEW]   │
│                       ├──────────────────┤            │
│  ┌─────────────────┐  │ · rider_apps     │            │
│  │  pickup schema  │  └──────────────────┘            │
│  ├─────────────────┤                                  │
│  │ · pickup_reqs   │  ┌──────────────────┐            │
│  └─────────────────┘  │  pricing schema  │            │
│                       ├──────────────────┤            │
│  ┌─────────────────┐  │ · price_history  │            │
│  │  location       │  └──────────────────┘            │
│  ├─────────────────┤                                  │
│  │ · service_areas │  ┌──────────────────┐            │
│  └─────────────────┘  │  enquiry schema  │            │
│                       ├──────────────────┤            │
│                       │ · enquiries      │            │
│                       └──────────────────┘            │
└─────────────────────────────────────────────────────────┘
```

### Key Tables in scrap_items Schema
```
categories
├── id (PK)
├── name
├── emoji
└── description

items
├── id (PK)
├── name
├── category_id (FK → categories)
├── price_per_unit
├── unit (kg, piece, etc.)
├── emoji
├── environmental_warning
└── is_active

user_listings
├── id (PK)
├── user_id
├── item_id (FK → items)
├── quantity
├── unit
├── location
├── status (AVAILABLE, PENDING, SOLD, CANCELLED)
└── created_at

transactions
├── id (PK)
├── seller_id
├── buyer_id
├── listing_id (FK → user_listings)
├── quantity
├── unit_price
├── total_price
├── status
└── payment_status
```

---

## 🚀 STEP-BY-STEP SETUP

### Step 1: Create Database & Load Schema
```bash
# Create database
mysql -u root -p -e "CREATE DATABASE appdb;"

# Create admin user
mysql -u root -p -e "CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';"
mysql -u root -p -e "GRANT ALL ON appdb.* TO 'admin'@'localhost';"

# Load schema files
mysql -u admin -p appdb < backend/DATABASE_SCHEMA.sql
mysql -u admin -p appdb < backend/init-db.sql

# Verify database created
mysql -u admin -p -e "USE appdb; SHOW TABLES FROM scrap_items;"
```

### Step 2: Build Scrap Items Service
```bash
cd backend/scrap-items-service
mvn clean install
```

### Step 3: Run the Service
```bash
mvn spring-boot:run
```

### Step 4: Test API Endpoints
```bash
# Get all items
curl http://localhost:8085/scrap-items-service/api/scrap-items

# Get all categories
curl http://localhost:8085/scrap-items-service/api/scrap-items/categories/all

# Search items
curl http://localhost:8085/scrap-items-service/api/scrap-items/search?query=laptop

# Get item by ID
curl http://localhost:8085/scrap-items-service/api/scrap-items/1

# Get items by category
curl http://localhost:8085/scrap-items-service/api/scrap-items/category/1
```

---

## 📡 API ENDPOINTS READY TO USE

### ✅ Scrap Items Endpoints
```
GET  /api/scrap-items
GET  /api/scrap-items/{id}
GET  /api/scrap-items/search?query=VALUE
GET  /api/scrap-items/category/{categoryId}
GET  /api/scrap-items/categories/all
GET  /api/scrap-items/categories/{id}
```

### ✅ User Listings Endpoints
```
POST   /api/listings
GET    /api/listings/user/{userId}
GET    /api/listings/user/{userId}/available
GET    /api/listings/{listingId}
PUT    /api/listings/{listingId}
PUT    /api/listings/{listingId}/status
GET    /api/listings/status/{status}
DELETE /api/listings/{listingId}
```

---

## 🔌 CONNECT FRONTEND TO BACKEND

### Update Frontend API Service
Go to: `frontend/src/services/scrapApi.ts`

Replace mock API with real backend:

```typescript
// Before (Mock)
const getAllItems = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...mockItems]);
    }, 300);
  });
};

// After (Real API)
const getAllItems = async () => {
  const response = await fetch('http://localhost:8085/scrap-items-service/api/scrap-items');
  return response.json();
};

// Or use axios:
const getAllItems = async () => {
  const { data } = await axios.get('http://localhost:8085/scrap-items-service/api/scrap-items');
  return data;
};
```

---

## 🐳 Docker Setup (Optional)

### docker-compose.yml Addition
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: appdb
      MYSQL_USER: admin
      MYSQL_PASSWORD: admin
    ports:
      - "3306:3306"
    volumes:
      - ./backend/DATABASE_SCHEMA.sql:/docker-entrypoint-initdb.d/01-schema.sql
      - ./backend/init-db.sql:/docker-entrypoint-initdb.d/02-init.sql
      - mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:5.2
    environment:
      PMA_HOST: mysql
      PMA_USER: admin
      PMA_PASSWORD: admin
    ports:
      - "8081:80"
    depends_on:
      - mysql

volumes:
  mysql_data:
```

### Run with Docker
```bash
docker-compose up -d
```

---

## ✅ DATABASE VERIFICATION CHECKLIST

- [ ] Database `appdb` created
- [ ] User `admin` with password `admin` created
- [ ] All 8 schemas created
- [ ] 20+ tables created
- [ ] 23 scrap items inserted
- [ ] 6 categories inserted
- [ ] Can connect via MySQL CLI
- [ ] Can connect via MySQL Workbench
- [ ] Can view data in phpMyAdmin

---

## 🔍 WHERE IS MY DATA?

### Browse Data with GUI Tools

#### MySQL Workbench
```
1. Connections → ScrapNinja
2. Left panel → Schemas
3. Click scrap_items
4. Right-click tables
5. Select Data in Result Grid
6. View all rows
```

#### phpMyAdmin
```
http://localhost:8081/phpmyadmin
1. Login: admin / admin
2. Left panel → appdb → scrap_items
3. Click 'items' table
4. See all 23 items with prices & descriptions
```

#### MySQL Command Line
```bash
mysql -u admin -p appdb

# Show all items
SELECT id, name, price_per_unit, unit, emoji FROM scrap_items.items;

# Show categories
SELECT * FROM scrap_items.categories;

# Count records
SELECT COUNT(*) as total_items FROM scrap_items.items;
```

---

## 🆘 TROUBLESHOOTING

### "Connection refused" error
```bash
# Check if MySQL is running
mysql --version

# Start MySQL
brew services start mysql
# or
systemctl start mysql

# Test connection
mysql -u admin -p -e "SELECT 1"
```

### "Access denied for user 'admin'"
```bash
# Verify user exists
mysql -u root -p -e "SELECT user FROM mysql.user;"

# Reset password
mysql -u root -p -e "ALTER USER 'admin'@'localhost' IDENTIFIED BY 'admin';"
```

### "Database doesn't exist"
```bash
# Verify database
mysql -u root -p -e "SHOW DATABASES;"

# Create if missing
mysql -u root -p -e "CREATE DATABASE appdb;"
```

### Spring Boot won't start
```bash
# Check port 8085 is free
lsof -i :8085

# Kill if needed
kill -9 <PID>

# Check logs
tail -f logs/scrap-items-service.log
```

---

## 📊 SAMPLE DATA INCLUDED

### 23 Scrap Items Pre-loaded:

**Paper (3 items):**
- Newspapers (5 AED/kg)
- Cardboard Boxes (8 AED/kg)
- Paper Waste (4 AED/kg)

**Plastic (3 items):**
- Plastic Bottles (10 AED/kg)
- Plastic Bags (8 AED/kg)
- Plastic Containers (12 AED/kg)

**Metals (4 items):**
- Aluminum Cans (60 AED/kg)
- Copper Wire (350 AED/kg)
- Steel Scrap (15 AED/kg)

**E-Waste (5 items):**
- TV (2000 AED)
- Laptop (1500 AED)
- Mobile Phone (500 AED)
- Desktop PC (1800 AED)
- Monitor (600 AED)

**Appliances (4 items):**
- AC Unit (2500 AED)
- Refrigerator (3000 AED)
- Washing Machine (2800 AED)
- Microwave (800 AED)

**Vehicles (3 items):**
- Old Car (15000 AED)
- Motorcycle (5000 AED)
- Bicycle (300 AED)

---

## 🎯 NEXT STEPS

1. ✅ Database created and visible
2. ✅ Scrap items service created
3. ✅ API endpoints ready
4. ⏳ Connect frontend to backend
5. ⏳ Create vendor onboarding service backend
6. ⏳ Create rider onboarding service backend
7. ⏳ Implement authentication
8. ⏳ Add email notifications
9. ⏳ Deploy to production

---

Generated: 2024 | ScrapNinja Backend Infrastructure
