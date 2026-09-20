import notificationService from '../services/notificationService.js';
import { successResponse } from '../utils/response.js';

export const listNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.listNotifications(req.user._id);
    return successResponse(res, 'Notifications retrieved', { notifications });
  } catch (error) { next(error); }
};

export const markAsRead = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.notificationId);
    return successResponse(res, 'Notification marked as read', { notification });
  } catch (error) { next(error); }
};
