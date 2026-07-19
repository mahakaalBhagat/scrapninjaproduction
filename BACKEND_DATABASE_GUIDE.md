# 🗄️ SCRAPNINJA - COMPLETE DATABASE & BACKEND GUIDE

## 📍 DATABASE LOCATION & VISIBILITY

### Database Information
```
Database Name: appdb
Database Type: MySQL / PostgreSQL
Default Port: 3306 (MySQL) or 5432 (PostgreSQL)
Host: localhost (development) or cloud instance (production)
User: admin
Password: [Check docker-compose.yml or .env]
```

### File Location in Repository
```
Backend Root: /backend
Database Schema: /backend/DATABASE_SCHEMA.sql
Docker Compose: /docker-compose.yml (shows DB config)
Init Script: /backend/init-db.sql
```

---

## 🏗️ BACKEND ARCHITECTURE

### Microservices Structure
```
backend/
├── api-gateway/                 # Entry point for all requests
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── auth-service/                # User authentication & authorization
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── pickup-service/              # Scrap pickup booking management
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── scrap-items-service/         # ⭐ NEW: Scrap items marketplace
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── vendor-onboarding-service/   # Vendor registration & management
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── rider-onboarding-service/    # ⭐ NEW: Rider registration & management
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── pricing-service/             # Dynamic pricing engine
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── location-service/            # Location & service area management
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── enquiry-service/             # Support ticket management
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/main/
│
├── DATABASE_SCHEMA.sql          # ⭐ Complete DB schema (NEW)
├── init-db.sql                  # Database initialization
├── docker-compose.yml           # Container orchestration
└── pom.xml                      # Parent Maven config
```

---

## 🗄️ DATABASE SCHEMA OVERVIEW

### Total Schemas: 8

#### 1. **auth** - User Management
```sql
Table: users
- id (PK)
- email (UNIQUE)
- password_hash
- phone
- full_name
- role (CUSTOMER, VENDOR, RIDER, ADMIN)
- is_active
- created_at, updated_at
```

#### 2. **scrap_items** - NEW Marketplace Module
```sql
Table: categories
- id, name, emoji, description

Table: items
- id, name, category_id, price_per_unit
- unit (kg, piece, unit)
- emoji, environmental_warning
- is_recyclable, is_active

Table: user_listings
- id, user_id, item_id, quantity
- location, latitude, longitude
- status (AVAILABLE, PENDING, SOLD, CANCELLED)
- images (JSON)

Table: transactions
- id, seller_id, buyer_id, listing_id
- quantity, unit_price, total_price
- status (PENDING, COMPLETED, CANCELLED)
- payment_method, payment_status
- rating, review
```

#### 3. **vendor** - Vendor Applications
```sql
Table: vendor_applications
- user_id, company_name, registration_number
- trade_license_number, business_address
- bank details (IBAN, account_number)
- application_status (PENDING, APPROVED, REJECTED)
- approval_date
```

#### 4. **rider** - Rider Applications
```sql
Table: rider_applications
- user_id, emirates_id, date_of_birth
- vehicle_type, vehicle_registration
- bank details
- application_status
- approval_date
```

#### 5. **pickup** - Pickup Requests
```sql
Table: pickup_requests
- user_id, pickup_address, latitude, longitude
- preferred_date, preferred_time_slot
- scrap_type, quantity
- status (PENDING, ACCEPTED, IN_PROGRESS, COMPLETED)
- rider_id, assigned_date
```

#### 6. **pricing** - Price History
```sql
Table: price_history
- item_id, price_per_unit
- effective_date, end_date
- reason
```

#### 7. **location** - Service Areas
```sql
Table: service_areas
- area_name, zone
- latitude, longitude, radius_km
- is_serviceable
```

#### 8. **enquiry** - Support Tickets
```sql
Table: enquiries
- user_id, subject, message
- category, status (OPEN, IN_PROGRESS, RESOLVED)
- response, created_at
```

---

## 🔗 CONNECTION CONFIGURATION

### application.properties (Each Service)
```properties
# Auth Service
spring.datasource.url=jdbc:mysql://localhost:3306/appdb
spring.datasource.username=admin
spring.datasource.password=admin
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.default_schema=auth

# Scrap Items Service
spring.datasource.url=jdbc:mysql://localhost:3306/appdb
spring.jpa.properties.hibernate.default_schema=scrap_items

# Vendor Service
spring.datasource.url=jdbc:mysql://localhost:3306/appdb
spring.jpa.properties.hibernate.default_schema=vendor
```

