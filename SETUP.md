# ScrapNinja - Setup & Deployment Guide

Complete guide to set up and deploy the ScrapNinja platform.

---

## Prerequisites

### Global Requirements
- Docker & Docker Compose 2.0+ (optional, can use local Java/Maven instead)
- Git
- 4GB RAM minimum (8GB+ recommended)
- 20GB disk space for dependencies

### For Local Development

**Frontend:**
- Node.js 18+ and npm 9+ ✅ (You have this)

**Backend:**
- Java 21 JDK ✅ (Run setup script to install)
- Maven 3.8+ ✅ (Run setup script to install)
- PostgreSQL 14+ client tools (for database management)
- DBeaver (optional, for visual database management)

**Database & Services:**
- PostgreSQL 14+
- Redis 7+
- Kafka 3.5+
- (Can all be installed via Docker or locally)

---

## Install Java 21 & Maven (Windows Setup)

We've created automated setup scripts for you:

### Option A: PowerShell (Recommended)
```powershell
cd C:\Users\nalin\Desktop\scapninja
# Run as Administrator for best results
.\setup-java-maven.ps1
```

### Option B: Command Prompt (Traditional)
```cmd
cd C:\Users\nalin\Desktop\scapninja
setup-java-maven.bat
```

**What this does:**
- ✓ Checks if Java 21 is installed
- ✓ Downloads OpenJDK 21 (Temurin) if needed
- ✓ Installs Java 21 JDK
- ✓ Downloads Maven 3.9.6
- ✓ Extracts Maven and configures PATH
- ✓ Verifies installations

**After running:**
- Close and reopen PowerShell/CMD
- Verify: `java -version` and `mvn -version`
- Then proceed to "Quick Start" below

### Manual Installation (If scripts fail)
See detailed manual installation instructions at the end of this file

---

## Quick Start (5 Minutes)

### Option 1: Docker Compose (Recommended)

1. **Clone repository:**
```bash
git clone https://github.com/yourusername/scrapninja.git
cd scrapninja
```

2. **Start all services:**
```bash
docker-compose up -d
```

3. **Wait for services to be healthy:**
```bash
docker-compose ps
```

4. **Access the application:**
- Frontend: http://localhost:3000
- API: http://localhost:8080/api
- Swagger UI: http://localhost:8080/swagger-ui.html

---

## Detailed Setup

### 1. Frontend Setup (Next.js)

**Prerequisites:**
- Node.js 18+
- npm or yarn

**Installation:**

```bash
cd frontend
npm install
```

**Environment Configuration:**

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_NAME=ScrapNinja
NEXT_PUBLIC_APP_DESCRIPTION=Smart Scrap Collection Platform
```

**Development Server:**

```bash
npm run dev
```

Access at: http://localhost:3000

**Build for Production:**

```bash
npm run build
npm start
```

**Type Checking:**

```bash
npm run type-check
```

**Linting:**

```bash
npm run lint
```

### 2. Backend Setup (Spring Boot)

**Prerequisites:**
- Java 21 JDK
- Maven 3.8+

**Installation:**

```bash
cd backend
mvn clean install
```

**Database Setup:**

1. **Create database:**
```bash
createdb -U postgres scrapninja
```

2. **Create user:**
```bash
createuser -U postgres -d -P scrapninja
```
(Set password to: `scrapninja_secure_pass`)

3. **Initialize schema:**
```bash
psql -U scrapninja -d scrapninja -f src/main/resources/schema.sql
```

4. **Verify tables:**
```bash
psql -U scrapninja -d scrapninja -c "\dt"
```

**Environment Variables:**

Create `.env`:
```
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/scrapninja
SPRING_DATASOURCE_USERNAME=scrapninja
SPRING_DATASOURCE_PASSWORD=scrapninja_secure_pass
REDIS_HOST=localhost
REDIS_PORT=6379
KAFKA_BOOTSTRAP_SERVERS=localhost:9092
JWT_SECRET=your-secret-key-minimum-32-chars-long
```

**Start Services (Individual):**

```bash
# API Gateway
cd api-gateway
mvn spring-boot:run

# Auth Service (new terminal)
cd auth-service
mvn spring-boot:run

# Pickup Service (new terminal)
cd pickup-service
mvn spring-boot:run

