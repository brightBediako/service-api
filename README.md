# Joydome API

A comprehensive freelance marketplace API with full admin panel built with Node.js, Express.js, and MongoDB.

## Features

- **User Management**: Registration, authentication, verification, and role management
- **Gig Management**: Service listings with approval workflow and moderation
- **Order Processing**: Complete order lifecycle with Stripe integration
- **Real-time Messaging**: Buyer-seller communication system
- **Review System**: Rating and feedback for services
- **Admin Panel**: Complete back-office management system
- **Role-based Access Control**: Admin, Seller, and Buyer roles
- **Payment Processing**: Stripe integration with platform fees
- **Analytics & Reporting**: Comprehensive platform insights

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb://localhost:27017/joydome

# JWT Configuration
JWT_KEY=your_jwt_secret_key_here

# Stripe Configuration (Optional - for payment processing)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Server Configuration
PORT=8000

# CORS Configuration (optional)
CORS_ORIGIN=http://localhost:3000
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file with the required environment variables

   - **Note**: Stripe configuration is optional. The API will work without it, but payment processing features will be disabled.

3. Start the development server:

```bash
npm run server
```

## API Endpoints

### Base URL

```
http://localhost:8000
```

---

## 🔐 Authentication Endpoints

| Method | Endpoint             | Description       | Auth Required |
| ------ | -------------------- | ----------------- | ------------- |
| `POST` | `/api/auth/register` | User registration | No            |
| `POST` | `/api/auth/login`    | User login        | No            |
| `POST` | `/api/auth/logout`   | User logout       | No            |

---

## 👤 User Management Endpoints

| Method   | Endpoint         | Description    | Auth Required |
| -------- | ---------------- | -------------- | ------------- |
| `GET`    | `/api/users/:id` | Get user by ID | No            |
| `DELETE` | `/api/users/:id` | Delete user    | Yes           |

---

## 💼 Gig (Service) Management Endpoints

| Method   | Endpoint               | Description               | Auth Required |
| -------- | ---------------------- | ------------------------- | ------------- |
| `POST`   | `/api/gigs`            | Create gig                | Yes (Seller)  |
| `GET`    | `/api/gigs`            | Get all gigs with filters | No            |
| `GET`    | `/api/gigs/single/:id` | Get single gig            | No            |
| `DELETE` | `/api/gigs/:id`        | Delete gig                | Yes (Owner)   |

**Query Parameters for GET /api/gigs:**

- `userId` - Filter by seller ID
- `cat` - Filter by category
- `min` - Minimum price
- `max` - Maximum price
- `search` - Search in title
- `sort` - Sort field (e.g., 'createdAt', 'price')

---

## 🛒 Order Management Endpoints

| Method | Endpoint                                | Description           | Auth Required |
| ------ | --------------------------------------- | --------------------- | ------------- |
| `GET`  | `/api/orders`                           | Get user orders       | Yes           |
| `POST` | `/api/orders/create-payment-intent/:id` | Create payment intent | Yes           |
| `PUT`  | `/api/orders`                           | Confirm order         | Yes           |

---

## 💬 Messaging System Endpoints

| Method | Endpoint                        | Description               | Auth Required |
| ------ | ------------------------------- | ------------------------- | ------------- |
| `GET`  | `/api/conversations`            | Get user conversations    | Yes           |
| `POST` | `/api/conversations`            | Create conversation       | Yes           |
| `GET`  | `/api/conversations/single/:id` | Get single conversation   | Yes           |
| `PUT`  | `/api/conversations/:id`        | Update conversation       | Yes           |
| `POST` | `/api/messages`                 | Send message              | Yes           |
| `GET`  | `/api/messages/:id`             | Get conversation messages | Yes           |

---

## ⭐ Review System Endpoints

| Method   | Endpoint              | Description     | Auth Required |
| -------- | --------------------- | --------------- | ------------- |
| `POST`   | `/api/reviews`        | Create review   | Yes (Buyer)   |
| `GET`    | `/api/reviews/:gigId` | Get gig reviews | No            |
| `DELETE` | `/api/reviews/:id`    | Delete review   | Yes (Owner)   |

---

## 🏥 Health Check

| Method | Endpoint  | Description       | Auth Required |
| ------ | --------- | ----------------- | ------------- |
| `GET`  | `/health` | API health status | No            |

---

## 🔧 Admin Panel Endpoints

### Dashboard & Analytics

| Method | Endpoint               | Description              | Auth Required |
| ------ | ---------------------- | ------------------------ | ------------- |
| `GET`  | `/api/admin/dashboard` | Get dashboard statistics | Yes (Admin)   |
| `GET`  | `/api/admin/analytics` | Get platform analytics   | Yes (Admin)   |

**Query Parameters for Analytics:**

- `period` - Time period in days (default: 30)

### User Management

| Method   | Endpoint                      | Description                   | Auth Required |
| -------- | ----------------------------- | ----------------------------- | ------------- |
| `GET`    | `/api/admin/users`            | Get all users with pagination | Yes (Admin)   |
| `GET`    | `/api/admin/users/:id`        | Get user details with history | Yes (Admin)   |
| `PUT`    | `/api/admin/users/:id/verify` | Verify/reject user            | Yes (Admin)   |
| `PUT`    | `/api/admin/users/:id/ban`    | Ban user                      | Yes (Admin)   |
| `PUT`    | `/api/admin/users/:id/unban`  | Unban user                    | Yes (Admin)   |
| `PUT`    | `/api/admin/users/:id`        | Update user profile           | Yes (Admin)   |
| `DELETE` | `/api/admin/users/:id`        | Delete user                   | Yes (Admin)   |

