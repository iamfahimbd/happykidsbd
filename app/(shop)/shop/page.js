import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductToolbar from "@/components/shop/ProductToolbar";
import ShopHeader from "@/components/shop/ShopHeader";
import ShopLayout from "@/components/shop/ShopLayout";
import ShopProductSection from "@/components/shop/ShopProductSection";

import { ShopFilterProvider } from "@/context/ShopFilterContext";

import {
  getMultipleAttributeTerms,
} from "@/lib/woocommerce/attributes";

import {
  getCategories,
  getCategoryBySlug,
} from "@/lib/woocommerce/categories";

import {
  getPaginatedProducts,
} from "@/lib/woocommerce/products";

export default async function ShopPage({
  searchParams,
}) {
  // ==========================
  // URL Parameters
  // ==========================

  const category =
    searchParams?.category || "";

  const age =
    searchParams?.age || "";

  const color =
    searchParams?.color || "";

  const size =
    searchParams?.size || "";

  const price =
    searchParams?.price || "";

  const search =
    searchParams?.search || "";

  const sort =
    searchParams?.sort || "newest";

  // ==========================
  // Initial Page
  // ==========================

  const initialPage = Math.max(
    1,
    Number(searchParams?.page || 1)
  );

  // ==========================
  // Selected Attribute Slugs
  // ==========================

  const colorSlugs = color
    ? String(color)
        .split(",")
        .map((slug) => slug.trim())
        .filter(Boolean)
    : [];

  const sizeSlugs = size
    ? String(size)
        .split(",")
        .map((slug) => slug.trim())
        .filter(Boolean)
    : [];

  const ageSlugs = age
    ? String(age)
        .split(",")
        .map((slug) => slug.trim())
        .filter(Boolean)
    : [];

  // ==========================
  // Price Parameters
  // ==========================

  let minPrice;
  let maxPrice;

  if (price) {
    const priceParts =
      String(price).split("-");

    const parsedMin =
      Number(priceParts[0]);

    const parsedMax =
      Number(priceParts[1]);

    if (
      Number.isFinite(parsedMin)
    ) {
      minPrice = parsedMin;
    }

    if (
      Number.isFinite(parsedMax)
    ) {
      maxPrice = parsedMax;
    }
  }

  // ==========================
  // WooCommerce Requests
  // ==========================

  const categoriesPromise =
    getCategories();

  const attributeTermsPromise =
    getMultipleAttributeTerms([
      "pa_color",
      "pa_size",
      "pa_age",
    ]);

  // ==========================
  // Category Slug → Category
  // ==========================

  const categoryPromise = category
    ? getCategoryBySlug(category)
    : Promise.resolve(null);

  // ==========================
  // Run Together
  // ==========================

  const [
    categories,
    attributeTerms,
    selectedCategory,
  ] = await Promise.all([
    categoriesPromise,
    attributeTermsPromise,
    categoryPromise,
  ]);

  // ==========================
  // Debug Categories
  // ==========================

  console.log(
    "SHOP CATEGORIES:",
    categories.map((item) => ({
      id: item.id,
      name: item.name,
      slug: item.slug,
    }))
  );

  // ==========================
  // Selected Category
  // ==========================

  const categoryId =
    selectedCategory?.id || "";

  console.log(
    "SELECTED CATEGORY SLUG:",
    category
  );

  console.log(
    "SELECTED CATEGORY:",
    selectedCategory
  );

  console.log(
    "SELECTED CATEGORY ID:",
    categoryId
  );

  // ==========================
  // Attribute Terms
  // ==========================

  const colors =
    attributeTerms?.pa_color || [];

  const sizes =
    attributeTerms?.pa_size || [];

  const ages =
    attributeTerms?.pa_age || [];

  // ==========================
  // Slug → Term ID
  // ==========================

  const colorTermIds =
    colorSlugs
      .map((slug) => {
        const term =
          colors.find(
            (item) =>
              item.slug === slug
          );

        return term?.id;
      })
      .filter(Boolean)
      .map(Number);

  const sizeTermIds =
    sizeSlugs
      .map((slug) => {
        const term =
          sizes.find(
            (item) =>
              item.slug === slug
          );

        return term?.id;
      })
      .filter(Boolean)
      .map(Number);

  const ageTermIds =
    ageSlugs
      .map((slug) => {
        const term =
          ages.find(
            (item) =>
              item.slug === slug
          );

        return term?.id;
      })
      .filter(Boolean)
      .map(Number);

  // ==========================
  // Attribute Debug
  // ==========================

  console.log(
    "COLOR SLUGS:",
    colorSlugs
  );

  console.log(
    "COLOR TERM IDS:",
    colorTermIds
  );

  console.log(
    "SIZE SLUGS:",
    sizeSlugs
  );

  console.log(
    "SIZE TERM IDS:",
    sizeTermIds
  );

  console.log(
    "AGE SLUGS:",
    ageSlugs
  );

  console.log(
    "AGE TERM IDS:",
    ageTermIds
  );

  // ==========================
  // Product Request
  // ==========================

  const productData =
    await getPaginatedProducts({
      page: initialPage,

      perPage: 20,

      // IMPORTANT:
      // WooCommerce needs category ID
      category: categoryId,

      colorTermIds,

      sizeTermIds,

      ageTermIds,

      minPrice,

      maxPrice,

      search,

      sortBy: sort,
    });

  // ==========================
  // Products
  // ==========================

  const products =
    Array.isArray(
      productData?.products
    )
      ? productData.products
      : [];

  // ==========================
  // Pagination
  // ==========================

  const totalProducts =
    Number(
      productData?.totalProducts || 0
    );

  const totalPages =
    Number(
      productData?.totalPages || 0
    );

  // ==========================
  // Price Range
  // ==========================

  const loadedPrices =
    products
      .map((product) =>
        Number(product?.price)
      )
      .filter(
        Number.isFinite
      );

  const loadedMinPrice =
    loadedPrices.length
      ? Math.min(...loadedPrices)
      : 0;

  const loadedMaxPrice =
    loadedPrices.length
      ? Math.max(...loadedPrices)
      : 0;

  const providerMinPrice =
    minPrice !== undefined
      ? minPrice
      : loadedMinPrice;

  const providerMaxPrice =
    maxPrice !== undefined
      ? maxPrice
      : loadedMaxPrice;

  // ==========================
  // Render
  // ==========================

  return (
    <ShopFilterProvider
      products={products}
      minPrice={
        providerMinPrice
      }
      maxPrice={
        providerMaxPrice
      }
      initialPage={
        initialPage
      }
      totalProducts={
        totalProducts
      }
      totalPages={
        totalPages
      }
    >
      {/* ==========================
          Shop Header
      ========================== */}

      <ShopHeader />

      {/* ==========================
          Shop Layout
      ========================== */}

      <ShopLayout
        toolbar={
          <ProductToolbar
            categories={
              categories
            }
            colors={colors}
            sizes={sizes}
          />
        }
        sidebar={
          <FilterSidebar
            categories={
              categories
            }
            colors={colors}
            sizes={sizes}
          />
        }
      >
        {/* ==========================
            Products
        ========================== */}

        <ShopProductSection />
      </ShopLayout>
    </ShopFilterProvider>
  );
}