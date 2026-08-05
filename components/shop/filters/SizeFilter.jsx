"use client";

import { useShopFilter } from "@/context/ShopFilterContext";
import FilterAccordion from "./FilterAccordion";

export default function SizeFilter({
  sizes = [],
}) {
  const {
    selectedSizes,
    setSelectedSizes,
  } = useShopFilter();

  function handleSizeClick(slug) {
    console.log("Clicked:", slug);
    if (selectedSizes.includes(slug)) {
      setSelectedSizes(
        selectedSizes.filter(
          (size) => size !== slug
        )
      );
    } else {
      setSelectedSizes([
        ...selectedSizes,
        slug,
      ]);
    }
  }

  // API returns empty array if no sizes are available, so we can skip rendering the filter in that case
  if (!sizes.length) {
    return null;
  }

  return (
    <FilterAccordion
      title="Age"
      defaultOpen={false}
    >
      <div className="grid grid-cols-2 gap-2">
        {sizes.map((size) => {
          const active =
            selectedSizes.includes(size.slug);

          return (
            <button
              key={size.id}
              type="button"
              onClick={() =>
                handleSizeClick(size.slug)
              }
              className={`
                rounded-xl
                border
                px-3
                py-2
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? "border-primary bg-primary text-white"
                    : "border-gray-200 bg-white hover:border-primary hover:text-primary"
                }
              `}
            >
              {size.name}
            </button>
          );
        })}
      </div>
    </FilterAccordion>
  );
}