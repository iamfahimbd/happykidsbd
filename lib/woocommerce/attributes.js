import { wcFetch } from "./client";

// ==========================
// Get All Attributes
// ==========================

export async function getAttributes() {
  const attributes = await wcFetch(
    "/products/attributes?per_page=100"
  );

  if (!Array.isArray(attributes)) {
    return [];
  }

  return attributes;
}

// ==========================
// Get Attribute By Slug
// ==========================

export async function getAttributeBySlug(slug) {
  const attributes = await getAttributes();

  return (
    attributes.find(
      (attribute) =>
        attribute.slug === slug
    ) || null
  );
}

// ==========================
// Get Attribute Terms By ID
// ==========================

async function getAttributeTermsById(
  attributeId
) {
  if (!attributeId) {
    return [];
  }

  const terms = await wcFetch(
    `/products/attributes/${attributeId}/terms?per_page=100`
  );

  if (!Array.isArray(terms)) {
    return [];
  }

  return terms.map((term) => ({
    id: term.id,
    name: term.name,
    slug: term.slug,
    count: term.count,
  }));
}

// ==========================
// Get Attribute Terms
// ==========================

export async function getAttributeTerms(slug) {
  const attribute =
    await getAttributeBySlug(slug);

  if (!attribute) {
    return [];
  }

  return getAttributeTermsById(
    attribute.id
  );
}

// ==========================
// Get Multiple Attribute Terms
// ==========================

export async function getMultipleAttributeTerms(
  slugs = []
) {
  if (
    !Array.isArray(slugs) ||
    slugs.length === 0
  ) {
    return {};
  }

  // ==========================
  // Get Attributes Only Once
  // ==========================

  const attributes =
    await getAttributes();

  if (!Array.isArray(attributes)) {
    return {};
  }

  // ==========================
  // Find Requested Attributes
  // ==========================

  const requestedAttributes =
    slugs
      .map((slug) => {
        const attribute =
          attributes.find(
            (item) =>
              item.slug === slug
          );

        return {
          slug,
          id: attribute?.id || null,
        };
      })
      .filter(
        (item) => item.id
      );

  // ==========================
  // Get Terms In Parallel
  // ==========================

  const results =
    await Promise.all(
      requestedAttributes.map(
        async ({ slug, id }) => {
          const terms =
            await getAttributeTermsById(
              id
            );

          return {
            slug,
            terms,
          };
        }
      )
    );

  // ==========================
  // Convert To Object
  // ==========================

  return results.reduce(
    (acc, item) => {
      acc[item.slug] = item.terms;

      return acc;
    },
    {}
  );
}

// ==========================
// Get Attribute Term By Slug
// ==========================

export async function getAttributeTermBySlug(
  attributeSlug,
  termSlug
) {
  const terms =
    await getAttributeTerms(attributeSlug);

  if (!Array.isArray(terms)) {
    return null;
  }

  return (
    terms.find(
      (term) =>
        term.slug === termSlug
    ) || null
  );
}

// ==========================
// Get Attribute Term IDs
// ==========================

export async function getAttributeTermIds(
  attributeSlug,
  termSlugs = []
) {
  if (
    !attributeSlug ||
    !Array.isArray(termSlugs) ||
    !termSlugs.length
  ) {
    return [];
  }

  const terms =
    await getAttributeTerms(
      attributeSlug
    );

  if (!Array.isArray(terms)) {
    return [];
  }

  return terms
    .filter((term) =>
      termSlugs.includes(term.slug)
    )
    .map((term) => term.id);
}