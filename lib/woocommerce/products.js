import { wcFetch } from "./client";
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
} = {}) {
  const params = new URLSearchParams();

  params.set("page", page);
  params.set("per_page", perPage);
  params.set("status", "publish");

  if (featured !== undefined) {
    params.set("featured", featured);
  }

  if (category) {
    params.set("category", category);
  }

  if (search) {
    params.set("search", search);
  }

  const products = await wcFetch(
    `/products?${params.toString()}`
  );

  return products.map(mapProduct);
}

// ==========================
// Get Product By Slug
// ==========================

export async function getProductBySlug(slug) {
  const products = await wcFetch(
    `/products?slug=${slug}&status=publish`
  );

  if (!products.length) {
    return null;
  }

  return mapProduct(products[0]);
}

// ==========================
// Get Featured Products
// ==========================

export async function getFeaturedProducts(
  limit = 8
) {
  const products = await wcFetch(
    `/products?featured=true&status=publish&per_page=${limit}`
  );

  return products.map(mapProduct);
}

// ==========================
// Get Related Products
// ==========================

export async function getRelatedProducts(
  categoryId,
  currentProductId,
  limit = 4
) {
  if (!categoryId) {
    return [];
  }

  const products = await wcFetch(
    `/products?status=publish&category=${categoryId}&per_page=${limit + 1}`
  );

  return products
    .map(mapProduct)
    .filter(
      (product) =>
        product.id !== currentProductId
    )
    .slice(0, limit);
}