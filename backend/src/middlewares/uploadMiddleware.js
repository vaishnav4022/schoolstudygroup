import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import config from '../config/index.js';

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'studygroup',
    allowed_formats: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'png', 'jpg', 'jpeg'],
    resource_type: 'auto',
    max_file_size: 10 * 1024 * 1024, // 10 MB
  },
});

const upload = multer({ storage });

export const uploadFile = upload.single('file');

export const uploadMultiple = upload.array('files', 5);

export const deleteFile = async (publicId) => cloudinary.uploader.destroy(publicId);

export default { uploadFile, uploadMultiple, deleteFile };
