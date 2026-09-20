# Study Group Finder Platform

A production-ready, scalable Study Group Finder platform built with the MERN stack (2026 standards).

## Project Overview

This platform enables students to find, join, manage, and collaborate in study groups with real-time chat, session scheduling, attendance tracking, notifications, resource sharing, discussions, and admin controls.

## Tech Stack

**Frontend:**
- React 18.3.1 with Vite 5.2.11 (fast bundler)
- Redux Toolkit 1.9.7 + RTK Query (state management & API caching)
- React Hook Form 7.51.5 + Zod 3.23.8 (form validation)
- Tailwind CSS 4.0.0-beta.1 (modern styling)
- Recharts 2.12.7 (analytics visualizations)
- Socket.io Client (real-time messaging)
- Axios 1.7.7 (HTTP client)

**Backend:**
- Node.js + Express.js 4.19.2 (ES modules)
- MongoDB 8.3.5 + Mongoose 8.3.5 (database & ODM)
- JWT (jsonwebtoken 9.1.2) + bcryptjs 2.4.3 (authentication)
- Socket.io 4.7.2 (real-time communication)
- Cloudinary 2.5.0 + Multer 1.4.5-lts.1 (file uploads)
- Nodemailer 6.9.14 (email service)
- Winston 3.13.0 (logging)
- Helmet 7.1.0 + Express Rate Limit 7.1.5 (security)

## Features Implemented

### Authentication & Authorization
- Register with email, password, college, branch, semester
- Login with JWT tokens (access + refresh)
- Password reset via email with secure token
- Change password for logged-in users
- Role-based access control (RBAC): student, group_admin, platform_admin

### Study Groups
- Create, read, update, delete study groups
- Filter by subject, semester, tags, meeting mode (online/offline/hybrid)
- Meeting links for online groups
- Group status (active/inactive/archived)
- Max member limits with current member tracking

### Group Membership & Requests
- Join request workflow with approval/rejection
- Group membership with role assignment (member/moderator/admin)
- Member count and role tracking
- Admin can approve/reject requests

### Discussions & Collaboration
- Create posts within groups with title and rich content
- Comments on posts (threaded discussions)
- Edit/delete posts and comments (author only)
- Like/vote system ready (model structure)

### Resource Sharing
- Upload files to groups (PDF, DOC, DOCX, PPT, PPTX, PNG, JPG, JPEG, or LINK)
- Cloudinary integration (10MB max file size)
- File type validation
- Automatic metadata (uploader, timestamp, file size)

### Session Scheduling
- Create sessions with topic, date, start/end time
- List sessions by group
- Session CRUD operations
- Scheduled sessions notifications

### Attendance Tracking
- Mark attendance (present/absent)
- Attendance reports by session
- Student attendance dashboard
- Group attendance rate analytics

