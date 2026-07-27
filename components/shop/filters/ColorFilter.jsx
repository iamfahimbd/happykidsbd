"use client";

import { colors } from "@/data/colors";
import FilterAccordion from "./FilterAccordion";
import { useShopFilter } from "@/context/ShopFilterContext";

export default function ColorFilter() {
  const {
    selectedColors,
    setSelectedColors,
  } = useShopFilter();

  const handleColorClick = (slug) => {
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
  };

  return (
    <FilterAccordion
      title="Colors"
      defaultOpen={true}
    >
      <div className="flex flex-wrap gap-3">
        {colors.map((color) => {
          const active = selectedColors.includes(color.slug);

          return (
            <button
              key={color.id}
              type="button"
              onClick={() => handleColorClick(color.slug)}
              title={color.name}
              className={`
                relative
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                transition-all
                duration-200

                ${
                  color.border
                    ? "border border-gray-300"
                    : "border border-transparent"
                }

                ${
                  active
                    ? "ring-2 ring-primary shadow-sm"
                    : "hover:ring-1 hover:ring-primary/40"
                }
              `}
              style={{
                backgroundColor: color.hex,
              }}
            >
              {active && (
                <span
                  className={`
                    text-xl
                    font-black
                    leading-none
                    ${
                      color.slug === "white"
                        ? "text-black"
                        : "text-white"
                    }
                  `}
                >
                  ✓
                </span>
              )}
            </button>
          );
        })}
      </div>
    </FilterAccordion>
  );
}