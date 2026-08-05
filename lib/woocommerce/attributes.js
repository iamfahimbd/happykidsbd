import { wcFetch } from "./client";

// ==========================
// Get All Attributes
// ==========================

export async function getAttributes() {
  return await wcFetch(
    "/products/attributes?per_page=100"
  );
}

// ==========================
// Get Attribute By Slug
// ==========================

export async function getAttributeBySlug(slug) {
  const attributes = await getAttributes();

  return (
    attributes.find(
      (attribute) => attribute.slug === slug
    ) || null
  );
}

// ==========================
// Get Attribute Terms
// Example:
// getAttributeTerms("color")
// getAttributeTerms("age")
// ==========================

export async function getAttributeTerms(
  slug
) {
  const attribute =
    await getAttributeBySlug(slug);

  if (!attribute) {
    return [];
  }

  const terms = await wcFetch(
    `/products/attributes/${attribute.id}/terms?per_page=100`
  );

  return terms.map((term) => ({
    id: term.id,
    name: term.name,
    slug: term.slug,
    count: term.count,
  }));
}