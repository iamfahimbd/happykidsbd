"use client";

import {
  isMatch,
} from "@/lib/search/match";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import { usePathname,useSearchParams } from "next/navigation";
import { useEffect } from "react";




const SearchContext = createContext(null);

const closeSearch = () => {
  setSearchQuery("");
  setIsOpen(false);
};



export function SearchProvider({
  children,
  products,
}) {

  const pathname = usePathname();
  const searchParams = useSearchParams();

useEffect(() => {
  setSearchQuery("");
  setIsOpen(false);
}, [pathname,searchParams]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [isOpen, setIsOpen] =
    useState(false);

  const suggestions = useMemo(() => {
    const keyword = searchQuery
      .trim()
      .toLowerCase();

    if (!keyword) return [];

    return products
      .map((product) => {
        const name =
          product.name?.toLowerCase() || "";

        const category =
          product.categorySlug?.toLowerCase() ||
          product.categoryName?.toLowerCase() ||
          "";

        const categories =
          product.categories
            ?.map((cat) =>
              cat.name.toLowerCase()
            )
            .join(" ") || "";

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

        let score = 0;

        if (name.startsWith(keyword))
          score += 100;

        if (isMatch(name, keyword))
          score += 80;

        if (isMatch(categories, keyword))
          score += 50;

        if (isMatch(category, keyword))
          score += 40;

        if (isMatch(colors, keyword))
          score += 30;

        if (isMatch(ages, keyword))
          score += 30;

        if (
          isMatch(description, keyword)
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
  }, [searchQuery, products]);

  const value = {
    products,

    searchQuery,
    setSearchQuery,

    isOpen,
    setIsOpen,

    suggestions,
    closeSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context =
    useContext(SearchContext);

  if (!context) {
    throw new Error(
      "useSearch must be used inside SearchProvider"
    );
  }

  return context;
}