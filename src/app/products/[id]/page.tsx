import ProductDetailContainer from "@/features/products/components/ProductDetailContainer";

export const dynamic = "force-dynamic";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const productId = Number(id);

  return <ProductDetailContainer id={productId} />;
}
