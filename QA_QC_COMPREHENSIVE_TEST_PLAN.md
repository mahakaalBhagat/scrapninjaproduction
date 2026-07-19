# ScrapNinja - Comprehensive QA/QC Test Plan & Audit Report

**Date:** 2026-07-14
**Audit Scope:** Full Stack (Frontend, Backend, Database)
**Status:** Comprehensive Testing Framework

---

## 📋 TEST PLAN OVERVIEW

### Test Coverage Scope
- ✅ Frontend Pages & Components (11 Vendor Pages)
- ✅ Backend APIs (Auth, Pickup, Pricing Services)
- ✅ Database Schema & Integrity
- ✅ User Authentication Flows
- ✅ Business Logic Flows
- ✅ Error Handling & Edge Cases
- ✅ Performance & Security

---

## 1. FRONTEND TEST SCENARIOS

### 1.1 Landing Page (`/`) - Public Pages

#### Test Cases:
| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.1.1 | Page loads without errors | All sections visible | ⏳ TO TEST |
| 1.1.2 | Navbar navigation works | Links navigate correctly | ⏳ TO TEST |
| 1.1.3 | Hero section displays properly | CTA buttons clickable | ⏳ TO TEST |
| 1.1.4 | Stats section renders correctly | Numbers display accurately | ⏳ TO TEST |
| 1.1.5 | Problem/Solution sections display | Content visible, no layout issues | ⏳ TO TEST |
| 1.1.6 | Contact form validation | Required fields show errors | ⏳ TO TEST |
| 1.1.7 | Contact form submission | Data sent to backend, success message | ⏳ TO TEST |
| 1.1.8 | Mobile responsiveness | Layout adapts to mobile (xs, sm, md) | ⏳ TO TEST |
| 1.1.9 | PWA install prompt | Install button appears on mobile | ⏳ TO TEST |
| 1.1.10 | Service Worker caching | Offline mode works | ⏳ TO TEST |

### 1.2 Vendor Login Page (`/vendor-login`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.2.1 | Page loads with form | Email and password inputs visible | ⏳ TO TEST |
| 1.2.2 | Email validation | Invalid email shows error | ⏳ TO TEST |
| 1.2.3 | Password field masked | Password hidden in input | ⏳ TO TEST |
| 1.2.4 | Login with correct credentials | Redirects to dashboard | ⏳ TO TEST |
| 1.2.5 | Login with wrong password | Shows error message | ⏳ TO TEST |
| 1.2.6 | Login with non-existent user | Shows error message | ⏳ TO TEST |
| 1.2.7 | JWT token saved to localStorage | Token persists on refresh | ⏳ TO TEST |
| 1.2.8 | Remember me functionality | Credentials stored securely | ⏳ TO TEST |
| 1.2.9 | Forgot password link works | Redirects to password reset | ⏳ TO TEST |
| 1.2.10 | Login form accessible | Tab navigation works | ⏳ TO TEST |

### 1.3 Vendor Dashboard (`/vendor/dashboard`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.3.1 | Dashboard loads with auth token | All sections visible | ⏳ TO TEST |
| 1.3.2 | Sidebar navigation renders | All menu items present | ⏳ TO TEST |
| 1.3.3 | Sidebar toggle animation | Smooth collapse/expand | ⏳ TO TEST |
| 1.3.4 | StatsCard components display | 4 cards with correct values | ⏳ TO TEST |
| 1.3.5 | Recent jobs section loads | Job data displayed in table | ⏳ TO TEST |
| 1.3.6 | Status badges colored correctly | In Progress=blue, Pending=yellow, Completed=green | ⏳ TO TEST |
| 1.3.7 | View All Jobs link works | Navigates to jobs page | ⏳ TO TEST |
| 1.3.8 | Quick stats display | Completion rate, collections, rating visible | ⏳ TO TEST |
| 1.3.9 | Page animations smooth | Fade-in and stagger effects working | ⏳ TO TEST |
| 1.3.10 | Responsive on mobile | Sidebar hidden, content full-width | ⏳ TO TEST |

