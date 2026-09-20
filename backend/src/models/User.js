import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  profileImage: { type: String, default: '' },
  college: { type: String, trim: true },
  branch: { type: String, trim: true },
  semester: { type: String, trim: true },
  bio: { type: String, trim: true },
  skills: [{ type: String }],
  interests: [{ type: String }],
  role: { type: String, enum: ['student', 'group_admin', 'platform_admin'], default: 'student' },
  isBlocked: { type: Boolean, default: false },
  refreshTokens: [
    {
      token: { type: String },
      expiresAt: { type: Date },
    },
  ],
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
