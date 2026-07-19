# 🏗️ ScrapNinja Microservices - Complete API Reference

## 📋 Overview

**Total Services:** 8 microservices  
**Architecture:** Spring Boot 3.x with Spring Cloud  
**Communication:** REST API (HTTP/JSON)  
**Database:** PostgreSQL 14 (shared appdb with multiple schemas)  
**Message Queue:** Kafka (async events)  
**Cache:** Redis (session & caching)  

---

## 🌉 1. API GATEWAY (Port 8080)

**Purpose:** Unified entry point for all backend services  
**Framework:** Spring Cloud Gateway  
**Status:** ✅ Core infrastructure

### Configuration
```yaml
Server Port: 8080
Context Path: /
Service Discovery: Eureka (optional)
Rate Limiting: Configurable
Request Timeout: 30 seconds
```

### Responsibilities
- ✅ Route requests to appropriate microservices
- ✅ Load balancing across service instances
- ✅ Authentication token validation
- ✅ Rate limiting and throttling
- ✅ Request/response logging
- ✅ CORS headers management

### Future Endpoints
```
/api/auth/**              → Routes to auth-service:8081
/api/scrap-items/**       → Routes to scrap-items-service:8085
/api/pickup/**            → Routes to pickup-service:8084
/api/pricing/**           → Routes to pricing-service:8086
/api/location/**          → Routes to location-service:8089
/api/enquiry/**           → Routes to enquiry-service:8090
/api/vendor/**            → Routes to vendor-onboarding-service:8087
/api/rider/**             → Routes to rider-onboarding-service:8083
/actuator/health          → Gateway health check
```

---

## 🔐 2. AUTH SERVICE (Port 8081)

**Purpose:** User authentication and token management  
**Database Schema:** `auth`  
**Status:** ✅ Core infrastructure

### Database Tables
```sql
CREATE TABLE auth.users (
  id BIGINT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  user_type VARCHAR(50),        -- HOUSEHOLD, BUSINESS, COLLECTOR, VENDOR
  is_active BOOLEAN,
  created_at TIMESTAMP
);

CREATE TABLE auth.tokens (
  id BIGINT PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  token VARCHAR(500),            -- JWT token
  refresh_token VARCHAR(500),
  expires_at TIMESTAMP,
  created_at TIMESTAMP
);

CREATE TABLE auth.user_roles (
  id BIGINT PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  role VARCHAR(50)              -- ADMIN, USER, VENDOR, COLLECTOR
);
```

### API Endpoints

**Authentication**
```
POST   /api/auth/register
       Request:  { email, password, firstName, lastName, userType }
       Response: { user, token, refreshToken }
       Status:   201 Created

POST   /api/auth/login
       Request:  { email, password }
       Response: { user, token, refreshToken }
       Status:   200 OK

POST   /api/auth/refresh
       Request:  { refreshToken }
       Response: { token, refreshToken }
       Status:   200 OK

POST   /api/auth/logout
       Request:  { userId, token }
       Response: { message: "Logged out" }
       Status:   200 OK

POST   /api/auth/verify-email
       Request:  { email, otp }
       Response: { verified: true }
       Status:   200 OK
```

### Security
- ✅ JWT-based authentication
- ✅ Bcrypt password hashing
- ✅ Refresh token rotation
- ✅ Token expiry management (15 min)
- ✅ Email verification flow

---

## 📦 3. SCRAP ITEMS SERVICE (Port 8085) ⭐ PRIMARY

**Purpose:** Scrap marketplace - items listing, categories, transactions  
**Database Schema:** `scrap_items`  
**Status:** ✅ COMPLETE & OPERATIONAL

