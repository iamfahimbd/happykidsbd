import { Heart, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div
      className="
        group
        overflow-hidden
        rounded-3xl
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-xl
      "
    >
      {/* Image */}

      <div className="relative overflow-hidden">
        {/* Badge */}

        {product.badge && (
          <span
            className="
              absolute
              left-4
              top-4
              z-20
              rounded-full
              bg-secondary
              px-3
              py-1
              text-xs
              font-semibold
              text-white
            "
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist */}

        <button
          className="
            absolute
            right-4
            top-4
            z-20
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/90
            shadow
            transition
            duration-300
            hover:scale-110
          "
        >
          <Heart size={18} />
        </button>

        {/* Product Image */}

        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="
              aspect-square
              w-full
              object-cover
              transition-transform
              duration-500
              group-hover:scale-105
            "
          />
        </Link>
      </div>

      {/* Content */}

      <div className="space-y-4 p-3 md:p-4">
        {/* Rating */}

        <div className="flex items-center gap-2  ">
          <Star size={16} className="fill-yellow-400 text-yellow-400 " />

          <span className="text-sm text-gray-600">
            {product.rating}
            <span className="ml-1 text-gray-400">({product.reviews})</span>
          </span>
        </div>

        {/* Name */}

        <Link
          href={`/product/${product.slug}`}
          className="
            line-clamp-2
            text-sm
            md:text-lg
            font-semibold
            
            text-gray-900
            transition-colors
            hover:text-primary
          "
        >
          {product.name}
        </Link>

        {/* Price */}

        <div className="flex items-center gap-3">
          <span className="text-base font-bold md:text-xl text-primary">
            ৳{product.price}
          </span>

          {product.oldPrice && (
            <span className="text-xs md:text-base text-red-500 line-through">
              ৳{product.oldPrice}
            </span>
          )}
        </div>

        {/* Button */}

        <button
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-primary
            py-2
            text-sm
            md:py-3
            md:text-base
            font-medium
            text-white
            transition-all
            duration-300
            hover:opacity-90
          "
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
