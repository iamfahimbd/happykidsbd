"use client";

import { FiSearch } from "react-icons/fi";
import { useSearch } from "@/context/SearchContext";

export default function MobileSearchButton() {
  const { setIsOpen } = useSearch();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="
        flex
        h-11
        w-11
        items-center
        justify-center

        rounded-full

        transition
        hover:bg-gray-100
      "
      aria-label="Open Search"
    >
      <FiSearch size={22} />
    </button>
  );
}