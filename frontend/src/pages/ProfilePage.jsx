import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetProfileQuery, useUpdateProfileMutation } from '../redux/api/usersApi';
import { Button, Input, TextArea, Card, Skeleton, Avatar } from '../components';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/slices/uiSlice';

const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  bio: z.string().optional(),
  skills: z.string().optional(),
  interests: z.string().optional(),
  college: z.string().optional(),
});

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { data: profile, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.user?.name || '',
      bio: profile?.user?.bio || '',
      skills: profile?.user?.skills?.join(', ') || '',
      interests: profile?.user?.interests?.join(', ') || '',
      college: profile?.user?.college || '',
    },
  });

  const onSubmit = async (data) => {
    try {
      await updateProfile({
        ...data,
        skills: data.skills ? data.skills.split(',').map((s) => s.trim()).filter(Boolean) : [],
        interests: data.interests ? data.interests.split(',').map((i) => i.trim()).filter(Boolean) : [],
      }).unwrap();
      dispatch(addToast({ type: 'success', title: 'Profile updated', message: 'Your changes have been saved.' }));
    } catch (error) {
      dispatch(addToast({ type: 'error', title: 'Update failed', message: error?.data?.message || 'Please try again.' }));
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-2xl">
        <div className="flex items-center gap-4">
          <Skeleton width="w-20" height="h-20" circle />
          <div className="space-y-2 flex-1">
            <Skeleton height="h-5" width="w-40" />
            <Skeleton height="h-4" width="w-28" />
          </div>
        </div>
        <Skeleton count={5} height="h-12" />
      </div>
    );
  }

  const user = profile?.user;

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Profile</h1>
          <p className="mt-1 text-sm text-secondary-500">Manage your personal information.</p>
        </div>

        {/* Profile summary card */}
        <Card padding="p-5">
          <div className="flex items-center gap-4">
            <Avatar initials={user?.name?.slice(0, 2)} size="xl" />
            <div>
              <p className="text-lg font-semibold text-secondary-900">{user?.name}</p>
              <p className="text-sm text-secondary-500">{user?.email}</p>
              {user?.college && (
                <p className="mt-1 text-xs text-secondary-400">{user.college}</p>
              )}
            </div>
          </div>
        </Card>

        {/* Edit form */}
        <Card title="Edit Profile" padding="p-5">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Your full name"
              autoComplete="name"
              {...register('name')}
              error={errors.name?.message}
            />

            <TextArea
              label="Bio"
              placeholder="Tell us about yourself…"
              rows={3}
              autoComplete="off"
              {...register('bio')}
              error={errors.bio?.message}
            />

            <Input
              label="College"
              placeholder="Your college or university"
              autoComplete="organization"
              {...register('college')}
              error={errors.college?.message}
            />

            <Input
              label="Skills"
              placeholder="React, Node.js, Python (comma-separated)"
              hint="Separate multiple skills with commas"
              autoComplete="off"
              {...register('skills')}
              error={errors.skills?.message}
            />

            <Input
              label="Interests"
              placeholder="Web Development, Data Science (comma-separated)"
              hint="Separate multiple interests with commas"
              autoComplete="off"
              {...register('interests')}
              error={errors.interests?.message}
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" loading={isUpdating} size="md">
                {isUpdating ? 'Saving…' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
