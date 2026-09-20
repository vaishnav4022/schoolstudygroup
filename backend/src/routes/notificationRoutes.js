import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { listNotifications, markAsRead } from '../controllers/notificationController.js';

const router = express.Router();

router.use(authenticate);
router.get('/', listNotifications);
router.patch('/:notificationId/read', markAsRead);

export default router;
