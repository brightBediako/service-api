# Joydome API

A freelance marketplace API built with Node.js, Express.js, and MongoDB.

## Features

- User authentication and authorization
- Gig (service) management
- Order processing with Stripe integration
- Real-time messaging system
- Review and rating system
- Role-based access control (Seller/Buyer)

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

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users

- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user (authenticated)

### Gigs

- `POST /api/gigs` - Create gig (sellers only)
- `GET /api/gigs` - Get all gigs with filters
- `GET /api/gigs/single/:id` - Get single gig
- `DELETE /api/gigs/:id` - Delete gig (owner only)

### Orders

- `GET /api/orders` - Get user orders
- `POST /api/orders/create-payment-intent/:id` - Create payment intent
- `PUT /api/orders` - Confirm order

### Conversations

- `GET /api/conversations` - Get user conversations
- `POST /api/conversations` - Create conversation
- `GET /api/conversations/single/:id` - Get single conversation
- `PUT /api/conversations/:id` - Update conversation

### Messages

- `POST /api/messages` - Send message
- `GET /api/messages/:id` - Get conversation messages

### Reviews

- `POST /api/reviews` - Create review (buyers only)
- `GET /api/reviews/:gigId` - Get gig reviews
- `DELETE /api/reviews/:id` - Delete review (owner only)

## Technologies Used

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments
- bcrypt for password hashing
