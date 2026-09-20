const Skeleton = ({ width = 'w-full', height = 'h-4', count = 1, circle = false, className = '' }) => (
  <div className={`flex flex-col gap-2.5 ${className}`}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={`
          animate-pulse bg-secondary-100 rounded-lg
          ${width} ${height}
          ${circle ? 'rounded-full' : ''}
        `}
      />
    ))}
  </div>
);

export default Skeleton;
