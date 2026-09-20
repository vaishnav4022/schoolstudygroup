import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input } from '../components';
import { useRegisterMutation } from '../redux/api/authApi';
import { addToast } from '../redux/slices/uiSlice';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  college: z.string().optional(),
  branch: z.string().optional(),
  semester: z.string().optional(),
});

const getPasswordStrength = (password = '') => {
  if (!password) return { label: '', width: 'w-0', color: '' };
  if (password.length < 6) return { label: 'Weak', width: 'w-1/4', color: 'bg-danger-500' };
  if (password.length < 8) return { label: 'Fair', width: 'w-2/4', color: 'bg-warning-500' };
  const hasUpper = /[A-Z]/.test(password);
  const hasNum = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const score = [hasUpper, hasNum, hasSpecial].filter(Boolean).length;
  if (score >= 2) return { label: 'Strong', width: 'w-full', color: 'bg-success-500' };
  return { label: 'Moderate', width: 'w-3/4', color: 'bg-primary-500' };
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const password = watch('password', '');
  const strength = getPasswordStrength(password);

  const onSubmit = async (data) => {
    try {
      const response = await register(data).unwrap();
      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      dispatch(addToast({ type: 'success', title: 'Account created!', message: 'Welcome to StudyGroup.' }));
      navigate('/dashboard');
    } catch (error) {
      dispatch(addToast({ type: 'error', title: 'Registration failed', message: error?.data?.message || 'Please try again.' }));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-5/12 flex-col justify-between bg-gradient-to-br from-secondary-900 to-primary-900 p-12 text-white">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-lg font-bold">StudyGroup</span>
        </Link>

        <div>
          <h1 className="text-3xl font-extrabold leading-tight">
            Join a community<br />of learners and<br />
            <span className="text-primary-400">achieve more together.</span>
          </h1>
          <p className="mt-4 text-white/60">
            Thousands of students already studying smarter.
          </p>
        </div>

        <p className="text-sm text-white/30">© {new Date().getFullYear()} StudyGroup</p>
      </div>

      {/* Right form panel */}
      <div className="flex flex-1 items-start justify-center overflow-y-auto bg-white px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-secondary-900">StudyGroup</span>
          </Link>

          <h2 className="text-2xl font-bold text-secondary-900">Create your account</h2>
          <p className="mt-1.5 text-sm text-secondary-500">Join thousands of students today</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Input
              label="Full Name"
              placeholder="John Doe"
              autoComplete="name"
              {...registerField('name')}
              error={errors.name?.message}
            />
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              {...registerField('email')}
              error={errors.email?.message}
            />

            {/* Password with strength bar */}
            <div>
              <Input
                label="Password"
                type="password"
                placeholder="Create a strong password"
                autoComplete="new-password"
                {...registerField('password')}
                error={errors.password?.message}
              />
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 w-full rounded-full bg-secondary-100">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.width} ${strength.color}`} />
                  </div>
                  <p className={`text-xs font-medium ${
                    strength.label === 'Strong' ? 'text-success-600' :
                    strength.label === 'Moderate' ? 'text-primary-600' :
                    strength.label === 'Fair' ? 'text-warning-600' : 'text-danger-600'
                  }`}>
                    Password strength: {strength.label}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="College (Optional)"
                placeholder="Your college"
                autoComplete="organization"
                {...registerField('college')}
                error={errors.college?.message}
              />
              <Input
                label="Branch (Optional)"
                placeholder="CSE, ECE…"
                autoComplete="off"
                {...registerField('branch')}
                error={errors.branch?.message}
              />
            </div>

            <Input
              label="Semester (Optional)"
              placeholder="1st, 2nd…"
              autoComplete="off"
              {...registerField('semester')}
              error={errors.semester?.message}
            />

            <Button type="submit" loading={isLoading} className="w-full mt-2" size="lg">
              {isLoading ? 'Creating account…' : 'Create Account'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-primary-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
