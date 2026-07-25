import CategoryFilter from "./filters/CategoryFilter";

export default function FilterSidebar() {
  return (
    <div
      className="

        rounded-3xl
        border
        border-gray-200
        bg-white
        p-6
        shadow-soft
      "
    >
      <h2 className="mb-8 text-2xl font-bold">
        Filters
      </h2>

      <div className="space-y-8">
        <CategoryFilter />
      </div>
    </div>
  );
}