### Docker Compose Setup
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
      - ./backend/init-db.sql:/docker-entrypoint-initdb.d/init.sql
      - ./backend/DATABASE_SCHEMA.sql:/docker-entrypoint-initdb.d/schema.sql
```

---

## 🚀 NEW SERVICE: Scrap Items Service

### Create New Maven Microservice

#### Step 1: Create Project Structure
```bash
mkdir backend/scrap-items-service
cd backend/scrap-items-service
```

#### Step 2: pom.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0">
  <modelVersion>4.0.0</modelVersion>
  
  <artifactId>scrap-items-service</artifactId>
  <version>1.0.0</version>
  <packaging>jar</packaging>
  <name>ScrapItems Service</name>
  
  <parent>
    <groupId>com.scrapninja</groupId>
    <artifactId>backend</artifactId>
    <version>1.0.0</version>
  </parent>

  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
      <groupId>com.mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.33</version>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
  </dependencies>

  <build>
    <plugins>
      <plugin>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-maven-plugin</artifactId>
      </plugin>
    </plugins>
  </build>
</project>
```

#### Step 3: Entity Classes
```java
// src/main/java/com/scrapninja/scrapitems/entity/ScrapItem.java
@Entity
@Table(name = "items", schema = "scrap_items")
public class ScrapItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private BigDecimal pricePerUnit;
    private String unit; // kg, piece, unit
    private String emoji;
    private String environmentalWarning;
    private Boolean isRecyclable;
    private Boolean isActive;
    
    @ManyToOne
    @JoinColumn(name = "category_id")
    private ScrapCategory category;
    
    private Timestamp createdAt;
    private Timestamp updatedAt;
    
    // Getters, Setters...
}

// src/main/java/com/scrapninja/scrapitems/entity/ScrapCategory.java
@Entity
@Table(name = "categories", schema = "scrap_items")
public class ScrapCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String description;
    private String emoji;
    private Boolean isActive;
    
    @OneToMany(mappedBy = "category")
    private List<ScrapItem> items;
    
    // Getters, Setters...
}

// src/main/java/com/scrapninja/scrapitems/entity/UserListing.java
@Entity
@Table(name = "user_listings", schema = "scrap_items")
public class UserListing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    
    @ManyToOne
    @JoinColumn(name = "item_id")
    private ScrapItem item;
    
    private BigDecimal quantity;
    private String unit;
    private String location;
    private Double latitude;
    private Double longitude;
    
    @Enumerated(EnumType.STRING)
    private ListingStatus status; // AVAILABLE, PENDING, SOLD, CANCELLED
    
    private String description;
    private String images; // JSON array
    
    private Timestamp createdAt;
    private Timestamp updatedAt;
    
    // Getters, Setters...
}
```

#### Step 4: Repository Interfaces
```java
// src/main/java/com/scrapninja/scrapitems/repository/ScrapItemRepository.java
@Repository
public interface ScrapItemRepository extends JpaRepository<ScrapItem, Long> {
    List<ScrapItem> findByCategory(ScrapCategory category);
    List<ScrapItem> findByNameContainingIgnoreCase(String name);
    List<ScrapItem> findByIsActiveTrue();
}

// src/main/java/com/scrapninja/scrapitems/repository/ScrapCategoryRepository.java
@Repository
public interface ScrapCategoryRepository extends JpaRepository<ScrapCategory, Long> {
    Optional<ScrapCategory> findByNameIgnoreCase(String name);
}

// src/main/java/com/scrapninja/scrapitems/repository/UserListingRepository.java
@Repository
public interface UserListingRepository extends JpaRepository<UserListing, Long> {
    List<UserListing> findByUserId(Long userId);
    List<UserListing> findByStatus(ListingStatus status);
    List<UserListing> findByUserIdAndStatus(Long userId, ListingStatus status);
}
```

