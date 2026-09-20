import Review from '../models/Review.js';

const createReview = async (data) => Review.create(data);
const getReviewById = async (id) => Review.findById(id);
const getReviewsByGroup = async (groupId) => Review.find({ group: groupId }).populate('user', 'name email profileImage');
const updateReview = async (id, data) => Review.findByIdAndUpdate(id, data, { new: true });
const deleteReview = async (id) => Review.findByIdAndDelete(id);

export default { createReview, getReviewById, getReviewsByGroup, updateReview, deleteReview };
