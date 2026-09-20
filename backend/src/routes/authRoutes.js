import express from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
} from '../controllers/authController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '../validators/authValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', validationMiddleware(registerSchema), register);
router.post('/login', validationMiddleware(loginSchema), login);
router.post('/refresh', refreshToken);
router.post('/forgot-password', validationMiddleware(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', validationMiddleware(resetPasswordSchema), resetPassword);
router.post('/logout', authenticate, logout);
router.post('/change-password', authenticate, validationMiddleware(changePasswordSchema), changePassword);

export default router;
