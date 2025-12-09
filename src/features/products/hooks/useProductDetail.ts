import { getProductById } from "@/lib/api/products";
import { useCallback, useEffect, useState } from "react";
import { Product } from "../types";

export function useProductDetail(productId: number | null) {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const data = await getProductById(productId);
      setProduct(data ?? null);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId, fetchProduct]);

  return { product, isLoading, isError, refetch: fetchProduct };
}