### 1.4 Jobs Management (`/vendor/jobs`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.4.1 | Jobs page loads | Table with jobs data visible | ⏳ TO TEST |
| 1.4.2 | Search functionality works | Filters jobs by location/material | ⏳ TO TEST |
| 1.4.3 | Filter button opens filter modal | Options available | ⏳ TO TEST |
| 1.4.4 | Create Job button works | Modal opens for new job | ⏳ TO TEST |
| 1.4.5 | Job form validation | Required fields enforced | ⏳ TO TEST |
| 1.4.6 | Create job submission | Job added to table, success message | ⏳ TO TEST |
| 1.4.7 | View job details | Details modal/page opens | ⏳ TO TEST |
| 1.4.8 | Edit job functionality | Updates job data | ⏳ TO TEST |
| 1.4.9 | Delete job functionality | Removes job with confirmation | ⏳ TO TEST |
| 1.4.10 | Pagination works | Can navigate through pages | ⏳ TO TEST |

### 1.5 Calendar (`/vendor/calendar`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.5.1 | Calendar page loads | Calendar widget displays | ⏳ TO TEST |
| 1.5.2 | Calendar navigation | Month forward/back buttons work | ⏳ TO TEST |
| 1.5.3 | Event highlights | Days with events highlighted | ⏳ TO TEST |
| 1.5.4 | Event list displays | Upcoming events show correctly | ⏳ TO TEST |
| 1.5.5 | Event click works | Shows event details | ⏳ TO TEST |
| 1.5.6 | Status badges on events | Correct color coding | ⏳ TO TEST |
| 1.5.7 | Mobile calendar view | Responsive on small screens | ⏳ TO TEST |

### 1.6 History (`/vendor/history`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.6.1 | History page loads | Transaction table visible | ⏳ TO TEST |
| 1.6.2 | StatsCard metrics display | Revenue, jobs, carbon saved showing | ⏳ TO TEST |
| 1.6.3 | Search by location works | Filters results | ⏳ TO TEST |
| 1.6.4 | Date range filtering | Filters by date range | ⏳ TO TEST |
| 1.6.5 | Export CSV button works | Downloads data as CSV | ⏳ TO TEST |
| 1.6.6 | Revenue column accurate | Correct monetary values | ⏳ TO TEST |

### 1.7 Payments (`/vendor/payments`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.7.1 | Payments page loads | Stats and history visible | ⏳ TO TEST |
| 1.7.2 | Total earnings displays | Correct amount shown | ⏳ TO TEST |
| 1.7.3 | Pending payments section | Shows pending payouts | ⏳ TO TEST |
| 1.7.4 | Payment history table loads | All payments listed | ⏳ TO TEST |
| 1.7.5 | Payment status color-coded | Completed=green, Pending=yellow | ⏳ TO TEST |
| 1.7.6 | Export payments button | Downloads payment data | ⏳ TO TEST |

### 1.8 Profile (`/vendor/profile`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.8.1 | Profile page loads | All profile sections visible | ⏳ TO TEST |
| 1.8.2 | Profile info displays | Company name, contact, rating shown | ⏳ TO TEST |
| 1.8.3 | Edit profile button works | Enables edit mode | ⏳ TO TEST |
| 1.8.4 | Form field validation | Required fields enforced | ⏳ TO TEST |
| 1.8.5 | Save profile changes | Updates data on backend | ⏳ TO TEST |
| 1.8.6 | Upload document works | Files uploaded successfully | ⏳ TO TEST |
| 1.8.7 | Download documents | Files downloadable | ⏳ TO TEST |

### 1.9 Settings (`/vendor/settings`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.9.1 | Settings page loads | All setting sections visible | ⏳ TO TEST |
| 1.9.2 | Notification settings toggle | Preferences saved | ⏳ TO TEST |
| 1.9.3 | Password change works | Old password verified, new password set | ⏳ TO TEST |
| 1.9.4 | Two-factor authentication | Can enable/disable 2FA | ⏳ TO TEST |
| 1.9.5 | API key generation | Creates new API key | ⏳ TO TEST |
| 1.9.6 | Session management | Can logout from other devices | ⏳ TO TEST |

