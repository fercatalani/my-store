import { header } from "@/lib/copy";
import Link from "next/link";

const { brandInitials, brandName, tagline, challengeLabel } = header;

export function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white shadow-xs">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          <p className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700">
            {brandInitials}
          </p>
          <div className="flex flex-col">
            <p className="text-base font-semibold text-zinc-900">{brandName}</p>
            <p className="text-xs text-zinc-500">{tagline}</p>
          </div>
        </Link>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {challengeLabel}
        </p>
      </div>
    </header>
  );
}
