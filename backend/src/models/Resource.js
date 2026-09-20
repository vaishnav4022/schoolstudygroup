import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  fileUrl: { type: String, required: true },
  fileType: { type: String, enum: ['PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'PNG', 'JPG', 'JPEG', 'LINK'], default: 'PDF' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'StudyGroup', required: true },
}, { timestamps: true });

const Resource = mongoose.model('Resource', resourceSchema);
export default Resource;
