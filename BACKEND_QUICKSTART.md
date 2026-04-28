## ScrapNinja Backend - Quick Start

### ✅ What's Been Implemented

**Auth Service (Complete)**
- User registration with password hashing (BCrypt)
- Login with JWT authentication
- Token refresh mechanism
- User entity and repository
- Global error handling
- DTOs with validation

**Backend Infrastructure**
- Multi-module Maven project setup
- Docker multi-stage builds for all services
- PostgreSQL, Redis, Kafka integration
- API Gateway routing configuration

### 🚀 How to Run the Backend

#### Option 1: Docker Compose (Recommended)

```bash
cd c:\Users\nalin\Desktop\scapninja
docker-compose up -d
```

**Expected Services:**
- 🗄️ PostgreSQL: localhost:5432
- ⚡ Redis: localhost:6379  
- 📨 Kafka: localhost:9092
- 🌐 API Gateway: localhost:8080
- 🔐 Auth Service: localhost:8081
- 📦 Pickup Service: localhost:8082
- 💰 Pricing Service: localhost:8083
- 🖥️ Frontend: localhost:3000

#### Option 2: Local Maven (If Docker isn't available)

```bash
cd backend

# Using installed Maven (with & operator in PowerShell)
& "C:\maven\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run -pl api-gateway
```

### 📋 Default Credentials

**Database:**
- User: `scrapninja`
- Password: `scrapninja_secure_pass`
- Host: `localhost`
- Port: `5432`

**Test Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!!",
    "rememberMe": true
  }'
```

### 🔧 Troubleshooting

**If Docker containers don't start:**
1. Ensure Docker Desktop is running
2. Check disk space (need ~5GB for builds)
3. Run `docker-compose logs` to see errors

**If Maven build fails:**
1. Ensure Java 21 is installed: `java -version`
2. Clear Maven cache: `mvn clean`
3. Download dependencies: `mvn -U clean install`

### 📚 API Endpoints (After Starting)

**Authentication:**
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register
- `POST /api/auth/refresh` - Refresh token
- `GET /api/auth/health` - Health check

**Gateway Health:**
- `GET /actuator/health` - Gateway health

### 🎯 Next Steps

1. ✅ Auth Service is complete
2. 🔄 Pickup Service needs implementation
3. 🔄 Pricing Service needs implementation
4. 🔄 Frontend integration with Auth API

### 📖 Files Modified/Created

**Backend:**
- `backend/auth-service/` - Full authentication implementation
- `backend/*/Dockerfile` - Multi-stage Docker builds
- `docker-compose.yml` - Updated with correct build contexts
- `pom.xml` - Updated dependencies for auth service

**Key Files:**
- `User.java` - User entity
- `JwtTokenProvider.java` - JWT token management
- `AuthenticationService.java` - Core auth logic
- `AuthController.java` - REST endpoints
- `UserRepository.java` - Database access

---

**Need help? Check the logs:**
```bash
docker-compose logs -f [service-name]
```
