"use client";

import { useState } from "react";

export default function ProductQuantity() {
  const [quantity, setQuantity] =
    useState(1);

  const decrease = () => {
    setQuantity((prev) =>
      Math.max(1, prev - 1)
    );
  };

  const increase = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);

    if (isNaN(value) || value < 1) {
      setQuantity(1);
      return;
    }

    setQuantity(value);
  };

  return (
    <div>
      {/* Label */}

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
        Quantity
      </h3>

      {/* Quantity Box */}

      <div
        className="
          inline-flex

          items-center

          overflow-hidden

          rounded-2xl

          border
          border-gray-200

          bg-white

          shadow-sm
        "
      >
        {/* Minus */}

        <button
          type="button"
          onClick={decrease}
          className="
            flex

            h-12
            w-12

            items-center
            justify-center

            text-xl
            font-bold

            transition

            hover:bg-gray-100
          "
        >
          −
        </button>

        {/* Input */}

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={handleChange}
          className="
            h-12
            w-16

            border-x
            border-gray-200

            text-center
            font-semibold

            outline-none

            appearance-none
          "
        />

        {/* Plus */}

        <button
          type="button"
          onClick={increase}
          className="
            flex

            h-12
            w-12

            items-center
            justify-center

            text-xl
            font-bold

            transition

            hover:bg-gray-100
          "
        >
          +
        </button>
      </div>
    </div>
  );
}