import StudyGroup from '../models/StudyGroup.js';

const createGroup = async (groupData) => StudyGroup.create(groupData);

const findById = async (id) => StudyGroup.findById(id).populate('createdBy', 'name email profileImage');

const updateById = async (id, updateData) => StudyGroup.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).populate('createdBy', 'name email profileImage');

const deleteById = async (id) => StudyGroup.findByIdAndDelete(id);

const searchGroups = async (filter, projection = {}) => StudyGroup.find(filter, projection).populate('createdBy', 'name email profileImage');

const countGroups = async (filter = {}) => StudyGroup.countDocuments(filter);

export default {
  createGroup,
  findById,
  updateById,
  deleteById,
  searchGroups,
  countGroups,
};
