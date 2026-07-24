import Link from "next/link";
import { FiShoppingCart, FiUser } from "react-icons/fi";

export default function NavIcons({ mobile = false }) {
  return (
    <div className="flex items-center gap-5">
      {/* Desktop এ User Icon দেখাবে, Mobile এ লুকানো থাকবে */}
      {!mobile && (
        <Link
          href="/account"
          className="text-sky-600 transition hover:text-pink-500"
        >
          <FiUser size={28} />
        </Link>
      )}

      {/* Cart Icon */}
      <Link
        href="/cart"
        className="relative text-sky-600 transition hover:text-pink-500"
      >
        <FiShoppingCart size={28} />

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
          0
        </span>
      </Link>
    </div>
  );
}