"use client";

import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import ProductPrice from "./ProductPrice";
import ProductQuantity from "./ProductQuantity";
import ProductVariants from "./ProductVariants";

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");

  return (
    <div className="flex min-w-0 flex-col">
      {/* Product Title */}

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

      {/* Product Rating (Optional) */}

      {/*
      <div className="mt-4 flex items-center gap-2">
        ★★★★★
        <span className="text-sm text-gray-500">
          ({product.reviewCount} Reviews)
        </span>
      </div>
      */}

      {/* Price */}

      <div className="mt-6">
        <ProductPrice product={product} />
      </div>

      {/* Short Description */}

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
            __html: product.shortDescription,
          }}
        />
      )}

      {/* Variants */}

      <div className="mt-8">
        <ProductVariants
          product={product}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>

      {/* Quantity */}

      <div className="mt-8">
        <ProductQuantity />
      </div>

      {/* Action Buttons */}

      <div
        className="
          mt-8

          flex
          flex-col
          gap-4

          sm:flex-row
        "
      >
        <div className="flex-1">
          <BuyNowButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>

        <div className="flex-1">
          <AddToCartButton
            product={product}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
          />
        </div>
      </div>
    </div>
  );
}
