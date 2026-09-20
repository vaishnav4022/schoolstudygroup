import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button, Input } from '../components';
import { useLoginMutation } from '../redux/api/authApi';
import { addToast } from '../redux/slices/uiSlice';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const response = await login(data).unwrap();
      localStorage.setItem('accessToken', response.tokens.accessToken);
      localStorage.setItem('refreshToken', response.tokens.refreshToken);
      dispatch(addToast({ type: 'success', title: 'Welcome back!', message: 'Logged in successfully.' }));
      navigate('/dashboard');
    } catch (error) {
      dispatch(addToast({ type: 'error', title: 'Login failed', message: error?.data?.message || 'Invalid credentials.' }));
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel — branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-gradient-to-br from-secondary-900 to-primary-900 p-12 text-white">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600">
            <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-lg font-bold">StudyGroup</span>
        </Link>

        <div>
          <h1 className="text-4xl font-extrabold leading-tight">
            Learn together.<br />
            Grow together.<br />
            <span className="text-primary-400">Achieve together.</span>
          </h1>
          <p className="mt-5 text-lg text-white/60 leading-relaxed">
            Join a community of learners and achieve more together.
          </p>

          <ul className="mt-8 space-y-3">
            {['Discover study groups', 'Share resources', 'Attend sessions', 'Track progress'].map((item) => (
              <li key={item} className="flex items-center gap-3 text-white/80">
                <svg className="h-5 w-5 text-primary-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p className="text-sm text-white/30">© {new Date().getFullYear()} StudyGroup</p>
      </div>

      {/* Right panel — form */}
      <div className="flex flex-1 items-center justify-center bg-white px-4 py-12 sm:px-8">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <Link to="/" className="mb-8 flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600">
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="font-bold text-secondary-900">StudyGroup</span>
          </Link>

          <h2 className="text-2xl font-bold text-secondary-900">Welcome back 👋</h2>
          <p className="mt-1.5 text-sm text-secondary-500">Login to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              {...register('password')}
              error={errors.password?.message}
            />

            <div className="flex items-center justify-end">
              <Link to="/forgot-password" className="text-xs font-medium text-primary-600 hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={isLoading} className="w-full mt-2" size="lg">
              {isLoading ? 'Logging in…' : 'Login'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-secondary-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-primary-600 hover:underline">
              Sign up for free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
