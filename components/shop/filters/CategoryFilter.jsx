import { categories } from "@/data/categories";
import FilterSection from "./FilterSection";

export default function CategoryFilter() {
  return (
    <FilterSection title="Categories">
      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />

            <span className="text-sm text-gray-700">
              {category.name}
            </span>
          </label>
        ))}
      </div>
    </FilterSection>
  );
}