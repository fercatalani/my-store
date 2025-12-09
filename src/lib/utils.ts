const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value: number): string {
  return currencyFormatter.format(value);
}

export function classNames(...values: Array<string | undefined | false>) {
  return values.filter(Boolean).join(" ");
}
