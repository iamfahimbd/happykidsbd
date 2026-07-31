"use client";

import { useState } from "react";

export default function ProductVariants({
  product,
}) {
  const [selectedAge, setSelectedAge] =
    useState(product.ages?.[0] || "");

  const [
    selectedColor,
    setSelectedColor,
  ] = useState(
    product.colors?.[0] || ""
  );

  return (
    <div className="space-y-8">
      {/* Age */}

      {product.ages?.length > 0 && (
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
            {product.ages.map((age) => {
              const active =
                selectedAge === age;

              return (
                <button
                  key={age}
                  type="button"
                  onClick={() =>
                    setSelectedAge(age)
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
                  {age}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Color */}

      {product.colors?.length > 0 && (
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
            {product.colors.map(
              (color) => {
                const active =
                  selectedColor ===
                  color;

                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() =>
                      setSelectedColor(
                        color
                      )
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
                    {color}
                  </button>
                );
              }
            )}
          </div>
        </div>
      )}
    </div>
  );
}