import { notFound } from "next/navigation";

import ProductCard from "@/components/product/ProductCard";
import CategoryHeader from "@/components/home/category/CategoryHeader";

import {
  getCategoryBySlug,
} from "@/lib/woocommerce/categories";

import {
  getProducts,
} from "@/lib/woocommerce/products";

// ==========================
// SEO
// ==========================

export async function generateMetadata({
  params,
}) {
  const category =
    await getCategoryBySlug(params.slug);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} | HappyKidsBD`,
    description:
      category.description ||
      `${category.name} products`,
  };
}

// ==========================
// Page
// ==========================

export default async function CategoryPage({
  params,
}) {
  const category =
    await getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const products =
    await getProducts({
      category: category.id,
      perPage: 24,
    });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* Heading */}

      <CategoryHeader
  category={category}
  productCount={products.length}
/>

      {/* Empty */}

      {products.length === 0 ? (
        <div className="rounded-3xl border bg-white py-20 text-center">
          <h2 className="text-xl font-semibold">
            No products found
          </h2>

          <p className="mt-3 text-gray-500">
            Products will appear here soon.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            gap-5

            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
}