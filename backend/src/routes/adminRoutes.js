import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import { listUsers, listGroups, banUser, deleteUser, deleteGroup } from '../controllers/adminController.js';

const router = express.Router();

router.use(authenticate);
router.use(roleMiddleware('platform_admin'));

router.get('/users', listUsers);
router.get('/groups', listGroups);
router.patch('/users/:userId/ban', banUser);
router.delete('/users/:userId', deleteUser);
router.delete('/groups/:groupId', deleteGroup);

export default router;
