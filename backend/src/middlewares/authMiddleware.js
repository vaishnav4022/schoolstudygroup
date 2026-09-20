import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import config from '../config/index.js';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.cookies?.token;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  if (!token) {
    return next(createError(401, 'Authentication required'));
  }

  try {
    const payload = jwt.verify(token, config.jwtAccessSecret);
    const user = await User.findById(payload.id);
    if (!user) {
      return next(createError(401, 'User not found')); 
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError(401, 'Invalid or expired token'));
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(createError(403, 'Forbidden')); 
  }
  next();
};
