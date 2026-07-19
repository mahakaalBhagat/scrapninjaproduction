# 🚀 Quick Start - Scrap Items Module

## TL;DR - Run Everything in 2 Minutes

### Prerequisites
- ✅ Docker Desktop running (PostgreSQL via docker-compose)
- ✅ Node.js 18+ installed
- ✅ Maven installed
- ✅ Java 11+ installed

### Step 1: Database (Already Running)
```bash
# Just verify it's running
docker-compose ps
# You should see: appdb - UP
```

### Step 2: Start Backend API
```bash
cd backend/scrap-items-service
mvn spring-boot:run
# Wait for: "Started ScrapItemsServiceApplication in X.XXX seconds"
```

### Step 3: Start Frontend
```bash
cd frontend
npm install  # (if first time)
npm run dev
# Wait for: "ready - started server on 0.0.0.0:3000"
```

### Step 4: View in Browser
```
Open: http://localhost:3000/scrap-items
```

You should see **23 scrap items** across **6 categories** with real data from PostgreSQL!

---

## 🧪 Quick API Test

```bash
# Test backend is running (from any terminal)
curl http://localhost:8085/scrap-items-service/api/scrap-items | json_pp

# Expected: Array of 23 items with names, prices, categories
```

---

## 📊 What You Get

✅ **23 Scrap Items** from database
- Paper, Plastic, Metals, E-Waste, Appliances, Vehicles

✅ **Real Pricing Data**
- 4 AED/kg to 15,000 AED/unit

✅ **Interactive UI**
- Filter by category
- Search functionality
- Environmental warnings
- Responsive design

✅ **Live API Integration**
- Frontend calls real backend
- No mock data
- CORS enabled
- Error handling

---

## 🔗 Important URLs

| Component | URL | Port |
|-----------|-----|------|
| Frontend | http://localhost:3000 | 3000 |
| Backend API | http://localhost:8085 | 8085 |
| PostgreSQL | localhost | 5432 |
| Scrap Items Page | http://localhost:3000/scrap-items | 3000 |

---

## 📦 Database Credentials

From `docker-compose.yml`:
```
Host: localhost
Port: 5432
Database: appdb
Username: admin
Password: admin123
```

---

## 🆘 Troubleshooting

### "Cannot connect to PostgreSQL"
```bash
# Check if running
docker-compose ps
# Should show appdb container UP

# If not running
docker-compose up -d
```

### "Failed to fetch items" (frontend)
1. Check backend is running: `curl http://localhost:8085`
2. Check `.env.local` has `NEXT_PUBLIC_API_URL=http://localhost:8085`
3. Check browser console for errors
4. Restart frontend: `npm run dev`

### "Schema not found" (backend)
```bash
# Initialize database schema
cd backend
psql -U admin -d appdb -f scrap-items-schema.sql

# Verify
psql -U admin -d appdb -c "SELECT COUNT(*) FROM scrap_items.items;"
# Should show: 23
```

### Port Already in Use
```bash
# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9

# Kill process on port 8085 (backend)
lsof -ti:8085 | xargs kill -9
```

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `backend/scrap-items-schema.sql` | Database schema with 23 items |
| `backend/scrap-items-service/src/main/java/...` | Backend entities, controllers, services |
| `frontend/src/services/scrapApi.ts` | Frontend API integration |
| `.env.local` | Frontend API configuration |
| `SCRAP_ITEMS_SETUP.md` | Complete setup guide |

---

## ✅ Verification Checklist

- [ ] Docker is running with PostgreSQL
- [ ] Backend starts without errors
- [ ] Frontend builds successfully
- [ ] Browser shows 23 scrap items
- [ ] Can filter by category
- [ ] Search works
- [ ] Environmental warnings visible

---

## 📊 API Endpoints (Quick Reference)

```
GET  /api/scrap-items                    → All items
GET  /api/scrap-items/{id}               → Single item
GET  /api/scrap-items/category/1         → Items in category 1
GET  /api/scrap-items/search?query=plastic → Search
GET  /api/categories                     → All categories
```

---

## 💡 Pro Tips

1. **Monitor Database**
   ```bash
   # Real-time query in another terminal
   watch 'psql -U admin -d appdb -c "SELECT COUNT(*) FROM scrap_items.items;"'
   ```

2. **Check Logs**
   ```bash
   # Backend logs
   tail -f backend/logs/scrap-items-service.log
   
   # Frontend browser console
   # Press F12 in browser
   ```

3. **Test API Easily**
   ```bash
   # Install httpie for prettier output
   pip install httpie
   http GET localhost:8085/scrap-items-service/api/scrap-items
   ```

4. **Build Backend Only (faster)**
   ```bash
   cd backend/scrap-items-service
   mvn clean package -DskipTests -q
   ```

---

## 🎯 Success = You See This

When you open http://localhost:3000/scrap-items, you should see:

```
┌─────────────────────────────────────┐
│   SCRAP ITEMS MARKETPLACE           │
├─────────────────────────────────────┤
│ Filter: All Items | Paper | Plastic │
│         Metals | E-Waste | ...      │
├─────────────────────────────────────┤
│ Search: [_____________]             │
├─────────────────────────────────────┤
│ ┌────────────┐ ┌────────────┐       │
│ │ 📰 News    │ │ 🍾 Bottles │       │
│ │ $5/kg      │ │ $10/kg     │       │
│ │ ♻️ Recyc.. │ │ ♻️ Recyc.. │  ... │
│ │ [+ ADD]    │ │ [+ ADD]    │       │
│ └────────────┘ └────────────┘       │
│ ... (23 items total)                │
└─────────────────────────────────────┘
```

**And it displays real data from PostgreSQL!** 🎉

---

## 📖 Full Documentation

See `SCRAP_ITEMS_SETUP.md` for complete setup instructions
See `SCRAP_ITEMS_IMPLEMENTATION.md` for architecture details

---

**Status:** ✅ Ready to Go!  
**Time to Run:** ~2 minutes  
**Data:** 23 items × 6 categories from database
