import { wcFetch, wcFetchWithMeta } from "./client";

import { getCategoryIdBySlug } from "./categories";
import { mapProduct } from "./mapper";

// ==========================
// Get Products
// ==========================

export async function getProducts({
  page = 1,
  perPage = 12,
  featured,
  category,
  search,
  sortBy = "newest",
} = {}) {
  const params = new URLSearchParams();

  // ==========================
  // Pagination
  // ==========================

  params.set("page", String(Math.max(1, Number(page) || 1)));

  params.set("per_page", String(Math.max(1, Number(perPage) || 12)));

  // ==========================
  // Status
  // ==========================

  params.set("status", "publish");

  // ==========================
  // Featured
  // ==========================

  if (featured !== undefined) {
    params.set("featured", String(featured));
  }

  // ==========================
  // Category
  // ==========================
  //
  // Frontend:
  // category = "party-dress"
  //
  // WooCommerce:
  // category = 58
  //
  // ==========================

  if (category) {
    const categoryId = await getCategoryIdBySlug(category);

    console.log("CATEGORY SLUG:", category);

    console.log("RESOLVED CATEGORY ID:", categoryId);

    if (categoryId) {
      params.set("category", String(categoryId));
    }
  }

  // ==========================
  // Search
  // ==========================

  if (search) {
    params.set("search", String(search));
  }

  // ==========================
  // Sorting
  // ==========================

  switch (sortBy) {
    case "price-low":
      params.set("orderby", "price");
      params.set("order", "asc");
      break;

    case "price-high":
      params.set("orderby", "price");
      params.set("order", "desc");
      break;

    case "popular":
      params.set("orderby", "popularity");
      params.set("order", "desc");
      break;

    case "newest":
    default:
      params.set("orderby", "date");
      params.set("order", "desc");
      break;
  }

  // ==========================
  // WooCommerce Request
  // ==========================

  const products = await wcFetch(`/products?${params.toString()}`);

  // ==========================
  // Safe Response
  // ==========================

  if (!Array.isArray(products)) {
    return [];
  }

  // ==========================
  // Mapper
  // ==========================

  return products.map(mapProduct);
}

// ==========================
// Get Paginated Products
// ==========================

