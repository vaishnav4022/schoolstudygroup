import AnalyticsRepository from '../repositories/AnalyticsRepository.js';

const getSummary = async () => AnalyticsRepository.summary();

const getStudentDashboard = async (userId) => AnalyticsRepository.studentDashboard(userId);

const getGroupDashboard = async (groupId) => AnalyticsRepository.groupDashboard(groupId);

export default {
  getSummary,
  getStudentDashboard,
  getGroupDashboard,
};
