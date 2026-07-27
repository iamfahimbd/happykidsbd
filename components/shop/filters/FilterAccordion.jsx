"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FilterAccordion({
  title,
  children,
  defaultOpen = true,
  badge,
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100 last:border-none">
      {/* Header */}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          py-2
          text-left
        "
      >
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-gray-900">
            {title}
          </h3>

          {badge && (
            <span
              className="
                rounded-full
                bg-primary/10
                px-2
                py-0.5
                text-xs
                font-semibold
                text-primary
              "
            >
              {badge}
            </span>
          )}
        </div>

        <ChevronDown
          size={18}
          className={`
            transition-transform
            duration-300
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Body */}

      <div
        className={`
          overflow-hidden
          transition-all
          duration-300

          ${open ? "pb-5" : "max-h-0"}
        `}
      >
        {open && children}
      </div>
    </div>
  );
}