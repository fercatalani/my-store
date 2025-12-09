import { render, screen } from "@testing-library/react";

import ProductInfoCard from "@/features/products/components/ProductInfoCard";
import {
  mockProduct,
  mockProductWithoutRating,
} from "@/features/products/components/__mocks__/products";

describe("ProductInfoCard", () => {
  it("renders price, messaging, and rating details", () => {
    render(
      <ProductInfoCard
        product={mockProduct}
        nuLabel="NuPay text"
        deliveryMessage="Free tomorrow"
      />
    );

    expect(
      screen.getByRole("heading", { name: mockProduct.title })
    ).toBeInTheDocument();
    expect(screen.getByText("$25.00")).toBeInTheDocument();
    expect(screen.getByText("NuPay text")).toBeInTheDocument();
    expect(screen.getByText("Free tomorrow")).toBeInTheDocument();
    expect(screen.getByText("4.5 - 12 reviews")).toBeInTheDocument();
  });

  it("falls back when rating is not available", () => {
    render(
      <ProductInfoCard
        product={mockProductWithoutRating}
        nuLabel="NuPay text"
        deliveryMessage="Free tomorrow"
      />
    );

    expect(screen.getByText("No reviews yet")).toBeInTheDocument();
  });
});
