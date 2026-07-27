"use client";

import ShopProductSection from "@/components/shop/ShopProductSection";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductToolbar from "@/components/shop/ProductToolbar";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopLayout from "@/components/shop/ShopLayout";
import { ShopFilterProvider } from "@/context/ShopFilterContext";
import { products } from "@/data/products";

export default function ShopPage() {
  return (
    <ShopFilterProvider products={products}>
      <ShopHeader />

      <ShopLayout
        toolbar={<ProductToolbar />}
        sidebar={<FilterSidebar />}
      >
        <ShopProductSection />
      </ShopLayout>
    </ShopFilterProvider>
  );
}