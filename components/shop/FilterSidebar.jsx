"use client";

import { useShopFilter } from "@/context/ShopFilterContext";

import AgeFilter from "./filters/AgeFilter";
import CategoryFilter from "./filters/CategoryFilter";
import ColorFilter from "./filters/ColorFilter";
import PriceFilter from "./filters/PriceFilter";

export default function FilterSidebar({
  mobile = false,
}) {
  const { clearFilters } = useShopFilter();

  return (
    <div
      className={
        mobile
          ? ""
          : `
              rounded-3xl
              border
              border-gray-200
              bg-white
              shadow-soft
              overflow-hidden
            `
      }
    >
      {/* Header */}

      <div className="mb-1 flex items-center justify-between">
        <h2 className="ml-5 mt-2 text-2xl font-bold">
          Filters
        </h2>
      </div>

      {/* Body */}

      <div className="space-y-8 p-3">
        <CategoryFilter />

        <PriceFilter />

        <AgeFilter />

        <ColorFilter />

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={clearFilters}
            className="
              text-sm
              font-semibold
              text-primary
              transition-colors
              duration-200
              hover:underline
            "
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}