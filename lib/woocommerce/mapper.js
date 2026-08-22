// ==========================
// Clean Image URL
// ==========================

function cleanImageUrl(url) {
  if (!url) return "";

  const value = String(url).trim();

  // Markdown link format:
  // [https://example.com/image.jpg](https://example.com/image.jpg)

  const markdownMatch = value.match(
    /^\[([^\]]+)\]\(([^)]+)\)$/
  );

  if (markdownMatch) {
    return markdownMatch[2];
  }

  // Direct URL inside string

  const urlMatch = value.match(
    /https?:\/\/[^\s\])]+/
  );

  if (urlMatch) {
    return urlMatch[0];
  }

  return value;
}

// ==========================
// Attribute Option Mapper
// ==========================
//
// WooCommerce product.attributes:
//
// {
//   id: 12,
//   name: "Color",
//   slug: "pa_color",
//   options: ["Red", "Blue"]
// }
//
// আমরা এটাকে normalize করব:
// {
//   id: 12,
//   name: "Red",
//   slug: "red"
// }
//
// NOTE:
// WooCommerce product API-র attributes-এর
// options-এর মধ্যে সাধারণত term ID থাকে না।
// তাই product attribute-এর ID এবং
// option-এর slug/name আলাদা করে রাখা হচ্ছে.
//

function mapAttributeOptions(attribute) {
  if (!attribute) {
    return [];
  }

  const options = Array.isArray(
    attribute.options
  )
    ? attribute.options
    : [];

  return options.map((option) => {
    const name = String(option)
      .trim();

    return {
      name,

      slug: name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-"),

      attributeId:
        attribute.id || null,

      attributeSlug:
        attribute.slug || "",

      attributeName:
        attribute.name || "",
    };
  });
}

// ==========================
// Get Product Attribute
// ==========================

function getProductAttribute(
  attributes,
  slug
) {
  const attribute =
    attributes.find(
      (item) =>
        item.slug === slug
    );

  if (!attribute) {
    return [];
  }

  return mapAttributeOptions(
    attribute
  );
}

// ==========================
// Product Mapper
// ==========================

export function mapProduct(product) {
  const attributes =
    Array.isArray(product?.attributes)
      ? product.attributes
      : [];

  // ==========================
  // Attribute Data
  // ==========================

  const colorAttributes =
    getProductAttribute(
      attributes,
      "pa_color"
    );

  const sizeAttributes =
    getProductAttribute(
      attributes,
      "pa_size"
    );

  const ageAttributes =
    getProductAttribute(
      attributes,
      "pa_age"
    );

  return {
    // ===================================
    // Basic
    // ===================================

    id: product.id,

    name: product.name,

    slug: product.slug,

    permalink:
      product.permalink,

    type: product.type,

    isSimple:
      product.type === "simple",

    isVariable:
      product.type === "variable",

    isExternal:
      product.type === "external",

    isGrouped:
      product.type === "grouped",

    // ===================================
    // Images
    // ===================================

    image: cleanImageUrl(
      product.images?.[0]?.src
    ),

    gallery:
      product.images?.map(
        (img) =>
          cleanImageUrl(img.src)
      ) || [],

    // ===================================
    // Pricing
    // ===================================

    price:
      Number(product.price) || 0,

    regularPrice:
      Number(product.regular_price) || 0,

    salePrice:
      Number(product.sale_price) || 0,

    priceHtml:
      product.price_html || "",

    onSale:
      product.on_sale || false,

    featured:
      product.featured || false,

    // ===================================
    // Stock
    // ===================================

    stockStatus:
      product.stock_status || "",

    inStock:
      product.stock_status ===
      "instock",

    // ===================================
    // Rating
    // ===================================

    rating:
      Number(
        product.average_rating
      ) || 0,

    reviewCount:
      Number(
        product.rating_count
      ) || 0,

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
      product.categories?.[0]?.id ||
      null,

    categorySlug:
      product.categories?.[0]?.slug ||
      "",

    categoryName:
      product.categories?.[0]?.name ||
      "",

    categories:
      product.categories || [],

    // ===================================
    // Brand
    // ===================================

    brand:
      product.brands?.[0]?.name ||
      "",

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

    attributes,

    // ===================================
    // Color
    // ===================================

    colors:
      colorAttributes,

    // ===================================
    // Size
    // ===================================

    sizes:
      sizeAttributes,

    // ===================================
    // Age
    // ===================================

    ages:
      ageAttributes,

    // ===================================
    // Default Attributes
    // ===================================

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

    parent:
      category.parent || 0,

    count:
      category.count || 0,

    image: cleanImageUrl(
      category.image?.src
    ),

    description:
      category.description || "",
  };
}