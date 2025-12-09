import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { productListCopy } from "@/features/products/copy/productList";
import { useProductsData } from "@/features/products/hooks/useProductsData";
import { mockProductList } from "@/features/products/components/__mocks__/products";
import { getProducts } from "@/lib/api/products";

jest.mock("@/lib/api/products", () => ({
  getProducts: jest.fn(),
}));

const TOTAL_LABEL = "Total products";
const LOADING_LABEL = "Loading products";
const IDLE_LABEL = "Idle state";
const NO_ERROR_LABEL = "No product errors";

function HookTestHarness({
  withInitialData = false,
}: {
  withInitialData?: boolean;
}) {
  const { products, isLoading, isError, refetch } = useProductsData({
    initialProducts: withInitialData ? mockProductList : undefined,
  });

  return (
    <div>
      <p>{`${TOTAL_LABEL}: ${products.length}`}</p>
      <p>{isLoading ? LOADING_LABEL : IDLE_LABEL}</p>
      <p>{isError ? productListCopy.errorState : NO_ERROR_LABEL}</p>
      <button type="button" onClick={refetch}>
        Refetch
      </button>
    </div>
  );
}

describe("useProductsData", () => {
  beforeEach(() => {
    (getProducts as jest.Mock).mockReset();
  });

  it("fetches products when no initial data is provided", async () => {
    (getProducts as jest.Mock).mockResolvedValue(mockProductList);

    render(<HookTestHarness />);

    expect(getProducts).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(screen.getByText(`${TOTAL_LABEL}: 2`)).toBeInTheDocument();
      expect(screen.getByText(IDLE_LABEL)).toBeInTheDocument();
      expect(screen.getByText(NO_ERROR_LABEL)).toBeInTheDocument();
    });
  });

  it("skips automatic fetch when initial data exists", () => {
    render(<HookTestHarness withInitialData />);

    expect(getProducts).not.toHaveBeenCalled();
    expect(screen.getByText(`${TOTAL_LABEL}: 2`)).toBeInTheDocument();
  });

  it("allows manual refetching of data", async () => {
    (getProducts as jest.Mock).mockResolvedValue(mockProductList);

    render(<HookTestHarness withInitialData />);

    fireEvent.click(screen.getByRole("button", { name: /refetch/i }));

    await waitFor(() => {
      expect(getProducts).toHaveBeenCalledTimes(1);
    });
  });
});
