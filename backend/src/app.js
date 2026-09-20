import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import xssClean from 'xss-clean';
import morgan from 'morgan';
import 'express-async-errors';
import config from './config/index.js';
import logger from './utils/logger.js';
import errorMiddleware from './middlewares/errorMiddleware.js';
import apiRoutes from './routes/index.js';

const app = express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.cookieSecret));
app.use(xssClean());
// Configure CORS to allow multiple origins (safe for dev & production)
const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (config.clientUrls && config.clientUrls.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy: This origin is not allowed'), false);
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
};

app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));
app.use(morgan('combined', { stream: logger.stream }));

const limiter = rateLimit({
  windowMs: config.rateLimitWindow * 60 * 1000,
  max: config.rateLimitMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use('/api/v1', apiRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    error: { status: 404, path: req.originalUrl },
  });
});

app.use(errorMiddleware);

export default app;
