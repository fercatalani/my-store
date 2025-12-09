import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductFilters from "@/features/products/components/ProductFilters";
import { productFiltersCopy } from "@/features/products/copy/productFilters";
import { mockProductsCategoryList } from "../__mocks__/products";

describe("ProductFilters", () => {
  const setup = () => {
    const onCategoryChange = jest.fn();
    const onSortChange = jest.fn();
    const onReset = jest.fn();

    render(
      <ProductFilters
        categories={mockProductsCategoryList}
        category="all"
        sort=""
        onCategoryChange={onCategoryChange}
        onSortChange={onSortChange}
        onReset={onReset}
      />
    );

    return { onCategoryChange, onSortChange, onReset };
  };

  it("expands to show controls and triggers callbacks", async () => {
    const user = userEvent.setup();
    const { onCategoryChange, onSortChange, onReset } = setup();

    expect(
      screen.queryByText(productFiltersCopy.helperText)
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: productFiltersCopy.heading })
    );

    expect(screen.getByText(productFiltersCopy.helperText)).toBeInTheDocument();

    await user.selectOptions(
      screen.getByLabelText(productFiltersCopy.categoryLabel),
      mockProductsCategoryList[0]
    );
    expect(onCategoryChange).toHaveBeenCalledWith(mockProductsCategoryList[0]);

    await user.selectOptions(
      screen.getByLabelText(productFiltersCopy.sortLabel),
      "price-desc"
    );
    expect(onSortChange).toHaveBeenCalledWith("price-desc");

    await user.click(screen.getByRole("button", { name: /reset filters/i }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });
});
