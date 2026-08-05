"use client";

import FilterAccordion from "./FilterAccordion";

export default function AttributeFilter({
  title,
  terms = [],
  selected = [],
  onChange,
}) {
  if (!terms.length) return null;

  return (
    <FilterAccordion
      title={title}
      defaultOpen={false}
    >
      <div className="space-y-3">
        {terms.map((term) => (
          <label
            key={term.id}
            className="flex cursor-pointer items-center gap-3"
          >
            <input
              type="checkbox"
              checked={selected.includes(term.slug)}
              onChange={() => onChange(term.slug)}
              className="
                h-4
                w-4
                rounded
                border-gray-300
                text-primary
                focus:ring-primary
              "
            />

            <div className="flex flex-1 items-center justify-between">
              <span className="text-sm text-gray-700">
                {term.name}
              </span>

              <span className="text-xs text-gray-400">
                ({term.count})
              </span>
            </div>
          </label>
        ))}
      </div>
    </FilterAccordion>
  );
}