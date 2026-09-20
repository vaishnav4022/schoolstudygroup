import Notification from '../models/Notification.js';

const createNotification = async (data) => Notification.create(data);
const listNotifications = async (userId) => Notification.find({ user: userId }).sort({ createdAt: -1 });
const markAsRead = async (id) => Notification.findByIdAndUpdate(id, { isRead: true }, { new: true });

export default { createNotification, listNotifications, markAsRead };
