import sessionService from '../services/sessionService.js';
import { successResponse } from '../utils/response.js';

export const createSession = async (req, res, next) => {
  try {
    const session = await sessionService.createSession({ ...req.body, createdBy: req.user._id });
    return res.status(201).json({ success: true, message: 'Session created', data: { session } });
  } catch (error) { next(error); }
};

export const listSessions = async (req, res, next) => {
  try {
    const sessions = await sessionService.listSessions(req.params.groupId);
    return successResponse(res, 'Sessions retrieved', { sessions });
  } catch (error) { next(error); }
};

export const updateSession = async (req, res, next) => {
  try {
    const session = await sessionService.updateSession(req.params.sessionId, req.user._id, req.body);
    return successResponse(res, 'Session updated', { session });
  } catch (error) { next(error); }
};

export const deleteSession = async (req, res, next) => {
  try {
    const result = await sessionService.deleteSession(req.params.sessionId, req.user._id);
    return successResponse(res, result.message, {});
  } catch (error) { next(error); }
};
