import { wcFetch } from "./client";
import { mapCategory } from "./mapper";

// ==========================
// Get Parent Categories
// ==========================

export async function getCategories() {
  const categories = await wcFetch(
    "/products/categories?per_page=100&hide_empty=true"
  );

  return categories
  .filter((category) => category.parent === 0)
  .map(mapCategory);
}

// ==========================
// Get Category By Slug
// ==========================

export async function getCategoryBySlug(slug) {
  const categories = await wcFetch(
    `/products/categories?slug=${slug}`
  );

  if (!categories.length) {
    return null;
  }

  return mapCategory(categories[0]);
}