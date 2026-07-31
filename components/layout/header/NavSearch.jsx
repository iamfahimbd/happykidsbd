"use client";

import { FiSearch } from "react-icons/fi";
import { useSearch } from "@/context/SearchContext";
import SearchSuggestions from "./SearchSuggestions";
import {
  useEffect,
  useRef,
} from "react";

export default function NavSearch() {

  const {
  searchQuery,
  setSearchQuery,
  isOpen,
  setIsOpen,
} = useSearch();

  const wrapperRef = useRef(null);

  useEffect(() => {
  function handleClickOutside(event) {
  console.log(
    wrapperRef.current.contains(event.target)
  );

  if (
    wrapperRef.current &&
    !wrapperRef.current.contains(event.target)
  ) {
    setIsOpen(false);
  }
}

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mouseup",
      handleClickOutside
    );
  };
}, [setIsOpen]);

  return (
    <div ref={wrapperRef} className="relative w-full" onMouseDown={(e) => e.stopPropagation()}>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onFocus={() => setIsOpen(true)}
        onChange={(e) =>
          setSearchQuery(e.target.value)
        }
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
      {isOpen && <SearchSuggestions />}
    </div>
  );
}