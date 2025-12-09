import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductList from "@/features/products/components/ProductList";
import { mockProductList } from "@/features/products/components/__mocks__/products";
import { productFiltersCopy } from "../../copy/productFilters";

const { heading, categoryLabel, sortLabel } = productFiltersCopy;

describe("ProductList", () => {
  it("filters products by category", async () => {
    const user = userEvent.setup();
    render(<ProductList products={mockProductList} />);

    await user.click(screen.getByRole("button", { name: heading }));
    await user.selectOptions(
      screen.getByLabelText(categoryLabel),
      "electronics"
    );

    const links = screen.getAllByRole("link", { name: /View details for/i });
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAccessibleName("View details for Alpha Gadget");
  });

  it("sorts products by name ascending", async () => {
    const user = userEvent.setup();
    render(<ProductList products={mockProductList} />);

    await user.click(screen.getByRole("button", { name: heading }));
    await user.selectOptions(screen.getByLabelText(sortLabel), "name-asc");

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Alpha Gadget",
      "Sun Jewelery",
    ]);
  });
});
