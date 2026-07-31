"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import {
  usePathname,
  useSearchParams,
} from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import { isMatch } from "@/lib/search/match";

const SearchContext = createContext(null);

export function SearchProvider({
  children,
  products = [],
}) {
  // =========================
  // State
  // =========================

  const [searchQuery, setSearchQuery] =
    useState("");

  const [isOpen, setIsOpen] =
    useState(false);

  // =========================
  // Debounced Query
  // =========================

  const debouncedQuery =
    useDebounce(searchQuery, 300);

  // =========================
  // Close on Route Change
  // =========================

  const pathname = usePathname();
  const searchParams =
    useSearchParams();

  useEffect(() => {
    setSearchQuery("");
    setIsOpen(false);
  }, [pathname, searchParams]);

  // =========================
  // Search Suggestions
  // =========================

  const suggestions = useMemo(() => {
    const keyword =
      debouncedQuery.trim().toLowerCase();

    if (!keyword) return [];

    return products
      .map((product) => {
        let score = 0;

        const name =
          product.name?.toLowerCase() ||
          "";

        const category =
          product.categoryName?.toLowerCase() ||
          "";

        const colors =
          product.colors
            ?.join(" ")
            .toLowerCase() || "";

        const ages =
          product.ages
            ?.join(" ")
            .toLowerCase() || "";

        const description =
          product.description
            ?.replace(/<[^>]*>/g, "")
            .toLowerCase() || "";

        // =====================
        // Ranking
        // =====================

        if (name.startsWith(keyword))
          score += 100;

        if (isMatch(name, keyword))
          score += 80;

        if (
          isMatch(category, keyword)
        )
          score += 50;

        if (
          isMatch(colors, keyword)
        )
          score += 30;

        if (
          isMatch(ages, keyword)
        )
          score += 30;

        if (
          isMatch(
            description,
            keyword
          )
        )
          score += 10;

        return {
          ...product,
          score,
        };
      })
      .filter(
        (product) => product.score > 0
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
  }, [debouncedQuery, products]);

  // =========================
  // Helpers
  // =========================

  const openSearch = () =>
    setIsOpen(true);

  const closeSearch = () => {
    console.trace("CLOSE");
    setIsOpen(false);
    setSearchQuery("");
  };

  // =========================
  // Context Value
  // =========================

  const value = {
    products,

    searchQuery,
    setSearchQuery,

    debouncedQuery,

    isOpen,

    openSearch,
    closeSearch,

    setIsOpen,

    suggestions,
  };

  return (
    <SearchContext.Provider
      value={value}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context =
    useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider."
    );
  }

  return context;
}