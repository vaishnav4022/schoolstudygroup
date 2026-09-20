import createError from 'http-errors';
import SessionRepository from '../repositories/SessionRepository.js';

const createSession = async (sessionData) => SessionRepository.createSession(sessionData);

const listSessions = async (groupId) => SessionRepository.getByGroup(groupId);

const updateSession = async (sessionId, userId, data) => {
  const session = await SessionRepository.getById(sessionId);
  if (!session) throw createError(404, 'Session not found');
  if (session.createdBy.toString() !== userId.toString()) throw createError(403, 'Only the creator can update this session');
  return SessionRepository.updateById(sessionId, data);
};

const deleteSession = async (sessionId, userId) => {
  const session = await SessionRepository.getById(sessionId);
  if (!session) throw createError(404, 'Session not found');
  if (session.createdBy.toString() !== userId.toString()) throw createError(403, 'Only the creator can delete this session');
  await SessionRepository.deleteById(sessionId);
  return { message: 'Session deleted' };
};

export default { createSession, listSessions, updateSession, deleteSession };
