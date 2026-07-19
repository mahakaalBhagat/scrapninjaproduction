# 🏗️ SCRAPNINJA Backend Architecture

## Backend Folder Structure

This folder contains all backend microservices and database configuration for ScrapNinja.

```
backend/
├── api-gateway/                      # API Gateway Service (Port 8080)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── auth-service/                     # Authentication Service (Port 8081)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── scrap-items-service/              # ⭐ NEW Scrap Items Marketplace (Port 8085)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│       └── main/
│           ├── java/com/scrapninja/scrapitems/
│           │   ├── entity/          (4 entity classes)
│           │   ├── repository/      (3 repository interfaces)
│           │   ├── service/         (2 service classes)
│           │   ├── controller/      (2 REST controllers)
│           │   ├── dto/             (request/response objects)
│           │   └── exception/       (custom exceptions)
│           └── resources/
│               └── application.yml   (Spring Boot config)
│
├── vendor-onboarding-service/        # Vendor Registration (Port 8082)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── rider-onboarding-service/         # Rider Registration (Port 8083)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── pickup-service/                   # Scrap Pickup Management (Port 8084)
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── pricing-service/                  # Dynamic Pricing Engine
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── location-service/                 # Location & Service Areas
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── enquiry-service/                  # Support Tickets
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│
├── DATABASE_SCHEMA.sql               # ✅ Complete database schema
├── init-db.sql                       # Database initialization
├── docker-compose.yml                # Docker orchestration
├── pom.xml                           # Parent Maven config
└── README.md                         # This file
```

---

## 🗄️ Database Schema

### Connection Details
```
Host: localhost:3306
User: admin
Password: admin
Database: appdb
```

### 8 Microservice Schemas

| Schema | Purpose | Tables | Status |
|--------|---------|--------|--------|
| `auth` | User authentication | users | ✅ Ready |
| `scrap_items` | Marketplace | categories, items, user_listings, transactions | ✅ NEW |
| `vendor` | Vendor applications | vendor_applications | ✅ Ready |
| `rider` | Rider applications | rider_applications | ✅ Ready |
| `pickup` | Pickup requests | pickup_requests | ✅ Ready |
| `pricing` | Price history | price_history | ✅ Ready |
| `location` | Service areas | service_areas | ✅ Ready |
| `enquiry` | Support tickets | enquiries | ✅ Ready |

---

## 🚀 Services & Ports

| Service | Port | Status | Purpose |
|---------|------|--------|---------|
| API Gateway | 8080 | Ready | Single entry point |
| Auth Service | 8081 | Ready | User authentication |
| Vendor Service | 8082 | Ready | Vendor management |
| Rider Service | 8083 | Ready | Rider management |
| Pickup Service | 8084 | Ready | Pickup requests |
| **Scrap Items** | **8085** | **✅ NEW** | **Marketplace** |
| Pricing Service | 8086 | Ready | Dynamic pricing |
| Location Service | 8087 | Ready | Service areas |
| Enquiry Service | 8088 | Ready | Support tickets |

---

## 📡 API Endpoints

### Scrap Items Service (Port 8085)
```
GET  /scrap-items-service/api/scrap-items
GET  /scrap-items-service/api/scrap-items/{id}
GET  /scrap-items-service/api/scrap-items/search?query=VALUE
GET  /scrap-items-service/api/scrap-items/category/{categoryId}
GET  /scrap-items-service/api/scrap-items/categories/all
GET  /scrap-items-service/api/scrap-items/categories/{id}

POST   /scrap-items-service/api/listings
GET    /scrap-items-service/api/listings/user/{userId}
GET    /scrap-items-service/api/listings/{listingId}
PUT    /scrap-items-service/api/listings/{listingId}
PUT    /scrap-items-service/api/listings/{listingId}/status
DELETE /scrap-items-service/api/listings/{listingId}
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Java 11+
- Maven 3.6+
- MySQL 8.0+
- Git

### Quick Setup

#### Windows
```bash
setup-backend.bat
```

#### Linux/macOS
```bash
bash setup-backend.sh
```

### Manual Setup

#### 1. Create Database
```bash
mysql -u root -p
CREATE DATABASE appdb;
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL ON appdb.* TO 'admin'@'localhost';
```

#### 2. Load Schema
```bash
mysql -u admin -p appdb < backend/DATABASE_SCHEMA.sql
mysql -u admin -p appdb < backend/init-db.sql
```

#### 3. Build Service
```bash
cd backend/scrap-items-service
mvn clean install
```

#### 4. Run Service
```bash
mvn spring-boot:run
```

---

## 🧪 Testing

### Using curl
```bash
# Get all items
curl http://localhost:8085/scrap-items-service/api/scrap-items

# Search items
curl http://localhost:8085/scrap-items-service/api/scrap-items/search?query=laptop

# Get item by ID
curl http://localhost:8085/scrap-items-service/api/scrap-items/1
```

### Using Postman
1. Import: `http://localhost:8085/scrap-items-service/api`
2. Test GET endpoints
3. Test POST endpoints with JSON body

