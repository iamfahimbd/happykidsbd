import Hero from "@/components/home/hero/Hero";
import CategorySection from "@/components/home/category/CategorySection";
import FeaturedProducts from "@/components/home/featured/FeaturedProducts";
import NewArrivals from "@/components/home/new-arrivals/NewArrivals";
import PromoBanner from "@/components/home/banner/PromoBanner";
import FeaturesSection from "@/components/home/happykidsfeatures/FeaturesSection";

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

  <div className="order-4">
    <PromoBanner />
  </div>

  <div className="order-5">
    <NewArrivals />
  </div>
  <div className="order-6">
    <FeaturesSection />
  </div>
</main>
  );
}