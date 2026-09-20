import { useEffect } from 'react';

const ICONS = {
  success: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  error: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  warning: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
    </svg>
  ),
  info: (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

const STYLES = {
  success: { wrap: 'bg-white border-l-4 border-success-500', icon: 'text-success-600 bg-success-50', text: 'text-secondary-900', sub: 'text-secondary-500' },
  error: { wrap: 'bg-white border-l-4 border-danger-500', icon: 'text-danger-600 bg-danger-50', text: 'text-secondary-900', sub: 'text-secondary-500' },
  warning: { wrap: 'bg-white border-l-4 border-warning-500', icon: 'text-warning-600 bg-warning-50', text: 'text-secondary-900', sub: 'text-secondary-500' },
  info: { wrap: 'bg-white border-l-4 border-primary-500', icon: 'text-primary-600 bg-primary-50', text: 'text-secondary-900', sub: 'text-secondary-500' },
};

const Toast = ({ id, type = 'info', title, message, onClose }) => {
  const s = STYLES[type] || STYLES.info;

  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <div className={`flex items-start gap-3 rounded-xl shadow-modal px-4 py-3.5 animate-slide-in ${s.wrap}`}>
      <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${s.icon}`}>
        {ICONS[type]}
      </div>
      <div className="min-w-0 flex-1 pt-0.5">
        {title && <p className={`text-sm font-semibold leading-snug ${s.text}`}>{title}</p>}
        {message && <p className={`mt-0.5 text-xs leading-relaxed ${s.sub}`}>{message}</p>}
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 rounded-md p-1 text-secondary-400 hover:bg-secondary-100 hover:text-secondary-600 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
