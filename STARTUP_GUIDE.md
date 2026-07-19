# 🚀 ScrapNinja - Complete Startup Guide

**Date:** 2026-07-13  
**Status:** Ready for startup

---

## 📊 CURRENT SYSTEM STATUS

### ✅ Already Running
- **Frontend:** http://localhost:3001 (Next.js dev server)
- **Mock API:** http://localhost:8080 (Node.js test server)
- **Vendor Login:** http://localhost:3001/vendor-login ✅ READY

### ⏳ Ready to Start
- **PostgreSQL:** Docker container (config ready)
- **Redis:** Docker container (config ready)
- **Kafka:** Docker container (config ready)
- **Backend Services:** 8 microservices (maven ready)

---

## 🎯 STARTUP SEQUENCE

### STEP 1: Verify Current Services
```bash
# Check frontend
curl http://localhost:3001

# Check mock API
curl http://localhost:8080/api/scrap-items

# Expected: Both return responses (frontend returns HTML, API returns JSON)
```

### STEP 2: Start Docker Infrastructure
```bash
# Navigate to project root
cd c:\Users\nalin\Desktop\scapninja

# Start all services
docker-compose up -d

# Verify services are running
docker-compose ps

# Expected output:
# NAME                 STATUS
# scrapninja-postgres  Up
# scrapninja-redis     Up
# scrapninja-zookeeper Up
# scrapninja-kafka     Up
```

### STEP 3: Initialize Database
```bash
# Wait for PostgreSQL to be healthy (30 seconds)
# Then verify database is initialized

# Using psql (if installed):
psql -h localhost -U admin -d appdb

# Then check tables:
SELECT * FROM information_schema.tables WHERE table_schema = 'scrap_items';

# Expected: 4 tables (categories, items, user_listings, transactions)
```

### STEP 4: Build Backend Services
```bash
# Navigate to backend
cd backend

# Clean build
mvn clean install -DskipTests

# Expected: BUILD SUCCESS
```

### STEP 5: Start Backend Microservices

**Option A: Individual Services (Terminal per service)**

```bash
# Terminal 1: API Gateway
cd backend/api-gateway
mvn spring-boot:run

# Terminal 2: Auth Service
cd backend/auth-service
mvn spring-boot:run

# Terminal 3: Scrap Items Service (Main)
cd backend/scrap-items-service
mvn spring-boot:run

# Terminal 4: Pickup Service
cd backend/pickup-service
mvn spring-boot:run

# Terminal 5: Pricing Service
cd backend/pricing-service
mvn spring-boot:run

# Terminal 6: Location Service
cd backend/location-service
mvn spring-boot:run

# Terminal 7: Enquiry Service
cd backend/enquiry-service
mvn spring-boot:run

# Terminal 8: Vendor Onboarding Service
cd backend/vendor-onboarding-service
mvn spring-boot:run
```

**Option B: All Services in One (Production Recommended)**

```bash
# Build all
mvn clean install -DskipTests

# Then use Docker to run all services:
docker-compose up -d --scale api-gateway=1 --scale auth-service=1
# (requires Docker setup for Java apps)
```

### STEP 6: Verify All Services Are Running
```bash
# Check all service health endpoints
for port in 8080 8081 8082 8083 8084 8085 8086 8087 8089 8090; do
  echo "Port $port:"
  curl -s http://localhost:$port/actuator/health | jq '.status'
done

# Expected: All return "UP"
```

### STEP 7: Test Complete Integration
```bash
# Test scrap items API
curl http://localhost:8085/api/categories | jq '.'

curl http://localhost:8085/api/scrap-items | jq '.content[0:3]'

# Test auth
curl -X POST http://localhost:8081/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"vendor@scrapninja.com","password":"Vendor@123"}'

# Expected: Returns token and user info
```

---

## 🔌 SERVICE PORTS REFERENCE

```
8080  → API Gateway (main entry point)
8081  → Auth Service
8082  → (reserved)
8083  → Rider Onboarding Service
8084  → Pickup Service
8085  → Scrap Items Service ⭐ PRIMARY
8086  → Pricing Service
8087  → Vendor Onboarding Service
8089  → Location Service
8090  → Enquiry Service

3001  → Frontend (Next.js)
3000  → Reserved (VisionGuard)
5432  → PostgreSQL
6379  → Redis
2181  → Zookeeper
9092  → Kafka
```

---

## 🌐 SYSTEM ENDPOINTS

### Frontend URLs
```
Homepage:          http://localhost:3001
Scrap Items:       http://localhost:3001/scrap-items
Vendor Dashboard:  http://localhost:3001/vendor-dashboard
Vendor Login:      http://localhost:3001/vendor-login ✅
Cart:              http://localhost:3001/cart
Checkout:          http://localhost:3001/checkout
```

### API URLs
```
Categories:        http://localhost:8085/api/categories
Items:             http://localhost:8085/api/scrap-items
Auth Login:        http://localhost:8081/api/auth/login
Health Check:      http://localhost:8080/actuator/health
All Services:      http://localhost:8080 (gateway routes to services)
```

