import AttendanceRepository from '../repositories/AttendanceRepository.js';

const markAttendance = async (data) => AttendanceRepository.markAttendance(data);

const getAttendanceReport = async (sessionId) => AttendanceRepository.getAttendance(sessionId);

export default { markAttendance, getAttendanceReport };
