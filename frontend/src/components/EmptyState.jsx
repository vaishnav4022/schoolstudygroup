import Button from './Button';

const EmptyState = ({ icon, title, message, buttonText, onButtonClick }) => (
  <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary-100 text-3xl">
      {icon}
    </div>
    <div className="space-y-1">
      <h3 className="text-base font-semibold text-secondary-900">{title}</h3>
      <p className="text-sm text-secondary-500">{message}</p>
    </div>
    {buttonText && onButtonClick && (
      <Button onClick={onButtonClick} size="sm" className="mt-2">
        {buttonText}
      </Button>
    )}
  </div>
);

export default EmptyState;
