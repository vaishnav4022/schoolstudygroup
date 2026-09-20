import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  review: { type: String, trim: true },
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
