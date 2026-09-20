import adminService from '../services/adminService.js';
import { successResponse } from '../utils/response.js';

export const listUsers = async (req, res, next) => {
  try {
    const users = await adminService.listUsers();
    return successResponse(res, 'Users retrieved', { users });
  } catch (error) { next(error); }
};

export const listGroups = async (req, res, next) => {
  try {
    const groups = await adminService.listGroups();
    return successResponse(res, 'Groups retrieved', { groups });
  } catch (error) { next(error); }
};

export const banUser = async (req, res, next) => {
  try {
    const user = await adminService.banUser(req.params.userId);
    return successResponse(res, 'User banned', { user });
  } catch (error) { next(error); }
};

export const deleteUser = async (req, res, next) => {
  try {
    await adminService.deleteUser(req.params.userId);
    return successResponse(res, 'User deleted', {});
  } catch (error) { next(error); }
};

export const deleteGroup = async (req, res, next) => {
  try {
    await adminService.deleteGroup(req.params.groupId);
    return successResponse(res, 'Group deleted', {});
  } catch (error) { next(error); }
};
