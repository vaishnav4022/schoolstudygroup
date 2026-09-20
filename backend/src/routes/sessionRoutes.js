import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createSession, listSessions, updateSession, deleteSession } from '../controllers/sessionController.js';

const router = express.Router();

router.get('/:groupId', listSessions);
router.use(authenticate);
router.post('/', createSession);
router.put('/:sessionId', updateSession);
router.delete('/:sessionId', deleteSession);

export default router;
