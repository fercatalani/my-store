import { Skeleton } from "./Skeleton";
import { SkeletonCard } from "./SkeletonCard";

export function ProductsListSkeleton() {
  return (
    <>
      <Skeleton className="h-10 w-100 rounded-full" />
      <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={`product-skeleton-${index}`} />
        ))}
      </div>
    </>
  );
}
