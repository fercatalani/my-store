import { Star, StarHalf, StarOff } from "lucide-react";

import { ratingStarsCopy } from "@/features/products/copy/ratingStars";

const MAX_STARS = 5;

export type RatingStarsProps = {
  rating: number;
};

export default function RatingStars({ rating }: RatingStarsProps) {
  const label = ratingStarsCopy.ariaLabel(rating);

  return (
    <div className="flex items-center gap-1 text-amber-500" aria-label={label}>
      {Array.from({ length: MAX_STARS }).map((_, index) => {
        const position = index + 1;
        const diff = rating - (position - 1);
        const isFull = diff >= 0.75;
        const isHalf = !isFull && diff >= 0.25;
        const Icon = isFull ? Star : isHalf ? StarHalf : StarOff;

        return (
          <Icon
            key={position}
            aria-hidden="true"
            className="h-4 w-4"
            strokeWidth={2}
            fill={isFull || isHalf ? "currentColor" : "none"}
          />
        );
      })}
    </div>
  );
}
