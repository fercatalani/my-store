"use client";

import { classNames } from "@/lib/utils";
import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Variant = "primary" | "outline" | "error";

type ActionButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    fullWidth?: boolean;
  }
>;

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center rounded-full px-4 py-3 text-center text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary:
    "bg-blue-800 text-white hover:bg-blue-900 focus-visible:outline-blue-700",
  outline:
    "border border-blue-800 text-blue-800 hover:bg-blue-50 focus-visible:outline-blue-700",
  error: "bg-red-600 text-white hover:bg-red-700 focus-visible:outline-red-600",
};

export function ActionButton({
  children,
  variant = "primary",
  fullWidth = true,
  type = "button",
  className,
  ...props
}: ActionButtonProps) {
  return (
    <button
      type={type}
      className={classNames(
        baseClasses,
        variants[variant],
        fullWidth ? "w-full" : undefined,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
