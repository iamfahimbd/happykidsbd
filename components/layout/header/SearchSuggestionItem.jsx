"use client";

import Image from "next/image";
import Link from "next/link";

import { highlightMatch } from "@/lib/search/highlight";
import { useSearch } from "@/context/SearchContext";

export default function SearchSuggestionItem({
  product,
}) {
  const { searchQuery } = useSearch();

  return (
    <Link
      href={`/product/${product.slug}`}
        onClick={(e) => {
    console.log("LINK");
  }}
      prefetch={false}
      className="
        flex
        items-center
        gap-4

        px-5
        py-4

        transition-all
        duration-200

        hover:bg-sky-50
        active:scale-[0.99]
      "
    >
      {/* Product Image */}

      <div
        className="
          relative

          h-16
          w-16

          shrink-0

          overflow-hidden

          rounded-2xl

          border
          border-slate-200

          bg-slate-100
        "
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div
            className="
              flex
              h-full
              items-center
              justify-center

              text-xs
              text-slate-400
            "
          >
            No Image
          </div>
        )}
      </div>

      {/* Info */}

      <div className="min-w-0 flex-1">
        <h4
          className="
            truncate

            text-sm
            font-semibold

            text-slate-900
          "
          dangerouslySetInnerHTML={{
            __html: highlightMatch(
              product.name,
              searchQuery
            ),
          }}
        />

        <p
          className="
            mt-1

            truncate

            text-xs

            text-slate-500
          "
        >
          {product.categoryName ||
            "Product"}
        </p>
      </div>

      {/* Price */}

      <div
        className="
          shrink-0

          text-right
        "
      >
        <p
          className="
            text-sm

            font-bold

            text-primary
          "
        >
          ৳{product.price}
        </p>

        {product.regularPrice >
          product.price && (
          <p
            className="
              mt-1

              text-xs

              text-slate-400

              line-through
            "
          >
            ৳
            {product.regularPrice}
          </p>
        )}
      </div>
    </Link>
  );
}