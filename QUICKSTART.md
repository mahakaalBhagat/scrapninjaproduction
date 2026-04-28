# Quick Start Guide

Get ScrapNinja up and running in minutes.

## 🚀 Fastest Start (Docker)

### Prerequisites
- Docker & Docker Compose
- 8GB RAM

### Launch Everything

```bash
cd scapninja
docker-compose up -d
```

### Access Services
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8080/api
- **Docs**: http://localhost:3000 (see footer for links)

### Wait for Services
```bash
docker-compose ps
```

All services should show "healthy" ✅

### Test the API
```bash
# Health check
curl http://localhost:8080/actuator/health

# Login (test account)
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!!"}'
```

---

## 💻 Development Setup

### Frontend Only

```bash
cd frontend
npm install
npm run dev
# Opens http://localhost:3000
```

### Backend Only

```bash
cd backend
mvn clean install
mvn spring-boot:run -pl api-gateway
# Opens http://localhost:8080
```

---

## 📚 Common Commands

### Frontend
```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run type-check # Type checking
npm run lint       # Linting
npm run test       # Unit tests
```

### Backend
```bash
mvn clean install           # Build all services
mvn spring-boot:run -pl api-gateway  # Run one service
mvn test                    # Unit tests
mvn verify                  # Integration tests
```

### Docker
```bash
docker-compose up -d       # Start all services
docker-compose down        # Stop all services
docker-compose logs -f     # View logs
docker-compose ps          # Check status
```

---

## 🔑 Default Credentials

**Database:**
- User: `scrapninja`
- Password: `scrapninja_secure_pass`
- Host: `localhost`
- Port: `5432`

**Test Account (test in frontend):**
- Email: `test@example.com`
- Password: `Test123!!`

⚠️ **Change in production!**

---

## 📖 Documentation

- **Full Setup**: See [SETUP.md](./SETUP.md)
- **Architecture**: See [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)
- **API Reference**: See [docs/API.md](./docs/API.md)
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000
# Kill it
kill -9 <PID>
```

### Services Won't Start
```bash
# View detailed logs
docker-compose logs service-name

# Rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Database Issues
```bash
# Check database connection
psql -U scrapninja -d scrapninja -c "\dt"

# Reset database
docker-compose down -v
docker-compose up -d
```

---

## ✅ Checklist After Starting

- [ ] Frontend loads at http://localhost:3000
- [ ] API responds at http://localhost:8080/api/auth/health
- [ ] Database is accessible
- [ ] Can see all components rendering
- [ ] No console errors

---

## 🚢 Next Steps

1. **Explore the codebase**
   - Frontend: `frontend/src/components`
   - Backend: `backend/auth-service/src`

2. **Understand the design**
   - Colors: Primary Green `#0B7A3E`, Button Green `#0F9D58`
   - Typography: Inter/Poppins fonts
   - Spacing: 8px grid system

3. **Start developing**
   - Create new components in `frontend/src/components`
   - Implement new endpoints in microservices
   - Update database schema in `backend/src/main/resources/schema.sql`

4. **Read the docs**
   - API documentation
   - Architecture overview
   - Contributing guidelines

---

## 📞 Support

- **Issues**: GitHub Issues
- **Email**: support@scrapninja.ae
- **Docs**: https://scrapninja.ae/docs

---

## 🎯 Project Structure

```
scapninja/
├── frontend/          # Next.js web app
├── backend/           # Spring Boot services
│   ├── api-gateway/
│   ├── auth-service/
│   ├── pickup-service/
│   └── pricing-service/
├── docs/              # Documentation
├── docker-compose.yml # Services orchestration
└── README.md          # Project overview
```

---

## 🚀 Ready to Code?

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test thoroughly
4. Push and create a PR
5. See [CONTRIBUTING.md](./CONTRIBUTING.md) for details

Happy coding! 🎉
