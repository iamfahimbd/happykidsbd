"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    subtotal,
    isCartOpen,
    closeCart,
  } = useCart();

  // ==========================
  // Lock Body Scroll
  // ==========================

  useEffect(() => {
    if (!isCartOpen) return;

    const originalOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        originalOverflow;
    };
  }, [isCartOpen]);

  // ==========================
  // Escape Key
  // ==========================

  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isCartOpen, closeCart]);

  return (
    <>
      {/* ==================================================
          Overlay
      ================================================== */}

      <div
        className={`
          fixed
          inset-0
          z-[9998]

          bg-black/40
          backdrop-blur-[2px]

          transition-opacity
          duration-300
          ease-out

          ${
            isCartOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }
        `}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* ==================================================
          Drawer
      ================================================== */}

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`
          fixed
          right-0
          top-0

          z-[9999]

          flex
          h-dvh

          w-full
          max-w-md

          flex-col

          bg-white

          shadow-2xl

          transform
          transition-transform
          duration-300
          ease-out

          ${
            isCartOpen
              ? "translate-x-0"
              : "translate-x-full"
          }
        `}
      >
        {/* ==================================================
            Header
        ================================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            justify-between

            border-b
            border-gray-100

            bg-white

            px-4
            py-4

            sm:px-5
            sm:py-5
          "
        >
          <div
            className="
              flex
              min-w-0
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0

                items-center
                justify-center

                rounded-xl

                bg-primary/10

                text-primary
              "
            >
              <ShoppingBag size={21} />
            </div>

            <div className="min-w-0">
              <h2
                className="
                  truncate

                  text-lg
                  font-bold
                  text-gray-900

                  sm:text-xl
                "
              >
                Your Cart
              </h2>

              {cartItems.length > 0 && (
                <p
                  className="
                    text-xs
                    text-gray-500
                  "
                >
                  {cartItems.length}{" "}
                  {cartItems.length === 1
                    ? "item"
                    : "items"}
                </p>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="
              flex
              h-10
              w-10
              shrink-0

              items-center
              justify-center

              rounded-full

              text-gray-500

              transition-all
              duration-200

              hover:bg-gray-100
              hover:text-gray-900

              active:scale-95
            "
          >
            <X size={21} />
          </button>
        </div>

        {/* ==================================================
            Cart Items
        ================================================== */}

        <div
          className="
            min-h-0
            flex-1

            overflow-y-auto

            overscroll-contain

            px-4
            py-4

            sm:px-5
            sm:py-5
          "
        >
          {cartItems.length === 0 ? (
            <div
              className="
                flex
                h-full
                min-h-[400px]

                flex-col
                items-center
                justify-center

                px-6

                text-center
              "
            >
              <div
                className="
                  flex
                  h-20
                  w-20

                  items-center
                  justify-center

                  rounded-full

                  bg-gray-100
                "
              >
                <ShoppingBag
                  size={38}
                  className="text-gray-300"
                />
              </div>

              <h3
                className="
                  mt-5

                  text-lg
                  font-bold

                  text-gray-900
                "
              >
                Your cart is empty
              </h3>

              <p
                className="
                  mt-2

                  max-w-xs

                  text-sm
                  leading-relaxed

                  text-gray-500
                "
              >
                Looks like you haven't added
                anything to your cart yet.
              </p>

              <button
                type="button"
                onClick={closeCart}
                className="
                  mt-6

                  rounded-xl

                  bg-primary

                  px-6
                  py-3

                  text-sm
                  font-semibold

                  text-white

                  shadow-lg

                  transition-all
                  duration-200

                  hover:-translate-y-0.5
                  hover:shadow-xl

                  active:translate-y-0
                "
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size || ""}-${item.color || ""}`}
                  className="
                    flex
                    gap-3

                    border-b
                    border-gray-100

                    pb-5

                    sm:gap-4
                  "
                >
                  {/* Image */}

                  <Link
                    href={`/product/${item.slug}`}
                    onClick={closeCart}
                    className="
                      relative

                      h-24
                      w-24

                      shrink-0

                      overflow-hidden

                      rounded-2xl

                      bg-gray-100

                      sm:h-28
                      sm:w-28
                    "
                  >
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="
                          object-cover

                          transition-transform
                          duration-300

                          hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full

                          items-center
                          justify-center

                          text-gray-300
                        "
                      >
                        <ShoppingBag
                          size={28}
                        />
                      </div>
                    )}
                  </Link>

                  {/* Information */}

                  <div
                    className="
                      min-w-0
                      flex-1
                    "
                  >
                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-2
                      "
                    >
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeCart}
                        className="
                          line-clamp-2

                          text-sm
                          font-semibold
                          leading-snug

                          text-gray-900

                          transition-colors

                          hover:text-primary
                        "
                      >
                        {item.name}
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(
                            item.id,
                            item.size,
                            item.color
                          )
                        }
                        aria-label={`Remove ${item.name}`}
                        className="
                          flex
                          h-8
                          w-8
                          shrink-0

                          items-center
                          justify-center

                          rounded-lg

                          text-gray-400

                          transition-all
                          duration-200

                          hover:bg-red-50
                          hover:text-red-500

                          active:scale-95
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Variants */}

                    {(item.size ||
                      item.color) && (
                      <div
                        className="
                          mt-1.5

                          flex
                          flex-wrap

                          gap-x-2
                          gap-y-1

                          text-xs

                          text-gray-500
                        "
                      >
                        {item.size && (
                          <span>
                            Size:{" "}
                            <span className="font-medium text-gray-700">
                              {item.size.replace(
                                /-/g,
                                " "
                              )}
                            </span>
                          </span>
                        )}

                        {item.size &&
                          item.color && (
                            <span>•</span>
                          )}

                        {item.color && (
                          <span>
                            Color:{" "}
                            <span className="font-medium text-gray-700">
                              {item.color}
                            </span>
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}

                    <p
                      className="
                        mt-2

                        text-base
                        font-bold

                        text-primary
                      "
                    >
                      ৳
                      {Number(
                        item.price || 0
                      ).toLocaleString(
                        "en-BD"
                      )}
                    </p>

                    {/* Quantity */}

                    <div
                      className="
                        mt-3

                        flex
                        w-fit

                        items-center

                        overflow-hidden

                        rounded-xl

                        border
                        border-gray-200

                        bg-white
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            Number(
                              item.quantity
                            ) - 1
                          )
                        }
                        disabled={
                          Number(
                            item.quantity
                          ) <= 1
                        }
                        className="
                          flex
                          h-9
                          w-9

                          items-center
                          justify-center

                          text-gray-600

                          transition

                          hover:bg-gray-100

                          disabled:cursor-not-allowed
                          disabled:opacity-40
                        "
                      >
                        <Minus size={14} />
                      </button>

                      <span
                        className="
                          flex
                          h-9
                          min-w-10

                          items-center
                          justify-center

                          border-x
                          border-gray-200

                          px-2

                          text-sm
                          font-semibold

                          text-gray-900
                        "
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            item.size,
                            item.color,
                            Number(
                              item.quantity
                            ) + 1
                          )
                        }
                        className="
                          flex
                          h-9
                          w-9

                          items-center
                          justify-center

                          text-gray-600

                          transition

                          hover:bg-gray-100

                          active:bg-gray-200
                        "
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ==================================================
            Footer
        ================================================== */}

        {cartItems.length > 0 && (
          <div
            className="
              shrink-0

              border-t
              border-gray-100

              bg-white

              px-4
              py-4

              shadow-[0_-8px_25px_rgba(0,0,0,0.05)]

              sm:px-5
              sm:py-5
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
              "
            >
              <span
                className="
                  text-sm
                  font-medium

                  text-gray-500
                "
              >
                Subtotal
              </span>

              <span
                className="
                  text-xl
                  font-extrabold

                  text-gray-900
                "
              >
                ৳
                {Number(
                  subtotal || 0
                ).toLocaleString(
                  "en-BD"
                )}
              </span>
            </div>

            <Link
              href="/checkout"
              onClick={closeCart}
              className="
                mt-4

                flex
                h-14
                w-full

                items-center
                justify-center
                gap-2

                rounded-2xl

                bg-primary

                px-5

                text-sm
                font-bold

                text-white

                shadow-lg

                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-xl

                active:translate-y-0
                active:scale-[0.98]
              "
            >
              Proceed to Checkout

              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              onClick={closeCart}
              className="
                mt-3

                w-full

                text-center

                text-sm
                font-semibold

                text-gray-500

                transition-colors

                hover:text-primary
              "
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}