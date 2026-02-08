
# Interview Platform

A web-based platform for conducting and managing technical interviews.

## Features

- Create and schedule interviews
- Real-time code editor and execution
- Interview history and feedback tracking
- User authentication and role management
- Responsive design for all devices

## Tech Stack

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Deployment**: Render

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run the application
npm start
```

## Usage

1. Sign up or log in to your account
2. Create a new interview session
3. Share the interview link with candidates
4. Evaluate responses and provide feedback

## Deployment

**Live Demo**: https://interview-platform-2-r9ma.onrender.com/

## License

MIT License

## Project Structure

### Backend (`/backend`)
- **server.js**: Express server entry point
- **controllers/**: Request handlers for chat and sessions
- **models/**: MongoDB schemas for Users and Sessions
- **routes/**: API endpoints for chat and sessions
- **middleware/**: Authentication and route protection
- **lib/**: Utilities for database, environment, streaming, and background jobs (Inngest)

### Frontend (`/frontend`)
- **pages/**: Main application pages (Dashboard, Home, Problems, Session)
- **components/**: Reusable UI components (Video call, code editor, problem description)
- **hooks/**: Custom React hooks for sessions and streaming
- **lib/**: Utilities for API calls, code execution (Piston), and streaming
- **data/**: Interview problem sets

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance
- npm or yarn

### Setup

```bash
# Backend setup
cd backend
npm install
cp .env.example .env
# Configure MongoDB URI and other env variables
npm start

# Frontend setup (in new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Environment Variables

**Backend (.env)**:

- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)
- Other service credentials - PORT ,
DB_URL,
NODE_ENV ,
INNGEST_EVENT_KEY,
INNGEST_SIGNING_KEY,
STREAM_API_KEY ,
STREAM_API_SECRET ,
CLERK_PUBLISHABLE_KEY,
CLERK_SECRET_KEY,
CLIENT_URL,


**Frontend (.env)**:
- `VITE_API_URL`: Backend API endpoint

## API Endpoints

- `POST /api/sessions`: Create interview session
- `GET /api/sessions`: Fetch user sessions
- `POST /api/chat`: Send messages in session
- `GET /api/chat/:sessionId`: Retrieve chat history