# Pricing Service (new terminal)
cd pricing-service
mvn spring-boot:run
```

**Service Health Checks:**

```bash
curl http://localhost:8080/actuator/health
curl http://localhost:8081/api/auth/health
curl http://localhost:8082/api/pickups/health
curl http://localhost:8083/api/pricing/health
```

### 3. Database Setup (PostgreSQL)

**Installation (macOS):**
```bash
brew install postgresql
brew services start postgresql
```

**Installation (Ubuntu/Debian):**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo service postgresql start
```

**Initial Configuration:**

```bash
sudo -u postgres psql

-- Create database
CREATE DATABASE scrapninja;

-- Create user
CREATE USER scrapninja WITH PASSWORD 'scrapninja_secure_pass';

-- Grant privileges
ALTER ROLE scrapninja SET client_encoding TO 'utf8';
ALTER ROLE scrapninja SET default_transaction_isolation TO 'read committed';
ALTER ROLE scrapninja SET default_transaction_deferrable TO on;
ALTER ROLE scrapninja SET default_transaction_read_committed TO off;
GRANT ALL PRIVILEGES ON DATABASE scrapninja TO scrapninja;
```

### 4. Redis Setup (Cache)

**Installation (macOS):**
```bash
brew install redis
brew services start redis
```

**Installation (Ubuntu/Debian):**
```bash
sudo apt-get install redis-server
sudo service redis-server start
```

**Verify:**
```bash
redis-cli ping
# Response: PONG
```

### 5. Kafka Setup (Message Broker)

**Using Docker (Easiest):**
```bash
docker run -d \
  --name kafka \
  -e KAFKA_BOOTSTRAP_SERVERS=kafka:9092 \
  -p 9092:9092 \
  confluentinc/cp-kafka:7.5.0
```

**Manual Installation:**
1. Download from https://kafka.apache.org
2. Extract and configure
3. Start Zookeeper and Kafka broker

---

## Docker Deployment

### Build Docker Images

```bash
# Build all images
docker-compose build

# Build specific service
docker-compose build api-gateway
```

### Start Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Access Services

```
Frontend:       http://localhost:3000
API Gateway:    http://localhost:8080
Auth Service:   http://localhost:8081
Pickup Service: http://localhost:8082
Pricing Service:http://localhost:8083
Database:       localhost:5432
Redis:          localhost:6379
Kafka:          localhost:9092
```

---

## Production Deployment

### 1. Environment Configuration

**Backend (.env.production):**
```
SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db:5432/scrapninja
SPRING_DATASOURCE_USERNAME=scrapninja
SPRING_DATASOURCE_PASSWORD=<strong-password>
REDIS_HOST=prod-redis
REDIS_PORT=6379
KAFKA_BOOTSTRAP_SERVERS=prod-kafka:9092
JWT_SECRET=<generate-strong-secret>
SPRING_PROFILES_ACTIVE=prod
```

**Frontend (.env.production):**
```
NEXT_PUBLIC_API_URL=https://api.scrapninja.ae/api
NEXT_PUBLIC_APP_NAME=ScrapNinja
```

### 2. Database Backup

```bash
# Backup
pg_dump -U scrapninja -d scrapninja > backup.sql

# Restore
psql -U scrapninja -d scrapninja < backup.sql
```

### 3. SSL/TLS Setup

**Generate Self-Signed Certificate:**
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout key.pem -out cert.pem
```

**Configure in docker-compose.yml:**
```yaml
services:
  nginx:
    image: nginx:latest
    volumes:
      - ./cert.pem:/etc/nginx/cert.pem
      - ./key.pem:/etc/nginx/key.pem
    ports:
      - "443:443"
```

### 4. Scaling

**Horizontal Scaling:**
```bash
# Scale pickup service to 3 instances
docker-compose up -d --scale pickup-service=3
```

### 5. Monitoring

**Set up Prometheus:**
```bash
docker run -d \
  --name prometheus \
  -p 9090:9090 \
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \
  prom/prometheus
```

**Set up Grafana:**
```bash
docker run -d \
  --name grafana \
  -p 3001:3000 \
  grafana/grafana
