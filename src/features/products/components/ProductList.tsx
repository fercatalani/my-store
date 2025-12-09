"use client";

import { useState } from "react";
import { Product } from "@/features/products/types";

import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

type ProductListProps = {
  products: Product[];
};

const DEFAULT_CATEGORY = "all";

export default function ProductList({ products }: ProductListProps) {
  const [category, setCategory] = useState(DEFAULT_CATEGORY);
  const [sort, setSort] = useState("");

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  ).sort((a, b) => a.localeCompare(b));

  const visibleProducts = (() => {
    const filtered =
      category === DEFAULT_CATEGORY
        ? products
        : products.filter(
            (product) =>
              product.category.toLowerCase() === category.toLowerCase()
          );

    if (!sort) return filtered;

    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name-asc") return a.title.localeCompare(b.title);
      return 0;
    });
  })();

  const handleReset = () => {
    setCategory(DEFAULT_CATEGORY);
    setSort("");
  };

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <ProductFilters
          categories={categories}
          category={category}
          sort={sort}
          onCategoryChange={setCategory}
          onSortChange={setSort}
          onReset={handleReset}
        />

        <div
          className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          aria-live="polite"
        >
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
