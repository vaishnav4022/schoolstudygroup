import userService from '../services/userService.js';
import { successResponse } from '../utils/response.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user._id);
    return successResponse(res, 'Profile retrieved', { user });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user._id, req.body);
    return successResponse(res, 'Profile updated', { user });
  } catch (error) {
    next(error);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    const query = req.query.q || '';
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const result = await userService.searchUsers(query, limit, page);
    return successResponse(res, 'Users found', result);
  } catch (error) {
    next(error);
  }
};
