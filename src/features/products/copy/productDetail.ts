export const productDetailCopy = {
  detailsHeading: "Product details",
  aboutHeading: "About this item",
  deliveryMessage: "Free delivery: Tuesday, December 9",
  nuPayLabel: (priceLabel: string) =>
    `Pay with NuPay Extra Limit (${priceLabel} with 6% off).`,
  verifiedPurchases: (count: number) => `${count} verified purchases`,
  pendingVerification: "Verified purchases pending",
  errorState: "Unable to load this product. Please try again.",
  breadcrumb: {
    href: "/products",
    label: "Products",
  },
};
