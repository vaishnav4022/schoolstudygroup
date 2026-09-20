import analyticsService from '../services/analyticsService.js';
import { successResponse } from '../utils/response.js';

export const studentDashboard = async (req, res, next) => {
  try {
    const summary = await analyticsService.getStudentDashboard(req.user._id);
    return successResponse(res, 'Student dashboard analytics loaded', { summary });
  } catch (error) {
    next(error);
  }
};

export const groupDashboard = async (req, res, next) => {
  try {
    const summary = await analyticsService.getGroupDashboard(req.params.groupId);
    return successResponse(res, 'Group dashboard analytics loaded', { summary });
  } catch (error) {
    next(error);
  }
};

export const adminDashboard = async (req, res, next) => {
  try {
    const summary = await analyticsService.getSummary();
    return successResponse(res, 'Admin dashboard analytics loaded', { summary });
  } catch (error) {
    next(error);
  }
};
