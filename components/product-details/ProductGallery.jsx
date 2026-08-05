"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  product,
}) {
  const images =
    product.gallery?.length > 0
      ? product.gallery
      : [product.image];

  const [activeImage, setActiveImage] =
    useState(images[0]);

  return (
    <div className="w-full min-w-0">
      {/* Large Image */}

      <div
        className="
          relative
          aspect-square
          overflow-hidden

          rounded-3xl

          border
          border-gray-200

          bg-white

          shadow-lg
        "
      >
        <Image
          src={activeImage}
          alt={product.name}
          fill
          priority
          sizes="(max-width:768px)100vw,50vw"
          className="
            object-contain

            p-6

            transition-all
            duration-300
          "
        />
      </div>

      {/* Thumbnail Gallery */}

      <div
  className="
    mt-5
    flex
    w-full
    gap-3

    overflow-x-auto
    overflow-y-hidden

    pb-2

    no-scrollbar
  "
>
        {images.map((image, index) => {
          const active =
            image === activeImage;

          return (
            <button
              key={index}
              type="button"
              onClick={() =>
                setActiveImage(image)
              }
              className={`
                relative

                h-20
                w-20

                shrink-0

                overflow-hidden

                rounded-2xl

                border-2

                transition-all
                duration-300

                ${
                  active
                    ? "border-primary shadow-lg scale-105"
                    : "border-gray-200 hover:border-primary"
                }
              `}
            >
              <Image
                src={image}
                alt={`${product.name}-${index}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}