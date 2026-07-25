import ProductSection from "@/components/product/ProductSection";
import { products } from "@/data/products";

export default function NewArrivals() {
  const newArrivalProducts = products.filter(
    (product) => product.isNew
  );

  return (
    <ProductSection
      title="New Arrivals"
      subtitle="Just Arrived"
      description="Discover the newest styles and latest collections for your little ones."
      products={newArrivalProducts}
      viewAllLink="/shop?sort=newest"
      viewAllText="View All New Arrivals"
    />
  );
}