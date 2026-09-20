import resourceService from '../services/resourceService.js';
import { successResponse } from '../utils/response.js';

export const uploadResource = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File is required', error: {} });
    }
    const resource = await resourceService.uploadResource({ ...req.body, uploadedBy: req.user._id }, req.file);
    return res.status(201).json({ success: true, message: 'Resource uploaded', data: { resource } });
  } catch (error) {
    next(error);
  }
};

export const listResources = async (req, res, next) => {
  try {
    const resources = await resourceService.listResources(req.params.groupId);
    return successResponse(res, 'Resources retrieved', { resources });
  } catch (error) {
    next(error);
  }
};

export const deleteResource = async (req, res, next) => {
  try {
    const result = await resourceService.deleteResource(req.params.resourceId, req.user._id);
    return successResponse(res, result.message, {});
  } catch (error) {
    next(error);
  }
};
