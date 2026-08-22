"use client";

export default function ProductVariants({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
}) {
  // ==========================
  // Safe Variants
  // ==========================

  const sizes = Array.isArray(product?.sizes)
    ? product.sizes
    : [];

  const colors = Array.isArray(product?.colors)
    ? product.colors
    : [];

  // ==========================
  // Get Variant Value
  // ==========================

  const getValue = (item) => {
    if (typeof item === "string") {
      return item;
    }

    return (
      item?.slug ||
      item?.name ||
      ""
    );
  };

  // ==========================
  // Get Display Name
  // ==========================

  const getDisplayName = (item) => {
    if (typeof item === "string") {
      return item.replace(/-/g, " ");
    }

    return (
      item?.name ||
      item?.slug?.replace(/-/g, " ") ||
      ""
    );
  };

  return (
    <div className="space-y-5">

      {/* ==========================
          Size
      ========================== */}

      {sizes.length > 0 && (
        <div>
          <h3
            className="
              mb-3
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-gray-700
            "
          >
            Select Age
          </h3>

          <div className="flex flex-wrap gap-3">
            {sizes.map((size, index) => {
              const value = getValue(size);

              const displayName =
                getDisplayName(size);

              const active =
                selectedSize === value;

              return (
                <button
                  key={
                    typeof size === "object"
                      ? size?.id ||
                        size?.slug ||
                        index
                      : size
                  }
                  type="button"
                  onClick={() =>
                    setSelectedSize(value)
                  }
                  className={`
                    rounded-2xl
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      active
                        ? "border-primary bg-primary text-white shadow-lg"
                        : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ==========================
          Color
      ========================== */}

      {colors.length > 0 && (
        <div>
          <h3
            className="
              mb-3
              text-sm
              font-semibold
              uppercase
              tracking-wide
              text-gray-700
            "
          >
            Select Color
          </h3>

          <div className="flex flex-wrap gap-3">
            {colors.map((color, index) => {
              const value = getValue(color);

              const displayName =
                getDisplayName(color);

              const active =
                selectedColor === value;

              return (
                <button
                  key={
                    typeof color === "object"
                      ? color?.id ||
                        color?.slug ||
                        index
                      : color
                  }
                  type="button"
                  onClick={() =>
                    setSelectedColor(value)
                  }
                  className={`
                    rounded-2xl
                    border
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    transition-all
                    duration-200

                    ${
                      active
                        ? "border-primary bg-primary text-white shadow-lg"
                        : "border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {displayName}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}