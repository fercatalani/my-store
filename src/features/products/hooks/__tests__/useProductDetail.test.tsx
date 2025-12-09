import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { productDetailCopy } from "@/features/products/copy/productDetail";
import { useProductDetail } from "@/features/products/hooks/useProductDetail";
import { mockProduct } from "@/features/products/components/__mocks__/products";
import { getProductById } from "@/lib/api/products";

jest.mock("@/lib/api/products", () => ({
  getProductById: jest.fn(),
}));

type HarnessProps = {
  productId?: number | null;
};

const PRODUCT_PREFIX = "Product loaded";
const LOADING_LABEL = "Loading product";
const IDLE_LABEL = "Idle state";
const NO_ERROR_LABEL = "No product errors";

function HookTestHarness({ productId = mockProduct.id }: HarnessProps) {
  const { product, isLoading, isError, refetch } = useProductDetail(productId);

  return (
    <div>
      <p>{`${PRODUCT_PREFIX}: ${product?.title ?? "none"}`}</p>
      <p>{isLoading ? LOADING_LABEL : IDLE_LABEL}</p>
      <p>{isError ? productDetailCopy.errorState : NO_ERROR_LABEL}</p>
      <button type="button" onClick={() => refetch()}>
        Refetch
      </button>
    </div>
  );
}

describe("useProductDetail", () => {
  beforeEach(() => {
    (getProductById as jest.Mock).mockReset();
  });

  it("fetches the product on mount when an id is provided", async () => {
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    render(<HookTestHarness />);

    expect(getProductById).toHaveBeenCalledWith(mockProduct.id);

    await waitFor(() => {
      expect(
        screen.getByText(`${PRODUCT_PREFIX}: ${mockProduct.title}`)
      ).toBeInTheDocument();
      expect(screen.getByText(IDLE_LABEL)).toBeInTheDocument();
      expect(screen.getByText(NO_ERROR_LABEL)).toBeInTheDocument();
    });
  });

  it("exposes error state and allows retries", async () => {
    (getProductById as jest.Mock)
      .mockRejectedValueOnce(new Error("Network error"))
      .mockResolvedValueOnce(mockProduct);

    render(<HookTestHarness />);

    await waitFor(() => {
      expect(
        screen.getByText(productDetailCopy.errorState)
      ).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole("button", { name: /refetch/i }));

    await waitFor(() => {
      expect(getProductById).toHaveBeenCalledTimes(2);
      expect(
        screen.getByText(`${PRODUCT_PREFIX}: ${mockProduct.title}`)
      ).toBeInTheDocument();
      expect(screen.getByText(NO_ERROR_LABEL)).toBeInTheDocument();
    });
  });
});
