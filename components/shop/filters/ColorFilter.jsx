"use client";

import { useShopFilter } from "@/context/ShopFilterContext";
import FilterAccordion from "./FilterAccordion";

export default function ColorFilter({
  colors = [],
}) {
  const {
    selectedColors,
    setSelectedColors,
  } = useShopFilter();

  function handleColorClick(slug) {
    if (selectedColors.includes(slug)) {
      setSelectedColors(
        selectedColors.filter(
          (color) => color !== slug
        )
      );
    } else {
      setSelectedColors([
        ...selectedColors,
        slug,
      ]);
    }
  }

  // WooCommerce-এ Color attribute না থাকলে
  if (!colors.length) {
    return null;
  }

  return (
    <FilterAccordion
      title="Colors"
      defaultOpen={false}
    >
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const active =
            selectedColors.includes(color.slug);

          return (
            <button
              key={color.id}
              type="button"
              onClick={() =>
                handleColorClick(color.slug)
              }
              className={`
                rounded-full
                border
                px-4
                py-2
                text-sm
                font-medium
                transition-all
                duration-200

                ${
                  active
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-gray-300 bg-white text-gray-700 hover:border-primary hover:text-primary"
                }
              `}
            >
              {color.name}
            </button>
          );
        })}
      </div>
    </FilterAccordion>
  );
}