import express from 'express';
import { authenticate } from '../middlewares/authMiddleware.js';
import { createPost, getPosts, updatePost, deletePost, createComment, getComments } from '../controllers/discussionController.js';

const router = express.Router();

router.get('/:groupId/posts', getPosts);
router.get('/posts/:postId/comments', getComments);
router.use(authenticate);
router.post('/:groupId/posts', createPost);
router.put('/posts/:postId', updatePost);
router.delete('/posts/:postId', deletePost);
router.post('/posts/:postId/comments', createComment);

export default router;
