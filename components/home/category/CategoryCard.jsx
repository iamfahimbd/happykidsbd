import Image from "next/image";
import Link from "next/link";

export default function CategoryCard({
  category,
}) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="
        group
        block

        overflow-hidden

        rounded-3xl

        border
        border-gray-100

        bg-white

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Category Image */}

      <div
        className="
          relative

          aspect-square

          overflow-hidden

          bg-gray-100
        "
      >
        <Image
          src={
            category.image ||
            "/images/category-placeholder.webp"
          }
          alt={category.name}
          fill
          sizes="(max-width:768px) 33vw, 16vw"
          className="
            object-cover

            transition-transform
            duration-500

            group-hover:scale-110
          "
        />
      </div>

      {/* Content */}

      <div className="px-3 py-4 text-center">
        <h3
          className="
            line-clamp-2

            text-sm
            font-semibold

            text-gray-900

            lg:text-base
          "
        >
          {category.name}
        </h3>

        <span
          className="
            mt-2
            inline-block

            text-xs
            font-medium

            text-primary

            transition-all
            duration-300

            group-hover:translate-x-1
          "
        >
          Explore →
        </span>
      </div>
    </Link>
  );
}