import { render, screen } from "@testing-library/react";

import RatingStars from "@/features/products/components/RatingStars";

describe("RatingStars", () => {
  it("renders five icons and exposes the correct label", () => {
    const { container } = render(<RatingStars rating={4.2} />);

    expect(screen.getByLabelText("Rating: 4.2 out of 5")).toBeInTheDocument();
    expect(container.querySelectorAll("svg")).toHaveLength(5);
  });
});
