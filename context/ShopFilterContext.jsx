"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import useShopUrlSync from "@/hooks/useShopUrlSync";

const ShopFilterContext = createContext(null);

export function ShopFilterProvider({
  products = [],
  minPrice = 0,
  maxPrice = 0,
  initialPage = 1,

  // WooCommerce pagination
  totalProducts = 0,
  totalPages = 0,

  children,
}) {
  // ==========================
  // Safe Products
  // ==========================

  const safeProducts = Array.isArray(products)
    ? products
    : [];

  // ==========================
  // Categories
  // ==========================

  const [selectedCategories, setSelectedCategories] =
    useState([]);

  // ==========================
  // Ages
  // ==========================

  const [selectedAges, setSelectedAges] =
    useState([]);

  // ==========================
  // Colors
  // ==========================

  const [selectedColors, setSelectedColors] =
    useState([]);

  // ==========================
  // Sizes
  // ==========================

  const [selectedSizes, setSelectedSizes] =
    useState([]);

  // ==========================
  // Price
  // ==========================

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

  // ==========================
  // Sort
  // ==========================

  const [sortBy, setSortBy] =
    useState("newest");

  // ==========================
  // Search
  // ==========================

  const [searchQuery, setSearchQuery] =
    useState("");

  // ==========================
  // Current Page
  // ==========================

  const [currentPage, setCurrentPage] =
    useState(initialPage);

  // ==========================
  // Products Per Page
  // ==========================

  const productsPerPage = 20;

  // ==========================
  // URL Sync
  // ==========================

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

  // ==========================
  // Server-side Filtering
  // ==========================
  //
  // IMPORTANT:
  //
  // Product filtering is NO LONGER
  // done inside this client context.
  //
  // WooCommerce API handles:
  //
  // - Category
  // - Age
  // - Color
  // - Size
  // - Price
  // - Search
  // - Sorting
  // - Pagination
  //
  // The `products` received here are
  // already filtered and paginated
  // by the server.
  //
  // ==========================

  const filteredProducts = safeProducts;

  const paginatedProducts = safeProducts;

  // ==========================
  // Safe Pagination Values
  // ==========================

  const safeTotalPages =
    Number(totalPages) || 0;

  const safeTotalProducts =
    Number(totalProducts) || 0;

  // ==========================
  // Clear All Filters
  // ==========================

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

    setCurrentPage(1);
  };

  // ==========================
  // Context Value
  // ==========================

  const value = {
    // ==========================
    // Products
    // ==========================

    products: safeProducts,

    // ==========================
    // Categories
    // ==========================

    selectedCategories,

    setSelectedCategories,

    // ==========================
    // Ages
    // ==========================

    selectedAges,

    setSelectedAges,

    // ==========================
    // Colors
    // ==========================

    selectedColors,

    setSelectedColors,

    // ==========================
    // Sizes
    // ==========================

    selectedSizes,

    setSelectedSizes,

    // ==========================
    // Price
    // ==========================

    priceRange,

    setPriceRange,

    minPrice,

    maxPrice,

    // ==========================
    // Sort
    // ==========================

    sortBy,

    setSortBy,

    // ==========================
    // Search
    // ==========================

    searchQuery,

    setSearchQuery,

    // ==========================
    // Products
    // ==========================

    filteredProducts,

    paginatedProducts,

    // ==========================
    // Pagination
    // ==========================

    currentPage,

    setCurrentPage,

    productsPerPage,

    totalPages: safeTotalPages,

    totalProducts: safeTotalProducts,

    // ==========================
    // Current Page Product Count
    // ==========================

    filteredCount:
      safeProducts.length,

    // ==========================
    // Actions
    // ==========================

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

// ==========================
// useShopFilter Hook
// ==========================

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