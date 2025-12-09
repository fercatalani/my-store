import { breadcrumb } from "@/lib/copy";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const { navAriaLabel, backPrefix } = breadcrumb;

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

function getBackAriaLabel(label: string) {
  return `${backPrefix} ${label}`;
}

function renderBreadcrumbLink(item: BreadcrumbItem) {
  return (
    <Link
      href={item.href!}
      aria-label={getBackAriaLabel(item.label)}
      className="inline-flex items-center gap-2 rounded-full px-2 py-1 font-medium text-blue-800 transition-colors hover:text-blue-900 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-blue-700 hover:underline focus-visible:underline"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden="true" />
      <span aria-hidden="true">{item.label}</span>
    </Link>
  );
}

function renderBreadcrumbText(item: BreadcrumbItem, isCurrentPage: boolean) {
  return (
    <span
      aria-current={isCurrentPage ? "page" : undefined}
      className={isCurrentPage ? "text-zinc-500" : "text-zinc-600"}
    >
      {item.label}
    </span>
  );
}

function renderBreadcrumbItem(item: BreadcrumbItem, last: boolean) {
  if (item.href && !last) {
    return renderBreadcrumbLink(item);
  }

  return renderBreadcrumbText(item, last);
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  if (!items.length) {
    return null;
  }

  return (
    <nav aria-label={navAriaLabel} className="text-sm text-zinc-600">
      <ol className="flex max-w-full flex-wrap items-center gap-1 truncate">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {renderBreadcrumbItem(item, isLast)}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
