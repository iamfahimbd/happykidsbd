export function mapProduct(product) {
  const attributes = product.attributes || [];

  const getAttribute = (slug) => {
  const attribute = attributes.find(
    (attr) => attr.slug === slug
  );

  return (
    attribute?.options.map((option) =>
      option
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
    ) || []
  );
};

  return {
    // ===================================
    // Basic
    // ===================================

    id: product.id,

    name: product.name,

    slug: product.slug,

    permalink: product.permalink,

    type: product.type,

    isSimple: product.type === "simple",

    isVariable: product.type === "variable",

    isExternal: product.type === "external",

    isGrouped: product.type === "grouped",

    // ===================================
    // Images
    // ===================================

    image:
      product.images?.[0]?.src || "",

    gallery:
      product.images?.map((img) => img.src) || [],

    // ===================================
    // Pricing
    // ===================================

    price: Number(product.price) || 0,

    regularPrice:
      Number(product.regular_price) || 0,

    salePrice:
      Number(product.sale_price) || 0,

    priceHtml:
      product.price_html || "",

    onSale: product.on_sale,

    featured: product.featured,

    // ===================================
    // Stock
    // ===================================

    stockStatus:
      product.stock_status,

    inStock:
      product.stock_status === "instock",

    // ===================================
    // Rating
    // ===================================

    rating:
      Number(product.average_rating) || 0,

    reviewCount:
      product.rating_count || 0,

    // ===================================
    // Description
    // ===================================

    shortDescription:
      product.short_description || "",

    description:
      product.description || "",

    // ===================================
    // Category
    // ===================================

    categoryId:
      product.categories?.[0]?.id || null,

    categorySlug:
      product.categories?.[0]?.slug || "",

    categoryName:
      product.categories?.[0]?.name || "",

    categories:
      product.categories || [],

    // ===================================
    // Brand
    // ===================================

    brand:
      product.brands?.[0]?.name || "",

    brands:
      product.brands || [],

    // ===================================
    // Tags
    // ===================================

    tags:
      product.tags || [],

    // ===================================
    // Attributes
    // ===================================

    colors:
      getAttribute("pa_color"),

    sizes:
      getAttribute("pa_size"),

    ages:
      getAttribute("pa_age"),

    attributes,

    defaultAttributes:
      product.default_attributes || [],

    // ===================================
    // Variations
    // ===================================

    variations:
      product.variations || [],
  };
}

// ==========================
// Category Mapper
// ==========================

export function mapCategory(category) {
  return {
    id: category.id,

    name: category.name,

    slug: category.slug,

    parent: category.parent,

    count: category.count,

    image:
      category.image?.src || "",

    description:
      category.description || "",
  };
}