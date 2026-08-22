"use client";

import { useCart } from "@/context/CartContext";

// ==========================
// Normalize Variant Value
// ==========================

const getVariantValue = (item) => {
  if (!item) {
    return "";
  }

  if (typeof item === "string") {
    return item;
  }

  return (
    item?.slug ||
    item?.name ||
    ""
  );
};

export default function AddToCartButton({
  product,
  selectedSize = "",
  selectedColor = "",
  quantity = 1,
}) {
  const {
    addItem,
    openCart,
  } = useCart();

  const handleAddToCart = () => {
    // ==========================
    // Normalize Variants
    // ==========================

    const size =
      getVariantValue(selectedSize);

    const color =
      getVariantValue(selectedColor);

    // ==========================
    // Cart Item
    // ==========================

    const item = {
      id: product.id,

      slug: product.slug,

      name: product.name,

      image: product.image,

      price:
        Number(product.price) || 0,

      quantity:
        Number(quantity) || 1,

      size,

      color,
    };

    console.log(
      "ADD TO CART - Item:",
      item
    );

    // ==========================
    // Add To Cart
    // ==========================

    addItem(item);

    // ==========================
    // Open Cart Drawer
    // ==========================

    openCart();
  };

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className="
        group

        flex
        h-14
        w-full

        min-w-0

        items-center
        justify-center

        rounded-2xl

        border
        border-primary/20

        bg-white/80
        backdrop-blur-xl

        px-4
        sm:px-6

        font-semibold
        text-primary

        shadow-lg
        shadow-slate-200/60

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:border-primary
        hover:bg-primary
        hover:text-white
        hover:shadow-xl

        active:translate-y-0
        active:scale-[0.98]
      "
    >
      Add To Cart
    </button>
  );
}