import discussionService from '../services/discussionService.js';
import { successResponse } from '../utils/response.js';

export const createPost = async (req, res, next) => {
  try {
    const post = await discussionService.createPost(req.user._id, req.params.groupId, req.body.title, req.body.content);
    return res.status(201).json({ success: true, message: 'Post created', data: { post } });
  } catch (error) { next(error); }
};

export const getPosts = async (req, res, next) => {
  try {
    const posts = await discussionService.getPostsByGroup(req.params.groupId);
    return successResponse(res, 'Posts retrieved', { posts });
  } catch (error) { next(error); }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await discussionService.updatePost(req.params.postId, req.user._id, req.body);
    return successResponse(res, 'Post updated', { post });
  } catch (error) { next(error); }
};

export const deletePost = async (req, res, next) => {
  try {
    const result = await discussionService.deletePost(req.params.postId, req.user._id);
    return successResponse(res, result.message, {});
  } catch (error) { next(error); }
};

export const createComment = async (req, res, next) => {
  try {
    const comment = await discussionService.createComment(req.user._id, req.params.postId, req.body.content);
    return res.status(201).json({ success: true, message: 'Comment added', data: { comment } });
  } catch (error) { next(error); }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await discussionService.getCommentsByPost(req.params.postId);
    return successResponse(res, 'Comments retrieved', { comments });
  } catch (error) { next(error); }
};
