import { forwardRef } from 'react';

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm',
  secondary: 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200 focus:ring-secondary-400',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-sm',
  success: 'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-sm',
  outline: 'bg-white border border-secondary-300 text-secondary-700 hover:bg-secondary-50 focus:ring-secondary-400',
  ghost: 'bg-transparent text-secondary-600 hover:bg-secondary-100 focus:ring-secondary-400',
};

const sizes = {
  xs: 'px-2.5 py-1 text-xs rounded-md',
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2 text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-sm rounded-lg',
  xl: 'px-6 py-3 text-base rounded-xl',
};

const Button = forwardRef(
  ({ children, className = '', variant = 'primary', size = 'md', loading = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={`
          inline-flex items-center justify-center gap-2 font-semibold
          transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1
          disabled:cursor-not-allowed disabled:opacity-50
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
