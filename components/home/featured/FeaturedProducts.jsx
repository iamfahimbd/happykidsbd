import { products } from "@/data/products";
import ProductSection from "@/components/product/ProductSection";

export default function FeaturedProducts() {
  const featuredProducts = products.filter((product) => product.featured);

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
