"use client";

import ProductSection from "@/components/product/ProductSection";
import { useShopFilter } from "@/context/ShopFilterContext";
import NoProductsFound from "./NoProductsFound";

export default function ShopProductSection({
  showHeader = false,
  showButton = false,
  noSection = true,
  noContainer = true,
}) {
  const { filteredProducts } = useShopFilter();

  return (
    <>
  {filteredProducts.length === 0 ? (
    <NoProductsFound />
  ) : (
    <ProductSection
      products={filteredProducts}
      showHeader={false}
      showButton={false}
      noSection
      noContainer
    />
  )}
</>
  );
}
