import ProductCard from "@/components/product/ProductCard";
import { getProducts } from "@/lib/woocommerce/products";

export async function generateMetadata({
  searchParams,
}) {
  const keyword = Array.isArray(searchParams?.q)
    ? searchParams.q[0]
    : searchParams?.q || "";

  return {
    title: keyword
      ? `Search: ${keyword} | HappyKidsBD`
      : "Search | HappyKidsBD",

    description: keyword
      ? `Search results for "${keyword}"`
      : "Search products",
  };
}

export default async function SearchPage({
  searchParams,
}) {
  const rawKeyword = Array.isArray(searchParams?.q)
    ? searchParams.q[0]
    : searchParams?.q || "";

  const keyword = rawKeyword.trim();

  const products = keyword
    ? await getProducts({
        search: keyword,
        perPage: 24,
      })
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
      {/* Heading */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Search Results
        </h1>

        {keyword && (
          <p className="mt-2 text-gray-500">
            Results for{" "}
            <span className="font-semibold">
              "{keyword}"
            </span>
          </p>
        )}
      </div>

      {/* No Result */}

      {products.length === 0 ? (
        <div className="rounded-3xl border bg-white py-20 text-center">
          <h2 className="text-xl font-semibold">
            No products found
          </h2>

          <p className="mt-3 text-gray-500">
            Try another keyword.
          </p>
        </div>
      ) : (
        <>
          {/* Count */}

          <p className="mb-6 text-gray-500">
            {products.length} product
            {products.length > 1 ? "s" : ""} found
          </p>

          {/* Grid */}

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
        </>
      )}
    </div>
  );
}