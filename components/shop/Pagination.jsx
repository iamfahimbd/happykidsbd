"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

import { useShopFilter } from "@/context/ShopFilterContext";

export default function Pagination() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    currentPage,
    totalPages,
  } = useShopFilter();

  // ==========================
  // No Pagination Needed
  // ==========================

  if (totalPages <= 1) {
    return null;
  }

  // ==========================
  // Go To Page
  // ==========================

  const goToPage = (page) => {
    if (
      page < 1 ||
      page > totalPages ||
      page === currentPage
    ) {
      return;
    }

    const params = new URLSearchParams(
      searchParams.toString()
    );

    // ========================
    // Page 1
    // ========================

    if (page === 1) {
      params.delete("page");
    } else {
      params.set(
        "page",
        String(page)
      );
    }

    const query = params.toString();

    const url = query
      ? `${pathname}?${query}`
      : pathname;

    // ========================
    // Next.js Navigation
    // ========================

    router.push(url, {
      scroll: false,
    });

    // ========================
    // Scroll To Top
    // ========================

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================
  // Page Numbers
  // ==========================

  const pages = [];

  for (
    let i = 1;
    i <= totalPages;
    i++
  ) {
    pages.push(i);
  }

  return (
    <div className="mt-10 flex items-center justify-center gap-3">
      {/* ==========================
          Previous
      ========================== */}

      <button
        type="button"
        onClick={() =>
          goToPage(currentPage - 1)
        }
        disabled={currentPage === 1}
        aria-label="Previous page"
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

      {/* ==========================
          Page Numbers
      ========================== */}

      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() =>
              goToPage(page)
            }
            aria-label={`Go to page ${page}`}
            aria-current={
              currentPage === page
                ? "page"
                : undefined
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

      {/* ==========================
          Next
      ========================== */}

      <button
        type="button"
        onClick={() =>
          goToPage(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
        aria-label="Next page"
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