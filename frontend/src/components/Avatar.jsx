// Color palette for avatar backgrounds when no image is provided
const AVATAR_COLORS = [
  'from-blue-500 to-blue-600',
  'from-violet-500 to-violet-600',
  'from-emerald-500 to-emerald-600',
  'from-amber-500 to-amber-600',
  'from-rose-500 to-rose-600',
  'from-cyan-500 to-cyan-600',
  'from-indigo-500 to-indigo-600',
  'from-teal-500 to-teal-600',
];

const getColorIndex = (str = '') => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash) % AVATAR_COLORS.length;
};

const sizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-9 h-9 text-sm',
  lg: 'w-11 h-11 text-base',
  xl: 'w-14 h-14 text-lg',
  '2xl': 'w-20 h-20 text-2xl',
};

const Avatar = ({ src, alt, initials = '', size = 'md', className = '' }) => {
  const colorClass = AVATAR_COLORS[getColorIndex(initials)];

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`rounded-full object-cover flex-shrink-0 ${sizes[size]} ${className}`}
      />
    );
  }

  return (
    <div
      className={`
        flex items-center justify-center rounded-full font-bold text-white flex-shrink-0
        bg-gradient-to-br ${colorClass} ${sizes[size]} ${className}
      `}
    >
      {initials?.slice(0, 2).toUpperCase()}
    </div>
  );
};

export default Avatar;
