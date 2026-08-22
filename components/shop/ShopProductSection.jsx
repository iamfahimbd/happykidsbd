"use client";

import ProductSection from "@/components/product/ProductSection";
import { useShopFilter } from "@/context/ShopFilterContext";
import NoProductsFound from "./NoProductsFound";
import Pagination from "./Pagination";

export default function ShopProductSection({
  showHeader = false,
  showButton = false,
  noSection = true,
  noContainer = true,
}) {
  const {
    paginatedProducts,
  } = useShopFilter();

  return (
    <>
      {paginatedProducts.length === 0 ? (
        <NoProductsFound />
      ) : (
        <ProductSection
          products={paginatedProducts}
          showHeader={false}
          showButton={false}
          noSection
          noContainer
        />
      )}

      <Pagination />
    </>
  );
}