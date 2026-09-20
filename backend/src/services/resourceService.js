import createError from 'http-errors';
import ResourceRepository from '../repositories/ResourceRepository.js';

const uploadResource = async (resourceData, file) => {
  if (!file) throw createError(400, 'File is required');

  const resource = await ResourceRepository.create({
    title: resourceData.title,
    description: resourceData.description,
    fileUrl: file.path,
    fileType: resourceData.fileType || file.mimetype.split('/')[1].toUpperCase(),
    uploadedBy: resourceData.uploadedBy,
    group: resourceData.group,
  });

  return resource;
};

const listResources = async (groupId) => ResourceRepository.findByGroup(groupId);

const deleteResource = async (resourceId, userId) => {
  const resource = await ResourceRepository.findById(resourceId);
  if (!resource) throw createError(404, 'Resource not found');
  if (resource.uploadedBy.toString() !== userId.toString()) throw createError(403, 'Not allowed');
  await ResourceRepository.remove(resourceId);
  return { message: 'Resource deleted' };
};

export default { uploadResource, listResources, deleteResource };
