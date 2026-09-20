import logger from '../utils/logger.js';

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';
  const details = err.details || err.stack || {};

  logger.error(message, { statusCode, path: req.originalUrl, stack: err.stack });

  return res.status(statusCode).json({
    success: false,
    message,
    error: details,
  });
};

export default errorMiddleware;
