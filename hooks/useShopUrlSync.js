"use client";

import { useEffect } from "react";
import {
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function useShopUrlSync({
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

  currentPage,
  setCurrentPage,

  minPrice,
  maxPrice,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ==========================
  // URL -> Context
  // ==========================

  useEffect(() => {
    const category = searchParams.get("category");

    const age = searchParams.get("age");

    const color = searchParams.get("color");

    const size = searchParams.get("size");

    const price = searchParams.get("price");

    const sort = searchParams.get("sort");

    const page = searchParams.get("page");

    setSelectedCategories(
      category ? category.split(",") : []
    );

    setSelectedAges(
      age ? age.split(",") : []
    );

    setSelectedColors(
      color ? color.split(",") : []
    );

    setSelectedSizes(
      size ? size.split(",") : []
    );

    if (price) {
      const [min, max] = price.split("-");

      setPriceRange({
        min: Number(min),
        max: Number(max),
      });
    } else {
      setPriceRange({
        min: minPrice,
        max: maxPrice,
      });
    }

    setSortBy(sort || "newest");

    setCurrentPage(
      page ? Number(page) : 1
    );
  }, [
    searchParams,
    minPrice,
    maxPrice,

    setSelectedCategories,
    setSelectedAges,
    setSelectedColors,
    setSelectedSizes,

    setPriceRange,

    setSortBy,

    setCurrentPage,
  ]);

  // ==========================
  // Context -> URL
  // ==========================

  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategories.length) {
      params.set(
        "category",
        selectedCategories.join(",")
      );
    }

    if (selectedAges.length) {
      params.set(
        "age",
        selectedAges.join(",")
      );
    }

    if (selectedColors.length) {
      params.set(
        "color",
        selectedColors.join(",")
      );
    }

    if (selectedSizes.length) {
      params.set(
        "size",
        selectedSizes.join(",")
      );
    }

    if (
      priceRange.min !== minPrice ||
      priceRange.max !== maxPrice
    ) {
      params.set(
        "price",
        `${priceRange.min}-${priceRange.max}`
      );
    }

    if (sortBy !== "newest") {
      params.set("sort", sortBy);
    }

    if (currentPage > 1) {
      params.set(
        "page",
        currentPage.toString()
      );
    }

    const query = params.toString();

    router.replace(
      query
        ? `${pathname}?${query}`
        : pathname,
      {
        scroll: false,
      }
    );
  }, [
    selectedCategories,
    selectedAges,
    selectedColors,
    selectedSizes,

    priceRange,

    sortBy,

    currentPage,

    pathname,
    router,

    minPrice,
    maxPrice,
  ]);
}