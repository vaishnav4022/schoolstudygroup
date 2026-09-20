import User from '../models/User.js';
import StudyGroup from '../models/StudyGroup.js';

const listUsers = async () => User.find().select('-password -refreshTokens');

const listGroups = async () => StudyGroup.find().populate('createdBy', 'name email');

const banUser = async (userId) => User.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });

const deleteUser = async (userId) => User.findByIdAndDelete(userId);

const deleteGroup = async (groupId) => StudyGroup.findByIdAndDelete(groupId);

export default { listUsers, listGroups, banUser, deleteUser, deleteGroup };
