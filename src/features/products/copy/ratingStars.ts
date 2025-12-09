import { commonCopy } from "@/lib/copy";

export const ratingStarsCopy = {
  ariaLabel: (rating: number) => commonCopy.rating.ariaLabel(rating),
};
