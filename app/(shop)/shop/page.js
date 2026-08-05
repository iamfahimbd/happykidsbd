import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductToolbar from "@/components/shop/ProductToolbar";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopLayout from "@/components/shop/ShopLayout";
import ShopProductSection from "@/components/shop/ShopProductSection";

import { ShopFilterProvider } from "@/context/ShopFilterContext";

import {
  getAttributes,
  getAttributeTerms,
} from "@/lib/woocommerce/attributes";
import { getCategories } from "@/lib/woocommerce/categories";
import { getProducts } from "@/lib/woocommerce/products";


export default async function ShopPage({
  searchParams,
}) {
  const attributes = await getAttributes();

  const initialPage =
  Number(searchParams?.page || 1);

  const products = await getProducts({
    perPage: 100,
  });

  const prices = products.map((p) => p.price);

const minPrice = Math.min(...prices);

const maxPrice = Math.max(...prices);

  const categories = await getCategories();
  const colors = await getAttributeTerms("pa_color");
  const sizes = await getAttributeTerms("pa_size");

  return (
    <ShopFilterProvider  
     products={products}
  minPrice={minPrice}
  maxPrice={maxPrice}
  initialPage={initialPage}>
      <ShopHeader />

      <ShopLayout
        toolbar={<ProductToolbar
          categories={categories}
          colors={colors}
          sizes={sizes}
          />}
        sidebar={<FilterSidebar 
          categories={categories} 
          colors={colors} 
          sizes={sizes}/>}
      >
        <ShopProductSection />
      </ShopLayout>
    </ShopFilterProvider>
  );
}
