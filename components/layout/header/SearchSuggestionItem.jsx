"use client";

import Image from "next/image";
import Link from "next/link";

import { highlightMatch } from "@/lib/search/highlight";
import { useSearch } from "@/context/SearchContext";

export default function SearchSuggestionItem({
  product,
}) {
  const {
    searchQuery,
    closeSearch,
  } = useSearch();

  return (
    <Link
    
      href={`/product/${product.slug}`}
      onClick={() => {
    console.log("LINK CLICKED");
  }}
  
      
      className="
        flex
        w-full
        items-center
        gap-4

        px-5
        py-3

        text-left

        transition-all
        duration-200

        hover:bg-slate-50
      "
    >
      {/* Product Image */}

      <div
        className="
          relative

          h-14
          w-14

          shrink-0

          overflow-hidden
          rounded-2xl

          bg-slate-100
        "
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="56px"
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
              text-gray-400
            "
          >
            No Image
          </div>
        )}
      </div>

      {/* Product Info */}

      <div className="min-w-0 flex-1">
        <h4
          className="
            truncate

            font-semibold

            text-gray-900
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

            text-sm

            capitalize

            text-gray-500
          "
        >
          {product.categoryName ||
            product.categorySlug ||
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
              text-xs

              text-gray-400

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