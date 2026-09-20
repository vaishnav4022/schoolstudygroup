import User from '../models/User.js';

const createUser = async (userData) => User.create(userData);

const findByEmail = async (email, projection = {}) => User.findOne({ email: email.toLowerCase().trim() }, projection);

const findById = async (id, projection = {}) => User.findById(id, projection);

const findOne = async (filter = {}, projection = {}) => User.findOne(filter, projection);

const updateById = async (id, updateData) => User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

const addRefreshToken = async (id, token, expiresAt) => User.findByIdAndUpdate(id, {
  $push: { refreshTokens: { token, expiresAt } },
}, { new: true });

const removeRefreshToken = async (id, token) => User.findByIdAndUpdate(id, {
  $pull: { refreshTokens: { token } },
}, { new: true });

const findByRefreshToken = async (token) => User.findOne({ 'refreshTokens.token': token });

const findAll = async (filter = {}, projection = {}) => User.find(filter, projection);

const count = async (filter = {}) => User.countDocuments(filter);

const setPasswordReset = async (email, resetToken, expiresAt) => User.findOneAndUpdate(
  { email: email.toLowerCase().trim() },
  { passwordResetToken: resetToken, passwordResetExpires: expiresAt },
  { new: true },
);

const resetPassword = async (id, password) => User.findByIdAndUpdate(
  id,
  { password, passwordResetToken: null, passwordResetExpires: null },
  { new: true },
);

export default {
  createUser,
  findByEmail,
  findById,
  updateById,
  addRefreshToken,
  removeRefreshToken,
  findByRefreshToken,
  findAll,
  count,
  setPasswordReset,
  resetPassword,
};
