"use client";

import Image from "next/image";
import Link from "next/link";

import { productCardCopy } from "@/features/products/copy/productCard";
import { Product } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

const { viewDetailsAriaLabel } = productCardCopy;

export default function ProductCard({ product }: ProductCardProps) {
  const priceLabel = formatPrice(product.price);
  const { id, title, image, category, description } = product;

  return (
    <article className="h-full w-full">
      <Link
        href={`/products/${id}`}
        className="flex h-full w-full flex-col rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        aria-label={viewDetailsAriaLabel(title)}
      >
        <div className="flex grow flex-col gap-4">
          <div className="flex h-40 items-center justify-center rounded-xl bg-zinc-50">
            <Image
              src={image}
              alt={title}
              width={220}
              height={220}
              className="h-full w-full object-contain"
              sizes="(max-width: 728px) 100vw, 320px"
              loading="eager"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-zinc-600">
              {category}
            </p>
            <h2 className="text-lg font-semibold text-zinc-900 line-clamp-1">
              {title}
            </h2>
            <p className="text-sm text-zinc-700 line-clamp-3">{description}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between text-zinc-900">
          <p className="text-base font-semibold text-slate-800">{priceLabel}</p>
        </div>
      </Link>
    </article>
  );
}
