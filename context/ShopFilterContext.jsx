"use client";

import { createContext, useContext, useMemo, useState } from "react";

const ShopFilterContext = createContext(null);

export function ShopFilterProvider({ products, children }) {
  // ==========================
  // Category
  // ==========================

  const [selectedCategories, setSelectedCategories] = useState([]);

  // ==========================
  // Age
  // ==========================

  const [selectedAges, setSelectedAges] = useState([]);

  // ==========================
  // Color
  // ==========================

  const [selectedColors, setSelectedColors] = useState([]);

  // ==========================
  // Price
  // ==========================

  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 5000,
  });

  // ==========================
  // Sort
  // ==========================

  const [sortBy, setSortBy] = useState("newest");

  // ==========================
  // Clear All
  // ==========================

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedColors([]);

    setPriceRange({
      min: 0,
      max: 5000,
    });

    setSortBy("newest");
  };

  // ==========================
  // Filtering
  // ==========================

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category),
      );
    }

    // Age
    if (selectedAges.length > 0) {
      filtered = filtered.filter((product) =>
        product.age.some((age) => selectedAges.includes(age)),
      );
    }

    // Color
    // Color

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors.some((color) => selectedColors.includes(color)),
      );
    }

    // Price
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Sort
    // (Next Step)

    return filtered;
  }, [
    products,
    selectedCategories,
    selectedAges,
    selectedColors,
    priceRange,
    sortBy,
  ]);

  // ==========================
  // Context Value
  // ==========================

  const value = {
    // Products

    filteredProducts,

    // Category

    selectedCategories,
    setSelectedCategories,

    // Age

    selectedAges,
    setSelectedAges,

    // Color

    selectedColors,
    setSelectedColors,

    // Price

    priceRange,
    setPriceRange,

    // Sort

    sortBy,
    setSortBy,

    // Actions

    clearFilters,
  };

  return (
    <ShopFilterContext.Provider value={value}>
      {children}
    </ShopFilterContext.Provider>
  );
}

export function useShopFilter() {
  const context = useContext(ShopFilterContext);

  if (!context) {
    throw new Error("useShopFilter must be used inside ShopFilterProvider");
  }

  return context;
}
