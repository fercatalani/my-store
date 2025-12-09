import { Product } from "@/features/products/types";

const BASE_URL = "https://fakestoreapi.com";

async function api(path: string) {
  const response = await fetch(`${BASE_URL}${path}`, {
    cache: "no-store",
    next: { revalidate: 0 },
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}: ${response.statusText}`);
  }

  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function getProducts(): Promise<Product[]> {
  return api("/products");
}

export async function getProductById(id: number): Promise<Product> {
  return api(`/products/${id}`);
}
