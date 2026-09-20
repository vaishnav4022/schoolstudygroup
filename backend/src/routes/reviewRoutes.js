import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { addReview, getReviews, updateReview, deleteReview } from '../controllers/reviewController.js';

const router = express.Router();

router.get('/:groupId', getReviews);
router.use(authenticate);
router.post('/:groupId', addReview);
router.put('/:reviewId', updateReview);
router.delete('/:reviewId', deleteReview);

export default router;
