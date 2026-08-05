import ProductPrice from "./ProductPrice";
import ProductVariants from "./ProductVariants";
import ProductQuantity from "./ProductQuantity";
import BuyNowButton from "./BuyNowButton";
import AddToCartButton from "./AddToCartButton";

export default function ProductInfo({
  product,
}) {
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
            __html:
              product.shortDescription,
          }}
        />
      )}

      {/* Variants */}

      <div className="mt-8">
        <ProductVariants
          product={product}
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
          />
        </div>

        <div className="flex-1">
          <AddToCartButton
            product={product}
          />
        </div>
      </div>
    </div>
  );
}