#### Step 5: Service Layer
```java
// src/main/java/com/scrapninja/scrapitems/service/ScrapItemService.java
@Service
@Transactional
public class ScrapItemService {
    
    @Autowired
    private ScrapItemRepository itemRepository;
    
    @Autowired
    private ScrapCategoryRepository categoryRepository;
    
    public List<ScrapItem> getAllItems() {
        return itemRepository.findByIsActiveTrue();
    }
    
    public List<ScrapItem> getItemsByCategory(Long categoryId) {
        ScrapCategory category = categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        return itemRepository.findByCategory(category);
    }
    
    public List<ScrapItem> searchItems(String query) {
        return itemRepository.findByNameContainingIgnoreCase(query);
    }
    
    public ScrapItem getItemById(Long id) {
        return itemRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
    }
    
    public List<ScrapCategory> getAllCategories() {
        return categoryRepository.findAll();
    }
}

// src/main/java/com/scrapninja/scrapitems/service/UserListingService.java
@Service
@Transactional
public class UserListingService {
    
    @Autowired
    private UserListingRepository listingRepository;
    
    @Autowired
    private ScrapItemRepository itemRepository;
    
    public UserListing createListing(Long userId, Long itemId, 
                                    UserListingRequest request) {
        ScrapItem item = itemRepository.findById(itemId)
            .orElseThrow(() -> new ResourceNotFoundException("Item not found"));
        
        UserListing listing = new UserListing();
        listing.setUserId(userId);
        listing.setItem(item);
        listing.setQuantity(request.getQuantity());
        listing.setUnit(request.getUnit());
        listing.setLocation(request.getLocation());
        listing.setLatitude(request.getLatitude());
        listing.setLongitude(request.getLongitude());
        listing.setStatus(ListingStatus.AVAILABLE);
        listing.setDescription(request.getDescription());
        
        return listingRepository.save(listing);
    }
    
    public List<UserListing> getUserListings(Long userId) {
        return listingRepository.findByUserId(userId);
    }
    
    public UserListing updateListingStatus(Long listingId, ListingStatus status) {
        UserListing listing = listingRepository.findById(listingId)
            .orElseThrow(() -> new ResourceNotFoundException("Listing not found"));
        listing.setStatus(status);
        return listingRepository.save(listing);
    }
}
```

#### Step 6: REST Controller
```java
// src/main/java/com/scrapninja/scrapitems/controller/ScrapItemController.java
@RestController
@RequestMapping("/api/scrap-items")
@CrossOrigin(origins = "*")
public class ScrapItemController {
    
    @Autowired
    private ScrapItemService itemService;
    
    @GetMapping
    public ResponseEntity<List<ScrapItem>> getAllItems() {
        return ResponseEntity.ok(itemService.getAllItems());
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ScrapItem>> getItemsByCategory(
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(itemService.getItemsByCategory(categoryId));
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<ScrapItem>> searchItems(
            @RequestParam String query) {
        return ResponseEntity.ok(itemService.searchItems(query));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ScrapItem> getItemById(@PathVariable Long id) {
        return ResponseEntity.ok(itemService.getItemById(id));
    }
    
    @GetMapping("/categories")
    public ResponseEntity<List<ScrapCategory>> getAllCategories() {
        return ResponseEntity.ok(itemService.getAllCategories());
    }
}

// src/main/java/com/scrapninja/scrapitems/controller/UserListingController.java
@RestController
@RequestMapping("/api/listings")
@CrossOrigin(origins = "*")
public class UserListingController {
    
    @Autowired
    private UserListingService listingService;
    
    @PostMapping
    public ResponseEntity<UserListing> createListing(
            @RequestHeader("X-User-Id") Long userId,
            @RequestParam Long itemId,
            @RequestBody UserListingRequest request) {
        UserListing listing = listingService.createListing(userId, itemId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(listing);
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<UserListing>> getUserListings(
            @PathVariable Long userId) {
        return ResponseEntity.ok(listingService.getUserListings(userId));
    }
    
    @PutMapping("/{listingId}/status")
    public ResponseEntity<UserListing> updateListingStatus(
            @PathVariable Long listingId,
            @RequestParam ListingStatus status) {
        UserListing updated = listingService.updateListingStatus(listingId, status);
        return ResponseEntity.ok(updated);
    }
}
```

#### Step 7: application.yml
```yaml
spring:
  application:
    name: scrap-items-service
  datasource:
    url: jdbc:mysql://localhost:3306/appdb
    username: admin
    password: admin
    driver-class-name: com.mysql.cj.jdbc.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        default_schema: scrap_items
    show-sql: false

server:
  port: 8085
  servlet:
    context-path: /scrap-items-service

logging:
  level:
    root: INFO
    com.scrapninja: DEBUG
```

---

## 📡 API ENDPOINTS

