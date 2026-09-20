import createError from 'http-errors';
import JoinRequestRepository from '../repositories/JoinRequestRepository.js';
import GroupMembershipRepository from '../repositories/GroupMembershipRepository.js';
import StudyGroupRepository from '../repositories/StudyGroupRepository.js';

const requestToJoin = async (userId, groupId, message) => {
  const group = await StudyGroupRepository.findById(groupId);
  if (!group) throw createError(404, 'Group not found');

  const existingRequest = await JoinRequestRepository.findByUserAndGroup(userId, groupId);
  if (existingRequest) throw createError(409, 'Join request already exists');

  const existingMembership = await GroupMembershipRepository.findByUserAndGroup(userId, groupId);
  if (existingMembership) throw createError(409, 'You are already a member');

  const request = await JoinRequestRepository.createRequest({ user: userId, group: groupId, status: 'pending', message });
  return request;
};

const cancelRequest = async (userId, requestId) => {
  const request = await JoinRequestRepository.findById(requestId);
  if (!request) throw createError(404, 'Join request not found');
  if (request.user._id.toString() !== userId.toString()) throw createError(403, 'Not allowed');
  await JoinRequestRepository.deleteById(requestId);
  return { message: 'Request cancelled' };
};

const approveRequest = async (adminId, requestId) => {
  const request = await JoinRequestRepository.findById(requestId);
  if (!request) throw createError(404, 'Join request not found');
  if (request.group.createdBy.toString() !== adminId.toString()) throw createError(403, 'Only group admin can approve');

  request.status = 'approved';
  await request.save();
  await GroupMembershipRepository.createMembership({ user: request.user._id, group: request.group._id, role: 'member' });
  return { request };
};

const rejectRequest = async (adminId, requestId) => {
  const request = await JoinRequestRepository.findById(requestId);
  if (!request) throw createError(404, 'Join request not found');
  if (request.group.createdBy.toString() !== adminId.toString()) throw createError(403, 'Only group admin can reject');

  request.status = 'rejected';
  await request.save();
  return { request };
};

export default {
  requestToJoin,
  cancelRequest,
  approveRequest,
  rejectRequest,
};
