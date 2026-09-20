import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { studentDashboard, groupDashboard, adminDashboard } from '../controllers/analyticsController.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.use(authenticate);

router.get('/student-dashboard', studentDashboard);
router.get('/group-dashboard/:groupId', groupDashboard);
router.get('/admin-dashboard', roleMiddleware('platform_admin'), adminDashboard);

export default router;
