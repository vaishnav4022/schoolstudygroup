import createError from 'http-errors';
import ReviewRepository from '../repositories/ReviewRepository.js';

const addReview = async (userId, groupId, rating, review) => ReviewRepository.createReview({ user: userId, group: groupId, rating, review });

const getReviews = async (groupId) => ReviewRepository.getReviewsByGroup(groupId);

const updateReview = async (reviewId, userId, data) => {
  const review = await ReviewRepository.getReviewById(reviewId);
  if (!review) throw createError(404, 'Review not found');
  if (review.user.toString() !== userId.toString()) throw createError(403, 'Only the author can update this review');
  return ReviewRepository.updateReview(reviewId, data);
};

const deleteReview = async (reviewId, userId) => {
  const review = await ReviewRepository.getReviewById(reviewId);
  if (!review) throw createError(404, 'Review not found');
  if (review.user.toString() !== userId.toString()) throw createError(403, 'Only the author can delete this review');
  await ReviewRepository.deleteReview(reviewId);
  return { message: 'Review deleted' };
};

export default { addReview, getReviews, updateReview, deleteReview };
