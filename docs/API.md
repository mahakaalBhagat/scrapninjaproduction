# ScrapNinja API Documentation

Complete REST API reference for ScrapNinja platform.

## Base URL

```
http://api.scrapninja.ae/api
http://localhost:8080/api (local development)
```

## Authentication

All endpoints (except `/auth/*` and public endpoints) require JWT Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

---

## Authentication Endpoints

### 1. User Login

**POST** `/auth/login`

Login with email and password.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "rememberMe": true
}
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "expiresIn": 86400
}
```

**Errors:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing required fields

---

### 2. User Registration

**POST** `/auth/register`

Create a new user account.

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "userType": "HOUSEHOLD"
}
```

**Response (201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "email": "newuser@example.com",
  "firstName": "Jane",
  "lastName": "Smith",
  "expiresIn": 86400
}
```

**Errors:**
- `400 Bad Request` - Invalid data or email already exists
- `422 Unprocessable Entity` - Validation failed

---

### 3. Logout

**POST** `/auth/logout`

Invalidate current JWT token.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "message": "Successfully logged out"
}
```

---

### 4. Refresh Token

**POST** `/auth/refresh`

Get a new JWT token using refresh token.

**Headers:**
```
Authorization: Bearer <refresh-token>
```

**Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 86400
}
```

---

## Pickup Endpoints

### 1. Create Pickup Request

**POST** `/pickups`

Create a new scrap collection request.

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "scrapType": "METAL",
  "weight": 25.5,
  "address": "123 Main Street, Dubai, UAE",
  "latitude": 25.2048,
  "longitude": 55.2708,
  "requestedDate": "2024-03-20",
  "requestedTimeSlot": "MORNING",
  "notes": "Please call before arrival"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "scrapType": "METAL",
  "weight": 25.5,
  "address": "123 Main Street, Dubai, UAE",
  "requestedDate": "2024-03-20",
  "requestedTimeSlot": "MORNING",
  "status": "PENDING",
  "estimatedPrice": 35.75,
  "confirmationCode": "SN-20240320-12345",
  "createdAt": "2024-03-16T10:30:00Z"
}
```

**Errors:**
- `400 Bad Request` - Invalid data
- `401 Unauthorized` - Not authenticated

---

### 2. Get All User Pickups

**GET** `/pickups`

Retrieve all pickup requests for authenticated user.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `status` (optional): Filter by status (PENDING, ASSIGNED, COMPLETED, CANCELLED)
- `page` (optional): Page number (default: 0)
- `size` (optional): Page size (default: 20)
- `sort` (optional): Sort field (default: createdAt,desc)

**Response (200):**
```json
{
  "content": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "PENDING",
      "requestedDate": "2024-03-20",
      "estimatedPrice": 35.75,
      "confirmationCode": "SN-20240320-12345"
    }
  ],
  "totalElements": 5,
  "totalPages": 1,
  "currentPage": 0
}
```

---

### 3. Get Specific Pickup

**GET** `/pickups/{id}`

Get details for a specific pickup request.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "userId": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
  "collectorId": "a47ac10b-58cc-4372-a567-0e02b2c3d479",
  "status": "ASSIGNED",
  "scrapType": "METAL",
  "weight": 25.5,
  "address": "123 Main Street, Dubai, UAE",
  "requestedDate": "2024-03-20",
  "requestedTimeSlot": "MORNING",
  "estimatedPrice": 35.75,
  "finalPrice": 36.00,
  "confirmationCode": "SN-20240320-12345",
  "notes": "Please call before arrival",
  "items": [
    {
      "scrapType": "Iron",
      "quantity": 15.5,
      "unitPrice": 0.50
    }
  ],
  "createdAt": "2024-03-16T10:30:00Z",
  "updatedAt": "2024-03-17T14:20:00Z"
}
```

**Errors:**
- `404 Not Found` - Pickup request not found
- `401 Unauthorized` - Not authenticated

---

### 4. Update Pickup Request

**PUT** `/pickups/{id}`

Update an existing pickup request (only if status is PENDING).

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "requestedDate": "2024-03-21",
  "requestedTimeSlot": "AFTERNOON",
  "notes": "Updated notes"
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "PENDING",
  "requestedDate": "2024-03-21",
  "requestedTimeSlot": "AFTERNOON"
}
```

---

### 5. Cancel Pickup

**DELETE** `/pickups/{id}`

Cancel a pickup request.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request:**
```json
{
  "cancellationReason": "Change of plans"
}
```

**Response (200):**
```json
{
  "message": "Pickup cancelled successfully",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "status": "CANCELLED"
}
```

---

## Pricing Endpoints

### 1. Get Price Estimate

**GET** `/pricing/estimate`

