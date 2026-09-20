# Deployment Guide

## Backend Deployment (Render)
1. Create a new Render Web Service.
2. Connect the repository.
3. Set the build command: npm install.
4. Set the start command: npm start.
5. Add environment variables from backend/.env.example.
6. Enable auto-deploy.

## Frontend Deployment (Vercel)
1. Create a Vercel project.
2. Connect the frontend folder.
3. Set the build command: npm run build.
4. Set the output directory: dist.
5. Add VITE_API_URL for the deployed backend URL.

## Database
- Use MongoDB Atlas.
- Create a database user and allow access from Render/Vercel IPs or 0.0.0.0/0.

## Storage
- Create a Cloudinary account.
- Add CLOUDINARY_* values to environment variables.

## Email
- Use any SMTP provider (Gmail, Outlook, SendGrid, Mailgun).
- Configure EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD, EMAIL_FROM.
