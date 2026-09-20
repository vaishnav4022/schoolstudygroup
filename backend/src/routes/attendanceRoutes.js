import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { markAttendance, getAttendanceReport } from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/:sessionId', getAttendanceReport);
router.use(authenticate);
router.post('/:sessionId', markAttendance);

export default router;
