import type { ComponentProps } from "react";

export default function NextImage(props: ComponentProps<"img">) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt="" {...props} />;
}
