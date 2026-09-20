import { z } from 'zod';

const baseStudyGroupSchema = {
  groupName: z.string().min(3, 'Group name must be at least 3 characters'),
  subject: z.string().min(2, 'Subject is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  tags: z.array(z.string()).optional(),
  maxMembers: z.number().int().min(2, 'Max members must be at least 2').optional(),
  semester: z.string().optional(),
  meetingMode: z.enum(['online', 'offline', 'hybrid']).optional(),
  meetingLink: z.string().url('Meeting link must be a valid URL').optional(),
};

export const createStudyGroupSchema = z.object(baseStudyGroupSchema);
export const updateStudyGroupSchema = z.object(baseStudyGroupSchema).partial();
