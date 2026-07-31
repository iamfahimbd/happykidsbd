"use client";

import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { useSearch } from "@/context/SearchContext";

export default function SearchInput({
  inputRef,
  autoFocus = false,
}) {
  const router = useRouter();

  const {
    searchQuery,
    setSearchQuery,
    closeSearch,
  } = useSearch();

  function handleSearch() {
    const keyword = searchQuery.trim();

    if (!keyword) return;

    closeSearch();

    router.push(
      `/search?q=${encodeURIComponent(keyword)}`
    );
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      handleSearch();
    }
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        autoFocus={autoFocus}
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
        onKeyDown={handleKeyDown}
        className="
          h-14
          w-full

          rounded-full

          border-2
          border-border

          pl-5
          pr-14

          outline-none

          transition

          focus:border-primary
        "
      />

      <button
        type="button"
        onClick={handleSearch}
        className="
          absolute
          right-1
          top-1

          flex
          h-12
          w-12
          items-center
          justify-center

          rounded-full

          bg-primary

          text-white

          transition

          hover:bg-secondary
        "
      >
        <FiSearch size={20} />
      </button>
    </div>
  );
}