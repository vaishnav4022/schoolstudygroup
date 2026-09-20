import Post from '../models/Post.js';
import Comment from '../models/Comment.js';

const createPost = async (data) => Post.create(data);
const getPostById = async (id) => Post.findById(id).populate('author', 'name email profileImage');
const getPostsByGroup = async (groupId) => Post.find({ group: groupId }).populate('author', 'name email profileImage').sort({ createdAt: -1 });
const updatePost = async (id, data) => Post.findByIdAndUpdate(id, data, { new: true });
const deletePost = async (id) => Post.findByIdAndDelete(id);

const createComment = async (data) => Comment.create(data);
const getCommentsByPost = async (postId) => Comment.find({ post: postId }).populate('author', 'name email profileImage').sort({ createdAt: 1 });
const deleteComment = async (id) => Comment.findByIdAndDelete(id);

export default {
  createPost,
  getPostById,
  getPostsByGroup,
  updatePost,
  deletePost,
  createComment,
  getCommentsByPost,
  deleteComment,
};