Calculate estimated price for scrap collection.

**Query Parameters:**
- `scrapType` (required): Type of scrap (METAL, PLASTIC, PAPER, ELECTRONICS, GLASS)
- `weight` (required): Weight in kg

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "scrapType": "METAL",
  "weight": 25.5,
  "unitPrice": 0.50,
  "estimatedPrice": 12.75,
  "finalPrice": 12.75,
  "currency": "AED",
  "validUntil": "2024-03-17T16:30:00Z"
}
```

---

### 2. Get Pricing Rules

**GET** `/pricing/rules`

Get all current pricing rules.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
[
  {
    "id": "rule-001",
    "scrapType": "METAL",
    "category": "Iron Scrap",
    "basePrice": 0.50,
    "minWeight": 10,
    "maxWeight": 1000,
    "effectiveFrom": "2024-01-01",
    "effectiveUntil": "2024-12-31"
  }
]
```

---

## Tracking Endpoints

### 1. Track Pickup

**GET** `/tracking/{pickupId}`

Get real-time tracking information for a pickup.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (200):**
```json
{
  "pickupId": "550e8400-e29b-41d4-a716-446655440000",
  "status": "IN_PROGRESS",
  "currentLocation": {
    "latitude": 25.2060,
    "longitude": 55.2700,
    "address": "Sheikh Zayed Road, Dubai"
  },
  "estimatedArrivalTime": "2024-03-20T11:30:00Z",
  "collectorName": "Ahmed's Scrap Collection",
  "collectorPhone": "+971 50 123 4567",
  "collectorRating": 4.8,
  "history": [
    {
      "status": "ASSIGNED",
      "timestamp": "2024-03-20T08:00:00Z",
      "location": "Dubai, UAE"
    }
  ]
}
```

---

## Payment Endpoints

### 1. Process Payment

**POST** `/payments`

Process payment for a completed pickup.

**Headers:**
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

**Request:**
```json
{
  "pickupId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 35.75,
  "paymentMethod": "BANK_TRANSFER",
  "accountNumber": "1234567890"
}
```

**Response (201):**
```json
{
  "transactionId": "TXN-20240320-12345",
  "pickupId": "550e8400-e29b-41d4-a716-446655440000",
  "amount": 35.75,
  "currency": "AED",
  "status": "PROCESSING",
  "paymentMethod": "BANK_TRANSFER",
  "createdAt": "2024-03-20T12:00:00Z"
}
```

---

## Report Endpoints

### 1. Generate Report

**POST** `/reports/{pickupId}`

Generate ESG compliance report for pickup.

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response (201):**
```json
{
  "id": "report-001",
  "pickupId": "550e8400-e29b-41d4-a716-446655440000",
  "reportType": "ESG",
  "status": "GENERATED",
  "reportUrl": "https://scrapninja.ae/reports/report-001.pdf",
  "generatedAt": "2024-03-20T12:30:00Z"
}
```

---

## Error Responses

### Common Error Format

```json
{
  "timestamp": "2024-03-16T10:30:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Email format is invalid"
    }
  ],
  "path": "/api/auth/register"
}
```

### Error Status Codes

- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Missing or invalid JWT token
- `403 Forbidden` - User lacks permission
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate email)
- `422 Unprocessable Entity` - Validation failed
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Service temporarily unavailable

---

## Rate Limiting

API enforces rate limiting:
- 1000 requests per hour per user
- 10000 requests per hour per IP

Response headers:
```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1615382400
```

---

## Webhooks

Subscribe to events:

```
POST /webhooks/subscribe

{
  "event": "pickup.completed",
  "url": "https://yourapp.com/webhook"
}
```

Webhook payload:
```json
{
  "event": "pickup.completed",
  "timestamp": "2024-03-20T12:00:00Z",
  "data": {
    "pickupId": "550e8400-e29b-41d4-a716-446655440000",
    "status": "COMPLETED",
    "finalPrice": 35.75
  }
}
```

---

## Pagination

Paginated endpoints use standard query parameters:

```
GET /pickups?page=0&size=20&sort=createdAt,desc
```

Response:
```json
{
  "content": [...],
  "totalElements": 150,
  "totalPages": 8,
  "currentPage": 0,
  "pageSize": 20,
  "hasNext": true,
  "hasPrevious": false
}
```

---

## Change Log

### v1.0.0 (2024-03-16)
- Initial API release
- Authentication endpoints
- Pickup management
- Pricing endpoints
- Tracking functionality
- Payment processing
- Report generation

---

## Support

For API issues and questions:
- Email: api-support@scrapninja.ae
- Documentation: https://docs.scrapninja.ae
- Status Page: https://status.scrapninja.ae
