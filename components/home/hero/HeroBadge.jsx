export default function HeroBadge({
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        bg-white/95
        backdrop-blur
        px-5
        py-3
        shadow-card
        ${className}
      `}
    >
      <p className="text-xl font-extrabold text-primary">
        {title}
      </p>

      <p className="text-sm font-medium text-gray-500">
        {subtitle}
      </p>
    </div>
  );
}