export default function ProductPrice({
  product,
}) {
  return (
    <div className="flex items-end gap-4">
      {/* Current Price */}

      <span
        className="
          text-3xl
          font-extrabold
          tracking-tight
          text-primary

          lg:text-4xl
        "
      >
        ৳{product.price}
      </span>

      {/* Regular Price */}

      {product.regularPrice >
        product.price && (
        <span
          className="
            text-xl
            font-medium
            text-gray-400
            line-through
          "
        >
          ৳{product.regularPrice}
        </span>
      )}

      {/* Sale Badge */}

      {product.onSale && (
        <span
          className="
            rounded-full

            bg-red-100
            px-3
            py-1

            text-xs
            font-semibold
            uppercase
            tracking-wide

            text-red-600
          "
        >
          Sale
        </span>
      )}
    </div>
  );
}