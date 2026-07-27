"use client";

import ProductSection from "@/components/product/ProductSection";
import { useShopFilter } from "@/context/ShopFilterContext";

export default function ShopProductSection({
  showHeader = false,
  showButton = false,
  noSection = true,
  noContainer = true,
}) {
  const { filteredProducts } = useShopFilter();

  return (
    <ProductSection
      products={filteredProducts}
      showHeader={showHeader}
      showButton={showButton}
      noSection={noSection}
      noContainer={noContainer}
    />
  );
}