### 1.10 Analytics (`/vendor/analytics`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.10.1 | Analytics page loads | Dashboard with metrics visible | ⏳ TO TEST |
| 1.10.2 | StatsCard grid displays | All KPIs showing | ⏳ TO TEST |
| 1.10.3 | Revenue chart renders | Chart displays revenue trend | ⏳ TO TEST |
| 1.10.4 | Jobs chart renders | Job distribution visible | ⏳ TO TEST |
| 1.10.5 | Date range filter works | Updates charts | ⏳ TO TEST |
| 1.10.6 | Export analytics | Downloads report | ⏳ TO TEST |

### 1.11 Notifications (`/vendor/notifications`)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.11.1 | Notifications page loads | All notifications visible | ⏳ TO TEST |
| 1.11.2 | Notification badges | Unread count displays | ⏳ TO TEST |
| 1.11.3 | Mark as read works | Notification status updates | ⏳ TO TEST |
| 1.11.4 | Delete notification works | Removes notification | ⏳ TO TEST |
| 1.11.5 | Real-time notifications | New notifications appear without refresh | ⏳ TO TEST |

### 1.12 Design System Components

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| 1.12.1 | Button component variants | All 7 variants render correctly | ⏳ TO TEST |
| 1.12.2 | Input component validation | Shows errors, help text | ⏳ TO TEST |
| 1.12.3 | Card component padding | Correct spacing in all variants | ⏳ TO TEST |
| 1.12.4 | Badge component colors | All 6 variants display correctly | ⏳ TO TEST |
| 1.12.5 | Modal animations | Smooth open/close transitions | ⏳ TO TEST |
| 1.12.6 | SearchBar functionality | Clear button works, onChange fires | ⏳ TO TEST |
| 1.12.7 | Table component | Rows display, hover effects work | ⏳ TO TEST |
| 1.12.8 | Sidebar toggle animation | Smooth width transition | ⏳ TO TEST |
| 1.12.9 | Color consistency | Primary colors match design system | ⏳ TO TEST |
| 1.12.10 | Typography consistency | Font sizes, weights correct | ⏳ TO TEST |

---

## 2. BACKEND API TEST SCENARIOS

### 2.1 Authentication Service (Port 8081)

#### Test Cases:

| # | Test Case | Endpoint | Expected | Status |
|---|-----------|----------|----------|--------|
| 2.1.1 | Service health check | GET /actuator/health | 200 OK | ⏳ TO TEST |
| 2.1.2 | Register new user | POST /api/auth/register | 201 Created | ⏳ TO TEST |
| 2.1.3 | Register duplicate email | POST /api/auth/register | 400 Bad Request | ⏳ TO TEST |
| 2.1.4 | Login valid credentials | POST /api/auth/login | 200 + JWT token | ⏳ TO TEST |
| 2.1.5 | Login invalid credentials | POST /api/auth/login | 401 Unauthorized | ⏳ TO TEST |
| 2.1.6 | JWT token validation | GET /api/auth/validate | 200 Valid | ⏳ TO TEST |
| 2.1.7 | Token refresh | POST /api/auth/refresh | 200 + New token | ⏳ TO TEST |
| 2.1.8 | Logout endpoint | POST /api/auth/logout | 200 OK | ⏳ TO TEST |
| 2.1.9 | Password change | POST /api/auth/password-change | 200 OK | ⏳ TO TEST |
| 2.1.10 | Forgot password | POST /api/auth/forgot-password | 200 OK | ⏳ TO TEST |
| 2.1.11 | Role-based access | GET /api/auth/user/role | 200 + Role info | ⏳ TO TEST |

### 2.2 Pickup Service (Port 8082)

