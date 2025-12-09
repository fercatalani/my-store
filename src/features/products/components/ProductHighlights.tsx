import { Highlight } from "@/features/products/utils/getHighlights";

type ProductHighlightsProps = {
  highlights: Highlight[];
};

export default function ProductHighlights({
  highlights,
}: ProductHighlightsProps) {
  return (
    <ul className="grid gap-4 text-sm text-zinc-700 md:grid-cols-3">
      {highlights.map((highlight) => (
        <li key={highlight.title} className="rounded-xl bg-zinc-50 p-4">
          <p className="font-semibold text-zinc-900">{highlight.title}</p>
          <p className="text-sm text-zinc-600">{highlight.description}</p>
        </li>
      ))}
    </ul>
  );
}
