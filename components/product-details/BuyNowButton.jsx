"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function BuyNowButton({
  product,
  selectedSize = "",
  selectedColor = "",
  quantity = 1,
}) {
  const router = useRouter();

  const {
    setBuyNowProduct,
  } = useCart();

  const handleBuyNow = () => {
    // ==========================
    // Buy Now Item
    // ==========================

    const item = {
      id: product.id,

      slug: product.slug,

      name: product.name,

      image: product.image,

      price: product.price,

      quantity:
        Number(quantity) || 1,

      size: selectedSize,

      color: selectedColor,
    };

    console.log(
      "BUY NOW ITEM:",
      item
    );

    // ==========================
    // Save Buy Now Product
    // ==========================

    setBuyNowProduct(item);

    // ==========================
    // Go To Checkout
    // ==========================

    router.push(
      "/checkout?buyNow=true"
    );
  };

  return (
    <button
      type="button"
      onClick={handleBuyNow}
      className="
        group

        flex
        h-14
        w-full

        items-center
        justify-center

        rounded-2xl

        bg-gradient-to-r
        from-primary
        to-sky-500

        px-6

        font-semibold
        text-white

        shadow-lg
        shadow-sky-200/60

        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-xl
        hover:shadow-sky-300/50

        active:translate-y-0
        active:scale-[0.98]
      "
    >
      Buy Now
    </button>
  );
}