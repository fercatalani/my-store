import { commonCopy } from "@/lib/copy";

export const productInfoCardCopy = {
  ratingAriaLabel: (rating: number) => commonCopy.rating.ariaLabel(rating),
  ratingSummary: (rating: number, count: number) =>
    `${rating.toFixed(1)} - ${count} reviews`,
  noReviewsLabel: "No reviews yet",
  addToCart: "Add to cart",
  buyNow: "Buy now",
};
