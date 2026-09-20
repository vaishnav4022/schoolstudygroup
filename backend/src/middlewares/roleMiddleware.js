import createError from 'http-errors';

const roleMiddleware = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return next(createError(401, 'Unauthorized')); 
  }

  if (!allowedRoles.includes(req.user.role)) {
    return next(createError(403, 'Forbidden')); 
  }

  return next();
};

export default roleMiddleware;
