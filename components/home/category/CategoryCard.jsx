import Link from "next/link";

export default function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <Link
      href={`/category/${category.slug}`}
      className="
        group
        block
        rounded-[28px]
        border
        border-white/60
        bg-white
        p-6
        shadow-soft
        transition-all
        duration-300
        hover:-translate-y-2
        hover:shadow-card
      "
    >
      <div
        className={`
          mx-auto
          mb-5
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-3xl
          ${category.bgColor}
          transition-transform
          duration-300
          group-hover:scale-110
          group-hover:rotate-6
        `}
      >
        <Icon
          size={40}
          strokeWidth={2}
          className={category.iconColor}
        />
      </div>

      <h3
        className="
          text-center
          text-base
          font-bold
          text-gray-800
          transition-colors
          duration-300
          group-hover:text-primary
        "
      >
        {category.name}
      </h3>
    </Link>
  );
}