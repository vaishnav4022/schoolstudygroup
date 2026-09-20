const variantMap = {
  primary: 'bg-primary-50 text-primary-700 ring-1 ring-primary-200',
  secondary: 'bg-secondary-100 text-secondary-700 ring-1 ring-secondary-200',
  success: 'bg-success-50 text-success-700 ring-1 ring-success-200',
  warning: 'bg-warning-50 text-warning-600 ring-1 ring-warning-200',
  danger: 'bg-danger-50 text-danger-700 ring-1 ring-danger-200',
  neutral: 'bg-secondary-100 text-secondary-600 ring-1 ring-secondary-200',
  info: 'bg-blue-50 text-blue-700 ring-1 ring-blue-200',
};

const sizeMap = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

const Badge = ({ children, variant = 'primary', size = 'md', dot = false }) => (
  <span
    className={`
      inline-flex items-center gap-1.5 rounded-md font-medium
      ${variantMap[variant]} ${sizeMap[size]}
    `}
  >
    {dot && (
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          variant === 'success' ? 'bg-success-500' :
          variant === 'danger' ? 'bg-danger-500' :
          variant === 'warning' ? 'bg-warning-500' :
          'bg-primary-500'
        }`}
      />
    )}
    {children}
  </span>
);

export default Badge;
