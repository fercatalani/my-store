"use client";

import { AsyncStatus, ProductsListSkeleton } from "@/components/common";
import ProductList from "@/features/products/components/ProductList";
import { productListCopy } from "@/features/products/copy/productList";
import { useProductsData } from "@/features/products/hooks/useProductsData";
import { Product } from "@/features/products/types";
import { commonCopy } from "@/lib/copy";

const { errorState } = productListCopy;
const { retry, productsEmpty } = commonCopy;

type ProductListContainerProps = {
  initialProducts?: Product[];
};

export default function ProductListContainer({
  initialProducts,
}: ProductListContainerProps) {
  const { products, isLoading, isError, refetch } = useProductsData({
    initialProducts,
  });

  const hasProducts = products.length > 0;
  const isEmptyState = !isError && !hasProducts;

  return (
    <AsyncStatus
      isLoading={isLoading}
      isError={isError}
      skeleton={<ProductsListSkeleton />}
      errorState={errorState}
      retryLabel={retry}
      onRetry={refetch}
    >
      <div className="flex flex-col gap-4">
        <ProductList products={products} />
        {isEmptyState && (
          <p className="text-center text-sm text-zinc-700" role="status">
            {productsEmpty}
          </p>
        )}
      </div>
    </AsyncStatus>
  );
}
