import { getProducts } from "@/lib/woocommerce/products";
import ProductSection from "@/components/product/ProductSection";

export default async function NewArrivals() {
  const newArrivalProducts = await getProducts({
    perPage: 8,
  });

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