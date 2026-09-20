# Setup Guide

## 1. MongoDB Atlas
- Create a cluster.
- Create a database user.
- Get the MongoDB URI.
- Add MONGODB_URI to backend/.env.

## 2. Cloudinary
- Create a Cloudinary account.
- Get cloud name, API key, and API secret.
- Add to backend/.env.

## 3. Nodemailer
- Configure SMTP credentials.
- Use EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM.

## 4. JWT Configuration
- Generate strong random secrets.
- Use JWT_ACCESS_SECRET and JWT_REFRESH_SECRET.

## 5. Winston Logging
- Ensure logs/ directory exists.
- Use LOG_LEVEL=info or debug.

## 6. CORS Configuration
- Set CLIENT_URL and SOCKET_CORS_ORIGIN for your frontend URL.

## 7. File Upload Configuration
- Use Cloudinary for PDF, picture, and document uploads.
- Enforce max file size at 10 MB in the upload layer.
