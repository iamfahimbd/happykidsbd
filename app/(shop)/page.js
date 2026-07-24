import Hero from "@/components/home/Hero";
import CategorySection from "@/components/home/category/CategorySection";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <div className="order-2 lg:order-1">
        <Hero />
      </div>

      <div className="order-1 lg:order-2">
        <CategorySection />
      </div>
      <div className="order-3">
        <FeaturedProducts />
      </div>
      
    </main>
  );
}