### Database Tables
```sql
-- Categories (9 total)
CREATE TABLE scrap_items.categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description TEXT,
  emoji VARCHAR(10),
  is_active BOOLEAN
);

-- Items (43 total)
CREATE TABLE scrap_items.items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  category_id INTEGER REFERENCES categories(id),
  price_per_unit DECIMAL(10,2),
  unit VARCHAR(50),              -- 'kg' or 'unit'
  image_url VARCHAR(255),
  emoji VARCHAR(10),
  is_recyclable BOOLEAN,
  environmental_warning TEXT,
  badge VARCHAR(50),             -- Standard, Premium, Caution, Hazard
  is_active BOOLEAN
);

-- User Listings
CREATE TABLE scrap_items.user_listings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  item_id INTEGER REFERENCES items(id),
  quantity DECIMAL(10,2),
  unit VARCHAR(50),
  location VARCHAR(255),
  latitude DECIMAL(10,8),
  longitude DECIMAL(10,8),
  status VARCHAR(50),            -- AVAILABLE, PENDING, SOLD
  created_at TIMESTAMP
);

-- Transactions
CREATE TABLE scrap_items.transactions (
  id SERIAL PRIMARY KEY,
  seller_id INTEGER,
  buyer_id INTEGER,
  item_id INTEGER REFERENCES items(id),
  quantity DECIMAL(10,2),
  unit_price DECIMAL(10,2),
  total_price DECIMAL(10,2),
  status VARCHAR(50),            -- PENDING, CONFIRMED, COMPLETED, CANCELLED
  payment_status VARCHAR(50),
  rating INTEGER,
  review TEXT,
  created_at TIMESTAMP
);
```

### API Endpoints

**Categories**
```
GET    /api/categories
       Response: [
         { id: 1, name: "Paper", emoji: "📄", description: "..." },
         { id: 2, name: "Plastic", emoji: "♻️", ... },
         ...
       ]
       Status: 200 OK

GET    /api/categories/{id}
       Response: { id, name, description, emoji, itemCount }
       Status: 200 OK
```

**Items**
```
GET    /api/scrap-items
       Response: [
         {
           id: 1,
           name: "Cardboard Boxes",
           categoryId: 1,
           pricePerUnit: 2.50,
           unit: "kg",
           emoji: "📦",
           recyclable: true,
           environmentalWarning: "Contains adhesive and ink",
           badge: "Recyclable",
           active: true
         },
         ...
       ]
       Status: 200 OK
       Query Params:
         - page=1 (default)
         - size=20 (default)
         - sort=price (asc|desc)

GET    /api/scrap-items/{id}
       Response: { full item object }
       Status: 200 OK

GET    /api/scrap-items/category/{categoryId}
       Response: [ list of items in category ]
       Status: 200 OK

GET    /api/scrap-items/search?query={query}
       Response: [ matching items ]
       Status: 200 OK

GET    /api/scrap-items/recyclable
       Response: [ only recyclable items ]
       Status: 200 OK

GET    /api/scrap-items/hazardous
       Response: [ only hazardous items ]
       Status: 200 OK
```

**User Listings** (Sell Items)
```
POST   /api/listings
       Request: {
         userId, itemId, quantity, unit, location,
         latitude, longitude, description
       }
       Response: { id, status: "AVAILABLE", ... }
       Status: 201 Created

GET    /api/listings/user/{userId}
       Response: [ user's listings ]
       Status: 200 OK

PUT    /api/listings/{id}
       Request: { quantity, location, status }
       Response: { updated listing }
       Status: 200 OK

DELETE /api/listings/{id}
       Response: { message: "Deleted" }
       Status: 200 OK
```

**Transactions** (Buy Items)
```
POST   /api/transactions
       Request: {
         sellerId, buyerId, itemId, quantity,
         unitPrice, paymentMethod
       }
       Response: { id, status: "PENDING", ... }
       Status: 201 Created

GET    /api/transactions/{id}
       Response: { full transaction }
       Status: 200 OK

GET    /api/transactions/user/{userId}
       Response: [ user's transactions ]
       Status: 200 OK

PUT    /api/transactions/{id}/confirm
       Response: { status: "CONFIRMED" }
       Status: 200 OK

POST   /api/transactions/{id}/rate
       Request: { rating: 4.5, review: "Good quality" }
       Response: { rating, review }
       Status: 200 OK
```

### Data Statistics
- **Categories:** 9
- **Items:** 43
- **Price Range:** $1.25 - $50.00
- **Units:** kg, unit (2 types)
- **Recyclable:** ~70%
- **Hazardous:** ~23%

---

## 🎯 4. PICKUP SERVICE (Port 8084)

**Purpose:** Manages scrap collection pickup scheduling  
**Database Schema:** `pickup`  
**Status:** ✅ Infrastructure ready

