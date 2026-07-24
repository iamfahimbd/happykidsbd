export default function SectionTitle({
  title,
  subtitle,
}) {
  return (
    <div className="mb-12 text-center">

      <p className="mb-2 font-semibold uppercase tracking-widest text-secondary">
        {subtitle}
      </p>

      <h2 className="text-4xl font-extrabold text-text">
        {title}
      </h2>

    </div>
  );
}