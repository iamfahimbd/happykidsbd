import ShopHeader from "@/components/shop/ShopHeader";
import ProductToolbar from "@/components/shop/ProductToolbar";
import ShopLayout from "@/components/shop/ShopLayout";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductSection from "@/components/product/ProductSection";

import { products  } from "@/data/products";

export default function ShopPage() {
  return (
    <>
      <ShopHeader />

      <ShopLayout
        toolbar={<ProductToolbar />}
        sidebar={<FilterSidebar />}
      >
        <ProductSection
          products={products }
          showHeader={false}
          showButton={false}
        />
      </ShopLayout>
    </>
  );
}