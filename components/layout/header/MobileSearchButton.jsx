"use client";

import { FiSearch } from "react-icons/fi";

import { useSearch } from "@/context/SearchContext";

export default function MobileSearchButton() {
  const { openSearch } = useSearch();

  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Open Search"
      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full

        text-sky-600

        transition-all
        duration-200

        hover:bg-sky-50
        hover:text-pink-500

        active:scale-95
      "
    >
      <FiSearch size={24} />
    </button>
  );
}