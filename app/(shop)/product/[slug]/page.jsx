import { notFound } from "next/navigation";

import ProductLayout from "@/components/product-details/ProductLayout";

import { getProductBySlug } from "@/lib/woocommerce/products";

export async function generateMetadata({
  params,
}) {
  const product =
    await getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | HappyKidsBD`,

    description:
      product.shortDescription ||
      product.name,

    openGraph: {
      title: product.name,

      description:
        product.shortDescription ||
        product.name,

      images: [product.image],
    },
  };
}

export default async function ProductPage({
  params,
}) {
  const product =
    await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return (
    <ProductLayout product={product} />
  );
}