| # | Test Case | Endpoint | Expected | Status |
|---|-----------|----------|----------|--------|
| 2.2.1 | Get all pickups | GET /api/pickups | 200 + Array | ⏳ TO TEST |
| 2.2.2 | Get pickup by ID | GET /api/pickups/{id} | 200 + Object | ⏳ TO TEST |
| 2.2.3 | Get non-existent pickup | GET /api/pickups/999 | 404 Not Found | ⏳ TO TEST |
| 2.2.4 | Create pickup request | POST /api/pickups | 201 Created | ⏳ TO TEST |
| 2.2.5 | Create with invalid data | POST /api/pickups | 400 Bad Request | ⏳ TO TEST |
| 2.2.6 | Update pickup status | PUT /api/pickups/{id} | 200 OK | ⏳ TO TEST |
| 2.2.7 | Assign collector to pickup | PUT /api/pickups/{id}/assign | 200 OK | ⏳ TO TEST |
| 2.2.8 | Delete pickup | DELETE /api/pickups/{id} | 200 OK | ⏳ TO TEST |
| 2.2.9 | Get pickup items | GET /api/pickups/{id}/items | 200 + Array | ⏳ TO TEST |
| 2.2.10 | Get tracking history | GET /api/pickups/{id}/tracking | 200 + Array | ⏳ TO TEST |

### 2.3 Pricing Service (Port 8083)

| # | Test Case | Endpoint | Expected | Status |
|---|-----------|----------|----------|--------|
| 2.3.1 | Get all scrap items | GET /api/pricing/items | 200 + Array | ⏳ TO TEST |
| 2.3.2 | Get item price | GET /api/pricing/items/{id} | 200 + Price | ⏳ TO TEST |
| 2.3.3 | Calculate estimate | POST /api/pricing/estimate | 200 + Quote | ⏳ TO TEST |
| 2.3.4 | Calculate with weight | POST /api/pricing/estimate | 200 + Price | ⏳ TO TEST |
| 2.3.5 | Get pricing rules | GET /api/pricing/rules | 200 + Array | ⏳ TO TEST |
| 2.3.6 | Update pricing rule | PUT /api/pricing/rules/{id} | 200 OK | ⏳ TO TEST |
| 2.3.7 | Apply bulk discount | POST /api/pricing/discount | 200 + New Price | ⏳ TO TEST |
| 2.3.8 | Get price history | GET /api/pricing/history | 200 + Array | ⏳ TO TEST |
| 2.3.9 | Real-time metal index | GET /api/pricing/market | 200 + Index | ⏳ TO TEST |

### 2.4 API Gateway Tests (Port 8080)

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 2.4.1 | Gateway health check | 200 OK | ⏳ TO TEST |
| 2.4.2 | Request routing to Auth | Routes to 8081 | ⏳ TO TEST |
| 2.4.3 | Request routing to Pickup | Routes to 8082 | ⏳ TO TEST |
| 2.4.4 | Request routing to Pricing | Routes to 8083 | ⏳ TO TEST |
| 2.4.5 | Rate limiting enforcement | 429 after threshold | ⏳ TO TEST |
| 2.4.6 | CORS headers present | Correct headers | ⏳ TO TEST |
| 2.4.7 | JWT validation at gateway | 401 if invalid | ⏳ TO TEST |

---

## 3. DATABASE SCHEMA & INTEGRITY TESTS

### 3.1 Database Schema Verification

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 3.1.1 | PostgreSQL connection | Successfully connects | ⏳ TO TEST |
| 3.1.2 | All tables exist | 15+ tables present | ⏳ TO TEST |
| 3.1.3 | Users table structure | Correct columns, constraints | ⏳ TO TEST |
| 3.1.4 | Pickups table structure | Correct columns, constraints | ⏳ TO TEST |
| 3.1.5 | Pricing table structure | Correct columns, constraints | ⏳ TO TEST |
| 3.1.6 | Primary keys set | All tables have PK | ⏳ TO TEST |
| 3.1.7 | Foreign keys set | Relationships intact | ⏳ TO TEST |
| 3.1.8 | Indexes created | Performance indexes present | ⏳ TO TEST |
| 3.1.9 | Default values set | Defaults applied correctly | ⏳ TO TEST |
| 3.1.10 | Column types correct | INT, VARCHAR, TIMESTAMP, etc. | ⏳ TO TEST |

