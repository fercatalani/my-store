"use client";

import { AsyncStatus, ProductDetailSkeleton } from "@/components/common";
import ProductDetail from "@/features/products/components/ProductDetail";
import { productDetailCopy } from "@/features/products/copy/productDetail";
import { useProductDetail } from "@/features/products/hooks/useProductDetail";
import { commonCopy } from "@/lib/copy";

const { errorState } = productDetailCopy;
const { retry } = commonCopy;

type ProductDetailContainerProps = {
  id: number;
};

export default function ProductDetailContainer({
  id,
}: ProductDetailContainerProps) {
  const { product, isLoading, isError, refetch } = useProductDetail(id);

  const shouldShowSkeleton = isLoading && !product;
  const shouldShowError = isError || !product;

  return (
    <AsyncStatus
      isLoading={shouldShowSkeleton}
      isError={shouldShowError}
      skeleton={<ProductDetailSkeleton />}
      errorState={errorState}
      retryLabel={retry}
      onRetry={() => {
        void refetch();
      }}
    >
      {product && <ProductDetail product={product} hasError={isError} />}
    </AsyncStatus>
  );
}
