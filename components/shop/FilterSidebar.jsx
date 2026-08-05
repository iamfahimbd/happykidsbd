"use client";

import { useShopFilter } from "@/context/ShopFilterContext";

import CategoryFilter from "./filters/CategoryFilter";
import ColorFilter from "./filters/ColorFilter";
import PriceFilter from "./filters/PriceFilter";
import SizeFilter from "./filters/SizeFilter";

export default function FilterSidebar({
  mobile = false,
  categories = [],
  ages = [],
  colors = [],
  sizes = [],
}) {
  const { clearFilters } = useShopFilter();

  return (
    <div
      className={
        mobile
          ? "h-full"
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

      <div className="hidden lg:flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="text-2xl font-bold">
          Filters
        </h2>
      </div>

      {/* Body */}

      <div
        className={`
          custom-scrollbar

          space-y-8
          px-5
          py-4

          ${
            mobile
              ? ""
              : "lg:max-h-[calc(100vh-180px)] lg:overflow-y-auto"
          }
        `}
      >
        {/* Size */}

        <SizeFilter sizes={sizes} />

        {/* Categories */}

        <CategoryFilter
          categories={categories}
        />

        {/* Price */}

        <PriceFilter />

        {/* Colors */}

        <ColorFilter colors={colors} />

        {/* Clear */}

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