### 3.2 Data Integrity Tests

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 3.2.1 | Unique constraint enforcement | Duplicate email rejected | ⏳ TO TEST |
| 3.2.2 | NOT NULL constraint | Missing required field rejected | ⏳ TO TEST |
| 3.2.3 | Foreign key constraint | Invalid foreign key rejected | ⏳ TO TEST |
| 3.2.4 | Referential integrity | Cascade delete works | ⏳ TO TEST |
| 3.2.5 | Check constraints | Invalid values rejected | ⏳ TO TEST |
| 3.2.6 | Timestamp auto-updates | created_at, updated_at work | ⏳ TO TEST |
| 3.2.7 | Data encryption | Passwords hashed (bcrypt) | ⏳ TO TEST |
| 3.2.8 | UUID generation | Primary keys are UUIDs | ⏳ TO TEST |

### 3.3 Database Performance Tests

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 3.3.1 | Query performance | Queries < 100ms | ⏳ TO TEST |
| 3.3.2 | Join operations | Multiple table joins work | ⏳ TO TEST |
| 3.3.3 | Aggregation queries | SUM, COUNT, AVG work | ⏳ TO TEST |
| 3.3.4 | Pagination | Large datasets paginated | ⏳ TO TEST |
| 3.3.5 | Connection pooling | HikariCP configured | ⏳ TO TEST |
| 3.3.6 | Transaction handling | ACID compliance | ⏳ TO TEST |

---

## 4. INTEGRATION & END-TO-END TESTS

### 4.1 User Registration Flow

| # | Step | Expected Result | Status |
|---|------|-----------------|--------|
| 4.1.1 | Visit signup page | Form loads | ⏳ TO TEST |
| 4.1.2 | Enter valid email | Email passes validation | ⏳ TO TEST |
| 4.1.3 | Enter password | Password strength indicator works | ⏳ TO TEST |
| 4.1.4 | Submit form | User created in database | ⏳ TO TEST |
| 4.1.5 | Verify email sent | Confirmation email received | ⏳ TO TEST |
| 4.1.6 | Click email link | Account activated | ⏳ TO TEST |
| 4.1.7 | Login with new account | Session created | ⏳ TO TEST |

### 4.2 Vendor Login Flow

| # | Step | Expected Result | Status |
|---|------|-----------------|--------|
| 4.2.1 | Visit vendor login | Login form displays | ⏳ TO TEST |
| 4.2.2 | Enter email | Email field accepts input | ⏳ TO TEST |
| 4.2.3 | Enter password | Password field masks input | ⏳ TO TEST |
| 4.2.4 | Click submit | Authentication request sent | ⏳ TO TEST |
| 4.2.5 | Backend validates | JWT token generated | ⏳ TO TEST |
| 4.2.6 | Token stored | localStorage contains JWT | ⏳ TO TEST |
| 4.2.7 | Redirect to dashboard | Dashboard loads | ⏳ TO TEST |
| 4.2.8 | Sidebar displays | Navigation available | ⏳ TO TEST |

### 4.3 Create Pickup Request Flow

| # | Step | Expected Result | Status |
|---|------|-----------------|--------|
| 4.3.1 | Click Create New Job | Modal/form opens | ⏳ TO TEST |
| 4.3.2 | Select location | Dropdown loads locations | ⏳ TO TEST |
| 4.3.3 | Select scrap type | Material type options show | ⏳ TO TEST |
| 4.3.4 | Enter weight | Weight input accepts number | ⏳ TO TEST |
| 4.3.5 | Select date/time | Datepicker works | ⏳ TO TEST |
| 4.3.6 | Submit form | API call to backend | ⏳ TO TEST |
| 4.3.7 | Database insert | Pickup created in DB | ⏳ TO TEST |
| 4.3.8 | Kafka event published | Event in Kafka topic | ⏳ TO TEST |
| 4.3.9 | Notification sent | Email/SMS to user | ⏳ TO TEST |
| 4.3.10 | UI updates | New job appears in list | ⏳ TO TEST |

