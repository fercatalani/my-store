import { getHighlights } from "@/features/products/utils/getHighlights";

describe("getHighlights", () => {
  it("returns electronics preset", () => {
    const highlights = getHighlights("Electronics");

    expect(highlights).toHaveLength(3);
    expect(highlights[0]).toEqual(
      expect.objectContaining({ title: "Warranty" })
    );
  });

  it("returns default preset for unknown categories", () => {
    const highlights = getHighlights("Books");

    expect(highlights).toHaveLength(3);
    expect(highlights[0].title).toBe("Quality");
  });
});
