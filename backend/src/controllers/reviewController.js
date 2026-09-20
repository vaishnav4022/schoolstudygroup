import reviewService from '../services/reviewService.js';
import { successResponse } from '../utils/response.js';

export const addReview = async (req, res, next) => {
  try {
    const review = await reviewService.addReview(req.user._id, req.params.groupId, req.body.rating, req.body.review);
    return res.status(201).json({ success: true, message: 'Review added', data: { review } });
  } catch (error) { next(error); }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviews(req.params.groupId);
    return successResponse(res, 'Reviews retrieved', { reviews });
  } catch (error) { next(error); }
};

export const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(req.params.reviewId, req.user._id, req.body);
    return successResponse(res, 'Review updated', { review });
  } catch (error) { next(error); }
};

export const deleteReview = async (req, res, next) => {
  try {
    const result = await reviewService.deleteReview(req.params.reviewId, req.user._id);
    return successResponse(res, result.message, {});
  } catch (error) { next(error); }
};
