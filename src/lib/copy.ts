const DEFAULT_MAX_RATING = 5;

export const commonCopy = {
  retry: "Try again",
  productsEmpty: "No products available.",
  rating: {
    ariaLabel: (rating: number, max: number = DEFAULT_MAX_RATING) =>
      `Rating: ${rating.toFixed(1)} out of ${max}`,
  },
};

export const header = {
  brandInitials: "MS",
  brandName: "My Store",
  tagline: "Everyday finds",
  challengeLabel: "Fake Store Challenge",
};

export const breadcrumb = {
  navAriaLabel: "Breadcrumb",
  backPrefix: "Back to",
};
