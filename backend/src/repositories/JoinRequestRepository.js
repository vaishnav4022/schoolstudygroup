import JoinRequest from '../models/JoinRequest.js';

const createRequest = async (data) => JoinRequest.create(data);

const findById = async (id) => JoinRequest.findById(id).populate('user', 'name email profileImage').populate('group', 'groupName subject createdBy');

const findByUserAndGroup = async (userId, groupId) => JoinRequest.findOne({ user: userId, group: groupId });

const findPendingByGroup = async (groupId) => JoinRequest.find({ group: groupId, status: 'pending' }).populate('user', 'name email profileImage');

const updateStatus = async (id, status) => JoinRequest.findByIdAndUpdate(id, { status }, { new: true });

const deleteById = async (id) => JoinRequest.findByIdAndDelete(id);

export default {
  createRequest,
  findById,
  findByUserAndGroup,
  findPendingByGroup,
  updateStatus,
  deleteById,
};
