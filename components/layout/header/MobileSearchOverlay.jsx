"use client";

import { useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { useSearch } from "@/context/SearchContext";
import useClickOutside from "@/hooks/useClickOutside";

import SearchInput from "./SearchInput";
import SearchSuggestions from "./SearchSuggestions";

export default function MobileSearchOverlay() {
  const {
    isOpen,
    closeSearch,
  } = useSearch();

  const overlayRef = useRef(null);
  const inputRef = useRef(null);

  // Outside Click
  useClickOutside(
    overlayRef,
    closeSearch,
    isOpen
  );

  // ESC Close
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        closeSearch();
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
  }, [closeSearch]);

  // Auto Focus
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]

        bg-black/30
        backdrop-blur-sm

        lg:hidden
      "
    >
      <div
        ref={overlayRef}
        className="
          flex
          h-full
          flex-col

          bg-white
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-3

            border-b

            p-4
          "
        >
          <button
            onClick={closeSearch}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center

              rounded-full

              transition
              hover:bg-slate-100
            "
          >
            <FiArrowLeft size={22} />
          </button>

          <SearchInput
            inputRef={inputRef}
            autoFocus
          />
        </div>

        {/* Suggestions */}

        <div
          className="
            flex-1
            overflow-y-auto

            p-4
          "
        >
          <SearchSuggestions
            variant="mobile"
          />
        </div>
      </div>
    </div>
  );
}