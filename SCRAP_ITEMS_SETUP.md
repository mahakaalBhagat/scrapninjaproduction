# ScrapNinja Scrap Items Module - Complete Setup Guide

## 📋 Overview

This guide walks you through setting up the complete Scrap Items marketplace module with database, backend REST API, and frontend React components.

**Components:**
- ✅ PostgreSQL Database (23 scrap items across 6 categories)
- ✅ Spring Boot REST API (8+ endpoints)
- ✅ React/Next.js Frontend (interactive UI with real data)

---

## 🗄️ Database Setup

### Prerequisites
- Docker and Docker Compose running
- PostgreSQL 14 accessible at `localhost:5432`

### Step 1: Initialize Database Schema

```bash
# Navigate to backend directory
cd backend

# Execute the schema script
psql -U admin -d appdb -f scrap-items-schema.sql
```

**Expected Output:**
```
Categories created: 6
Items created: 23
```

**Credentials (from docker-compose.yml):**
- Host: localhost:5432
- Database: appdb
- Username: admin
- Password: admin123

### Verify with DBeaver:
1. Open DBeaver → New Database Connection → PostgreSQL
2. Host: `localhost`, Port: `5432`, Database: `appdb`
3. Username: `admin`, Password: `admin123`
4. Click "Finish" → Browse `scrap_items` schema
5. Verify tables: `categories`, `items`, `user_listings`, `transactions`

---

## 🔧 Backend API Setup

### Project Structure
```
backend/scrap-items-service/
├── pom.xml                    (Maven dependencies)
├── src/main/
│   ├── java/com/scrapninja/scrapitems/
│   │   ├── ScrapItemsServiceApplication.java  (Main entry point)
│   │   ├── entity/
│   │   │   ├── Category.java                  (JPA entity)
│   │   │   └── ScrapItem.java                 (JPA entity)
│   │   ├── repository/
│   │   │   ├── CategoryRepository.java        (Data access)
│   │   │   └── ScrapItemRepository.java
│   │   ├── service/
│   │   │   └── ScrapItemService.java          (Business logic)
│   │   ├── controller/
│   │   │   ├── ScrapItemController.java       (REST endpoints)
│   │   │   └── CategoryController.java
│   │   └── dto/
│   │       └── ScrapItemDTO.java              (Data transfer object)
│   └── resources/
│       └── application.yml                    (Configuration)
```

### Step 1: Build Backend Service

```bash
# From project root
cd backend

# Build all microservices (including scrap-items-service)
mvn clean install -DskipTests

# Or build only scrap-items-service
cd scrap-items-service
mvn clean package -DskipTests
```

### Step 2: Run Backend Service

```bash
# Option 1: Via Maven
cd backend/scrap-items-service
mvn spring-boot:run

# Option 2: Via Java
java -jar target/scrap-items-service-1.0.0.jar
```

**Expected Output:**
```
2024-XX-XX 10:XX:XX.XXX INFO ... ScrapItemsServiceApplication : 
Started ScrapItemsServiceApplication in X.XXX seconds
```

**Service Available at:** `http://localhost:8085`

### Step 3: Test Backend Endpoints

Using curl or Postman:

```bash
# Get all scrap items
curl http://localhost:8085/scrap-items-service/api/scrap-items

# Get all categories
curl http://localhost:8085/scrap-items-service/api/categories

# Get items by category (ID 1 = Paper)
curl http://localhost:8085/scrap-items-service/api/scrap-items/category/1

# Search items
curl "http://localhost:8085/scrap-items-service/api/scrap-items/search?query=plastic"

# Get single item
curl http://localhost:8085/scrap-items-service/api/scrap-items/1
```

---

## 🎨 Frontend Setup

### Configuration

The frontend is already configured in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:8085
NEXT_PUBLIC_APP_NAME=ScrapNinja
NEXT_PUBLIC_APP_DESCRIPTION=Smart Scrap Collection Platform
```

### Step 1: Install Dependencies

```bash
cd frontend
npm install
```

### Step 2: Start Development Server

```bash
# From frontend directory
npm run dev

# Or
yarn dev
```

**Frontend Available at:** `http://localhost:3000`

### Step 3: View Scrap Items Marketplace

1. Open browser → `http://localhost:3000`
2. Navigate to **Scrap Items** or **Marketplace** section
3. You should see:
   - ✅ 23 real scrap items from PostgreSQL database
   - ✅ Grouped by 6 categories (Paper, Plastic, Metals, E-Waste, Appliances, Vehicles)
   - ✅ Real pricing data (4-15000 AED)
   - ✅ Environmental warning messages on hover
   - ✅ Category filtering
   - ✅ Search functionality