**Query Parameters for GET /api/admin/users:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by username or email
- `status` - Filter by verification status (verified, banned, pending)
- `role` - Filter by role (seller, admin)

### Service Management

| Method   | Endpoint                      | Description                         | Auth Required |
| -------- | ----------------------------- | ----------------------------------- | ------------- |
| `GET`    | `/api/admin/gigs`             | Get all gigs with filters           | Yes (Admin)   |
| `GET`    | `/api/admin/gigs/:id`         | Get gig details with reviews/orders | Yes (Admin)   |
| `PUT`    | `/api/admin/gigs/:id/approve` | Approve gig                         | Yes (Admin)   |
| `PUT`    | `/api/admin/gigs/:id/reject`  | Reject gig                          | Yes (Admin)   |
| `PUT`    | `/api/admin/gigs/:id/suspend` | Suspend gig                         | Yes (Admin)   |
| `PUT`    | `/api/admin/gigs/:id`         | Update gig details                  | Yes (Admin)   |
| `DELETE` | `/api/admin/gigs/:id`         | Delete gig                          | Yes (Admin)   |

**Query Parameters for GET /api/admin/gigs:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search by title or description
- `status` - Filter by status (pending, approved, rejected, suspended)
- `category` - Filter by category

### Order Management

| Method | Endpoint                                | Description                 | Auth Required |
| ------ | --------------------------------------- | --------------------------- | ------------- |
| `GET`  | `/api/admin/orders`                     | Get all orders with filters | Yes (Admin)   |
| `GET`  | `/api/admin/orders/:id`                 | Get order details           | Yes (Admin)   |
| `PUT`  | `/api/admin/orders/:id/resolve-dispute` | Resolve order dispute       | Yes (Admin)   |
| `PUT`  | `/api/admin/orders/:id/status`          | Update order status         | Yes (Admin)   |

**Query Parameters for GET /api/admin/orders:**

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by order status
- `disputeStatus` - Filter by dispute status

### Payment Management

| Method | Endpoint                                      | Description            | Auth Required |
| ------ | --------------------------------------------- | ---------------------- | ------------- |
| `GET`  | `/api/admin/payments/stats`                   | Get payment statistics | Yes (Admin)   |
| `GET`  | `/api/admin/payments/earnings`                | Get earnings report    | Yes (Admin)   |
| `POST` | `/api/admin/payments/withdrawals/:id/process` | Process withdrawal     | Yes (Admin)   |

**Query Parameters for GET /api/admin/payments/earnings:**

- `sellerId` - Filter by specific seller
- `startDate` - Start date for report
- `endDate` - End date for report

### Reports & Analytics

| Method | Endpoint                      | Description             | Auth Required |
| ------ | ----------------------------- | ----------------------- | ------------- |
| `POST` | `/api/admin/reports/generate` | Generate custom reports | Yes (Admin)   |
| `GET`  | `/api/admin/logs`             | Get system logs         | Yes (Admin)   |

**Report Types:**

- `users` - User registration and verification reports
- `gigs` - Service listing and approval reports
- `orders` - Order completion and dispute reports
- `revenue` - Financial and earnings reports

---

## 🔒 Authentication & Authorization

### User Roles

- **Admin**: Full platform management access
- **Seller**: Can create and manage gigs, process orders
- **Buyer**: Can purchase services, leave reviews

### JWT Token Structure

```json
{
  "id": "user_id",
  "isSeller": "boolean",
  "isAdmin": "boolean",
  "isSuperAdmin": "boolean"
}
```

### Protected Routes

- All admin endpoints require admin authentication
- Order and messaging endpoints require user authentication
- Gig creation requires seller role
- Review creation requires buyer role

---

## 📊 Platform Features

### Admin Panel Capabilities

- **Dashboard**: Real-time platform statistics and metrics
- **User Management**: Complete user lifecycle management
- **Service Moderation**: Gig approval and content management
- **Order Oversight**: Dispute resolution and order tracking
- **Financial Management**: Payment processing and earnings tracking
- **Analytics**: Comprehensive reporting and insights
- **System Monitoring**: Logs and performance tracking

### Business Logic

- **Platform Fee**: 10% commission on all completed orders
- **Gig Approval**: All gigs require admin approval before going live
- **User Verification**: Optional verification system for enhanced trust
- **Dispute Resolution**: Admin-mediated conflict resolution
- **Role Flexibility**: Admins can also operate as sellers

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with bcrypt
- **Payments**: Stripe integration
- **Architecture**: MVC pattern with middleware
- **Development**: Nodemon for auto-restart

---

## 📝 API Documentation

For detailed API documentation with request/response examples, see [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)

---

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Set up environment variables** in `.env` file
4. **Start the server**: `npm run server`
5. **Access the API** at `http://localhost:8000`

The API is now ready for both regular users and admin management! 🎉
