import { render, screen } from "@testing-library/react";

import ProductCard from "@/features/products/components/ProductCard";
import { productCardCopy } from "@/features/products/copy/productCard";
import { mockProduct } from "@/features/products/components/__mocks__/products";
import { formatPrice } from "@/lib/utils";

const { title, price, id } = mockProduct;

describe("ProductCard", () => {
  it("renders the product information", () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole("heading", { name: title })).toBeInTheDocument();
    expect(screen.getByText(formatPrice(price))).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: productCardCopy.viewDetailsAriaLabel(title),
    });

    expect(link).toHaveAttribute("href", `/products/${id}`);
  });
});
