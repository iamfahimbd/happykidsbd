export default function SectionTitle({
  subtitle,
  title,
  description,
  align = "center",
}) {
  const alignment = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className={`mx-auto max-w-3xl ${alignment[align]}`}>
      {subtitle && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          {subtitle}
        </p>
      )}

      <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}