# 11MIN Fast Delivery - Project Documentation

## Overview

11MIN is an ultra-fast delivery service platform that promises delivery within 11 minutes with centimeter-level precision. The application features real-time GPS tracking, WebSocket-based live updates, and WhatsApp integration for seamless order placement. Built as a full-stack web application with a focus on location-based services and real-time communication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool for fast development and optimized production builds
- Wouter for lightweight client-side routing (alternative to React Router)
- TanStack Query (React Query) for server state management and caching

**UI & Styling**
- Tailwind CSS for utility-first styling with custom design system
- Shadcn/ui component library built on Radix UI primitives (New York style variant)
- Custom CSS variables for theming with dark mode support
- Responsive design with mobile-first approach

**State Management**
- React Query for server state (fetching, caching, synchronization)
- React Context for authentication state
- Local component state with React hooks
- WebSocket client for real-time updates

**Key Features**
- High-precision geolocation using browser Geolocation API with reverse geocoding via OpenStreetMap Nominatim
- Real-time driver tracking via WebSocket connection
- WhatsApp integration for order placement
- Form handling with React Hook Form and Zod validation
- Toast notifications for user feedback

### Backend Architecture

**Server Framework**
- Express.js for REST API and WebSocket server
- TypeScript with ES modules for type safety
- Session-based authentication using Passport.js with Local Strategy

**Authentication & Security**
- Bcrypt for password hashing (10 salt rounds)
- Express sessions with PostgreSQL storage (connect-pg-simple)
- Cookie-based sessions (30-day expiry)
- HTTPS-only cookies in production

**Real-time Communication**
- WebSocket server (ws library) for live driver location updates
- Broadcast pattern for location updates to all connected clients
- Automatic reconnection logic on client side

**API Design**
- RESTful endpoints for CRUD operations
- JSON request/response format
- Request logging middleware with response capture
- Error handling with appropriate HTTP status codes

### Data Storage

**Database**
- PostgreSQL via Neon serverless (WebSocket-based connection)
- Drizzle ORM for type-safe database queries and schema management
- Schema-first approach with TypeScript types generated from database schema

**Schema Design**

*Users Table*
- UUID primary keys (generated via gen_random_uuid())
- Username and email with unique constraints
- Hashed password storage
- Stripe customer and subscription IDs for payment integration
- Current location stored as JSONB (lat, lng, address, accuracy)
- Timestamp for account creation

*Drivers Table*
- UUID primary keys
- Name and phone (unique constraint on phone)
- Decimal rating (precision 3, scale 2, default 5.00)
- Current location as JSONB (lat, lng)
- Active status boolean
- Creation timestamp

*Deliveries Table*
- UUID primary keys
- Foreign keys to users and drivers (optional driver assignment)
- Pickup and delivery locations as JSONB objects
- Status enum (pending, assigned, picking_up, en_route, delivered, cancelled)
- Package details and special instructions
- Estimated delivery time
- Timestamps for creation and updates

**Session Storage**
- PostgreSQL-backed session store for persistence
- Automatic table creation if missing

### External Dependencies

**Payment Processing**
- Stripe integration (@stripe/stripe-js, @stripe/react-stripe-js)
- Customer and subscription management
- Payment methods support (Visa, Mastercard, Amex, Apple Pay, Google Pay)

**Geolocation Services**
- Browser Geolocation API for high-precision location (enableHighAccuracy: true)
- OpenStreetMap Nominatim API for reverse geocoding (lat/lng to address)
- No API key required for Nominatim

**Communication**
- WhatsApp for order notifications and customer communication
- Pre-formatted messages with delivery details and map links

**Development Tools**
- Replit-specific plugins for development (vite-plugin-runtime-error-modal, cartographer, dev-banner)
- Google Fonts integration (Architects Daughter, DM Sans, Fira Code, Geist Mono)

**Infrastructure**
- Neon serverless PostgreSQL (WebSocket connections via ws library)
- Environment-based configuration (DATABASE_URL, SESSION_SECRET)
- Production vs development environment handling