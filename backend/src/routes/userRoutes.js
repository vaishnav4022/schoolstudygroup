import express from 'express';
import {
  getProfile,
  updateProfile,
  searchUsers,
} from '../controllers/userController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { updateUserSchema } from '../validators/userValidator.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/me', getProfile);
router.put('/me', validationMiddleware(updateUserSchema), updateProfile);
router.get('/search', searchUsers);

export default router;
