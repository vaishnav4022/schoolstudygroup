import User from '../models/User.js';
import StudyGroup from '../models/StudyGroup.js';
import Session from '../models/Session.js';
import GroupMembership from '../models/GroupMembership.js';
import Resource from '../models/Resource.js';
import Notification from '../models/Notification.js';
import Attendance from '../models/Attendance.js';

const summary = async () => {
  const [totalUsers, totalGroups, totalSessions, totalResources, totalNotifications, totalAttendances] = await Promise.all([
    User.countDocuments(),
    StudyGroup.countDocuments(),
    Session.countDocuments(),
    Resource.countDocuments(),
    Notification.countDocuments(),
    Attendance.countDocuments(),
  ]);

  return {
    totalUsers,
    totalGroups,
    totalSessions,
    totalResources,
    totalNotifications,
    totalAttendances,
  };
};

const studentDashboard = async (userId) => {
  const joinedGroups = await GroupMembership.countDocuments({ user: userId });
  const upcomingSessions = await Session.countDocuments({
    group: { $in: (await GroupMembership.find({ user: userId }).select('group -_id')).map((item) => item.group) },
  });
  const notifications = await Notification.countDocuments({ user: userId, isRead: false });
  const attendanceRecords = await Attendance.find({ student: userId });
  const attended = attendanceRecords.filter((item) => item.status === 'present').length;
  const total = attendanceRecords.length || 1;

  return {
    joinedGroups,
    upcomingSessions,
    attendancePercentage: Math.round((attended / total) * 100),
    notifications,
  };
};

const groupDashboard = async (groupId) => {
  const [totalMembers, resourcesCount, attendanceRecords] = await Promise.all([
    GroupMembership.countDocuments({ group: groupId }),
    Resource.countDocuments({ group: groupId }),
    Attendance.find({ session: { $in: await Session.find({ group: groupId }).select('_id') } }),
  ]);

  const presentCount = attendanceRecords.filter((item) => item.status === 'present').length;
  const attendanceRate = attendanceRecords.length ? Math.round((presentCount / attendanceRecords.length) * 100) : 0;

  return {
    totalMembers,
    resourcesCount,
    attendanceRate,
  };
};

export default {
  summary,
  studentDashboard,
  groupDashboard,
};
