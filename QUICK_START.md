# Quick Start Guide

Get the Study Group Finder platform running locally in 10 minutes.

## Prerequisites

- **Node.js** 18.x or higher ([Download](https://nodejs.org))
- **npm** (comes with Node.js) or **yarn**
- **MongoDB Account** (free tier at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Git** for cloning the repository

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd studentstudygroup
```

## Step 2: Backend Setup

### 2.1 Navigate to Backend
```bash
cd backend
```

### 2.2 Install Dependencies
```bash
npm install
```

### 2.3 Create Environment File

Create a file named `.env` in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database - Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studygroup

# JWT Secrets (use strong random strings, min 32 characters)
JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_chars_long_here_12345
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_chars_long_here_12345
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
COOKIE_SECRET=your_cookie_secret_min_32_chars_long_here_12345

# URLs
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

# Cloudinary (Optional, for file uploads)
# Get from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service (Optional, for notifications)
# Example: Gmail with App Password
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

### 2.4 Start Backend Server

```bash
npm run dev
```

You should see:
```
Server running on port 5000
Connected to MongoDB
```

✅ Backend is ready! Don't close this terminal.

## Step 3: Frontend Setup (New Terminal)

### 3.1 Open New Terminal and Navigate to Frontend

```bash
# In a new terminal window
cd studentstudygroup/frontend
```

### 3.2 Install Dependencies

```bash
npm install
```

### 3.3 Environment Variables

Check if `.env` exists in the frontend directory. If not, create it:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

If the file already exists, it should be configured correctly.

### 3.4 Start Frontend Server

```bash
npm run dev
```

You should see:
```
  VITE v5.2.11  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## Step 4: Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

You should see the Study Group Finder homepage.

## Step 5: Test the Application

### Create Test Account

1. Click "Sign Up" button
2. Fill in the registration form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Password: `Password123456` (min 8 characters)
   - College: `Test University` (optional)
3. Click "Create Account"
4. You'll be logged in and redirected to dashboard

### Explore Features

**Home Page:**
- Click "Discover Groups" to see the group discovery page

**Groups:**
- Go to "Discover" to find study groups
- Filter by subject, semester, or meeting mode
- Click "Join Group" button (frontend only, needs backend implementation)

**Dashboard:**
- View your study analytics and statistics
- See upcoming sessions and group summaries
- Attendance tracking charts

**Profile:**
- Edit your profile information
- Add skills and interests
- Update college and semester details

**Notifications:**
- View all your notifications
- Mark notifications as read

**Chat (Coming Soon):**
- Real-time messaging in group channels
- Typing indicators
- Active user list

## Troubleshooting

### Frontend shows "Cannot GET /"

**Solution:**
- Ensure backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Restart frontend with `npm run dev`

### "Connection refused" error in console

**Solution:**
1. Check backend is running: `npm run dev` in backend folder
2. Verify PORT is 5000 in backend/.env
3. Check firewall isn't blocking port 5000

### MongoDB connection error

**Solution:**
1. Get correct MONGODB_URI from MongoDB Atlas:
   - Go to MongoDB Atlas dashboard
   - Click "Connect" on your cluster
   - Select "Drivers"
   - Copy the connection string
   - Replace username and password
2. Add your IP to Atlas IP whitelist:
   - Go to "Network Access" → "Add IP Address"
   - Click "Add Current IP Address"
3. Update MONGODB_URI in backend/.env
4. Restart backend server

### Port already in use

**If port 5000 is already in use (backend):**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in backend/.env
PORT=5001
```

**If port 5173 is already in use (frontend):**
```bash
npm run dev -- --port 5174
```

### Form submission doesn't work

**Solution:**
- Check browser console for errors (F12)
- Ensure backend is running
- Check network tab to see API response
- Verify RTK Query hooks are being called

## Development Workflow

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

### Terminal 3 - Optional: Logs
```bash
# To watch backend logs
tail -f backend/logs/combined.log
```

## Next Steps

1. **Add Cloudinary Credentials** (for file uploads):
   - Sign up at cloudinary.com
   - Get your Cloud Name, API Key, API Secret
   - Add to backend/.env

2. **Configure Email** (for notifications):
   - Get Gmail App Password
   - Add EMAIL credentials to backend/.env

3. **Create More Test Data**:
   - Create multiple user accounts
   - Create study groups
   - Test group joining and chat

## Useful Commands

### Backend
```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend
```bash
# Development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## File Uploads Test (Cloudinary)

1. Fill in Cloudinary credentials in backend/.env
2. Go to a group's resources page
3. Upload a PDF or image file
4. File should upload to Cloudinary
5. You'll see file details saved in database

## Real-Time Chat Test (Socket.io)

1. Backend must be running
2. Open two browser tabs with logged-in users
3. Go to a group's chat page
4. Type a message in one tab
5. Message should appear instantly in other tab
6. Type something to see "typing..." indicator

## Email Notifications Test

1. Configure EMAIL credentials in backend/.env
2. Perform actions that trigger emails:
   - Request to join a group (admin gets notification)
   - Group admin adds a resource (members get notification)
   - New session scheduled (members get notification)
3. Check your email inbox

## Production Checklist Before Deployment

- [ ] Set NODE_ENV=production
- [ ] Use strong, unique JWT secrets (32+ chars)
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Setup Cloudinary account (free tier)
- [ ] Setup email service (Gmail, SendGrid, etc.)
- [ ] Enable HTTPS on production
- [ ] Set CORS to production URLs
- [ ] Test all features end-to-end
- [ ] Check error logs
- [ ] Load test the API

## Learn More

- **Frontend Guide:** See `FRONTEND_GUIDE.md`
- **Backend Guide:** See `backend/README.md`
- **Setup Instructions:** See `SETUP_GUIDE.md`
- **Deployment:** See `DEPLOYMENT_GUIDE.md`
- **Full README:** See `README.md`

## Support

If you encounter issues:

1. **Check Logs:**
   - Backend: `backend/logs/combined.log`
   - Frontend: Browser console (F12 → Console tab)

2. **Check Documentation:**
   - FRONTEND_GUIDE.md for UI/component issues
   - SETUP_GUIDE.md for service configuration
   - README.md for architecture overview

3. **Common Issues:**
   - Port conflicts: Change PORT in .env
   - CORS errors: Check CLIENT_URL and SERVER_URL
   - API errors: Check backend logs
   - Socket.io errors: Check SOCKET_CORS_ORIGIN

## Estimated Time

- Backend setup: 2-3 minutes
- Frontend setup: 2-3 minutes
- First test: 1-2 minutes
- **Total: 10 minutes**

---

**Happy coding!** 🚀

For the best experience, keep both backend and frontend servers running during development.
