import createError from 'http-errors';
import StudyGroupRepository from '../repositories/StudyGroupRepository.js';

const createGroup = async (groupData) => StudyGroupRepository.createGroup(groupData);

const updateGroup = async (groupId, updateData, userId) => {
  const group = await StudyGroupRepository.findById(groupId);
  if (!group) {
    throw createError(404, 'Study group not found');
  }

  if (group.createdBy._id.toString() !== userId.toString()) {
    throw createError(403, 'Only group creator may update the group');
  }

  return StudyGroupRepository.updateById(groupId, updateData);
};

const deleteGroup = async (groupId, userId) => {
  const group = await StudyGroupRepository.findById(groupId);
  if (!group) {
    throw createError(404, 'Study group not found');
  }

  if (group.createdBy._id.toString() !== userId.toString()) {
    throw createError(403, 'Only group creator may delete the group');
  }

  return StudyGroupRepository.deleteById(groupId);
};

const getGroup = async (groupId) => {
  const group = await StudyGroupRepository.findById(groupId);
  if (!group) {
    throw createError(404, 'Study group not found');
  }
  return group;
};

const listGroups = async (query = {}) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;
  const skip = (page - 1) * limit;

  const filter = { status: 'active' };

  if (query.subject) {
    filter.subject = new RegExp(query.subject, 'i');
  }

  if (query.tags) {
    filter.tags = { $in: query.tags.split(',').map((tag) => tag.trim()) };
  }

  if (query.semester) {
    filter.semester = query.semester;
  }

  if (query.meetingMode) {
    filter.meetingMode = query.meetingMode;
  }

  if (query.search) {
    filter.$or = [
      { groupName: new RegExp(query.search, 'i') },
      { subject: new RegExp(query.search, 'i') },
      { description: new RegExp(query.search, 'i') },
      { tags: new RegExp(query.search, 'i') },
    ];
  }

  const groups = await StudyGroupRepository.searchGroups(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await StudyGroupRepository.countGroups(filter);

  return { groups, total, page, limit };
};

export default {
  createGroup,
  updateGroup,
  deleteGroup,
  getGroup,
  listGroups,
};
