import GroupMembership from '../models/GroupMembership.js';

const createMembership = async (membershipData) => GroupMembership.create(membershipData);

const findByUserAndGroup = async (userId, groupId) => GroupMembership.findOne({ user: userId, group: groupId });

const removeMembership = async (userId, groupId) => GroupMembership.findOneAndDelete({ user: userId, group: groupId });

const updateMembershipRole = async (userId, groupId, role) => GroupMembership.findOneAndUpdate(
  { user: userId, group: groupId },
  { role },
  { new: true },
);

const findByGroup = async (groupId) => GroupMembership.find({ group: groupId }).populate('user', 'name email profileImage role');

const countByGroup = async (groupId) => GroupMembership.countDocuments({ group: groupId });

export default {
  createMembership,
  findByUserAndGroup,
  removeMembership,
  updateMembershipRole,
  findByGroup,
  countByGroup,
};
