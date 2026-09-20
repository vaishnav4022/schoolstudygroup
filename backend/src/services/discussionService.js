import createError from 'http-errors';
import PostRepository from '../repositories/PostRepository.js';
import Comment from '../models/Comment.js';

const createPost = async (authorId, groupId, title, content) => PostRepository.createPost({ author: authorId, group: groupId, title, content });

const updatePost = async (postId, userId, data) => {
  const post = await PostRepository.getPostById(postId);
  if (!post) throw createError(404, 'Post not found');
  if (post.author._id.toString() !== userId.toString()) throw createError(403, 'Only the author can edit this post');
  return PostRepository.updatePost(postId, data);
};

const deletePost = async (postId, userId) => {
  const post = await PostRepository.getPostById(postId);
  if (!post) throw createError(404, 'Post not found');
  if (post.author._id.toString() !== userId.toString()) throw createError(403, 'Only the author can delete this post');
  await PostRepository.deletePost(postId);
  return { message: 'Post deleted' };
};

const getPostsByGroup = async (groupId) => PostRepository.getPostsByGroup(groupId);

const createComment = async (authorId, postId, content) => PostRepository.createComment({ post: postId, author: authorId, content });

const getCommentsByPost = async (postId) => PostRepository.getCommentsByPost(postId);

const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw createError(404, 'Comment not found');
  if (comment.author.toString() !== userId.toString()) throw createError(403, 'Only the author can delete this comment');
  await PostRepository.deleteComment(commentId);
  return { message: 'Comment deleted' };
};

export default { createPost, updatePost, deletePost, getPostsByGroup, createComment, getCommentsByPost, deleteComment };
