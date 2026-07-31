"use client";

import { useShopFilter } from "@/context/ShopFilterContext";

export default function NoProductsFound() {
  const { clearFilters } = useShopFilter();

  return (
    <div
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        rounded-3xl
        border
        border-dashed
        border-gray-300
        bg-white
        px-6
        text-center
      "
    >
      <div className="mb-5 text-6xl">
        😔
      </div>

      <h2 className="text-2xl font-bold text-gray-900">
        No Products Found
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        We couldn't find any products matching your
        selected filters. Try changing or clearing
        some filters.
      </p>

      <button
        type="button"
        onClick={clearFilters}
        className="
          mt-8
          rounded-full
          bg-primary
          px-6
          py-3
          font-semibold
          text-white
          transition
          duration-300
          hover:opacity-90
        "
      >
        Browse All Products
      </button>
    </div>
  );
}