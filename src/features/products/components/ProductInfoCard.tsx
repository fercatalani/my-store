import { ActionButton } from "@/components/common/ActionButton";
import RatingStars from "@/features/products/components/RatingStars";
import { productInfoCardCopy } from "@/features/products/copy/productInfoCard";
import { Product } from "@/features/products/types";
import { formatPrice } from "@/lib/utils";

type ProductInfoCardProps = {
  product: Product;
  nuLabel: string;
  deliveryMessage: string;
};

const { ratingAriaLabel, ratingSummary, noReviewsLabel, addToCart, buyNow } =
  productInfoCardCopy;

export default function ProductInfoCard({
  product,
  nuLabel,
  deliveryMessage,
}: ProductInfoCardProps) {
  const { price, rating, title, category } = product;
  const priceLabel = formatPrice(price);

  return (
    <section className="flex w-full flex-col gap-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <header className="flex flex-col gap-2">
        <p className="text-sm uppercase tracking-wide text-blue-700">
          {category}
        </p>
        <h1 className="text-3xl font-semibold">{title}</h1>
      </header>

      {rating ? (
        <div
          className="flex flex-col gap-1"
          aria-label={ratingAriaLabel(rating.rate)}
        >
          <RatingStars rating={rating.rate} />
          <p className="text-sm font-normal text-zinc-500">
            {ratingSummary(rating.rate, rating.count)}
          </p>
        </div>
      ) : (
        <p className="text-sm font-normal text-zinc-500">{noReviewsLabel}</p>
      )}

      <div className="flex flex-col gap-1">
        <p className="text-4xl font-semibold text-slate-800">{priceLabel}</p>
        <p className="text-sm text-zinc-600">{nuLabel}</p>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm font-bold text-emerald-700">
        {deliveryMessage}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <ActionButton variant="outline">{addToCart}</ActionButton>
        <ActionButton>{buyNow}</ActionButton>
      </div>
    </section>
  );
}
