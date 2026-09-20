import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup', required: true },
  title: { type: String, required: true, trim: true },
  content: { type: String, required: true, trim: true },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
export default Post;
