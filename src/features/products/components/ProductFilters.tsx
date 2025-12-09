"use client";

import { ActionButton } from "@/components/common/ActionButton";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { productFiltersCopy } from "../copy/productFilters";

const SORT_OPTIONS = [
  { value: "price-asc", label: "Low to High" },
  { value: "price-desc", label: "High to Low" },
  { value: "name-asc", label: "A → Z" },
];

const {
  heading,
  helperText,
  resetLabel,
  categoryLabel,
  sortLabel,
  sortDefaultLabel,
} = productFiltersCopy;

type ProductFiltersProps = {
  categories: string[];
  category: string;
  sort: string;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export default function ProductFilters({
  categories,
  category,
  sort,
  onCategoryChange,
  onSortChange,
  onReset,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilters = () => setIsOpen((prev) => !prev);

  return (
    <section className="w-full ">
      <div className=" md:self-start md:max-w-[460px] rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <button
          type="button"
          onClick={toggleFilters}
          className="flex w-full cursor-pointer items-center justify-between px-5 py-3 text-left text-sm font-semibold text-zinc-900"
          aria-expanded={isOpen}
        >
          <p>{heading}</p>
          <p className="text-zinc-400">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </p>
        </button>
        {isOpen && (
          <>
            <hr className="border-t border-zinc-200" aria-hidden="true" />
            <div className="flex flex-col gap-4 px-5 py-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <p className="text-sm text-zinc-500">{helperText}</p>
                <ActionButton
                  variant="outline"
                  fullWidth={false}
                  onClick={onReset}
                  className="px-4 py-2"
                >
                  {resetLabel}
                </ActionButton>
              </div>

              <div className="grid gap-4 grid-cols-2">
                <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
                  {categoryLabel}
                  <div className="relative inline-block">
                    <select
                      className="w-full block appearance-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                      value={category}
                      onChange={(event) => onCategoryChange(event.target.value)}
                    >
                      <option value="all">All</option>
                      {categories.map((value) => (
                        <option key={value} value={value}>
                          {capitalize(value)}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-8 pointer-events-none absolute inset-y-2 right-0.5 flex items-center px-2 text-gray-700" />
                  </div>
                </label>

                <label className="flex flex-col gap-1 text-sm font-medium text-zinc-800">
                  {sortLabel}
                  <div className=" relative inline-block">
                    <select
                      className="w-full block appearance-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
                      value={sort}
                      onChange={(event) => onSortChange(event.target.value)}
                    >
                      <option value="">{sortDefaultLabel}</option>
                      {SORT_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-8 pointer-events-none absolute inset-y-2 right-0.5 flex items-center px-2 text-gray-700" />
                  </div>
                </label>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