### API Endpoints
```
POST   /api/pickup-requests
       Request: { userId, addressId, items[], scheduledDate }
       Response: { id, status: "PENDING", ... }

GET    /api/pickup-requests/{id}
       Response: { full request }

PUT    /api/pickup-requests/{id}/assign
       Request: { collectorId }
       Response: { status: "ASSIGNED" }

PUT    /api/pickup-requests/{id}/complete
       Request: { weight, amount }
       Response: { status: "COMPLETED" }

GET    /api/pickup-requests/user/{userId}
       Response: [ user's pickups ]

GET    /api/pickup-requests/status/{status}
       Response: [ pickups with status ]
```

---

## 💰 5. PRICING SERVICE (Port 8086)

**Purpose:** Dynamic pricing and price calculation engine  
**Database Schema:** `pricing`  
**Status:** ✅ Infrastructure ready

### API Endpoints
```
GET    /api/pricing/item/{itemId}
       Response: { id, basePrice, currentPrice, discount }

POST   /api/pricing/calculate
       Request: { items: [{ itemId, quantity }] }
       Response: { totalAmount, breakdown: [...] }

GET    /api/pricing/rates
       Response: [ all pricing rules ]

PUT    /api/pricing/rules/{id}
       Request: { newPrice, discountPercentage }
       Response: { updated rule }
```

---

## 📍 6. LOCATION SERVICE (Port 8089)

**Purpose:** Address management and delivery zones  
**Database Schema:** `location`  
**Status:** ✅ Infrastructure ready

### API Endpoints
```
POST   /api/addresses
       Request: { userId, street, city, zipCode, lat, lng }
       Response: { id, formatted address }

GET    /api/addresses/user/{userId}
       Response: [ user addresses ]

PUT    /api/addresses/{id}
       Request: { updated fields }
       Response: { updated address }

GET    /api/zones
       Response: [ delivery zones ]

GET    /api/zones/check?lat={lat}&lng={lng}
       Response: { zone, deliveryFee }
```

---

## 📧 7. ENQUIRY SERVICE (Port 8090)

**Purpose:** Customer support and inquiry management  
**Database Schema:** `enquiry`  
**Status:** ✅ Infrastructure ready

### API Endpoints
```
POST   /api/enquiries
       Request: { email, subject, message, category }
       Response: { id, ticketNumber, status: "OPEN" }

GET    /api/enquiries/{id}
       Response: { full enquiry }

PUT    /api/enquiries/{id}/reply
       Request: { message }
       Response: { updated enquiry }

GET    /api/enquiries/user/{userId}
       Response: [ user's enquiries ]

GET    /api/enquiries/status/{status}
       Response: [ enquiries with status ]
```

---

## 🏢 8. VENDOR ONBOARDING SERVICE (Port 8087)

**Purpose:** Vendor registration and KYC verification  
**Database Schema:** `vendor_onboarding`  
**Status:** ✅ Infrastructure ready

### API Endpoints
```
POST   /api/vendor-onboarding/register
       Request: {
         companyName, registrationNumber, email,
         phone, address, documents
       }
       Response: { vendorId, status: "PENDING_REVIEW" }

GET    /api/vendor-onboarding/{vendorId}
       Response: { vendor details }

POST   /api/vendor-onboarding/{vendorId}/documents
       Request: { file, documentType }  // multipart/form-data
       Response: { documentId, uploadedAt }

PUT    /api/vendor-onboarding/{vendorId}/approve
       Request: { approverNotes }
       Response: { status: "APPROVED" }

GET    /api/vendor-onboarding/status/{status}
       Response: [ vendors with status ]
```

---

## 🚴 9. RIDER ONBOARDING SERVICE (Port 8083)

**Purpose:** Rider registration and credential verification  
**Database Schema:** `rider_onboarding` (future)  
**Status:** ✅ Infrastructure ready

### API Endpoints
```
POST   /api/rider-onboarding/register
       Request: { name, phone, email, licenseNumber, vehicle }
       Response: { riderId, status: "PENDING_VERIFICATION" }

GET    /api/rider-onboarding/{riderId}
       Response: { rider details }

POST   /api/rider-onboarding/{riderId}/documents
       Request: { licenseImage, vehicleRegistration }
       Response: { verification status }

PUT    /api/rider-onboarding/{riderId}/approve
       Response: { status: "APPROVED" }
```

---

## 🔌 INTER-SERVICE COMMUNICATION

### Event-Driven Architecture (Kafka Topics)

