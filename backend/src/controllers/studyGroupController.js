import studyGroupService from '../services/studyGroupService.js';
import { successResponse } from '../utils/response.js';

export const createGroup = async (req, res, next) => {
  try {
    const group = await studyGroupService.createGroup({ ...req.body, createdBy: req.user._id });
    return res.status(201).json({
      success: true,
      message: 'Group created successfully',
      data: { group },
    });
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    const group = await studyGroupService.updateGroup(req.params.id, req.body, req.user._id);
    return successResponse(res, 'Group updated successfully', { group });
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    await studyGroupService.deleteGroup(req.params.id, req.user._id);
    return successResponse(res, 'Group deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

export const getGroup = async (req, res, next) => {
  try {
    const group = await studyGroupService.getGroup(req.params.id);
    return successResponse(res, 'Group retrieved successfully', { group });
  } catch (error) {
    next(error);
  }
};

export const listGroups = async (req, res, next) => {
  try {
    const result = await studyGroupService.listGroups(req.query);
    return successResponse(res, 'Groups retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};