### Database
```
Host:     localhost
Port:     5432
Database: appdb
User:     admin
Password: admin123
```

---

## ✅ QUICK TEST CHECKLIST

After all services are running, verify:

```
[ ] Frontend loads at http://localhost:3001
[ ] Mock API responds at http://localhost:8080/api/scrap-items
[ ] PostgreSQL database is connected (docker-compose ps shows healthy)
[ ] Backend services are running (all 8 ports respond)
[ ] Categories load: curl http://localhost:8085/api/categories
[ ] Items load: curl http://localhost:8085/api/scrap-items
[ ] Login works: POST to http://localhost:8081/api/auth/login
[ ] Vendor page loads: http://localhost:3001/vendor-login
[ ] Form accepts input and submission works
[ ] No console errors in browser (F12)
```

---

## 🛠️ TROUBLESHOOTING

### Frontend Not Loading
```bash
# Check if it's running
netstat -ano | findstr :3001

# Restart frontend
cd frontend
npm run dev
```

### Backend Service Won't Start
```bash
# Check port is available
netstat -ano | findstr :8085

# Check Java is installed
java -version

# Check Maven
mvn -version

# If port is in use, kill process:
taskkill /PID {PID} /F
```

### PostgreSQL Connection Failed
```bash
# Check Docker is running
docker ps

# Check container health
docker-compose ps postgres

# Check logs
docker-compose logs postgres

# Restart container
docker-compose restart postgres
```

### API Returns 404
```bash
# Verify service is running
curl http://localhost:8085/actuator/health

# Check if data loaded
curl http://localhost:8085/api/scrap-items

# If no data, check database:
# psql -h localhost -U admin -d appdb
# SELECT COUNT(*) FROM scrap_items.items;
```

---

## 📋 STARTUP CHECKLIST

**Pre-Startup:**
- [ ] Docker Desktop installed
- [ ] Docker daemon running
- [ ] Node.js 18+ installed
- [ ] Java 11+ installed
- [ ] Maven installed
- [ ] No services running on ports 3001, 5432, 6379, 8080-8090

**During Startup:**
- [ ] docker-compose up -d (start database & cache)
- [ ] Wait 30 seconds for PostgreSQL health
- [ ] cd backend && mvn clean install -DskipTests
- [ ] Start 8 backend services (or use Docker)
- [ ] Verify all health endpoints
- [ ] Test API endpoints with curl

**Post-Startup:**
- [ ] Frontend loads at http://localhost:3001
- [ ] API responds at http://localhost:8085
- [ ] Vendor login page works
- [ ] Database contains 43 items
- [ ] No error logs in console

---

## 🎯 NEXT ACTIONS

1. **Immediate (Next 2 minutes)**
   ```bash
   # Verify current services
   curl http://localhost:3001
   curl http://localhost:8080/api/scrap-items
   ```

2. **Short-term (Next 5 minutes)**
   ```bash
   # Start Docker infrastructure
   docker-compose up -d
   docker-compose ps
   ```

3. **Medium-term (Next 10 minutes)**
   ```bash
   # Build and start backend
   cd backend
   mvn clean install -DskipTests
   ```

4. **Verification (Next 5 minutes)**
   ```bash
   # Test all services
   curl http://localhost:8085/api/categories
   curl http://localhost:3001/vendor-login
   ```

---

## 📊 EXPECTED RESULTS

### Frontend
```
✅ http://localhost:3001 → ScrapNinja homepage loads
✅ http://localhost:3001/vendor-login → Enterprise login page displays
✅ Form accepts vendor@scrapninja.com / Vendor@123
✅ All CSS styling appears correctly
✅ No console errors
```

### Backend
```
✅ All 8 services respond to health checks
✅ http://localhost:8085/api/categories → Returns 9 categories
✅ http://localhost:8085/api/scrap-items → Returns 43 items with pricing
✅ POST /api/auth/login → Returns JWT token
✅ Database queries execute in < 500ms
```

### Database
```
✅ PostgreSQL healthy and accepting connections
✅ 6 schemas created (auth, pickup, pricing, location, enquiry, scrap_items)
✅ 4 tables in scrap_items schema with 43 items
✅ All foreign key relationships valid
✅ Redis cache responding
```

---

## 📞 SUPPORT

For detailed testing procedures, see:
- `BACKEND_DATABASE_TESTING_GUIDE.md` - SQL & API tests
- `BACKEND_DATABASE_TEST_REPORT.md` - Infrastructure verification
- `MICROSERVICES_API_REFERENCE.md` - Complete API documentation

---

## 🎉 SUCCESS INDICATORS

**System is fully operational when:**
1. ✅ Frontend responds on port 3001
2. ✅ All 8 backend services responding on their ports
3. ✅ PostgreSQL database connected with 43 items
4. ✅ Vendor login page loads and form works
5. ✅ API endpoints return data from database
6. ✅ No errors in browser console or backend logs

---

**READY TO START? Follow STEP 1 above** → [Start Here](#-startup-sequence)

*ScrapNinja Complete Startup Guide* ✅
