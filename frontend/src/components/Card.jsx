const Card = ({ title, subtitle, children, className = '', padding = 'p-6', onClick }) => (
  <section
    onClick={onClick}
    className={`
      bg-white rounded-xl border border-secondary-100 shadow-card
      ${onClick ? 'cursor-pointer hover:shadow-card-hover transition-shadow duration-200' : ''}
      ${padding} ${className}
    `}
  >
    {(title || subtitle) && (
      <header className="mb-4 pb-4 border-b border-secondary-100">
        {title && <h2 className="text-base font-semibold text-secondary-900">{title}</h2>}
        {subtitle && <p className="mt-0.5 text-sm text-secondary-500">{subtitle}</p>}
      </header>
    )}
    {children}
  </section>
);

export default Card;
