import Attendance from '../models/Attendance.js';

const markAttendance = async (data) => Attendance.create(data);
const getAttendance = async (sessionId) => Attendance.find({ session: sessionId }).populate('student', 'name email');

export default { markAttendance, getAttendance };
