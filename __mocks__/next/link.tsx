import type { AnchorHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

export type LinkProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  children: ReactNode;
};

export default function Link({ children, ...props }: LinkProps) {
  return <a {...props}>{children}</a>;
}
