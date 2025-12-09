"use client";

import { useCallback, useEffect, useState } from "react";
import type { Product } from "@/features/products/types";
import { getProducts } from "@/lib/api/products";

type UseProductsDataOptions = {
  initialProducts?: Product[];
};

export function useProductsData({
  initialProducts,
}: UseProductsDataOptions = {}) {
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);
  const [isLoading, setIsLoading] = useState(!initialProducts);
  const [isError, setIsError] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (products.length === 0) {
      setIsLoading(true);
    }

    setIsError(false);

    try {
      const data = await getProducts();
      setProducts(data ?? []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [products.length]);

  useEffect(() => {
    if (!initialProducts) {
      fetchProducts();
    }
  }, [initialProducts, fetchProducts]);

  return {
    products,
    isLoading,
    isError,
    refetch: fetchProducts,
  };
}