```

---

## Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill process
lsof -i :3000
kill -9 <PID>

# Or change port
npm run dev -- -p 3001
```

**Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**Database connection refused:**
- Verify PostgreSQL is running
- Check credentials in application.yml
- Ensure database exists and user has permissions

**Kafka connection timeout:**
- Verify Kafka broker is running
- Check bootstrap servers in config
- Review firewall rules

### Docker Issues

**Service won't start:**
```bash
# View logs
docker-compose logs service-name

# Remove containers and volumes
docker-compose down -v

# Rebuild
docker-compose build --no-cache
```

---

## Testing

### Frontend Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

### Backend Testing

```bash
# Unit tests
mvn test

# Integration tests
mvn verify

# Coverage
mvn jacoco:report
```

### API Testing

Using Postman or curl:

```bash
# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'

# Create pickup
curl -X POST http://localhost:8080/api/pickups \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{...}'
```

---

## Performance Optimization

### Database
- Enable query logging to identify slow queries
- Create indexes on frequently accessed columns
- Partition large tables

### Cache
- Configure Redis for session storage
- Cache frequently accessed data
- Set appropriate TTLs

### Backend
- Enable gzip compression
- Configure connection pooling
- Use async processing with Kafka

### Frontend
- Enable code splitting
- Optimize images
- Use lazy loading

---

## Security Checklist

- [ ] Change all default passwords
- [ ] Generate strong JWT secret (min 32 chars)
- [ ] Enable HTTPS/TLS
- [ ] Configure CORS properly
- [ ] Enable database encryption
- [ ] Set up firewall rules
- [ ] Enable audit logging
- [ ] Configure rate limiting
- [ ] Implement CSFR protection
- [ ] Regular security updates

---

## Maintenance

### Regular Tasks

**Daily:**
- Monitor system health
- Check error logs
- Verify backups

**Weekly:**
- Database maintenance
- Review security logs
- Update dependencies

**Monthly:**
- Full database backup
- Security audit
- Performance analysis

### Backup Strategy

```bash
# Daily automated backup
0 2 * * * pg_dump -U scrapninja scrapninja > /backups/daily-$(date +\%Y\%m\%d).sql

# Archive old backups after 30 days
0 3 * * * find /backups -name "daily-*.sql" -mtime +30 -delete
```

---

## Resource Requirements

### Development
- **CPU**: 2+ cores
- **RAM**: 8GB
- **Disk**: 20GB SSD

### Production
- **CPU**: 8+ cores
- **RAM**: 32GB+
- **Disk**: 100GB+ SSD
- **Network**: 1Gbps

---

## Support & Documentation

- **API Docs**: See `docs/API.md`
---

## Manual Java & Maven Installation (Windows)

If the automated setup scripts don't work for you, follow these steps:

### Step 1: Download Java 21 JDK

1. Visit: https://github.com/adoptium/temurin21-binaries/releases
2. Download the Windows x64 MSI installer:
   - Look for: `OpenJDK21U-jdk_x64_windows_hotspot_21.0.2_13.msi` (or latest 21.x version)
   - This is completely free (no Oracle account needed)

3. Run the installer:
   - Double-click the `.msi` file
   - Click "Next" through the wizard
   - Accept default path: `C:\Program Files\Java\jdk-21.x.x`
   - Click "Install" and wait for completion

4. Verify installation:
   ```powershell
   java -version
   javac -version
   ```
   You should see version 21.x.x for both commands

### Step 2: Download Maven 3.9.6

