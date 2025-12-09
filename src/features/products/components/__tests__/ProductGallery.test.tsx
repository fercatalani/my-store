import { render, screen } from "@testing-library/react";

import ProductGallery from "@/features/products/components/ProductGallery";

describe("ProductGallery", () => {
  it("displays the product image", () => {
    render(<ProductGallery alt="Gallery Item" src="/gallery.png" />);

    const image = screen.getByRole("img", { name: /Gallery item/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/gallery.png");
  });
});
