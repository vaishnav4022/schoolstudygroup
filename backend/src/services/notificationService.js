import NotificationRepository from '../repositories/NotificationRepository.js';
import { sendEmail } from '../utils/emailService.js';

const createInAppNotification = async (userId, title, description) => NotificationRepository.createNotification({
  user: userId,
  title,
  description,
  isRead: false,
});

const sendEmailNotification = async (email, subject, message, htmlContent) => {
  try {
    await sendEmail({
      to: email,
      subject,
      text: message,
      html: htmlContent || `<p>${message}</p>`,
    });
  } catch (error) {
    console.error('Email notification failed:', error);
  }
};

const notifyJoinRequestApproved = async (user, group) => {
  await createInAppNotification(user._id, 'Join Request Approved', `You have been approved to join "${group.groupName}"`);
  await sendEmailNotification(
    user.email,
    'Join Request Approved - StudyGroup Finder',
    `You have been approved to join the study group "${group.groupName}"`,
    `<h2>Welcome to ${group.groupName}!</h2><p>Your join request has been approved. You can now access all group materials and participate in discussions.</p>`,
  );
};

const notifyNewResourceAdded = async (groupMembers, resourceTitle, groupName) => {
  const promises = groupMembers.map((member) => createInAppNotification(member._id, 'New Resource Added', `${resourceTitle} has been added to "${groupName}"`));
  await Promise.all(promises);
};

const notifySessionScheduled = async (groupMembers, sessionTopic, sessionDate, groupName) => {
  const promises = groupMembers.map((member) => createInAppNotification(member._id, 'New Session Scheduled', `${sessionTopic} scheduled for ${sessionDate} in "${groupName}"`));
  await Promise.all(promises);
};

const listNotifications = async (userId) => NotificationRepository.listNotifications(userId);
const markAsRead = async (notificationId) => NotificationRepository.markAsRead(notificationId);

export default {
  createInAppNotification,
  sendEmailNotification,
  notifyJoinRequestApproved,
  notifyNewResourceAdded,
  notifySessionScheduled,
  listNotifications,
  markAsRead,
};
