"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useShopFilter } from "@/context/ShopFilterContext";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function Pagination() {

  const router = useRouter();
const pathname = usePathname();
const searchParams = useSearchParams();

  const {
    currentPage,
    setCurrentPage,
    totalPages,
  } = useShopFilter();

  if (totalPages <= 1) return null;

  const goToPage = (page) => {
  if (page < 1 || page > totalPages) return;

  setCurrentPage(page);

  const params = new URLSearchParams(
    searchParams.toString()
  );

  if (page === 1) {
    params.delete("page");
  } else {
    params.set("page", page);
  }

  router.replace(
    `${pathname}?${params.toString()}`,
    {
      scroll: false,
    }
  );

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {/* Previous */}

      <button
        onClick={() =>
          goToPage(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-full

          border
          border-gray-200

          bg-white

          shadow-sm

          transition-all
          duration-200

          hover:border-primary
          hover:text-primary

          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() =>
              goToPage(page)
            }
            className={`
              h-11
              w-11

              rounded-full

              text-sm
              font-semibold

              transition-all
              duration-200

              ${
                currentPage === page
                  ? "bg-primary text-white shadow-lg"
                  : "border border-gray-200 bg-white hover:border-primary hover:text-primary"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}

      <button
        onClick={() =>
          goToPage(currentPage + 1)
        }
        disabled={currentPage === totalPages}
        className="
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-full

          border
          border-gray-200

          bg-white

          shadow-sm

          transition-all
          duration-200

          hover:border-primary
          hover:text-primary

          disabled:pointer-events-none
          disabled:opacity-40
        "
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}