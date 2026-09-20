# Frontend | Study Group Finder Platform

## Overview

The frontend is built with React, Vite, Redux Toolkit, RTK Query, React Hook Form, Zod, Tailwind CSS, and Recharts.

## Folder structure

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── redux/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── vite.config.js
```

## Setup

1. Run `npm install`.
2. Run `npm run dev`.

## Notes

- Tailwind CSS is the only styling solution.
- Pages and components must be responsive and mobile-first.
- API requests should use a centralized Axios instance and RTK Query.
