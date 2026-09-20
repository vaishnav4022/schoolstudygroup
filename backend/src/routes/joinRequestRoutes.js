import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import {
  requestToJoin,
  cancelRequest,
  approveRequest,
  rejectRequest,
} from '../controllers/joinRequestController.js';

const router = express.Router();

router.use(authenticate);
router.post('/:groupId', requestToJoin);
router.delete('/cancel/:requestId', cancelRequest);
router.patch('/approve/:requestId', approveRequest);
router.patch('/reject/:requestId', rejectRequest);

export default router;
