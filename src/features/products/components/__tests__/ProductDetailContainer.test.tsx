import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ProductDetailContainer from "@/features/products/components/ProductDetailContainer";
import { mockProduct } from "@/features/products/components/__mocks__/products";
import { productDetailCopy } from "@/features/products/copy/productDetail";
import { useProductDetail } from "@/features/products/hooks/useProductDetail";
import { commonCopy } from "@/lib/copy";

jest.mock("@/features/products/hooks/useProductDetail");

describe("ProductDetailContainer", () => {
  const mockUseProductDetail = useProductDetail as jest.MockedFunction<
    typeof useProductDetail
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the error state and retries", async () => {
    const refetch = jest.fn();
    mockUseProductDetail.mockReturnValue({
      product: null,
      isLoading: false,
      isError: true,
      refetch,
    });

    const user = userEvent.setup();
    render(<ProductDetailContainer id={mockProduct.id} />);

    expect(screen.getByText(productDetailCopy.errorState)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: commonCopy.retry }));
    expect(refetch).toHaveBeenCalled();
  });

  it("renders the product detail view", () => {
    mockUseProductDetail.mockReturnValue({
      product: mockProduct,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    render(<ProductDetailContainer id={mockProduct.id} />);

    expect(
      screen.getByRole("heading", { name: mockProduct.title })
    ).toBeInTheDocument();
  });
});
