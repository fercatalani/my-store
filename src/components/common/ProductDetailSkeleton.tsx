import { Skeleton } from "./Skeleton";

export function ProductDetailSkeleton() {
  const breadcrumbPlaceholders = ["w-20", "w-4", "w-32"];
  const infoLines = [
    "h-4 w-40 rounded-full",
    "h-4 w-56 rounded-full",
    "h-8 w-3/4 rounded-full",
    "h-4 w-24 rounded-full",
    "h-10 w-32 rounded-full",
  ];

  return (
    <main
      aria-busy="true"
      aria-live="polite"
      className="min-h-screen bg-zinc-50 py-8 text-zinc-900"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4">
        <div className="flex items-center gap-3 text-sm text-zinc-600">
          {breadcrumbPlaceholders.map((width, index) => (
            <Skeleton
              key={`breadcrumb-skeleton-${index}`}
              className={`h-4 rounded-full ${width}`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <div className="flex flex-1 justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-4">
            <Skeleton className="h-64 w-full rounded-xl" tone="bg-zinc-300" />
          </div>
          <div className="flex flex-1">
            <div className="flex w-full flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
              {infoLines.map((line, index) => (
                <Skeleton
                  key={`info-line-${index}`}
                  className={line}
                  tone={index >= 2 ? "bg-zinc-300" : "bg-zinc-200"}
                />
              ))}
              <div className="flex flex-col gap-3">
                {[0, 1].map((action) => (
                  <Skeleton
                    key={`action-skeleton-${action}`}
                    className="h-10 w-full rounded-full"
                    tone="bg-zinc-300"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <Skeleton className="h-5 w-40 rounded-full" />
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton
              key={`detail-skeleton-${index}`}
              className="h-20 rounded-xl"
              tone="bg-zinc-300"
            />
          ))}
        </div>
        <Skeleton className="h-24 rounded-xl" tone="bg-zinc-300" />
      </div>
    </main>
  );
}
