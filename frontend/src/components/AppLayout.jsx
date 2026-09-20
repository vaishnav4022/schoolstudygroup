import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../redux/slices/uiSlice';
import Sidebar from './Sidebar';

const AppLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex h-screen overflow-hidden bg-secondary-50">
      <Sidebar />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header bar */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-secondary-100 bg-white px-4 sm:px-6">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-secondary-500 hover:bg-secondary-100 lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Spacer for desktop (sidebar already visible) */}
          <div className="hidden lg:block" />

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-secondary-500 sm:block">
              Welcome back, <span className="font-medium text-secondary-900">{user?.name?.split(' ')[0]}</span>
            </span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
