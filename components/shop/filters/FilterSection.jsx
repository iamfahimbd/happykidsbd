export default function FilterSection({
  title,
  children,
}) {
  return (
    <div className="border-b border-gray-100 pb-6 last:border-none last:pb-0">
      <h3 className="mb-4 text-lg font-bold text-gray-900">
        {title}
      </h3>

      {children}
    </div>
  );
}