# ScrapNinja Architecture

System architecture and technical design of the ScrapNinja platform.

---

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        User Clients                          │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│   │   Web App    │  │  Mobile PWA  │  │   API        │     │
│   │  (Next.js)   │  │   (React)    │  │  Consumers   │     │
│   └──────────────┘  └──────────────┘  └──────────────┘     │
└──────────────┬──────────────┬──────────────┬─────────────────┘
               │              │              │
          HTTP/HTTPS       HTTP/HTTPS    HTTP/HTTPS
               │              │              │
┌──────────────┴──────────────┴──────────────┴─────────────────┐
│                      API Gateway                             │
│           (Spring Cloud Gateway - Port 8080)                 │
│  • Request Routing • Rate Limiting • Load Balancing • CORS   │
└────────┬──────────────────┬─────────────────────┬────────────┘
         │                  │                     │
   Service Discovery    Service Mesh          Load Balancer
         │
    ┌────┴───────────────────────┬─────────────────────────┐
    │                            │                         │
┌───▼──────┐  ┌──────────┐  ┌────▼─────┐  ┌──────────────┐
│   Auth   │  │ Pickup   │  │ Pricing  │  │Other Services│
│ Service  │  │ Service  │  │ Service  │  │              │
│(8081)    │  │(8082)    │  │(8083)    │  │              │
└───┬──────┘  └──────┬───┘  └────┬─────┘  └──────────────┘
    │                │           │
    │ Service-to-Service Communication (OpenFeign)
    │
