import express from 'express';
import {
  createGroup,
  updateGroup,
  deleteGroup,
  getGroup,
  listGroups,
} from '../controllers/studyGroupController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createStudyGroupSchema, updateStudyGroupSchema } from '../validators/studyGroupValidator.js';

const router = express.Router();

router.get('/', listGroups);
router.get('/:id', getGroup);
router.use(authenticate);
router.post('/', validationMiddleware(createStudyGroupSchema), createGroup);
router.put('/:id', validationMiddleware(updateStudyGroupSchema), updateGroup);
router.delete('/:id', deleteGroup);

export default router;
