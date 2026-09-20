import { successResponse } from '../utils/response.js';

export const healthCheck = (req, res) => {
  return successResponse(res, 'API is healthy', { uptime: process.uptime() });
};
