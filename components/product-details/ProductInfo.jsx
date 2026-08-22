"use client";

import { useState } from "react";

import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import ProductVariants from "./ProductVariants";

// ==========================
// Get Variant Value
// ==========================

const getVariantValue = (item) => {
  if (typeof item === "string") {
    return item;
  }

  return (
    item?.slug ||
    item?.name ||
    ""
  );
};

export default function ProductInfo({
  product,
}) {
  // ==========================
  // Initial Size
  // ==========================

  const [selectedSize, setSelectedSize] =
    useState(
      getVariantValue(
        product?.sizes?.[0]
      )
    );

  // ==========================
  // Initial Color
  // ==========================

  const [selectedColor, setSelectedColor] =
    useState(
      getVariantValue(
        product?.colors?.[0]
      )
    );

  return (
    <div className="flex min-w-0 flex-col">

      {/* ==========================
          Product Title
      ========================== */}

      <h1
        className="
          text-2xl
          font-bold
          leading-tight
          text-gray-900

          lg:text-4xl
        "
      >
        {product.name}
      </h1>

      {/* ==========================
          Price
      ========================== */}

      <div className="mt-6">
        <ProductPrice
          product={product}
        />
      </div>

      {/* ==========================
          Short Description
      ========================== */}

      {product.shortDescription && (
        <div
          className="
            prose
            prose-sm
            mt-6
            max-w-none
            text-gray-600
          "
          dangerouslySetInnerHTML={{
            __html:
              product.shortDescription,
          }}
        />
      )}

      {/* ==========================
          Variants
      ========================== */}

      <div className="mt-8">
        <ProductVariants
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={
            setSelectedSize
          }
          selectedColor={
            selectedColor
          }
          setSelectedColor={
            setSelectedColor
          }
        />
      </div>

      {/* ==========================
          Quantity
      ========================== */}

      <div className="mt-8">
        <ProductQuantity />
      </div>

      {/* ==========================
          Action Buttons
      ========================== */}

      <div
        className="
          mt-8
          flex
          flex-col
          gap-4
          sm:flex-row
        "
      >

        {/* Buy Now */}

        <div className="flex-1">
          <BuyNowButton
            product={product}
            selectedSize={
              selectedSize
            }
            selectedColor={
              selectedColor
            }
          />
        </div>

        {/* Add To Cart */}

        <div className="flex-1">
          <AddToCartButton
            product={product}
            selectedSize={
              selectedSize
            }
            selectedColor={
              selectedColor
            }
          />
        </div>

      </div>

    </div>
  );
}