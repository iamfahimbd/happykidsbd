"use client";

import { X } from "lucide-react";

export default function MobileFilterDrawer({
  open,
  onClose,
  children,
}) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/40 transition-opacity duration-300

          ${
            open
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          top-0
          left-0
          z-50
          h-screen
          w-[320px]
          max-w-[90vw]

          bg-white
          shadow-2xl

          transition-transform
          duration-300

          ${
            open
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-xl font-bold">
            Filters
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}

        <div className="overflow-y-auto p-5">
          {children}
        </div>
      </aside>
    </>
  );
}