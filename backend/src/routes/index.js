import express from 'express';
import healthRouter from './healthRoutes.js';
import authRouter from './authRoutes.js';
import userRouter from './userRoutes.js';
import studyGroupRouter from './studyGroupRoutes.js';
import joinRequestRouter from './joinRequestRoutes.js';
import resourceRouter from './resourceRoutes.js';
import discussionRouter from './discussionRoutes.js';
import sessionRouter from './sessionRoutes.js';
import attendanceRouter from './attendanceRoutes.js';
import analyticsRouter from './analyticsRoutes.js';
import adminRouter from './adminRoutes.js';
import notificationRouter from './notificationRoutes.js';
import reviewRouter from './reviewRoutes.js';

const router = express.Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/groups', studyGroupRouter);
router.use('/join-requests', joinRequestRouter);
router.use('/resources', resourceRouter);
router.use('/discussion', discussionRouter);
router.use('/sessions', sessionRouter);
router.use('/attendance', attendanceRouter);
router.use('/analytics', analyticsRouter);
router.use('/admin', adminRouter);
router.use('/notifications', notificationRouter);
router.use('/reviews', reviewRouter);

export default router;
