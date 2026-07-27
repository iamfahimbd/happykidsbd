"use client";

import Link from "next/link";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import ProductGrid from "./ProductGrid";


export default function ProductSection({
  title,
  subtitle,
  products,
  description,

  showHeader = true,
  showButton = true,

  viewAllLink = "/shop",
  viewAllText = "View All Products",

  noSection = false,
  noContainer = false,
}) {


  const content = (
    <>
      {showHeader && (
        <SectionTitle
          subtitle={subtitle}
          title={title}
          description={description}
          align="center"
        />
      )}

      <div className={showHeader ? "mt-10" : ""}>
        <ProductGrid products={products}  />
      </div>

      {showButton && (
        <div className="mt-10 flex justify-center">
          <Link
            href={viewAllLink}
            className="
              inline-flex
              items-center
              justify-center
              rounded-full
              border
              border-primary
              px-6
              py-3
              font-semibold
              text-primary
              transition-all
              duration-300
              hover:bg-primary
              hover:text-white
            "
          >
            {viewAllText}
          </Link>
        </div>
      )}
    </>
  );

  const wrappedContent = noContainer ? (
    content
  ) : (
    <Container>{content}</Container>
  );

  return noSection ? (
    wrappedContent
  ) : (
    <Section>{wrappedContent}</Section>
  );
}