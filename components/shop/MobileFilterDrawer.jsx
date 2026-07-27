"use client";

import { X } from "lucide-react";

export default function MobileFilterDrawer({ open, onClose, children }) {
  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/40
          backdrop-blur-[2px]
          transition-all
          duration-300

          ${open ? "visible opacity-100" : "invisible opacity-0"}
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
    left-0
    top-16
    bottom-16

    z-50

    w-[88vw]
    max-w-[360px]

    flex
    flex-col

    bg-white
    shadow-2xl

    transition-transform
    duration-300

          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            bg-white
            px-5
            py-4
            shrink-0
          "
        >
          <h2 className="text-xl font-bold">Filters</h2>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-gray-100
            "
          >
            <X size={22} />
          </button>
        </div>

        {/* Scrollable Body */}

        <div
          className="
            flex-1
            overflow-y-auto
            px-5
            py-5
          "
        >
          {children}
        </div>
      </aside>
    </>
  );
}
