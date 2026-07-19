# 🧪 Backend & Database - Technical Testing Guide

## 📡 API ENDPOINT TESTING

### 1. Mock API Server (Currently Running)
**Status:** ✅ Active on http://localhost:8080

#### Test Endpoints

**A. Authentication Endpoints**
```bash
# Login with demo credentials
curl -X POST http://localhost:8080/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vendor@scrapninja.com",
    "password": "Vendor@123"
  }'

# Expected Response:
# {
#   "token": "token-XXXXX",
#   "user": {
#     "id": "vendor-001",
#     "email": "vendor@scrapninja.com",
#     "companyName": "EcoScrap Inc.",
#     "role": "vendor"
#   },
#   "refreshToken": "refresh-token-XXXXX"
# }
```

**B. Scrap Items Endpoints**
```bash
# Get all scrap items
curl http://localhost:8080/scrap-items-service/api/scrap-items

# Get all categories
curl http://localhost:8080/scrap-items-service/api/categories

# Search items
curl http://localhost:8080/api/items?category=Paper
curl http://localhost:8080/api/items?query=copper
```

#### Frontend Testing
```bash
# Test from browser console
# 1. Open http://localhost:3001/scrap-items
# 2. Open DevTools (F12)
# 3. Network tab shows API calls
# 4. Check responses from:
#    - /api/scrap-items (items list)
#    - /api/categories (category filter)
```

---

## 🗄️ DATABASE TESTING

### 1. Database Connection Test

**PostgreSQL Connection Details:**
```
Host:     localhost
Port:     5432
Database: appdb
User:     admin
Password: admin123
```

**Connect using psql (when Docker is running):**
```bash
# Connect to database
psql -h localhost -U admin -d appdb

# List schemas
\dn

# List tables in scrap_items schema
\dt scrap_items.*

# Show table structure
\d scrap_items.items

# Count items
SELECT COUNT(*) FROM scrap_items.items;
SELECT COUNT(*) FROM scrap_items.categories;
```

### 2. SQL Query Tests

**Test Data Integrity:**
```sql
-- Count all items
SELECT COUNT(*) as total_items FROM scrap_items.items;
-- Expected: 43

-- Count categories
SELECT COUNT(*) as total_categories FROM scrap_items.categories;
-- Expected: 9

-- Get items by category
SELECT i.id, i.name, c.name as category, i.price_per_unit
FROM scrap_items.items i
JOIN scrap_items.categories c ON i.category_id = c.id
WHERE c.name = 'E-Waste'
ORDER BY i.name;
-- Expected: 10 rows

-- Get most expensive items
SELECT name, price_per_unit, unit
FROM scrap_items.items
ORDER BY price_per_unit DESC
LIMIT 10;
-- Expected: Air Conditioners ($50), Vendor onboarding ($50), etc.

-- Get hazardous items
SELECT name, environmental_warning, badge
FROM scrap_items.items
WHERE badge = 'Hazard'
ORDER BY name;
-- Expected: ~10 hazardous items

-- Check foreign key integrity
SELECT i.id, i.name, c.id, c.name
FROM scrap_items.items i
LEFT JOIN scrap_items.categories c ON i.category_id = c.id
WHERE c.id IS NULL;
-- Expected: 0 rows (no orphaned items)
```

### 3. Database Performance

**Test Query Performance:**
```sql
-- Explain plan for item lookup
EXPLAIN ANALYZE
SELECT * FROM scrap_items.items 
WHERE is_active = true 
ORDER BY price_per_unit DESC;

-- Check index usage
SELECT * FROM scrap_items.items 
WHERE category_id = 1;
-- Should use idx_items_category

-- Active items query
SELECT * FROM scrap_items.items 
WHERE is_active = true;
-- Should use idx_items_active
```

---

## 🔧 JAVA MICROSERVICES TESTING

### 1. Build Testing

**Test Backend Compilation:**
```bash
# Navigate to backend
cd c:\Users\nalin\Desktop\scapninja\backend

# Clean build
mvn clean

# Build all modules
mvn install -DskipTests

# Build specific service
mvn clean install -pl scrap-items-service -DskipTests

# Check for compilation errors
mvn compile
```

### 2. Service Health Checks

**When services are running (after Docker setup):**
```bash
# API Gateway health
curl http://localhost:8080/actuator/health

# Auth Service health
curl http://localhost:8081/actuator/health

# Scrap Items Service health
curl http://localhost:8085/actuator/health

# Pickup Service health
curl http://localhost:8084/actuator/health
```