┌───┴─────────────────────────────────────────────────────────┐
│                  Data & Message Layer                        │
│  ┌─────────────────┐  ┌──────────┐  ┌──────────────────┐   │
│  │  PostgreSQL DB  │  │  Redis   │  │  Kafka Broker    │   │
│  │  (Port 5432)    │  │(6379)    │  │  (Port 9092)     │   │
│  │  • Users        │  │ • Cache  │  │ • Event Stream   │   │
│  │  • Pickups      │  │ • Session│  │ • Async Messages │   │
│  │  • Pricing      │  │ • Tokens │  │                  │   │
│  └─────────────────┘  └──────────┘  └──────────────────┘   │
└────────────────────────────────────────────────────────────┘
```

---

## Core Components

### 1. Frontend Layer

**Technology:** Next.js 14, React 18, TypeScript

**Key Features:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- API routes for backend integration
- File-based routing
- Built-in CSS support with TailwindCSS

**Structure:**
```
frontend/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── hooks/           # Custom React hooks
│   ├── services/        # API client
│   ├── schemas/         # Zod validation
│   └── styles/          # Global styles
├── public/              # Static assets
└── package.json         # Dependencies
```

**Key Libraries:**
- React Hook Form - Form state management
- Zod - Schema validation
- React Query - Server state management
- TailwindCSS - Utility-first CSS
- Lucide React - Icon library

### 2. API Gateway

**Technology:** Spring Cloud Gateway

**Responsibilities:**
- Route requests to appropriate microservices
- Load balancing across service instances
- Rate limiting and throttling
- CORS handling
- Request/response transformation
- Resilience (circuit breaker, retry)

**Routes:**
```yaml
/api/auth/** → Auth Service (8081)
/api/pickups/** → Pickup Service (8082)
/api/pricing/** → Pricing Service (8083)
```

### 3. Microservices

#### Auth Service (Port 8081)
**Purpose:** User authentication and authorization

**Key Operations:**
- User registration
- Login with JWT
- Token refresh
- Session management
- Role-based access control

**Database Tables:**
- users
- roles
- permissions
- audit_logs

#### Pickup Service (Port 8082)
**Purpose:** Scrap pickup request management

**Key Operations:**
- Create pickup requests
- Assign collectors
- Track pickup status
- Generate confirmation codes
- Publish Kafka events

**Database Tables:**
- pickup_requests
- pickup_items
- tracking_history

#### Pricing Service (Port 8083)
**Purpose:** Dynamic pricing and estimates

**Key Operations:**
- Calculate scrap prices
- Generate estimates
- Manage pricing rules
- Apply bulk discounts
- Cache price data

**Database Tables:**
- scrap_items
- pricing_rules

#### Additional Services (To Implement)
- **User Service** - User profile management
- **Payment Service** - Payment processing
- **Tracking Service** - Real-time GPS tracking
- **Notification Service** - Email/SMS alerts
- **Report Service** - ESG documentation

### 4. Data Layer

#### PostgreSQL Database
**Purpose:** Primary persistent storage

**Key Entities:**
```
Users
├── Collectors
├── Pickup Requests
│   └── Pickup Items
├── Transactions
├── Reports
└── Tracking History

Scrap Items
└── Pricing Rules
```

**Performance Features:**
- Connection pooling (HikariCP - 20 connections per service)
- Indexed queries
- Query optimization
- Transaction management

#### Redis Cache
**Purpose:** Session storage, token caching, rate limiting

**Uses:**
- JWT token blacklisting
- Session data
- Price cache
- Rate limiting counters

**Expiration Strategy:**
- Session: 24 hours
- Cache: 1-6 hours
- Tokens: 24 hours

#### Kafka Event Bus
**Purpose:** Asynchronous event processing

**Topics:**
```
pickup.created
├── Subscribers: Payment service, Notification service

pickup.assigned
├── Subscribers: Tracking service

pickup.completed
├── Subscribers: Payment service, Report service

payment.processed
├── Subscribers: Notification service
```

---

## Authentication Flow

```
┌─────────┐
│  User   │
└────┬────┘
     │ Login (email, password)
     ▼
┌─────────────────────┐
│  Auth Service       │
│  • Verify password  │
│  • Generate JWT     │
└────┬────────────────┘
     │ JWT Token + Refresh Token
     ▼
┌─────────────────────┐
│  Client             │
│  • Store token      │
│  • Include in calls │
└────┬────────────────┘
     │ API Request + JWT
     ▼
┌─────────────────────┐
│  API Gateway        │
│  • Verify JWT       │
│  • Route request    │
└─────────────────────┘
```

---

## Request Flow

```
1. User Action (Frontend)
   ↓
2. API Request with JWT token
   ↓
3. API Gateway
   - Rate limit check
   - JWT validation
   - CORS check
   ↓
4. Route to Service
   ↓
5. Service Processing
   - Database query
   - Kafka event publishing
   ↓
6. Response
   ↓
7. Frontend Update
```

---

## Event-Driven Architecture

### Kafka Event Flow

```
Pickup Service
  │
  └─ Publishes: pickup.created
       │
       ├─ Payment Service (Subscribe)
       │   └─ Creates pending payment
       │
       ├─ Notification Service (Subscribe)
       │   └─ Sends confirmation email
       │
       └─ Tracking Service (Subscribe)
           └─ Initializes tracking

Pickup Service
  │
  └─ Publishes: pickup.assigned
       │
       └─ Notification Service
           └─ Sends assignment notification
           └─ Sends SMS to collector
```

---

## Security Model

### Authentication & Authorization

```
┌──────────────────┐
│  JWT Token       │
│  Header: HS256   │
│  ├─ user_id      │
│  ├─ roles        │
│  └─ exp: 24h     │
└──────────────────┘
         │
         ▼
┌──────────────────┐
│  Authorization   │
│  Spring Security │
│  @PreAuthorize   │
└──────────────────┘
         │
         ▼
┌──────────────────┐
│  Resource Access │
│  Role-based      │
└──────────────────┘
```

### Security Layers
1. **Transport** - HTTPS/TLS
2. **Authentication** - JWT tokens
3. **Authorization** - Role-based access
4. **Data** - Parameterized queries
5. **Audit** - Audit logging

---

## Deployment Architecture

### Development Environment
```
Developer Machine
├── Frontend (Next.js)
├── Backend (Spring Boot)
├── PostgreSQL
├── Redis
└── Kafka
```

### Production Environment
```
┌─────────────────────┐
│   Load Balancer     │
│   (Nginx / ALB)     │
└────────┬────────────┘
         │
    ┌────┴────────┐
    │             │
┌───▼──┐      ┌──▼──┐
│ Node1│      │Node2 │  (Multiple instances)
├───────┤    ├──────┤
│ Front │    │ Front│
│ + API │    │ + API│
└───┬───┘    └──┬───┘
    │           │
    └─────┬─────┘
          │
    ┌─────▼──────────┐
    │ Managed Database│
    │  (RDS/Managed) │
    └────────────────┘
```

### Docker Compose Setup
```yaml
Services:
├── PostgreSQL
├── Redis
├── Kafka + Zookeeper
├── API Gateway
├── Auth Service
├── Pickup Service
├── Pricing Service
└── Frontend
```

---

## Scalability Considerations

### Horizontal Scaling
- Stateless microservices
- Load balancing
- Service discovery (Eureka - optional)
- Database connection pooling

### Vertical Scaling
- JVM tuning (G1GC for large heaps)
- Database optimization
- Cache configuration

### Performance Optimization
- Database indexing
- Query optimization
- Caching strategy (Redis)
- Async processing (Kafka)
- CDN for static assets

---

## Monitoring & Observability

### Metrics & Monitoring
- Spring Actuator endpoints
- Prometheus for metrics collection
- Grafana for visualization

### Logging
- Application logs (SLF4J)
- Structured logging
- Log aggregation (ELK stack)

### Tracing
- Distributed tracing (Micrometer)
- Request correlation IDs
- Service-to-service tracing

---

## Technology Stack Matrix

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Frontend** | Next.js | 14.x | Web framework |
| | React | 18.x | UI library |
| | TypeScript | 5.x | Type safety |
| | TailwindCSS | 3.x | CSS framework |
| **API** | Spring Cloud Gateway | 2023.0 | API routing |
| **Services** | Spring Boot | 3.2 | Framework |
| | Java | 21 | Runtime |
| | Spring Data JPA | 3.2 | ORM |
| **Database** | PostgreSQL | 14+ | Relational store |
| | Hibernate | 6.x | JPA implementation |
| **Cache** | Redis | 7.x | In-memory cache |
| **Messaging** | Apache Kafka | 3.5+ | Event streaming |
| **Security** | Spring Security | 6.x | Auth/authz |
| | JWT (JJWT) | 0.12 | Token handling |
| **Container** | Docker | 20.10+ | Containerization |
| | Docker Compose | 2.0+ | Orchestration |

---

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Point-in-time recovery
- Backup encryption
- Multi-region replication (optional)

### High Availability
- Database replication
- Service redundancy
- Failover mechanisms
- Health checks

---

## Compliance & Governance

### Data Protection
- GDPR compliance
- Data encryption
- Retention policies

### Audit & Logging
- User action tracking
- API access logging
- Change history

### Security Standards
- OWASP Top 10 prevention
- Regular security audits
- Vulnerability scanning

---

## Future Enhancements

### Short Term
- [ ] Implement remaining microservices
- [ ] Add swagger/OpenAPI documentation
- [ ] Implement comprehensive logging

### Medium Term
- [ ] Add real-time notifications (WebSocket)
- [ ] Implement machine learning pricing
- [ ] Add mobile app (React Native)

### Long Term
- [ ] Multi-region deployment
- [ ] Advanced analytics/BI
- [ ] IoT integration for tracking
- [ ] Blockchain for audit trail

---

## References

- [12-Factor App](https://12factor.net)
- [Microservices Pattern](https://microservices.io)
- [Spring Cloud Documentation](https://spring.io/cloud)
- [React Best Practices](https://react.dev)
- [PostgreSQL Tuning](https://wiki.postgresql.org)

---

## Support

For architecture questions or design discussions:
- Architecture Review Board: arch-team@scrapninja.ae
- Technical Documentation: https://wiki.scrapninja.ae
