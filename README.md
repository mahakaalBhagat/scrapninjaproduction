# ScrapNinja - Smart Scrap Collection Platform

ScrapNinja is Dubai's smartest scrap collection platform connecting households and businesses with verified scrap collectors. Built with modern tech stack for scalability, security, and user experience.

## 🎯 Project Overview

**Platform**: Web Application + Mobile PWA
**Status**: Production-Ready Architecture

## 📚 Architecture

### Frontend
- **Framework**: Next.js 14+ (React + TypeScript)
- **Styling**: TailwindCSS with custom theme
- **State Management**: React Query + Context API
- **Forms**: React Hook Form + Zod Validation
- **PWA**: Service Worker + Web Manifest

### Backend
- **Framework**: Java 21 + Spring Boot 3
- **Architecture**: Microservices with API Gateway
- **Security**: Spring Security + JWT
- **Database**: PostgreSQL
- **Cache**: Redis
- **Messaging**: Apache Kafka
- **Container**: Docker & Docker Compose

## 🏗️ Project Structure

```
scapninja/
├── frontend/              # Next.js React application
├── backend/               # Spring Boot microservices
├── docs/                  # API documentation
├── docker-compose.yml     # Services orchestration
├── .gitignore
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Java 21
- Docker & Docker Compose
- PostgreSQL 14+
- Redis 7+

### Development Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend Services
```bash
cd backend
./mvnw clean install
./mvnw spring-boot:run
```

#### Using Docker
```bash
docker-compose up -d
```

## 📱 Features

- **Instant Price Estimates**: Real-time scrap pricing
- **Verified Pickup Partners**: Trusted scrap collectors
- **Real-Time Tracking**: GPS tracking for pickups
- **Instant Payment**: Secure payment processing
- **ESG Reports**: Digital waste documentation
- **Mobile PWA**: Installable web app
- **Form Validation**: Secure input handling
- **Responsive Design**: Mobile-first UX

## 🎨 Design System

### Colors
- **Primary Green**: #0B7A3E
- **Button Green**: #0F9D58
- **Light Background**: #F5F7F6
- **Card Background**: #FFFFFF
- **Soft Section**: #EAF3EC
- **Footer Green**: #064E2A
- **Border**: #E5E7EB
- **Text Dark**: #1F2937
- **Muted Text**: #6B7280

### Typography
- **Font Family**: Inter / Poppins
- **Hero Title**: 42px (desktop), 28px (mobile)
- **Section Title**: 32px
- **Heading Weight**: 700
- **Body Weight**: 400

### Spacing & Radius
- **Grid**: 8px system
- **Border Radius**: 16px (cards), 10px (buttons)
- **Shadow**: Soft MD (rgba 0,0,0,0.08)

## 📝 API Documentation

See `docs/API.md` for complete API specifications.

## 🗄️ Database Schema

See `backend/src/main/resources/schema.sql` for schema details.

## 🔐 Security

- JWT-based authentication
- CORS enabled for frontend
- Input validation & sanitization
- SQL injection prevention with parameterized queries
- Password encryption with bcrypt

## 🐳 Docker Services

- `frontend`: Next.js app on port 3000
- `api-gateway`: Spring Cloud Gateway on port 8080
- `postgres`: Database on port 5432
- `redis`: Cache on port 6379
- `kafka`: Message broker on port 9092

## 📦 Microservices

1. **auth-service**: User authentication & JWT
2. **user-service**: User profiles & management
3. **pickup-service**: Pickup request management
4. **pricing-service**: Scrap price calculation
5. **tracking-service**: Real-time GPS tracking
6. **payment-service**: Payment processing
7. **notification-service**: Email & SMS alerts
8. **report-service**: ESG reports generation

## 👥 Team

Built with ❤️ for sustainable waste management.

## 📄 License

Proprietary - All Rights Reserved

## 📞 Contact

- **Email**: info@goscrapninja.com
- **Phone**:  +91 6306607679
- **Location**: Dubai, United Arab Emirates
