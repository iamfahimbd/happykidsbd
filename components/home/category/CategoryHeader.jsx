import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

export default function CategoryHeader({ category, productCount }) {
  return (
    <div className="mb-8 border-b px-10 border-slate-200 bg-white">
      <div
        className="
          flex
          min-h-[90px]
          flex-col
          justify-center

          py-4
          

          lg:min-h-[100px]
        "
      >
        {/* Title + Count */}

        <div className="flex items-center justify-between gap-4">
          <h1
            className="
              text-2xl
              font-bold
              tracking-tight
              text-slate-900

              lg:text-3xl
            "
          >
            {category.name}
          </h1>

          <span
            className="
              inline-flex
              shrink-0
              items-center

              rounded-full

              bg-slate-100

              px-4
              py-1.5

              text-sm
              font-medium

              
              bg-primary/10
              text-primary
                border
              border-primary/20
            "
          >
            {productCount} Product
            {productCount !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Breadcrumb */}

        <div
          className="
            mt-2

            flex
            items-center
            gap-2

            text-sm
            text-slate-500
          "
        >
          <Link
            href="/"
            className="
              transition
              hover:text-primary
            "
          >
            Home
          </Link>

          <FiChevronRight size={14} />

          <span className="text-slate-800">{category.name}</span>
        </div>
      </div>
    </div>
  );
}
