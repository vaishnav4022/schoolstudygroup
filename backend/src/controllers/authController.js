import authService from '../services/authService.js';
import { successResponse } from '../utils/response.js';

export const register = async (req, res, next) => {
  try {
    const { user, tokens } = await authService.register(req.body);
    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      data: { user, tokens },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { user, tokens } = await authService.login(req.body.email, req.body.password);
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { user, tokens },
    });
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    const tokens = await authService.refreshAuthToken(refreshToken);
    return successResponse(res, 'Token refreshed', { tokens });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    await authService.logout(req.user._id, refreshToken);
    return successResponse(res, 'Logout successful', {});
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const result = await authService.forgotPassword(req.body.email);
    return successResponse(res, result.message, {});
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const result = await authService.resetPassword(req.body.token, req.body.password);
    return successResponse(res, result.message, {});
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const result = await authService.changePassword(req.user._id, req.body.currentPassword, req.body.newPassword);
    return successResponse(res, result.message, {});
  } catch (error) {
    next(error);
  }
};
