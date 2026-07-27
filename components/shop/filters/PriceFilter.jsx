"use client";

import FilterAccordion from "./FilterAccordion";
import { useShopFilter } from "@/context/ShopFilterContext";

const MIN = 0;
const MAX = 5000;

export default function PriceFilter() {
  const {
    priceRange,
    setPriceRange,
  } = useShopFilter();

  const minPrice = priceRange.min;
  const maxPrice = priceRange.max;

  return (
    <FilterAccordion title="Price" defaultOpen={false}>
      <div className="space-y-5">
        {/* Values */}

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 rounded-xl bg-gray-100 px-3 py-2 text-center">
            <p className="text-xs text-gray-500">
              Min
            </p>

            <p className="font-semibold">
              ৳{minPrice}
            </p>
          </div>

          <div className="flex-1 rounded-xl bg-primary/10 px-3 py-2 text-center">
            <p className="text-xs text-gray-500">
              Max
            </p>

            <p className="font-semibold">
              ৳{maxPrice}
            </p>
          </div>
        </div>

        {/* Min Slider */}

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={100}
          value={minPrice}
          onChange={(e) =>
            setPriceRange({
              ...priceRange,
              min: Math.min(
                Number(e.target.value),
                maxPrice - 100
              ),
            })
          }
          className="w-full cursor-pointer accent-primary"
        />

        {/* Max Slider */}

        <input
          type="range"
          min={MIN}
          max={MAX}
          step={100}
          value={maxPrice}
          onChange={(e) =>
            setPriceRange({
              ...priceRange,
              max: Math.max(
                Number(e.target.value),
                minPrice + 100
              ),
            })
          }
          className="w-full cursor-pointer accent-secondary"
        />

        {/* Selected Range */}

        <div className="rounded-xl bg-slate-50 py-3 text-center text-sm">
          Showing products from

          <span className="mx-1 font-semibold text-primary">
            ৳{minPrice}
          </span>

          to

          <span className="ml-1 font-semibold text-secondary">
            ৳{maxPrice}
          </span>
        </div>
      </div>
    </FilterAccordion>
  );
}