### Using browser
```
http://localhost:8085/scrap-items-service/api/scrap-items
http://localhost:8085/scrap-items-service/api/scrap-items/categories/all
```

---

## 📊 Database Visualization

```
┌─────────────────────────────────────────────────────────────┐
│                    appdb (MySQL 8.0)                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │            scrap_items Schema                        │  │
│  ├──────────────────────────────────────────────────────┤  │
│  │                                                      │  │
│  │   categories ──┐                                    │  │
│  │   ├─ id       │                                    │  │
│  │   ├─ name     │                                    │  │
│  │   ├─ emoji    │                                    │  │
│  │   └─ active   │                                    │  │
│  │               └─→ items                            │  │
│  │                   ├─ id                            │  │
│  │                   ├─ name                          │  │
│  │                   ├─ category_id (FK)             │  │
│  │                   ├─ price_per_unit               │  │
│  │                   ├─ emoji                        │  │
│  │                   ├─ environmental_warning        │  │
│  │                   └─ is_active                    │  │
│  │                       ↓                            │  │
│  │                   user_listings                    │  │
│  │                   ├─ id                            │  │
│  │                   ├─ user_id                       │  │
│  │                   ├─ item_id (FK)                 │  │
│  │                   ├─ quantity                      │  │
│  │                   ├─ location                      │  │
│  │                   ├─ status                        │  │
│  │                   └─ created_at                   │  │
│  │                       ↓                            │  │
│  │                   transactions                     │  │
│  │                   ├─ seller_id                     │  │
│  │                   ├─ buyer_id                      │  │
│  │                   ├─ listing_id (FK)              │  │
│  │                   ├─ total_price                   │  │
│  │                   └─ status                        │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ auth schema  │  │ vendor schema│  │ rider schema │    │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤    │
│  │ users (5)    │  │ vendor_apps  │  │ rider_apps   │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │ pickup schema│  │ pricing schema  │ location sch │    │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤    │
│  │ pickup_reqs  │  │ price_hist   │  │ service_area │    │
│  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                             │
│  ┌──────────────────────────────┐                         │
│  │    enquiry schema             │                         │
│  ├──────────────────────────────┤                         │
│  │    enquiries (support tickets)│                         │
│  └──────────────────────────────┘                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 📚 Documentation

- **BACKEND_DATABASE_GUIDE.md** - Full architecture & implementation
- **BACKEND_QUICK_START.md** - Setup & testing guide
- **BACKEND_SETUP_COMPLETE.md** - Summary of what was created

---

## 🔧 Development

### Build Project
```bash
cd backend
mvn clean install
```

### Run All Services (Docker)
```bash
docker-compose up -d
```

### View Logs
```bash
cd backend/scrap-items-service
tail -f logs/scrap-items-service.log
```

### Rebuild Single Service
```bash
cd backend/scrap-items-service
mvn clean package
java -jar target/scrap-items-service-1.0.0.jar
```

---

## 📊 Database Backup & Restore

### Backup
```bash
mysqldump -u admin -p appdb > appdb_backup.sql
```

### Restore
```bash
mysql -u admin -p appdb < appdb_backup.sql
```

---

## 🆘 Troubleshooting

### Database Connection Failed
```
Check:
1. MySQL is running: mysql --version
2. User exists: mysql -u admin -p
3. Database exists: mysql -u root -p -e "SHOW DATABASES;"
```

### Service Won't Start
```
Check:
1. Port 8085 is free: lsof -i :8085
2. Java installed: java -version
3. Maven installed: mvn -version
4. Check logs: less logs/scrap-items-service.log
```

### Data Not Showing
```
Check:
1. Schema loaded: mysql -u admin -p -e "USE appdb; SHOW TABLES FROM scrap_items;"
2. Items inserted: mysql -u admin -p -e "USE appdb; SELECT COUNT(*) FROM scrap_items.items;"
3. API responds: curl http://localhost:8085/scrap-items-service/api/scrap-items
```

---

## 📝 What's Next?

### Phase 1: Foundation (✅ Complete)
- [x] Database schema
- [x] Scrap items service
- [x] Basic CRUD operations
- [x] REST API endpoints

### Phase 2: Services (In Progress)
- [ ] Vendor onboarding backend
- [ ] Rider onboarding backend
- [ ] Pickup request processing
- [ ] User authentication

### Phase 3: Features
- [ ] Payment processing
- [ ] Email notifications
- [ ] Real-time updates
- [ ] Admin dashboard

### Phase 4: Production
- [ ] Performance optimization
- [ ] Security hardening
- [ ] CI/CD pipeline
- [ ] Kubernetes deployment

---

## 📞 Support

For questions or issues:
1. Check the documentation in this folder
2. Review application logs
3. Test database connectivity
4. Verify all prerequisites installed

---

## 📄 License

ScrapNinja Backend - Internal Development

---

Generated: 2024 | ScrapNinja Backend Infrastructure
