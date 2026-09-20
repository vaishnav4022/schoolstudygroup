import UserRepository from '../repositories/UserRepository.js';
import createError from 'http-errors';

const getProfile = async (userId) => {
  const user = await UserRepository.findById(userId);
  if (!user) {
    throw createError(404, 'User not found');
  }
  return user;
};

const updateProfile = async (userId, updateData) => {
  const user = await UserRepository.updateById(userId, updateData);
  if (!user) {
    throw createError(404, 'User not found');
  }
  return user;
};

const searchUsers = async (query, limit = 20, page = 1) => {
  const searchQuery = { $or: [
    { name: new RegExp(query, 'i') },
    { email: new RegExp(query, 'i') },
    { college: new RegExp(query, 'i') },
    { branch: new RegExp(query, 'i') },
    { interests: new RegExp(query, 'i') },
    { skills: new RegExp(query, 'i') },
  ] };

  const skip = (page - 1) * limit;
  const users = await UserRepository.findAll(searchQuery, { password: 0, refreshTokens: 0, passwordResetToken: 0, passwordResetExpires: 0 })
    .skip(skip)
    .limit(limit);

  const total = await UserRepository.count(searchQuery);
  return { users, total, page, limit };
};

export default {
  getProfile,
  updateProfile,
  searchUsers,
};
