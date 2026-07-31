"use client";

import { ages } from "@/data/ages";
import FilterAccordion from "./FilterAccordion";
import { useShopFilter } from "@/context/ShopFilterContext";

export default function AgeFilter() {
  const {
    selectedAges,
    setSelectedAges,
  } = useShopFilter();

  const handleAgeClick = (name) => {
  if (selectedAges.includes(name)) {
    setSelectedAges(
      selectedAges.filter((age) => age !== name)
    );
  } else {
    setSelectedAges([
      ...selectedAges,
      name,
    ]);
  }
};

  return (
    <FilterAccordion
      title="Age"
      defaultOpen={true}
    >
      <div className="grid grid-cols-2 gap-2">
        {ages.map((age) => {
          const active = selectedAges.includes(age.name);

          return (
            <button
              key={age.id}
              type="button"
              onClick={() =>
                handleAgeClick(age.name)
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
              {age.name}
            </button>
          );
        })}
      </div>
    </FilterAccordion>
  );
}