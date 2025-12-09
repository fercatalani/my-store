import { Product } from "@/features/products/types";

export const mockProduct: Product = {
  id: 1,
  title: "Sample Product",
  price: 25,
  description: "Sample description",
  category: "electronics",
  image: "/sample.png",
  rating: {
    rate: 4.5,
    count: 12,
  },
};

export const mockProductsHighlights = [
  { title: "Quality", description: "Checked" },
  { title: "Support", description: "24/7" },
];

export const mockProductWithoutRating: Product = {
  ...mockProduct,
  id: 2,
  title: "No Rating Product",
  rating: undefined,
};

export const mockProductList: Product[] = [
  {
    id: 10,
    title: "Sun Jewelery",
    price: 99,
    description: "Sun Jewelery",
    category: "jewelery",
    image: "/jewelery.png",
    rating: { rate: 4, count: 10 },
  },
  {
    id: 11,
    title: "Alpha Gadget",
    price: 199,
    description: "Gadget",
    category: "electronics",
    image: "/gadget.png",
    rating: { rate: 5, count: 2 },
  },
];

export const mockProductsCategoryList: string[] = ["electronics", "jewelery"];
