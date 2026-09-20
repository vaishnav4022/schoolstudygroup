import attendanceService from '../services/attendanceService.js';
import { successResponse } from '../utils/response.js';

export const markAttendance = async (req, res, next) => {
  try {
    const entry = await attendanceService.markAttendance({ ...req.body, session: req.params.sessionId });
    return res.status(201).json({ success: true, message: 'Attendance marked', data: { entry } });
  } catch (error) { next(error); }
};

export const getAttendanceReport = async (req, res, next) => {
  try {
    const attendance = await attendanceService.getAttendanceReport(req.params.sessionId);
    return successResponse(res, 'Attendance report retrieved', { attendance });
  } catch (error) { next(error); }
};
