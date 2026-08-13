"use client";

import { FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";

import MobileSearchButton from "./MobileSearchButton";
import { useCart } from "@/context/CartContext";

export default function NavIcons({
  mobile = false,
}) {
  const {
    totalItems,
    openCart,
  } = useCart();

  const handleCartClick = () => {
    console.log("NAVBAR CART CLICKED");
    console.log("Opening cart drawer...");
    
    openCart();
  };

  return (
    <div className="flex items-center gap-6">
      {/* Desktop User */}

      {!mobile && (
        <Link
          href="/account"
          className="
            text-sky-600
            transition
            hover:text-pink-500
          "
        >
          <FiUser size={28} />
        </Link>
      )}

      {/* Mobile Search */}

      {mobile && <MobileSearchButton />}

      {/* Cart */}

      <button
        type="button"
        onClick={handleCartClick}
        aria-label="Open cart"
        className="
          relative
          text-sky-600
          transition
          hover:text-pink-500
        "
      >
        <FiShoppingCart size={28} />

        {/* Cart Badge */}

        {totalItems > 0 && (
          <span
            className="
              absolute
              -right-2
              -top-2

              flex
              h-5
              w-5

              items-center
              justify-center

              rounded-full

              bg-pink-500

              text-xs
              font-semibold
              text-white
            "
          >
            {totalItems}
          </span>
        )}
      </button>
    </div>
  );
}