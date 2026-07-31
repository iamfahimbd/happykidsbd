"use client";

import { useSearch } from "@/context/SearchContext";
import SearchSuggestionItem from "./SearchSuggestionItem";

export default function SearchSuggestions({
  variant = "desktop",
}) {
  const {
    searchQuery,
    suggestions,
  } = useSearch();

  if (!searchQuery.trim()) return null;

  const isDesktop =
    variant === "desktop";

  return (
    <div
      className={
        isDesktop
          ? `
            absolute
            left-0
            right-0
            top-[calc(100%+12px)]
            z-50

            overflow-hidden

            rounded-3xl
            border
            border-gray-200

            bg-white

            shadow-2xl
          `
          : `
            overflow-hidden

            rounded-3xl
            border
            border-gray-200

            bg-white

            shadow-lg
          `
      }
    >
      {suggestions.length ? (
        <>
          {/* Header */}

          <div
            className="
              border-b

              px-5
              py-3

              text-sm
              font-medium

              text-gray-500
            "
          >
            {suggestions.length} matching product
            {suggestions.length > 1
              ? "s"
              : ""}
          </div>

          {/* List */}

          <div
            className={
              isDesktop
                ? "max-h-[420px] overflow-y-auto"
                : "max-h-[calc(100vh-170px)] overflow-y-auto"
            }
          >
            {suggestions.map(
              (product) => (
                <SearchSuggestionItem
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        </>
      ) : (
        <div
          className="
            px-6
            py-10

            text-center

            text-sm
            text-gray-500
          "
        >
          No matching products found.
        </div>
      )}
    </div>
  );
}