```
Topic: scrap-items.created
  Event: { itemId, name, price, category }
  Consumer: pricing-service, location-service

Topic: order.created
  Event: { orderId, totalAmount, items }
  Consumer: pickup-service, payment-service

Topic: pickup.completed
  Event: { pickupId, weight, actualAmount }
  Consumer: pricing-service, vendor-onboarding-service

Topic: vendor.approved
  Event: { vendorId, approvalDate }
  Consumer: scrap-items-service, location-service

Topic: rider.approved
  Event: { riderId, approvalDate }
  Consumer: pickup-service
```

### Service-to-Service REST Calls

```
auth-service → (validates tokens for other services)
scrap-items-service → pricing-service (calculate totals)
pickup-service → location-service (zone validation)
pickup-service → pricing-service (pickup fees)
vendor-onboarding-service → auth-service (create user)
```

---

## 🔒 COMMON SECURITY PATTERNS

### All Endpoints Require
```
Header: Authorization: Bearer {jwt_token}
Header: Content-Type: application/json
Header: X-API-Key: (optional, for external integrations)
```

### Response Format
```json
{
  "success": true,
  "data": { /* endpoint-specific data */ },
  "timestamp": "2026-07-13T10:30:00Z"
}
```

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Item not found",
    "details": "Item with ID 999 does not exist"
  },
  "timestamp": "2026-07-13T10:30:00Z"
}
```

### HTTP Status Codes
```
200 OK              - Successful GET/PUT
201 Created         - Successful POST
204 No Content      - Successful DELETE
400 Bad Request     - Invalid input
401 Unauthorized    - Missing/invalid token
403 Forbidden       - Insufficient permissions
404 Not Found       - Resource not found
409 Conflict        - Duplicate resource
429 Too Many Requests - Rate limited
500 Server Error    - Internal error
```

---

## 📊 DATABASE CONNECTIONS

### Connection Pool Settings
```
Min Size: 10 connections
Max Size: 20 connections
Timeout: 30 seconds
Test Query: SELECT 1
```

### Performance Tuning
```
Query Timeout: 30 seconds
Statement Cache: 250
Fetch Size: 1000 rows
```

---

## 🚀 DEPLOYMENT CONFIGURATION

### Environment Variables (Required)

```bash
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=appdb
DB_USER=admin
DB_PASSWORD=admin123

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Kafka
KAFKA_BROKER=kafka:9092
KAFKA_ZOOKEEPER=zookeeper:2181

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRY=900000         # 15 minutes in ms

# Service Ports
API_GATEWAY_PORT=8080
AUTH_SERVICE_PORT=8081
RIDER_SERVICE_PORT=8083
PICKUP_SERVICE_PORT=8084
SCRAP_ITEMS_PORT=8085
PRICING_SERVICE_PORT=8086
VENDOR_SERVICE_PORT=8087
LOCATION_SERVICE_PORT=8089
ENQUIRY_SERVICE_PORT=8090
```

### Docker Compose Override
```yaml
services:
  postgres:
    environment:
      POSTGRES_DB: appdb
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: admin123
    ports:
      - "5432:5432"
```

---

## ✅ HEALTH CHECK ENDPOINTS

All services expose Spring Boot Actuator endpoints:

```
GET /actuator/health                    - Service health status
GET /actuator/health/liveness           - Service is alive
GET /actuator/health/readiness          - Service ready for traffic
GET /actuator/metrics                   - Performance metrics
GET /actuator/metrics/jvm.memory.used   - JVM memory usage
GET /actuator/metrics/http.server.requests - HTTP request metrics
```

---

## 🔄 API VERSIONING

**Current Version:** v1  
**Path:** `/api/v1/...` (future versions)  
**Backward Compatibility:** Maintained for 2 major versions  

---

## 📚 API DOCUMENTATION

**OpenAPI/Swagger:** `/api-docs` (when deployed)  
**Postman Collection:** `backend/postman-collection.json` (future)  

---

## 🎯 TESTING COMMANDS

```bash
# Test all services are running
for port in 8080 8081 8083 8084 8085 8086 8087 8089 8090; do
  echo "Testing port $port..."
  curl -s http://localhost:$port/actuator/health | jq '.status'
done

# Test Scrap Items specifically
curl http://localhost:8085/api/categories | jq '.[0:2]'
curl http://localhost:8085/api/scrap-items?page=1&size=5 | jq '.content[0]'

# Load test
ab -n 1000 -c 10 http://localhost:8085/api/scrap-items
```

---

*ScrapNinja Microservices Architecture - Complete Reference* ✅
