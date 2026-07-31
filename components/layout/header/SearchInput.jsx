"use client";

import { FiSearch } from "react-icons/fi";
import { useSearch } from "@/context/SearchContext";

export default function SearchInput({
  inputRef,
  placeholder = "Search products...",
  autoFocus = false,
  rounded = true,
}) {
  const {
    searchQuery,
    setSearchQuery,
  } = useSearch();

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        className={`
          h-14
          w-full

          border-2
          border-border

          bg-white

          pl-5
          pr-14

          outline-none

          transition-all
          duration-300

          focus:border-primary
          focus:ring-4
          focus:ring-sky-100

          ${
            rounded
              ? "rounded-full"
              : "rounded-2xl"
          }
        `}
      />

      <div
        className="
          absolute
          right-2
          top-1/2

          flex
          h-10
          w-10

          -translate-y-1/2

          items-center
          justify-center

          rounded-full

          bg-primary

          text-white

          shadow-md
        "
      >
        <FiSearch size={20} />
      </div>
    </div>
  );
}