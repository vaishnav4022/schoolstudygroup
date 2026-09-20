import { forwardRef } from 'react';

const Input = forwardRef(
  ({ label, error, hint, type = 'text', options = [], className = '', id, ...props }, ref) => {
    // Derive id from name if not explicitly provided (supports browser autofill)
    const fieldId = id || props.name;

    const baseClass = `
      w-full rounded-lg border px-3 py-2.5 text-sm text-secondary-900 bg-white
      placeholder-secondary-400 outline-none transition-all duration-150
      focus:ring-2 focus:ring-primary-100
      disabled:bg-secondary-50 disabled:text-secondary-500 disabled:cursor-not-allowed
      ${error
        ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
        : 'border-secondary-200 focus:border-primary-500'
      }
      ${className}
    `;

    if (type === 'select') {
      return (
        <div className="flex flex-col gap-1.5">
          {label && (
            <label htmlFor={fieldId} className="text-sm font-medium text-secondary-700">
              {label}
            </label>
          )}
          <select id={fieldId} ref={ref} className={baseClass} {...props}>
            <option value="">Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {error && <p id={`${fieldId}-error`} className="text-xs text-danger-600" role="alert">{error}</p>}
          {hint && !error && <p id={`${fieldId}-hint`} className="text-xs text-secondary-500">{hint}</p>}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-secondary-700">
            {label}
          </label>
        )}
        <input
          id={fieldId}
          ref={ref}
          type={type}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={baseClass}
          {...props}
        />
        {error && <p id={`${fieldId}-error`} className="text-xs text-danger-600" role="alert">{error}</p>}
        {hint && !error && <p id={`${fieldId}-hint`} className="text-xs text-secondary-500">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