### 3. Integration Tests

**Test real API (when backend is deployed):**
```bash
# Get all categories
curl http://localhost:8085/api/categories

# Response should include:
# [
#   {
#     "id": 1,
#     "name": "Paper",
#     "description": "...",
#     "emoji": "📄"
#   },
#   ...
# ]

# Get items by category
curl http://localhost:8085/api/scrap-items/category/1

# Get single item
curl http://localhost:8085/api/scrap-items/1

# Response should include pricing, environmental warnings, etc.
```

---

## 🎯 FRONTEND INTEGRATION TESTING

### 1. Environment Configuration Test

**Check .env.local:**
```bash
cd c:\Users\nalin\Desktop\scapninja\frontend
cat .env.local
# Should show:
# NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### 2. Component Integration Test

**Test in browser (http://localhost:3001):**

1. **Scrap Items Page:**
   - ✅ Load http://localhost:3001/scrap-items
   - ✅ Verify 43 items display
   - ✅ Verify 9 categories show
   - ✅ Check filtering works
   - ✅ Verify prices display correctly (USD/AED)
   - ✅ Check environmental warnings appear
   - ✅ Test search functionality

2. **Vendor Login Page:** (NEW)
   - ✅ Load http://localhost:3001/vendor-login
   - ✅ Enter: vendor@scrapninja.com
   - ✅ Enter: Vendor@123
   - ✅ Click Sign In
   - ✅ Should show loading spinner
   - ✅ Should redirect to /vendor-dashboard

3. **Cart & Checkout:**
   - ✅ Add items to cart
   - ✅ Update quantities
   - ✅ Remove items
   - ✅ Verify localStorage persistence
   - ✅ Proceed to checkout
   - ✅ Check vendor balance deduction

---

## 📊 DATA VALIDATION TESTS

### 1. Item Data Validation

```sql
-- Check all items have categories
SELECT COUNT(*) as orphaned_items
FROM scrap_items.items
WHERE category_id IS NULL;
-- Expected: 0

-- Check all items have valid prices
SELECT COUNT(*) as invalid_prices
FROM scrap_items.items
WHERE price_per_unit <= 0;
-- Expected: 0

-- Check all items have descriptions
SELECT COUNT(*) as missing_descriptions
FROM scrap_items.items
WHERE description IS NULL OR description = '';
-- Expected: 0

-- Verify unit types
SELECT DISTINCT unit FROM scrap_items.items ORDER BY unit;
-- Expected: 'kg', 'unit'

-- Check recyclable status
SELECT 
  SUM(CASE WHEN is_recyclable = true THEN 1 ELSE 0 END) as recyclable,
  SUM(CASE WHEN is_recyclable = false THEN 1 ELSE 0 END) as non_recyclable
FROM scrap_items.items;

-- Check badges
SELECT DISTINCT badge FROM scrap_items.items ORDER BY badge;
-- Expected: 'Standard', 'Premium', 'Caution', 'Hazard'
```

### 2. Category Data Validation

```sql
-- Check category coverage
SELECT 
  c.name,
  COUNT(i.id) as item_count
FROM scrap_items.categories c
LEFT JOIN scrap_items.items i ON c.id = i.category_id
GROUP BY c.name
ORDER BY item_count DESC;

-- Check for duplicate categories
SELECT name, COUNT(*) 
FROM scrap_items.categories 
GROUP BY name 
HAVING COUNT(*) > 1;
-- Expected: 0 duplicates
```

---

## 🚀 DEPLOYMENT READINESS TEST

### Pre-Deployment Checklist

```
STEP 1: Infrastructure
  [ ] Docker installed and running
  [ ] docker-compose available
  [ ] 10 GB disk space available
  [ ] Network ports free: 5432, 6379, 8080-8090, 3001

STEP 2: Database
  [ ] PostgreSQL image pulled
  [ ] Schema SQL files validated
  [ ] Data migration scripts ready
  [ ] Init scripts in docker-entrypoint-initdb.d/

STEP 3: Backend
  [ ] All pom.xml files valid
  [ ] Maven dependencies resolvable
  [ ] Java 11+ available
  [ ] Spring Boot versions compatible
  [ ] Lombok 1.18.38 in all modules

STEP 4: Frontend
  [ ] Node.js 18+ available
  [ ] npm dependencies installed
  [ ] Build successful (npm run build)
  [ ] No TypeScript errors
  [ ] .env.local configured

STEP 5: Testing
  [ ] Mock API working
  [ ] Frontend loads
  [ ] API calls successful
  [ ] Database queries fast
  [ ] No console errors
