import { render, screen } from "@testing-library/react";

import ProductDetail from "@/features/products/components/ProductDetail";
import { mockProduct } from "@/features/products/components/__mocks__/products";
import { productDetailCopy } from "../../copy/productDetail";

const { aboutHeading, detailsHeading } = productDetailCopy;

describe("ProductDetail", () => {
  it("renders the product detail layout", () => {
    render(<ProductDetail product={mockProduct} hasError={false} />);

    expect(
      screen.getByRole("heading", { name: mockProduct.title })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Back to Products" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: detailsHeading })
    ).toBeInTheDocument();
    expect(screen.getByText("Warranty")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: aboutHeading })
    ).toBeInTheDocument();
  });
});
