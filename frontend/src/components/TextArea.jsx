import { forwardRef } from 'react';

const TextArea = forwardRef(
  ({ label, placeholder, error, hint, rows = 4, className = '', id, ...props }, ref) => {
    // Derive id from name if not explicitly provided (supports browser autofill)
    const fieldId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-secondary-700">
            {label}
          </label>
        )}
        <textarea
          id={fieldId}
          ref={ref}
          rows={rows}
          placeholder={placeholder}
          aria-describedby={error ? `${fieldId}-error` : hint ? `${fieldId}-hint` : undefined}
          aria-invalid={error ? 'true' : undefined}
          className={`
            w-full rounded-lg border px-3 py-2.5 text-sm text-secondary-900 bg-white
            placeholder-secondary-400 outline-none transition-all duration-150 resize-y
            focus:ring-2 focus:ring-primary-100
            disabled:bg-secondary-50 disabled:cursor-not-allowed
            ${error
              ? 'border-danger-400 focus:border-danger-500 focus:ring-danger-100'
              : 'border-secondary-200 focus:border-primary-500'
            }
            ${className}
          `}
          {...props}
        />
        {error && <p id={`${fieldId}-error`} className="text-xs text-danger-600" role="alert">{error}</p>}
        {hint && !error && <p id={`${fieldId}-hint`} className="text-xs text-secondary-500">{hint}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
export default TextArea;
