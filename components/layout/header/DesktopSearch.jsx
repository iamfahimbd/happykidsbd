"use client";

import { useRef, useCallback } from "react";

import { useSearch } from "@/context/SearchContext";

import useClickOutside from "@/hooks/useClickOutside";

import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

export default function DesktopSearch() {
  const {
    isOpen,
    openSearch,
    closeSearch,
    searchQuery,
  } = useSearch();

  const wrapperRef = useRef(null);

  const handleClose = useCallback(() => {
    closeSearch();
  }, [closeSearch]);

  useClickOutside(
    wrapperRef,
    handleClose,
    isOpen
  );

  return (
    <div
      ref={wrapperRef}
      className="relative w-full"
    >
      {/* Search Input */}

      <div onClick={openSearch}>
        <SearchInput />
      </div>

      {/* Suggestions */}

      {isOpen &&
        searchQuery.trim() && (
          <SearchSuggestions />
        )}
    </div>
  );
}