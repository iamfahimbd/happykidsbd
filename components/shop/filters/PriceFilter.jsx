"use client";

import FilterAccordion from "./FilterAccordion";
import { useShopFilter } from "@/context/ShopFilterContext";

export default function PriceFilter() {
  const {
    minPrice,
    maxPrice,
    priceRange,
    setPriceRange,
  } = useShopFilter();

  const selectedMin = priceRange.min;
  const selectedMax = priceRange.max;

  return (
    <FilterAccordion
      title="Price"
      defaultOpen={false}
    >
      <div className="space-y-6">
        {/* Available */}

        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
            Available Range
          </p>

          <div className="flex items-center justify-between text-lg font-bold">
            <span>৳{minPrice}</span>

            <span className="text-gray-400">
              —
            </span>

            <span>৳{maxPrice}</span>
          </div>
        </div>

        {/* Selected */}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-gray-500">
              From
            </label>

            <input
              type="number"
              value={selectedMin}
              min={minPrice}
              max={selectedMax}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  min: Math.min(
                    Number(e.target.value),
                    selectedMax
                  ),
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-primary
              "
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-gray-500">
              To
            </label>

            <input
              type="number"
              value={selectedMax}
              min={selectedMin}
              max={maxPrice}
              onChange={(e) =>
                setPriceRange({
                  ...priceRange,
                  max: Math.max(
                    Number(e.target.value),
                    selectedMin
                  ),
                })
              }
              className="
                w-full
                rounded-xl
                border
                border-gray-200
                px-3
                py-2
                text-sm
                outline-none
                transition
                focus:border-primary
              "
            />
          </div>
        </div>

        {/* Slider */}

        <div className="space-y-2">
          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={50}
            value={selectedMin}
            onChange={(e) =>
              setPriceRange({
                ...priceRange,
                min: Math.min(
                  Number(e.target.value),
                  selectedMax
                ),
              })
            }
            className="w-full accent-primary"
          />

          <input
            type="range"
            min={minPrice}
            max={maxPrice}
            step={50}
            value={selectedMax}
            onChange={(e) =>
              setPriceRange({
                ...priceRange,
                max: Math.max(
                  Number(e.target.value),
                  selectedMin
                ),
              })
            }
            className="w-full accent-secondary"
          />
        </div>

        {/* Summary */}

        <div
          className="
            rounded-2xl
            border
            border-primary/10
            bg-primary/5
            py-3
            text-center
            text-sm
          "
        >
          Showing products between

          <span className="mx-1 font-semibold text-primary">
            ৳{selectedMin}
          </span>

          -

          <span className="ml-1 font-semibold text-secondary">
            ৳{selectedMax}
          </span>
        </div>
      </div>
    </FilterAccordion>
  );
}