### Real-Time Chat
- Socket.io integration for real-time messaging
- User presence tracking (who's online)
- Active sessions management
- Typing indicators
- Message persistence to MongoDB
- Join/leave notifications

### Notifications
- In-app notifications in database
- Email notifications via Nodemailer
- HTML email templates for:
  - Join request approval
  - New resource uploaded
  - Session scheduled
- Batch notifications to group members
- Mark as read functionality

### Reviews & Ratings
- Rate study groups (1-5 stars)
- Review text with edit/delete
- Author-only edit/delete enforcement

### Analytics & Dashboards
- Student Dashboard: groups joined, upcoming sessions, attendance %
- Group Dashboard: member count, resource count, attendance rate
- Admin Dashboard: total users, total groups, active users, admin stats
- Recharts visualizations (line, bar, pie charts)

### Admin Controls
- List all users with pagination
- Ban/unban users
- Delete users and their data
- List all groups
- Delete groups
- Platform-wide analytics

## Project Structure

```
studentstudygroup/
├── backend/
│   ├── src/
│   │   ├── models/           # 13 Mongoose models
│   │   ├── controllers/      # 11 request handlers
│   │   ├── services/         # 12 business logic
│   │   ├── repositories/     # 11 data access layer
│   │   ├── middleware/       # auth, validation, upload, error
│   │   ├── routes/           # 12 route modules
│   │   ├── validators/       # Zod schemas
│   │   ├── utils/            # helpers, logger, tokens, email
│   │   ├── constants/        # roles, status enums
│   │   ├── sockets/          # Socket.io setup
│   │   ├── app.js            # Express app
│   │   └── server.js         # Server entry point
│   ├── .env                  # Environment variables (user fills)
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/       # 16 reusable UI components
│   │   ├── pages/            # 9 feature pages
│   │   ├── redux/            # State management & RTK Query
│   │   ├── services/         # API client & Socket.io
│   │   ├── App.jsx           # Main router
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Tailwind setup
│   ├── .env                  # Environment variables
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── index.html
│
├── README.md                 # This file
├── FRONTEND_GUIDE.md         # Detailed frontend guide
├── SETUP_GUIDE.md            # Service setup (MongoDB, Cloudinary, etc.)
├── DEPLOYMENT_GUIDE.md       # Render & Vercel deployment
└── .gitignore

```

## Quick Start

### Prerequisites
- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account
- Cloudinary account (optional, for file uploads)
- Email provider account (optional, for notifications)

### 1. Clone Repository

```bash
git clone <repository-url>
cd studentstudygroup
```

### 2. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Create .env file with required variables
cp .env.example .env

# Fill in all required variables
# - MONGODB_URI: MongoDB connection string
# - JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, COOKIE_SECRET: Random strings
# - CLOUDINARY_*: Cloudinary credentials
# - EMAIL_*: Email provider credentials

# Start development server
npm run dev
```

The backend will start on `http://localhost:5000`

### 3. Setup Frontend

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env

# Start development server
npm run dev
```

The frontend will start on `http://localhost:5173`

### 4. Access the App

Open your browser and navigate to `http://localhost:5173`

## Available Scripts

### Backend

```bash
# Development with auto-reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Frontend

```bash
# Development with Vite HMR
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
```

## Environment Variables

### Backend (.env)

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/studygroup

# JWT
JWT_ACCESS_SECRET=your_secret_key_here_min_32_chars
JWT_REFRESH_SECRET=your_secret_key_here_min_32_chars
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_SECRET=your_cookie_secret_here_min_32_chars

# URLs
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

# Cloudinary (File Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (Notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_FROM=noreply@studygroup.com

# Socket.io
SOCKET_CORS_ORIGIN=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100

# Logging
LOG_LEVEL=debug
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api/v1
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/refresh` - Refresh access token
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/forgot-password` - Request password reset
- `POST /api/v1/auth/reset-password` - Reset password
- `POST /api/v1/auth/change-password` - Change password

### Study Groups
- `GET /api/v1/groups` - List groups with filters
- `GET /api/v1/groups/:id` - Get group details
- `POST /api/v1/groups` - Create group
- `PUT /api/v1/groups/:id` - Update group
- `DELETE /api/v1/groups/:id` - Delete group

### Resources
- `GET /api/v1/resources/:groupId` - List group resources
- `POST /api/v1/resources` - Upload resource
- `DELETE /api/v1/resources/:id` - Delete resource

### Sessions
- `GET /api/v1/sessions/:groupId` - List sessions
- `POST /api/v1/sessions` - Create session
- `PUT /api/v1/sessions/:id` - Update session
- `DELETE /api/v1/sessions/:id` - Delete session

### And more... (see [API Documentation](./API_DOCS.md))

## Components Available

### UI Components
- Button (primary, secondary, danger, success variants)
- Input (text, email, password, select, file)
- TextArea (multi-line input)
- Card (container)
- Modal (dialog with backdrop)
- Toast (auto-dismissing notifications)
- Badge (tags/labels)
- Avatar (user profile pictures)
- Table (data display)
- Pagination (page navigation)
- Skeleton (loading placeholders)
- EmptyState (no data UI)
- Tabs (tab navigation)

### Complex Components
- Navbar (top navigation with user menu)
- ToastContainer (toast notifications display)
- ChatRoom (real-time chat with typing indicators)
- ConfirmDialog (confirmation modals)

All components are styled with Tailwind CSS 4.0 beta and ready for production use.

## Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check VITE_API_URL in .env matches backend URL
- Clear browser cache and restart dev server

### Socket.io connection fails
- Verify backend Socket.io is listening
- Check SOCKET_CORS_ORIGIN in backend .env
- Browser console will show detailed error

### Database connection error
- Verify MONGODB_URI is correct
- Check MongoDB Atlas IP whitelist allows your IP
- Ensure database user has correct permissions

### File upload fails
- Check Cloudinary credentials are correct
- Verify file size is under 10MB limit
- Supported formats: PDF, DOC, DOCX, PPT, PPTX, PNG, JPG, JPEG

## Testing

### Backend Testing
```bash
# Coming soon: Jest + Supertest
npm run test
```

### Frontend Testing
```bash
# Coming soon: Vitest + React Testing Library
npm run test
```

## Deployment

### Deploy Backend to Render
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

### Deploy Frontend to Vercel
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Use secure JWT secrets (minimum 32 characters)
- [ ] Enable MongoDB Atlas IP whitelist
- [ ] Configure Cloudinary for production
- [ ] Setup email service credentials
- [ ] Review rate limiting settings
- [ ] Enable HTTPS on Render
- [ ] Add Vercel environment variables
- [ ] Setup domain names
- [ ] Configure CORS for production URLs
- [ ] Enable logging to file system
- [ ] Setup error monitoring (Sentry, etc.)
- [ ] Load test the API

## Performance Tips

- Frontend uses Vite for fast HMR during development
- Components are lazy-loaded with React.lazy()
- RTK Query handles API caching automatically
- MongoDB indexes on frequently queried fields
- Socket.io uses compression for messages
- Cloudinary handles image optimization

## Security Features

- JWT tokens with refresh rotation
- bcrypt password hashing (10 rounds)
- CORS configured for specific origins
- Rate limiting (100 requests per 15 minutes)
- XSS protection with helmet
- SQL injection prevention via Mongoose
- File upload validation (type, size)
- HTTPS ready (production)

## Support & Contributing

For issues, suggestions, or contributions:
1. Create an issue on GitHub
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

## License

This project is provided for educational purposes.

## More Documentation

- [Frontend Development Guide](./FRONTEND_GUIDE.md)
- [Setup Guide](./SETUP_GUIDE.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE.md)
- [Roadmap](./ROADMAP.md)
- `SERVER_URL`
- `CLIENT_URL`
- `SOCKET_CORS_ORIGIN`

## Project Scopes

- Backend architecture with route → controller → service → repository
- Frontend architecture with reusable components and feature modules
- Security, logging, validation, and deployment readiness
