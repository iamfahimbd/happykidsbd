"use client";

import { useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { useSearch } from "@/context/SearchContext";
import SearchSuggestions from "./SearchSuggestions";

export default function MobileSearchOverlay() {
  const {
    isOpen,
    setIsOpen,

    searchQuery,
    setSearchQuery,
  } = useSearch();

  const inputRef = useRef(null);

  // Auto Focus
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // ESC Close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
    onClick={() =>
    console.log("Overlay")
  }
      className="
        fixed
    inset-0
    z-[99999]
    bg-white
    lg:hidden
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          gap-3

          border-b

          px-4
          py-4
        "
      >
        <button
          onClick={() => setIsOpen(false)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            hover:bg-gray-100
          "
        >
          <FiArrowLeft size={22} />
        </button>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search products..."

          value={searchQuery}

          onChange={(e) =>
            setSearchQuery(e.target.value)
          }

          className="
            h-12
            flex-1

            rounded-full

            border-2
            border-border

            px-5

            outline-none

            focus:border-primary
          "
        />
      </div>

      {/* Suggestions */}

      <div
      onClick={() =>
    console.log("Suggestion Area")
  }
        className="
          relative

          px-4
          pt-4
        "
      >
        <SearchSuggestions mobile/>
      </div>
    </div>
  );
}