---

## 📊 Available Data

### 6 Categories
1. **Paper** (📰) - 3 items
2. **Plastic** (🍾) - 3 items
3. **Metals** (⚙️) - 4 items
4. **E-Waste** (💻) - 6 items
5. **Appliances** (🌬️) - 4 items
6. **Vehicles** (🚗) - 3 items

**Total: 23 scrap items**

### Sample Items

| Category | Item | Price | Unit |
|----------|------|-------|------|
| Paper | Newspapers | 5 AED | kg |
| Paper | Cardboard Boxes | 8 AED | kg |
| Plastic | Plastic Bottles | 10 AED | kg |
| Metals | Aluminum Cans | 60 AED | kg |
| Metals | Copper Wire | 350 AED | kg |
| E-Waste | Television | 2000 AED | unit |
| E-Waste | Laptop | 1500 AED | unit |
| Appliances | AC Unit | 2500 AED | unit |
| Vehicles | Old Car | 15000 AED | unit |

---

## 🚀 Complete Startup Sequence

### Terminal 1 - PostgreSQL (already running via docker-compose)
```bash
# Verify database is running
docker-compose ps
```

### Terminal 2 - Backend Service
```bash
cd backend/scrap-items-service
mvn spring-boot:run
```

### Terminal 3 - Frontend Development Server
```bash
cd frontend
npm run dev
```

### Terminal 4 - Browser
```
Visit: http://localhost:3000/scrap-items
```

---

## 🔗 API Endpoints Reference

### GET Endpoints
```
GET  /api/scrap-items                         # All items
GET  /api/scrap-items/{id}                    # Single item by ID
GET  /api/scrap-items/category/{categoryId}   # Items by category
GET  /api/scrap-items/search?query=VALUE      # Search items
GET  /api/categories                          # All categories
GET  /api/categories/{id}                     # Single category
```

### POST Endpoints (Admin)
```
POST /api/scrap-items                         # Create new item
```

### PUT Endpoints (Admin)
```
PUT  /api/scrap-items/{id}                    # Update item
```

### DELETE Endpoints (Admin)
```
DELETE /api/scrap-items/{id}                  # Delete item
```

---

## 🐛 Troubleshooting

### Backend won't start
```
Error: java.sql.SQLException: Unable to get a connection
```
**Solution:** 
- Verify PostgreSQL is running: `docker-compose ps`
- Check credentials in `application.yml`
- Verify schema created: `psql -U admin -d appdb -c "\dn"`

### Frontend shows no items
```
Error: Failed to fetch items
```
**Solution:**
- Verify backend is running on port 8085: `curl http://localhost:8085`
- Check `.env.local` has correct `NEXT_PUBLIC_API_URL`
- Check browser console for CORS errors
- Restart frontend: `npm run dev`

### "Schema not found" error
**Solution:**
- Execute schema script: `psql -U admin -d appdb -f backend/scrap-items-schema.sql`
- Verify with: `psql -U admin -d appdb -c "SELECT * FROM scrap_items.categories;"`

### Database connection refused
**Solution:**
```bash
# Check if PostgreSQL container is running
docker-compose ps

# If not running, start it
docker-compose up -d

# Verify connection
psql -U admin -h localhost -d appdb -c "SELECT 1"
```

---

## ✅ Verification Checklist

- [ ] PostgreSQL running and accessible
- [ ] Schema created with 6 categories and 23 items
- [ ] Backend service running on port 8085
- [ ] Backend endpoints respond with JSON data
- [ ] Frontend running on port 3000
- [ ] Scrap items page displays all 23 items
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Environmental warnings display on hover
- [ ] Pricing data displays correctly

---

## 📝 Next Steps

1. **User Listings Module** - Allow users to post scrap items for sale
2. **Cart/Checkout System** - Implement purchase workflow
3. **Payment Integration** - Add payment processing
4. **Review & Rating System** - Add buyer/seller feedback
5. **Admin Dashboard** - Manage items and categories
6. **Notification System** - Alert users of relevant items

---

## 💬 Support

For issues or questions:
1. Check logs in `backend/logs/scrap-items-service.log`
2. Review browser console in frontend
3. Run database verification: `psql -U admin -d appdb -c "SELECT * FROM scrap_items.items LIMIT 5;"`

---

**Version:** 1.0.0  
**Last Updated:** 2024  
**Status:** ✅ Production Ready
