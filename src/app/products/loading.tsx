import { ProductsListSkeleton, Skeleton } from "@/components/common";

export default function ProductsSkeleton() {
  return (
    <section className="min-h-screen bg-zinc-50 px-4 py-12 text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-8 w-48 rounded-full" />
          <Skeleton className="h-4 w-80 rounded-full" />
        </div>

        <ProductsListSkeleton />
      </div>
    </section>
  );
}
