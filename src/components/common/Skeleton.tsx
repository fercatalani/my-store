type SkeletonProps = {
  className: string;
  tone?: "bg-zinc-200" | "bg-zinc-300";
};

export function Skeleton({ className, tone = "bg-zinc-200" }: SkeletonProps) {
  return (
    <div className={`animate-pulse ${tone} ${className}`} aria-hidden="true" />
  );
}
