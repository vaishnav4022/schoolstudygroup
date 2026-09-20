import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { uploadFile } from '../middlewares/uploadMiddleware.js';
import { uploadResource, listResources, deleteResource } from '../controllers/resourceController.js';

const router = express.Router();

router.get('/:groupId', listResources);
router.use(authenticate);
router.post('/', uploadFile, uploadResource);
router.delete('/:resourceId', deleteResource);

export default router;
