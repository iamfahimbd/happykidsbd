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

  priceRange,
  setPriceRange,

  sortBy,
  setSortBy,

  searchQuery,
  setSearchQuery,
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL -> Context

  useEffect(() => {
    const category =
      searchParams.get("category");

    const age =
      searchParams.get("age");

    const color =
      searchParams.get("color");

    const price =
      searchParams.get("price");

    const sort =
      searchParams.get("sort");

    setSelectedCategories(
      category ? category.split(",") : []
    );

    setSelectedAges(
      age ? age.split(",") : []
    );

    setSelectedColors(
      color ? color.split(",") : []
    );

    if (price) {
      const [min, max] = price.split("-");

      setPriceRange({
        min: Number(min),
        max: Number(max),
      });
    } else {
      setPriceRange({
        min: 0,
        max: 5000,
      });
    }

    setSortBy(sort || "newest");
  }, [
    searchParams,
  setSelectedCategories,
  setSelectedAges,
  setSelectedColors,
  setPriceRange,
  setSortBy,
  ]);

  // Context -> URL

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

    if (
      priceRange.min !== 0 ||
      priceRange.max !== 5000
    ) {
      params.set(
        "price",
        `${priceRange.min}-${priceRange.max}`
      );
    }

    if (sortBy !== "newest") {
      params.set("sort", sortBy);
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
    priceRange,
    sortBy,
    pathname,
    router,
  ]);
}