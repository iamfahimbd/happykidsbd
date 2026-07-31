import { getProducts } from "@/lib/woocommerce/products";
import ProductSection from "@/components/product/ProductSection";

export default async function FeaturedProducts() {
  // আপাতত latest 8 products আনছি
  const featuredProducts = await getProducts({
    perPage: 8,
    featured: true,
  });

  return (
    <ProductSection
      title="Featured Products"
      subtitle="Handpicked Collection"
      description="Explore our handpicked collection of premium kids fashion, carefully selected for style, comfort, and everyday happiness."
      products={featuredProducts}
      viewAllLink="/shop"
      viewAllText="View All Products"
    />
  );
}