export async function getPaginatedProducts({
  page = 1,
  perPage = 20,

  // ==========================
  // Server-side Filters
  // ==========================

  category = "",

  color = "",
  size = "",
  age = "",

  minPrice,
  maxPrice,

  search = "",

  sortBy = "newest",
} = {}) {
  // ==========================
  // Safe Pagination
  // ==========================

  const currentPage = Math.max(1, Number(page) || 1);

  const productsPerPage = Math.max(1, Number(perPage) || 20);

  // ==========================
  // Query Parameters
  // ==========================

  const params = new URLSearchParams();

  // ==========================
  // Pagination
  // ==========================

  params.set("page", String(currentPage));

  params.set("per_page", String(productsPerPage));

  // ==========================
  // Status
  // ==========================

  params.set("status", "publish");

  // ==========================
  // Category
  // ==========================

  if (category) {
    params.set("category", String(category));
  }

  // ==========================
  // Search
  // ==========================

  if (search) {
    params.set("search", String(search).trim());
  }

  // ==========================
  // Price
  // ==========================

  if (
    minPrice !== undefined &&
    minPrice !== null &&
    Number.isFinite(Number(minPrice))
  ) {
    params.set("min_price", String(minPrice));
  }

  if (
    maxPrice !== undefined &&
    maxPrice !== null &&
    Number.isFinite(Number(maxPrice))
  ) {
    params.set("max_price", String(maxPrice));
  }

  // ==========================
  // Sorting
  // ==========================

  switch (sortBy) {
    // --------------------------
    // Price Low → High
    // --------------------------

    case "price-low":
      params.set("orderby", "price");

      params.set("order", "asc");

      break;

    // --------------------------
    // Price High → Low
    // --------------------------

    case "price-high":
      params.set("orderby", "price");

      params.set("order", "desc");

      break;

    // --------------------------
    // Popular
    // --------------------------

    case "popular":
      params.set("orderby", "popularity");

      params.set("order", "desc");

      break;

    // --------------------------
    // Newest
    // --------------------------

    case "newest":
    default:
      params.set("orderby", "date");

      params.set("order", "desc");

      break;
  }

  // ==========================
  // Attribute Filtering
  // ==========================
  //
  // WooCommerce REST API:
  //
  // attribute=pa_color
  // attribute_term=TERM_ID
  //
  // Important:
  //
  // WooCommerce's normal REST API does
  // not provide a clean way to send
  // multiple different attribute groups
  // in one /products request.
  //
  // Therefore we only send an attribute
  // filter when ONE attribute group is
  // active.
  //
  // Multiple attribute filtering will
  // be handled separately later without
  // breaking server-side pagination.
  //
  // ==========================

  const activeAttributes = [];

  // --------------------------
  // Color
  // --------------------------

  if (color) {
    activeAttributes.push({
      slug: "pa_color",
      value: color,
    });
  }

  // --------------------------
  // Size
  // --------------------------

  if (size) {
    activeAttributes.push({
      slug: "pa_size",
      value: size,
    });
  }

  // --------------------------
  // Age
  // --------------------------

  if (age) {
    activeAttributes.push({
      slug: "pa_age",
      value: age,
    });
  }

  // ==========================
  // Single Attribute Filter
  // ==========================

  if (activeAttributes.length === 1) {
    const attribute = activeAttributes[0];

    params.set("attribute", attribute.slug);

    // --------------------------
    // IMPORTANT
    // --------------------------
    //
    // The value coming from the
    // frontend may be a term ID,
    // slug, or comma-separated IDs.
    //
    // Pass it through as received.
    //
    // --------------------------

    params.set("attribute_term", String(attribute.value));
  }
  // ==========================
  // DEBUG - Server Side Filter
  // ==========================

  console.log("========================================");

  console.log("SERVER SIDE PRODUCT REQUEST");

  console.log("Page:", currentPage);

  console.log("Per Page:", productsPerPage);

  console.log("Category:", category);

  console.log("Color:", color);

  console.log("Size:", size);

  console.log("Age:", age);

  console.log("Min Price:", minPrice);

  console.log("Max Price:", maxPrice);

  console.log("Search:", search);

  console.log("Sort:", sortBy);

  console.log("Active Attributes:", activeAttributes);

  console.log("FINAL QUERY:", params.toString());

  console.log("FINAL API URL:", `/products?${params.toString()}`);

  console.log("========================================");

  // ==========================
  // WooCommerce Request
  // ==========================

  const result = await wcFetchWithMeta(`/products?${params.toString()}`);

  // ==========================
  // Safe Response
  // ==========================

  if (!result) {
    return {
      products: [],
      totalProducts: 0,
      totalPages: 0,
    };
  }

  // ==========================
  // Map Products
  // ==========================

  const products = Array.isArray(result.data)
    ? result.data.map(mapProduct)
    : [];

  // ==========================
  // Return
  // ==========================

  return {
    products,

    totalProducts: Number(result.totalProducts || 0),

    totalPages: Number(result.totalPages || 0),
  };
}

// ==========================
// Get Product By Slug
// ==========================

export async function getProductBySlug(slug) {
  if (!slug) {
    return null;
  }

  const products = await wcFetch(
    `/products?slug=${encodeURIComponent(slug)}&status=publish`,
  );

  if (!Array.isArray(products) || products.length === 0) {
    return null;
  }

  return mapProduct(products[0]);
}

// ==========================
// Get Featured Products
// ==========================

export async function getFeaturedProducts(limit = 8) {
  const safeLimit = Math.max(1, Number(limit) || 8);

  const products = await wcFetch(
    `/products?featured=true&status=publish&per_page=${safeLimit}`,
  );

  if (!Array.isArray(products)) {
    return [];
  }

  return products.map(mapProduct);
}

// ==========================
// Get Related Products
// ==========================

export async function getRelatedProducts(
  categoryId,
  currentProductId,
  limit = 4,
) {
  if (!categoryId) {
    return [];
  }

  const safeLimit = Math.max(1, Number(limit) || 4);

  const products = await wcFetch(
    `/products?status=publish&category=${categoryId}&per_page=${safeLimit + 1}`,
  );

  if (!Array.isArray(products)) {
    return [];
  }

  return products
    .map(mapProduct)
    .filter((product) => product.id !== currentProductId)
    .slice(0, safeLimit);
}
