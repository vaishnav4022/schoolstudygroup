import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../components/Button';

const FEATURES = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    title: 'Discover Groups',
    desc: 'Search by subject, semester, tags, and meeting mode to find groups that match your goals.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    title: 'Real-Time Chat',
    desc: 'Connect instantly with group members via live chat with typing indicators.',
    color: 'bg-violet-50 text-violet-600',
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'Track Progress',
    desc: 'Monitor attendance, upcoming sessions, and group engagement with clear analytics.',
    color: 'bg-emerald-50 text-emerald-600',
  },
];

const STEPS = [
  { num: '01', title: 'Create Your Profile', desc: 'Sign up and tell us about your subjects and interests.' },
  { num: '02', title: 'Find a Group', desc: 'Search and filter study groups by subject, semester, or meeting mode.' },
  { num: '03', title: 'Collaborate', desc: 'Join sessions, share resources, and grow together.' },
];

const HomePage = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-secondary-900 via-secondary-800 to-primary-900 px-4 py-24 text-white sm:px-6 lg:px-8">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-primary-600/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-primary-400/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
            Study smarter, together
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Find Your People.{' '}
            <span className="text-gradient">Study Better Together.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
            Discover study groups, join communities, share resources, schedule sessions,
            and achieve more — all in one platform built for students.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/discover">
              <Button size="xl" className="shadow-lg">
                Find Study Groups
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link to="/register">
                <Button size="xl" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                  Create Account
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900">
              Everything you need to study smarter
            </h2>
            <p className="mt-3 text-secondary-500">
              Powerful tools to help you collaborate, share, and grow together.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-2xl border border-secondary-100 bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200">
                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.color}`}>
                  {f.icon}
                </div>
                <h3 className="mt-4 text-base font-semibold text-secondary-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary-500">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary-50 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-secondary-900">How It Works</h2>
            <p className="mt-3 text-secondary-500">Three simple steps to get started</p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.num} className="relative">
                {i < STEPS.length - 1 && (
                  <div className="absolute left-full top-6 hidden h-px w-full bg-secondary-200 md:block" style={{ width: 'calc(100% - 3rem)', left: '3.5rem' }} />
                )}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600 text-white font-bold text-sm">
                  {s.num}
                </div>
                <h3 className="mt-4 text-base font-semibold text-secondary-900">{s.title}</h3>
                <p className="mt-2 text-sm text-secondary-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {!isAuthenticated && (
        <section className="bg-primary-600 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">Ready to study smarter?</h2>
          <p className="mt-3 text-primary-100">
            Join thousands of students already learning together.
          </p>
          <div className="mt-8">
            <Link to="/register">
              <Button size="xl" variant="outline" className="border-white bg-white text-primary-700 hover:bg-primary-50">
                Get Started for Free
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-secondary-100 px-4 py-8 text-center sm:px-6 lg:px-8">
        <p className="text-sm text-secondary-400">
          © {new Date().getFullYear()} StudyGroup. Built for students, by students.
        </p>
      </footer>
    </main>
  );
};

export default HomePage;
