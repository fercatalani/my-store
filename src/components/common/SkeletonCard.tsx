import { Skeleton } from "./Skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-white p-4">
      <Skeleton className="h-32 w-full rounded-xl" tone="bg-zinc-300" />
      <Skeleton className="h-4 w-3/4 rounded-full" />
      <Skeleton className="h-4 w-1/2 rounded-full" />
      <Skeleton className="h-6 w-24 rounded-full" />
    </div>
  );
}
