import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import createError from 'http-errors';
import config from '../config/index.js';
import UserRepository from '../repositories/UserRepository.js';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/token.js';
import { sendEmail } from '../utils/emailService.js';

const hashPassword = async (password) => bcrypt.hash(password, 12);

const comparePassword = async (password, hashed) => bcrypt.compare(password, hashed);

const buildTokenResponse = (user) => {
  const payload = { id: user._id.toString(), role: user.role };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
};

const register = async (userData) => {
  const existingUser = await UserRepository.findByEmail(userData.email);
  if (existingUser) {
    throw createError(409, 'Email already registered');
  }

  const hashedPassword = await hashPassword(userData.password);
  const user = await UserRepository.createUser({ ...userData, password: hashedPassword });
  const tokens = buildTokenResponse(user);
  await UserRepository.addRefreshToken(user._id, tokens.refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
  return { user, tokens };
};

const login = async (email, password) => {
  const user = await UserRepository.findByEmail(email, '+password');
  if (!user) {
    throw createError(401, 'Invalid credentials');
  }

  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    throw createError(401, 'Invalid credentials');
  }

  const tokens = buildTokenResponse(user);
  await UserRepository.addRefreshToken(user._id, tokens.refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
  const userDto = user.toObject();
  delete userDto.password;
  return { user: userDto, tokens };
};

const refreshAuthToken = async (refreshToken) => {
  if (!refreshToken) {
    throw createError(401, 'Refresh token required');
  }

  let payload;
  try {
    payload = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw createError(401, 'Invalid refresh token');
  }

  const user = await UserRepository.findByRefreshToken(refreshToken);
  if (!user) {
    throw createError(401, 'Refresh token not recognized');
  }

  const tokens = buildTokenResponse(user);
  await UserRepository.removeRefreshToken(user._id, refreshToken);
  await UserRepository.addRefreshToken(user._id, tokens.refreshToken, new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
  return tokens;
};

const logout = async (userId, refreshToken) => {
  await UserRepository.removeRefreshToken(userId, refreshToken);
};

const forgotPassword = async (email) => {
  const user = await UserRepository.findByEmail(email);
  if (!user) {
    throw createError(404, 'User not found');
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

  await UserRepository.setPasswordReset(email, resetToken, expiresAt);

  const resetUrl = `${config.clientUrl}/reset-password?token=${resetToken}`;
  const html = `<p>Please use the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>This link expires in 30 minutes.</p>`;

  await sendEmail({
    to: email,
    subject: 'StudyGroup Finder — Password Reset',
    html,
    text: `Reset your password using this link: ${resetUrl}`,
  });

  return { message: 'Password reset link sent' };
};

const resetPassword = async (resetToken, password) => {
  const user = await UserRepository.findOne({
    passwordResetToken: resetToken,
    passwordResetExpires: { $gt: new Date() },
  }, '+password');

  if (!user) {
    throw createError(400, 'Invalid or expired reset token');
  }

  user.password = await hashPassword(password);
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  await user.save();

  return { message: 'Password has been reset successfully' };
};

const changePassword = async (userId, currentPassword, newPassword) => {
  const user = await UserRepository.findById(userId, '+password');
  if (!user) {
    throw createError(404, 'User not found');
  }

  const validPassword = await comparePassword(currentPassword, user.password);
  if (!validPassword) {
    throw createError(401, 'Current password does not match');
  }

  user.password = await hashPassword(newPassword);
  await user.save();

  return { message: 'Password updated successfully' };
};

export default {
  register,
  login,
  refreshAuthToken,
  logout,
  forgotPassword,
  resetPassword,
  changePassword,
};
