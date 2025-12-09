import { Breadcrumb } from "@/components/common/Breadcrumb";
import ProductGallery from "@/features/products/components/ProductGallery";
import ProductHighlights from "@/features/products/components/ProductHighlights";
import ProductInfoCard from "@/features/products/components/ProductInfoCard";
import { productDetailCopy } from "@/features/products/copy/productDetail";
import { Product } from "@/features/products/types";
import { getHighlights } from "@/features/products/utils/getHighlights";
import { formatPrice } from "@/lib/utils";

type ProductDetailProps = {
  product: Product;
  hasError: boolean;
};

const {
  nuPayLabel,
  deliveryMessage,
  verifiedPurchases,
  pendingVerification,
  breadcrumb,
  detailsHeading,
  aboutHeading,
} = productDetailCopy;

export default function ProductDetail({ product }: ProductDetailProps) {
  const { price, rating, category, title, image, description } = product;

  const priceLabel = formatPrice(price * 0.94);
  const nuLabel = nuPayLabel(priceLabel);
  const purchaseCountLabel = rating?.count
    ? verifiedPurchases(rating.count)
    : pendingVerification;
  const breadcrumbItems = [
    {
      label: breadcrumb.label,
      href: breadcrumb.href,
    },
    { label: title },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 py-8 text-zinc-900">
      <div className="w-full max-w-3xl mx-auto p-4 flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
          <ProductGallery alt={title} src={image} />

          <div className="flex flex-1">
            <ProductInfoCard
              product={product}
              nuLabel={nuLabel}
              deliveryMessage={deliveryMessage}
            />
          </div>
        </div>

        <hr className="border-t border-zinc-200" aria-hidden="true" />

        <section className="flex flex-col gap-5 rounded-2xl">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-zinc-900">
              {detailsHeading}
            </h2>
            <p className="text-sm text-zinc-600">{purchaseCountLabel}</p>
          </div>

          <ProductHighlights highlights={getHighlights(category)} />

          <div className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-zinc-900">
              {aboutHeading}
            </h3>
            <p className="text-base leading-7 text-zinc-700">{description}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
