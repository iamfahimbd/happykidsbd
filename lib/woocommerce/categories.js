import { wcFetch } from "./client";
import { mapCategory } from "./mapper";

// ==========================
// Get Parent Categories
// ==========================

export async function getCategories() {
  const categories = await wcFetch(
    "/products/categories?per_page=100&hide_empty=true",
  );

  // WooCommerce unavailable
  if (!Array.isArray(categories)) {
    return [];
  }

  return categories
    .filter((category) => Number(category?.parent || 0) === 0)
    .map(mapCategory);
}

// ==========================
// Get Category By Slug
// ==========================

export async function getCategoryBySlug(slug) {
  if (!slug) {
    return null;
  }

  const categories = await wcFetch(
    `/products/categories?slug=${encodeURIComponent(slug)}&hide_empty=true`,
  );

  // WooCommerce unavailable
  if (!Array.isArray(categories)) {
    return null;
  }

  if (categories.length === 0) {
    return null;
  }

  return mapCategory(categories[0]);
}

// ==========================
// Get Category ID By Slug
// ==========================
//
// Frontend URL:
// ?category=party-dress
//
// WooCommerce products API:
// ?category=58
//
// তাই slug → category ID conversion
// এখানে করা হবে.
//

export async function getCategoryIdBySlug(slug) {
  if (!slug) {
    return null;
  }

  const category = await getCategoryBySlug(slug);

  if (!category) {
    return null;
  }

  return Number(category.id) || null;
}
