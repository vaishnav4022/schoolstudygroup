import joinRequestService from '../services/joinRequestService.js';
import { successResponse } from '../utils/response.js';

export const requestToJoin = async (req, res, next) => {
  try {
    const request = await joinRequestService.requestToJoin(req.user._id, req.params.groupId, req.body.message);
    return res.status(201).json({
      success: true,
      message: 'Join request sent',
      data: { request },
    });
  } catch (error) {
    next(error);
  }
};

export const cancelRequest = async (req, res, next) => {
  try {
    const result = await joinRequestService.cancelRequest(req.user._id, req.params.requestId);
    return successResponse(res, result.message, {});
  } catch (error) {
    next(error);
  }
};

export const approveRequest = async (req, res, next) => {
  try {
    const result = await joinRequestService.approveRequest(req.user._id, req.params.requestId);
    return successResponse(res, 'Request approved', result);
  } catch (error) {
    next(error);
  }
};

export const rejectRequest = async (req, res, next) => {
  try {
    const result = await joinRequestService.rejectRequest(req.user._id, req.params.requestId);
    return successResponse(res, 'Request rejected', result);
  } catch (error) {
    next(error);
  }
};
