import mongoose from 'mongoose';

const studyGroupSchema = new mongoose.Schema({
  groupName: { type: String, required: true, trim: true },
  subject: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  tags: [{ type: String }],
  maxMembers: { type: Number, default: 10 },
  currentMembers: { type: Number, default: 0 },
  semester: { type: String, trim: true },
  meetingMode: { type: String, enum: ['online', 'offline', 'hybrid'], default: 'online' },
  meetingLink: { type: String, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['active', 'inactive', 'archived'], default: 'active' },
}, { timestamps: true });

const StudyGroup = mongoose.model('StudyGroup', studyGroupSchema);
export default StudyGroup;
