import ShopProductSection from "@/components/shop/ShopProductSection";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductToolbar from "@/components/shop/ProductToolbar";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopLayout from "@/components/shop/ShopLayout";
import { ShopFilterProvider } from "@/context/ShopFilterContext";
import { getProducts } from "@/lib/woocommerce/products";

export default async function ShopPage() {
  const products = await getProducts({
    perPage: 100,
  });

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