1. Visit: https://maven.apache.org/download.cgi
2. Download: `apache-maven-3.9.6-bin.zip` (not the source version)
3. Extract to `C:\Program Files\`:
   - Right-click the zip file
   - Select "Extract All..."
   - Extract to: `C:\Program Files\`
   - Result: `C:\Program Files\apache-maven-3.9.6\`

### Step 3: Configure Maven in System PATH

1. Press `Win + X` → Select "System" (or type "System" in Start menu)
2. Click "Advanced system settings" on left side
3. Click "Environment Variables..." button (bottom right)
4. Under "System variables" section, click "New..."
5. Create new variable:
   - Name: `MAVEN_HOME`
   - Value: `C:\Program Files\apache-maven-3.9.6`
   - Click "OK"

6. Find and select "Path" variable, then click "Edit..."
7. Click "New" and add:
   - `C:\Program Files\apache-maven-3.9.6\bin`
8. Click "OK" on all dialogs

### Step 4: Verify Maven Installation

1. **Close your PowerShell/CMD window completely**
2. **Open a NEW PowerShell or Command Prompt**
3. Run: `mvn -version`

Expected output:
```
Apache Maven 3.9.6
Maven home: C:\Program Files\apache-maven-3.9.6
Java version: 21.0.2, vendor: Eclipse Adoptium
```

If you see this, you're ready to build!

### Step 5: Build the Backend

```powershell
cd C:\Users\nalin\Desktop\scapninja\backend
mvn clean install
```

This will:
- Download ~500MB of dependencies (first run only, takes 3-5 minutes)
- Compile all 4 microservices
- Create `.jar` files in target directories
- Run any unit tests

---

## Troubleshooting Windows Setup

### Problem: "java -version" says "command not found"

**Cause**: Java installer didn't add itself to PATH, or terminal wasn't restarted

**Solution**:
1. Close PowerShell/CMD completely (all windows)
2. Open a NEW PowerShell/CMD
3. Try `java -version` again
4. If still not found, run in PowerShell:
   ```powershell
   $env:PATH = $env:PATH + ";C:\Program Files\Java\jdk-21.x.x\bin"
   java -version
   ```

### Problem: "mvn -version" says "command not found"

**Cause**: Maven PATH not properly added to system environment

**Solution**:
1. Close and reopen PowerShell/CMD
2. Verify PATH in PowerShell:
   ```powershell
   $env:PATH | Select-String "apache-maven"
   ```
3. If nothing shows, redo "Step 3: Configure Maven in System PATH"
4. After updating PATH, restart PowerShell/CMD

### Problem: Downloaded Java installer won't run

**Cause**: Windows blocked the download, or antivirus quarantined it

**Solution**:
1. Right-click the `.msi` file
2. Select "Properties"
3. Check "Unblock" checkbox at bottom
4. Click "Apply" → "OK"
5. Double-click to install

### Problem: Maven command starts but then says "Java not found"

**Cause**: Maven can't find Java even though it's installed

**Solution**:
1. Set JAVA_HOME environment variable:
2. Go to Environment Variables (as above)
3. Add new System Variable:
   - Name: `JAVA_HOME`
   - Value: `C:\Program Files\Java\jdk-21.x.x` (use your actual Java path)
4. Close and reopen PowerShell/CMD
5. Try `mvn -version` again

### Problem: Build fails with "Out of memory" error

**Cause**: Maven running out of RAM for compilation

**Solution**:
Set Maven memory in PowerShell before building:
```powershell
$env:MAVEN_OPTS = "-Xmx2048m"
mvn clean install
```

### Problem: Build fails downloading dependencies

**Cause**: Network timeout or Maven repository issue

**Solution**:
```powershell
# Clear Maven cache
rm -r $env:USERPROFILE\.m2\repository

# Try build again with offline skip
mvn clean install -DskipTests
```

---

## After Successful Build

Once `mvn clean install` completes successfully:

1. **To run the entire stack with Docker:**
   ```powershell
   cd C:\Users\nalin\Desktop\scapninja
   docker compose up -d
   ```

2. **To run services individually (without Docker):**
   ```powershell
   # Terminal 1: API Gateway
   cd C:\Users\nalin\Desktop\scapninja\backend\api-gateway
   java -jar target/api-gateway-1.0.0.jar
   
   # Terminal 2: Auth Service
   cd C:\Users\nalin\Desktop\scapninja\backend\auth-service
   java -jar target/auth-service-1.0.0.jar
   
   # Terminal 3: Pickup Service
   cd C:\Users\nalin\Desktop\scapninja\backend\pickup-service
   java -jar target/pickup-service-1.0.0.jar
   ```

3. **To run the frontend:**
   ```powershell
   cd C:\Users\nalin\Desktop\scapninja\frontend
   npm install  # Only needed once
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080

---

- **Architecture**: See `docs/ARCHITECTURE.md`
- **Issues**: GitHub Issues
- **Email**: support@scrapninja.ae

---

## License

© 2024 ScrapNinja. All rights reserved.
