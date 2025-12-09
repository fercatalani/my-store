import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductListContainer from "@/features/products/components/ProductListContainer";
import { mockProductList } from "@/features/products/components/__mocks__/products";
import { productListCopy } from "@/features/products/copy/productList";
import { useProductsData } from "@/features/products/hooks/useProductsData";
import { commonCopy } from "@/lib/copy";

jest.mock("@/features/products/hooks/useProductsData");

const { retry, productsEmpty } = commonCopy;
describe("ProductListContainer", () => {
  const mockUseProductsData = useProductsData as jest.MockedFunction<
    typeof useProductsData
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the error state and retries", async () => {
    const refetch = jest.fn();
    mockUseProductsData.mockReturnValue({
      products: [],
      isLoading: false,
      isError: true,
      refetch,
    });

    const user = userEvent.setup();
    render(<ProductListContainer />);

    expect(screen.getByText(productListCopy.errorState)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: retry }));
    expect(refetch).toHaveBeenCalled();
  });

  it("shows the product list when data is available", () => {
    mockUseProductsData.mockReturnValue({
      products: mockProductList,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<ProductListContainer />);

    mockProductList.forEach((product) => {
      expect(
        screen.getByRole("heading", { name: product.title })
      ).toBeInTheDocument();
    });
  });

  it("shows the empty state copy", () => {
    mockUseProductsData.mockReturnValue({
      products: [],
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<ProductListContainer />);

    expect(screen.getByText(productsEmpty)).toBeInTheDocument();
  });
});
