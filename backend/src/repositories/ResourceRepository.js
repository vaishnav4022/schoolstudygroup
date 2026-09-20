import Resource from '../models/Resource.js';

const create = async (data) => Resource.create(data);
const findById = async (id) => Resource.findById(id);
const findByGroup = async (groupId) => Resource.find({ group: groupId }).populate('uploadedBy', 'name email');
const remove = async (id) => Resource.findByIdAndDelete(id);

export default { create, findById, findByGroup, remove };
