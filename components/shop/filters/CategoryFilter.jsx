"use client";

import FilterAccordion from "./FilterAccordion";
import { useShopFilter } from "@/context/ShopFilterContext";

export default function CategoryFilter({
  categories = [],
}) {
  const {
    selectedCategories,
    setSelectedCategories,
  } = useShopFilter();

  function handleCategoryChange(slug) {
    if (
      selectedCategories.includes(slug)
    ) {
      setSelectedCategories(
        selectedCategories.filter(
          (item) => item !== slug
        )
      );
    } else {
      setSelectedCategories([
        ...selectedCategories,
        slug,
      ]);
    }
  }

  return (
    <FilterAccordion
      title="Categories"
      defaultOpen={false}
    >
      <div className="space-y-3">
        {categories.map((category) => (
          <label
            key={category.id}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(
                category.slug
              )}
              onChange={() =>
                handleCategoryChange(
                  category.slug
                )
              }
              className="
                h-4
                w-4
                rounded
                border-gray-300
                text-primary
                focus:ring-primary
              "
            />

            <span className="text-sm text-gray-700">
              {category.name}
            </span>
          </label>
        ))}
      </div>
    </FilterAccordion>
  );
}