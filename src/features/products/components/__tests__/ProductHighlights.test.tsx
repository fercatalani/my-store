import { render, screen } from "@testing-library/react";

import ProductHighlights from "@/features/products/components/ProductHighlights";
import { mockProductsHighlights } from "@/features/products/components/__mocks__/products";

describe("ProductHighlights", () => {
  it("renders every highlight entry", () => {
    render(<ProductHighlights highlights={mockProductsHighlights} />);

    mockProductsHighlights.forEach(({ title, description }) => {
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.getByText(description)).toBeInTheDocument();
    });

    expect(screen.getAllByRole("listitem")).toHaveLength(
      mockProductsHighlights.length
    );
  });
});