```

---

## 🔍 MONITORING & LOGGING

### 1. Service Logs

**Check logs when running:**
```bash
# Docker compose logs
docker-compose logs -f postgres
docker-compose logs -f redis
docker-compose logs -f api-gateway
docker-compose logs -f scrap-items-service

# Spring Boot application logs
tail -f backend/scrap-items-service/target/scrap-items-service-1.0.0.jar.log
```

### 2. Performance Monitoring

**Check database performance:**
```sql
-- Show slow queries (PostgreSQL)
SELECT query, calls, total_time, mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;

-- Monitor active connections
SELECT datname, count(*) 
FROM pg_stat_activity 
GROUP BY datname;

-- Check index usage
SELECT schemaname, tablename, indexname, idx_scan
FROM pg_stat_user_indexes
ORDER BY idx_scan ASC;
```

### 3. Resource Monitoring

```bash
# Monitor Docker resources
docker stats --no-stream

# Check PostgreSQL connections
SELECT count(*) FROM pg_stat_activity;

# Monitor Redis memory
redis-cli INFO memory

# Check Kafka topics
kafka-topics --list --zookeeper localhost:2181
```

---

## 🧮 PERFORMANCE BENCHMARKS

### Expected Response Times

| Endpoint | Expected Time | Notes |
|----------|---------------|-------|
| GET /api/scrap-items | 100-200ms | All 43 items |
| GET /api/categories | 50-100ms | All 9 categories |
| GET /api/items?search=X | 150-300ms | Indexed search |
| POST /auth/login | 100-150ms | Token generation |
| GET /actuator/health | 10-20ms | Service health |

### Load Testing (future)

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:8085/api/scrap-items

# Using wrk
wrk -t12 -c400 -d30s http://localhost:8085/api/scrap-items
```

---

## ✅ FINAL VERIFICATION SCRIPT

```bash
#!/bin/bash
# Backend & Database Verification Script

echo "=== ScrapNinja Backend & Database Verification ==="
echo ""

# Check Docker
echo "1. Checking Docker..."
docker --version && echo "✅ Docker available" || echo "❌ Docker not installed"

# Check Maven
echo ""
echo "2. Checking Maven..."
mvn --version && echo "✅ Maven available" || echo "❌ Maven not installed"

# Check Java
echo ""
echo "3. Checking Java..."
java -version && echo "✅ Java available" || echo "❌ Java not installed"

# Check Node
echo ""
echo "4. Checking Node.js..."
node --version && echo "✅ Node available" || echo "❌ Node not installed"

# Check PostgreSQL psql
echo ""
echo "5. Checking PostgreSQL client..."
psql --version && echo "✅ psql available" || echo "⚠️ psql not installed (optional)"

# Check backend structure
echo ""
echo "6. Checking backend structure..."
test -f backend/pom.xml && echo "✅ Backend pom.xml found" || echo "❌ Backend pom.xml missing"
test -d backend/scrap-items-service && echo "✅ Scrap items service found" || echo "❌ Scrap items service missing"

# Check database files
echo ""
echo "7. Checking database files..."
test -f backend/scrap-items-schema.sql && echo "✅ Scrap items schema found" || echo "❌ Schema missing"
test -f docker-compose.yml && echo "✅ Docker compose found" || echo "❌ Docker compose missing"

# Check frontend
echo ""
echo "8. Checking frontend..."
test -d frontend && echo "✅ Frontend directory found" || echo "❌ Frontend missing"
test -f frontend/package.json && echo "✅ Frontend package.json found" || echo "❌ Frontend package.json missing"

echo ""
echo "=== Verification Complete ==="
```

---

## 📝 NEXT STEPS

1. **Start Docker Infrastructure**
   ```bash
   docker-compose up -d
   docker-compose ps
   ```

2. **Deploy Backend Services**
   ```bash
   cd backend
   mvn clean install -DskipTests
   ```

3. **Run Integration Tests**
   ```bash
   # Test database
   psql -h localhost -U admin -d appdb
   
   # Run test queries
   SELECT COUNT(*) FROM scrap_items.items;
   ```

4. **Verify Frontend Connection**
   ```bash
   curl http://localhost:8085/api/scrap-items
   curl http://localhost:8085/api/categories
   ```

5. **Load Test (Optional)**
   ```bash
   ab -n 100 -c 10 http://localhost:8085/api/scrap-items
   ```

---

*Backend & Database Testing Guide - Complete* ✅
