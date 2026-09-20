# Backend | Study Group Finder Platform

## Overview

This backend follows a feature-based clean architecture with modules for authentication, users, groups, membership, discussions, resources, sessions, attendance, notifications, reviews, and analytics.

## Folder structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── sockets/
│   ├── utils/
│   ├── validators/
│   ├── constants/
│   ├── jobs/
│   ├── uploads/
│   ├── docs/
│   ├── app.js
│   └── server.js
└── .env.example
```

## Dependencies

- express
- mongoose
- dotenv
- bcryptjs
- jsonwebtoken
- cookie-parser
- cors
- helmet
- express-rate-limit
- xss-clean
- nodemailer
- cloudinary
- socket.io
- winston
- morgan
- zod
- express-async-errors

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in all credentials.
3. Run `npm install`.
4. Start the server with `npm run dev`.

## API Standards

Response format:

```json
{
  "success": true,
  "message": "",
  "data": {}
}
```

Error format:

```json
{
  "success": false,
  "message": "",
  "error": {}
}
```

## Deployment

- Use Render for backend deployment.
- Set environment variables on Render from `.env` values.
- Use `npm start` as the production start command.

## Missing Credentials

- MongoDB Atlas URI
- Cloudinary credentials
- SMTP credentials
- JWT secrets
- Client and server URLs
