"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

import useShopUrlSync from "@/hooks/useShopUrlSync";

const ShopFilterContext = createContext(null);

export function ShopFilterProvider({
  products,
  children,
}) {
  // Categories

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState([]);

 

  // Ages

  const [
    selectedAges,
    setSelectedAges,
  ] = useState([]);

  // Colors

  const [
    selectedColors,
    setSelectedColors,
  ] = useState([]);

  // Price

  const [priceRange, setPriceRange] =
    useState({
      min: 0,
      max: 5000,
    });

  // Sort

  const [sortBy, setSortBy] =
    useState("newest");

    // Search

const [searchQuery, setSearchQuery] =
  useState("");

  // URL Sync

  useShopUrlSync({
    selectedCategories,
    setSelectedCategories,

    selectedAges,
    setSelectedAges,

    selectedColors,
    setSelectedColors,

    priceRange,
    setPriceRange,

    sortBy,
    setSortBy,
  });

  // Filtering

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(
          product.category
        )
      );
    }

     // console.log("Selected Ages:", selectedAges);

 console.log(
  "Product Ages:",
  filtered.slice(0, 3).map((p) => ({
    name: p.name,
    ages: p.ages,
  }))
);

    // Age

  if (selectedAges.length > 0) {
  filtered = filtered.filter((product) =>
    product.ages?.some((age) =>
      selectedAges.some(
        (selected) =>
          selected.replace(/–/g, "-").trim() ===
          age.replace(/–/g, "-").trim()
      )
    )
  );
}

    // Color

    if (selectedColors.length > 0) {
  filtered = filtered.filter((product) =>
    product.colors?.some((color) =>
      selectedColors.some(
        (selected) =>
          selected.toLowerCase() ===
          color.toLowerCase()
      )
    )
  );
}

    // Price

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min &&
        product.price <= priceRange.max
    );

    // Search

if (searchQuery.trim() !== "") {
  const keyword = searchQuery
    .toLowerCase()
    .trim();

  filtered = filtered.filter((product) =>
    product.name
      .toLowerCase()
      .includes(keyword)
  );
}

    // Sorting

    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a, b) => a.price - b.price
        );
        break;

      case "price-high":
        filtered.sort(
          (a, b) => b.price - a.price
        );
        break;

      case "popular":
        filtered.sort(
          (a, b) =>
            b.rating * b.reviews -
            a.rating * a.reviews
        );
        break;

      default:
        filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
  }, [
     products,
  selectedCategories,
  selectedAges,
  selectedColors,
  priceRange,
  sortBy,
  searchQuery,
  ]);

  // Clear All

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedColors([]);

    setPriceRange({
      min: 0,
      max: 5000,
    });

    setSortBy("newest");
    setSearchQuery("");
  };

  const value = {
    selectedCategories,
    setSelectedCategories,

    selectedAges,
    setSelectedAges,

    selectedColors,
    setSelectedColors,

    priceRange,
    setPriceRange,

    sortBy,
    setSortBy,

    searchQuery,
setSearchQuery,

    filteredProducts,

    totalProducts: products.length,
    filteredCount:
      filteredProducts.length,

    clearFilters,
  };

  return (
    <ShopFilterContext.Provider
      value={value}
    >
      {children}
    </ShopFilterContext.Provider>
  );
}

export function useShopFilter() {
  const context =
    useContext(ShopFilterContext);

  if (!context) {
    throw new Error(
      "useShopFilter must be used inside ShopFilterProvider"
    );
  }

  return context;
}