### Scrap Items API
```
GET    /api/scrap-items              - Get all items
GET    /api/scrap-items/{id}         - Get item by ID
GET    /api/scrap-items/search?q=    - Search items
GET    /api/scrap-items/category/{id} - Get items by category
GET    /api/scrap-items/categories   - Get all categories
```

### User Listings API
```
POST   /api/listings                 - Create new listing
GET    /api/listings/user/{userId}   - Get user's listings
PUT    /api/listings/{id}/status     - Update listing status
DELETE /api/listings/{id}            - Delete listing
```

### Transactions API (Coming Soon)
```
POST   /api/transactions             - Create transaction
GET    /api/transactions/{id}        - Get transaction details
PUT    /api/transactions/{id}/status - Update transaction status
```

---

## 🚀 HOW TO RUN

### 1. Start Database
```bash
# Using Docker
docker-compose up mysql

# Or MySQL directly
mysql -u root -p
mysql> CREATE DATABASE appdb;
mysql> CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';
mysql> GRANT ALL PRIVILEGES ON appdb.* TO 'admin'@'localhost';
```

### 2. Run SQL Scripts
```bash
mysql -u admin -p appdb < backend/init-db.sql
mysql -u admin -p appdb < backend/DATABASE_SCHEMA.sql
```

### 3. Build Services
```bash
cd backend
mvn clean install
```

### 4. Start Microservices
```bash
# Terminal 1 - Auth Service
mvn -pl auth-service spring-boot:run

# Terminal 2 - Scrap Items Service
mvn -pl scrap-items-service spring-boot:run

# Terminal 3 - API Gateway
mvn -pl api-gateway spring-boot:run
```

### 5. Test API
```bash
# Get all items
curl http://localhost:8085/scrap-items-service/api/scrap-items

# Search items
curl http://localhost:8085/scrap-items-service/api/scrap-items/search?q=laptop

# Get categories
curl http://localhost:8085/scrap-items-service/api/scrap-items/categories
```

---

## 📊 DATABASE VISUALIZATION

```
┌─────────────────────────────────────────────────────────────────┐
│                     SCRAPNINJA DATABASE (appdb)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐      │
│  │   auth       │  │ scrap_items  │  │    vendor       │      │
│  ├──────────────┤  ├──────────────┤  ├─────────────────┤      │
│  │ users        │  │ categories   │  │ vendor_apps     │      │
│  └──────────────┘  │ items        │  └─────────────────┘      │
│                    │ user_listings│                            │
│  ┌──────────────┐  │ transactions │  ┌─────────────────┐      │
│  │   rider      │  └──────────────┘  │   location      │      │
│  ├──────────────┤                    ├─────────────────┤      │
│  │ rider_apps   │  ┌──────────────┐  │ service_areas   │      │
│  └──────────────┘  │   pricing    │  └─────────────────┘      │
│                    ├──────────────┤                            │
│  ┌──────────────┐  │ price_history│  ┌─────────────────┐      │
│  │   pickup     │  └──────────────┘  │   enquiry       │      │
│  ├──────────────┤                    ├─────────────────┤      │
│  │ pickup_reqs  │                    │ enquiries       │      │
│  └──────────────┘                    └─────────────────┘      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ QUICK START CHECKLIST

- [ ] MySQL/PostgreSQL installed
- [ ] Database `appdb` created
- [ ] SQL scripts executed (init-db.sql + DATABASE_SCHEMA.sql)
- [ ] Java 11+ installed
- [ ] Maven installed
- [ ] Git cloned
- [ ] Services started in order
- [ ] Test API endpoints
- [ ] Check logs for errors

---

## 🆘 TROUBLESHOOTING

### Connection Refused
```
Solution: Make sure MySQL is running
systemctl start mysql
docker ps | grep mysql
```

### Schema Not Found
```
Solution: Run DATABASE_SCHEMA.sql
mysql -u admin -p appdb < backend/DATABASE_SCHEMA.sql
```

### Port Already in Use
```
Solution: Change port in application.yml
Or kill process: lsof -i :8085 | kill -9 <PID>
```

---

## 📝 NEXT STEPS

1. ✅ Database created
2. ✅ Schema with 20+ tables
3. ✅ Mock data inserted (23 items, 6 categories)
4. ⏳ Create Scrap Items Microservice (copy code above)
5. ⏳ Connect Frontend to Backend APIs
6. ⏳ Add real-time notifications
7. ⏳ Implement payment processing
8. ⏳ Add AI-based price recommendations

---

Generated: 2024 | ScrapNinja Backend Architecture
