"use client";

import { useSearch } from "@/context/SearchContext";
import SearchSuggestionItem from "./SearchSuggestionItem";

export default function SearchSuggestions({mobile= false,}) {
  const { searchQuery, suggestions } = useSearch();
  

  if (!searchQuery.trim()) return null;

  return (
    <div
      className={
    mobile
      ? `
        overflow-hidden
        rounded-3xl
        border
        border-gray-200
        bg-white
        shadow-xl
      `
      : `
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
  }
    >
      {suggestions.length > 0 ? (
        <div className="py-2">
          <div className="px-5 py-3 text-sm text-gray-500">
            {suggestions.length} matching products
          </div>

          {suggestions.map((product) => (
            <SearchSuggestionItem key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="px-5 py-6 text-center text-sm text-gray-500">
          No matching products found.
        </div>
      )}
    </div>
  );
}
