import { productsPageCopy } from "./copy";
import ProductListContainer from "@/features/products/components/ProductListContainer";

export const dynamic = "force-dynamic";

const { heading, subheading } = productsPageCopy;

export default function ProductsPage() {
  return (
    <section className="min-h-screen bg-zinc-50 px-4 py-8 text-zinc-900">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{heading}</h1>
          <p className="text-base text-zinc-700">{subheading}</p>
        </div>

        <ProductListContainer />
      </div>
    </section>
  );
}