### 4.4 Payment Processing Flow

| # | Step | Expected Result | Status |
|---|------|-----------------|--------|
| 4.4.1 | View pending payment | Payment displayed on dashboard | ⏳ TO TEST |
| 4.4.2 | Click Process Payment | Payment form opens | ⏳ TO TEST |
| 4.4.3 | Select payment method | Options available | ⏳ TO TEST |
| 4.4.4 | Enter payment details | Fields accept input | ⏳ TO TEST |
| 4.4.5 | Submit payment | Payment API called | ⏳ TO TEST |
| 4.4.6 | Payment processed | Transaction in database | ⏳ TO TEST |
| 4.4.7 | Confirmation email sent | User receives receipt | ⏳ TO TEST |
| 4.4.8 | Payment status updated | Dashboard shows "Completed" | ⏳ TO TEST |

---

## 5. SECURITY TESTS

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 5.1 | SQL Injection | Query parameterized, injection blocked | ⏳ TO TEST |
| 5.2 | XSS Prevention | Scripts sanitized, encoded | ⏳ TO TEST |
| 5.3 | CSRF Protection | CSRF tokens required | ⏳ TO TEST |
| 5.4 | JWT Expiration | Token expires after 24h | ⏳ TO TEST |
| 5.5 | Password Hashing | Passwords bcrypt hashed | ⏳ TO TEST |
| 5.6 | HTTPS Enforcement | Redirects to HTTPS | ⏳ TO TEST |
| 5.7 | CORS Headers | Only allowed origins accepted | ⏳ TO TEST |
| 5.8 | Rate Limiting | API throttled at 100 req/min | ⏳ TO TEST |
| 5.9 | Input Validation | All inputs validated | ⏳ TO TEST |
| 5.10 | Authorization Checks | Users can only access own data | ⏳ TO TEST |

---

## 6. PERFORMANCE TESTS

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 6.1 | Page load time | < 3 seconds | ⏳ TO TEST |
| 6.2 | API response time | < 500ms | ⏳ TO TEST |
| 6.3 | Database query time | < 100ms | ⏳ TO TEST |
| 6.4 | Concurrent users (100) | System stable | ⏳ TO TEST |
| 6.5 | Memory usage | < 512MB | ⏳ TO TEST |
| 6.6 | Image optimization | Responsive images load fast | ⏳ TO TEST |
| 6.7 | CSS/JS minification | Assets < 100KB | ⏳ TO TEST |
| 6.8 | Cache effectiveness | Redis cache hit rate > 80% | ⏳ TO TEST |

---

## 7. BROWSER & DEVICE COMPATIBILITY

| Browser | Desktop | Mobile | Status |
|---------|---------|--------|--------|
| Chrome Latest | ⏳ TO TEST | ⏳ TO TEST | |
| Firefox Latest | ⏳ TO TEST | ⏳ TO TEST | |
| Safari Latest | ⏳ TO TEST | ⏳ TO TEST | |
| Edge Latest | ⏳ TO TEST | ⏳ TO TEST | |
| Mobile Safari (iOS) | - | ⏳ TO TEST | |
| Chrome Android | - | ⏳ TO TEST | |

---

## 8. CRITICAL PATH TEST SCENARIOS

### Scenario 1: Complete User Journey

```
1. User visits landing page
   ↓
2. User clicks "Get Started"
   ↓
3. User registers as vendor
   ↓
4. User verifies email
   ↓
5. User logs in to vendor portal
   ↓
6. User views dashboard
   ↓
7. User creates pickup request
   ↓
8. Payment processed
   ↓
9. Confirmation received
```

