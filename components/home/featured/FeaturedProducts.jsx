import Link from "next/link";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import ProductGrid from "@/components/product/ProductGrid";

import { products } from "@/components/data/products";

export default function FeaturedProducts() {
  const featuredProducts = products.filter(
    (product) => product.featured
  );

  return (
    <Section>
      <Container>
        <div className="mb-12">
  <SectionTitle
    subtitle="Handpicked Collection"
    title="Featured Products"
  />

  <div className="mt-4 flex justify-center">
    <Link
      href="/shop"
      className="
        hidden
        md:inline-flex
        items-center
        font-semibold
        text-primary
        hover:underline
      "
    >
      View All →
    </Link>
  </div>
</div>

        <ProductGrid products={featuredProducts} />

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/shop"
            className="
              inline-flex
              rounded-full
              border
              border-primary
              px-6
              py-3
              font-semibold
              text-primary
              transition
              hover:bg-primary
              hover:text-white
            "
          >
            View All Products
          </Link>
        </div>
      </Container>
    </Section>
  );
}