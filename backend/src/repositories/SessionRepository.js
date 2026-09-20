import Session from '../models/Session.js';

const createSession = async (data) => Session.create(data);
const getByGroup = async (groupId) => Session.find({ group: groupId }).sort({ date: 1 });
const getById = async (id) => Session.findById(id);
const updateById = async (id, data) => Session.findByIdAndUpdate(id, data, { new: true });
const deleteById = async (id) => Session.findByIdAndDelete(id);

export default { createSession, getByGroup, getById, updateById, deleteById };
