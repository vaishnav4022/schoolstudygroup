import { z } from 'zod';

export const updateUserSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').optional(),
  profileImage: z.string().url('Must be a valid URL').optional(),
  college: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
  bio: z.string().optional(),
  skills: z.array(z.string()).optional(),
  interests: z.array(z.string()).optional(),
});