### Scenario 2: Admin Operations

```
1. Admin logs in
   ↓
2. Admin views all pickups
   ↓
3. Admin assigns collector
   ↓
4. Admin updates pricing
   ↓
5. Admin generates reports
   ↓
6. Admin views analytics
```

---

## 9. DATA VALIDATION TESTS

| # | Test Case | Input | Expected | Status |
|---|-----------|-------|----------|--------|
| 9.1 | Email format | "test@example.com" | ✅ Valid | ⏳ TO TEST |
| 9.2 | Email format | "invalid-email" | ❌ Invalid | ⏳ TO TEST |
| 9.3 | Phone format | "+971501234567" | ✅ Valid | ⏳ TO TEST |
| 9.4 | Phone format | "123" | ❌ Invalid | ⏳ TO TEST |
| 9.5 | Weight validation | 500 (kg) | ✅ Valid | ⏳ TO TEST |
| 9.6 | Weight validation | -10 (kg) | ❌ Invalid | ⏳ TO TEST |
| 9.7 | Date validation | 2026-07-14 | ✅ Valid | ⏳ TO TEST |
| 9.8 | Date validation | Past date | ❌ Invalid | ⏳ TO TEST |

---

## 10. ERROR HANDLING TESTS

| # | Test Case | Error Scenario | Expected Handling | Status |
|---|-----------|----------------|-------------------|--------|
| 10.1 | Network error | No internet | Retry prompt shown | ⏳ TO TEST |
| 10.2 | Server error | 500 error | Error message displayed | ⏳ TO TEST |
| 10.3 | Timeout | Request timeout | Timeout message shown | ⏳ TO TEST |
| 10.4 | Invalid token | Expired JWT | Redirect to login | ⏳ TO TEST |
| 10.5 | Not found | 404 error | 404 page displayed | ⏳ TO TEST |
| 10.6 | Unauthorized | 403 error | Access denied message | ⏳ TO TEST |
| 10.7 | Validation error | Invalid input | Field error highlighted | ⏳ TO TEST |

---

## 11. ACCESSIBILITY TESTS

| # | Test Case | Expected | Status |
|---|-----------|----------|--------|
| 11.1 | Keyboard navigation | Tab through all interactive elements | ⏳ TO TEST |
| 11.2 | Screen reader support | Labels accessible to screen readers | ⏳ TO TEST |
| 11.3 | Color contrast | Text has sufficient contrast (WCAG AA) | ⏳ TO TEST |
| 11.4 | Focus indicators | Focus visible on all interactive elements | ⏳ TO TEST |
| 11.5 | Form labels | All inputs have associated labels | ⏳ TO TEST |
| 11.6 | Alt text | Images have alt text | ⏳ TO TEST |
| 11.7 | Mobile accessibility | Touch targets > 48px | ⏳ TO TEST |

---

## 12. TEST EXECUTION PRIORITY

### Priority 1 (Critical - Must Test First)
- [ ] Login functionality (blocking issue if broken)
- [ ] Dashboard loads (main entry point)
- [ ] API Gateway routing
- [ ] Database connectivity
- [ ] JWT token validation

### Priority 2 (High - Test Soon)
- [ ] Create pickup request
- [ ] Payment processing
- [ ] User profile
- [ ] CRUD operations on all resources

### Priority 3 (Medium - Test Next)
- [ ] Advanced filtering/search
- [ ] Analytics/reports
- [ ] Notifications
- [ ] Performance optimization

### Priority 4 (Low - Test When Time Allows)
- [ ] Edge cases
- [ ] Rare error scenarios
- [ ] Performance under load
- [ ] Browser compatibility

---

## SUMMARY

**Total Test Cases:** 200+
**Coverage Areas:** Frontend, Backend, Database, Integration, Security, Performance
**Estimated Completion Time:** 16-20 hours

---

*This is a comprehensive QA/QC test plan. Execute test cases systematically, document results, and track any issues found.*
