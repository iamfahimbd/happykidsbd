"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import useShopUrlSync from "@/hooks/useShopUrlSync";

const ShopFilterContext = createContext(null);

export function ShopFilterProvider({
  products,
  minPrice,
  maxPrice,
  initialPage = 1,
  children,
}) {
  // Categories

  const [selectedCategories, setSelectedCategories] = useState([]);

  // Ages

  const [selectedAges, setSelectedAges] = useState([]);

  // Colors

  const [selectedColors, setSelectedColors] = useState([]);

  // Price

  const [priceRange, setPriceRange] = useState({
    min: minPrice,
    max: maxPrice,
  });

  useEffect(() => {
    setPriceRange({
      min: minPrice,
      max: maxPrice,
    });
  }, [minPrice, maxPrice]);

  // Sizes
  const [selectedSizes, setSelectedSizes] = useState([]);

  // Sort

  const [sortBy, setSortBy] = useState("newest");

  // Search

  const [searchQuery, setSearchQuery] = useState("");

  // Pagination

  const [currentPage, setCurrentPage] = useState(initialPage);

  const productsPerPage = 20;

  /* useEffect(() => {
  setCurrentPage(1);
}, [
  selectedCategories,
  selectedAges,
  selectedColors,
  selectedSizes,
  priceRange,
  searchQuery,
  sortBy,
]); */

  // URL Sync

  useShopUrlSync({
    selectedCategories,
    setSelectedCategories,

    selectedAges,
    setSelectedAges,

    selectedColors,
    setSelectedColors,

    selectedSizes,
    setSelectedSizes,

    priceRange,
    setPriceRange,

    sortBy,
    setSortBy,

    searchQuery,
    setSearchQuery,

    currentPage,
    setCurrentPage,
    minPrice,
    maxPrice,
  });

  // Filtering

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Category

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        product.categories?.some((category) =>
          selectedCategories.includes(category.slug),
        ),
      );
    }

    // console.log("Selected Ages:", selectedAges);

    // Age

    if (selectedAges.length > 0) {
      filtered = filtered.filter((product) =>
        product.ages?.some((age) =>
          selectedAges.some(
            (selected) =>
              selected.replace(/–/g, "-").trim() ===
              age.replace(/–/g, "-").trim(),
          ),
        ),
      );
    }

    // Color

    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) =>
        product.colors?.some((color) =>
          selectedColors.some(
            (selected) => selected.toLowerCase() === color.toLowerCase(),
          ),
        ),
      );
    }

    // Price

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max,
    );

    // Size

    console.log(products[0].sizes);

    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some((size) => selectedSizes.includes(size)),
      );
    }

    // Search

    if (searchQuery.trim() !== "") {
      const keyword = searchQuery.toLowerCase().trim();

      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(keyword),
      );
    }

    // Sorting

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;

      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;

      case "popular":
        filtered.sort((a, b) => b.rating * b.reviews - a.rating * a.reviews);
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
    selectedSizes,
  ]);

  // pagination part
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage,
  );

  // Clear All

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedColors([]);
    setSelectedSizes([]);

    setPriceRange({
      min: minPrice,
      max: maxPrice,
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

    selectedSizes,
    setSelectedSizes,

    sortBy,
    setSortBy,

    searchQuery,
    setSearchQuery,

    minPrice,
    maxPrice,

    filteredProducts,
    currentPage,
    setCurrentPage,
    productsPerPage,
    totalPages,
    paginatedProducts,

    totalProducts: products.length,
    filteredCount: filteredProducts.length,

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
