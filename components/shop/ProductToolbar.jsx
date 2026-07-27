"use client";

import { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import MobileFilterDrawer from "./MobileFilterDrawer";

export default function ProductToolbar() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div
      className="
        flex
    flex-col
    gap-4

    rounded-2xl
    border
    border-gray-200

    bg-white

    p-4

    shadow-soft

    md:flex-row
    md:items-center
    md:justify-between
      "
    >
      {/* Left */}

      <p className="text-sm text-gray-500">
        Showing
        <span className="mx-1 font-semibold text-gray-900">1–12</span>
        of
        <span className="mx-1 font-semibold text-primary">84</span>
        Products
      </p>

      {/* Right */}

      <div className="flex items-center gap-3">
        {/* Mobile Filter Button */}

        <button
          onClick={() => setOpenFilter(true)}
          className="
            rounded-xl
            border
            border-gray-200
            px-4
            py-2
            text-sm
            font-medium

            lg:hidden
          "
        >
          Filter
        </button>

        {/* Sort */}

        <select
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2
            text-sm
            outline-none
            transition

            focus:border-primary
          "
        >
          <option>Newest</option>
          <option>Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      <MobileFilterDrawer
        open={openFilter}
        onClose={() => setOpenFilter(false)}
      >
        <FilterSidebar mobile />
      </MobileFilterDrawer>
    </div>
  );
}
