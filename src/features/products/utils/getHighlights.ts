export type Highlight = {
  title: string;
  description: string;
};

export function getHighlights(category: string): Highlight[] {
  const normalized = category.toLowerCase();

  if (normalized.includes("electronics")) {
    return [
      {
        title: "Warranty",
        description: "Includes 12-month manufacturer coverage.",
      },
      {
        title: "Power",
        description: "Supports 110–220V outlets and USB-C charging.",
      },
      {
        title: "Connectivity",
        description: "Bluetooth-ready with multipoint pairing.",
      },
    ];
  }

  if (normalized.includes("clothing")) {
    return [
      {
        title: "Fabric",
        description: "Soft cotton blend that breathes throughout the day.",
      },
      {
        title: "Fit",
        description: "True-to-size silhouette with adjustable waistband.",
      },
      {
        title: "Care",
        description: "Machine wash cold, tumble dry low, do not bleach.",
      },
    ];
  }

  if (normalized.includes("jewelery")) {
    return [
      {
        title: "Materials",
        description: "Hypoallergenic metals plated to resist tarnish.",
      },
      {
        title: "Packaging",
        description: "Delivered in a cushioned keepsake gift box.",
      },
      {
        title: "Finish",
        description: "Mirror polish sealed with an anti-scratch coating.",
      },
    ];
  }

  return [
    {
      title: "Quality",
      description: "Individually inspected to meet durability standards.",
    },
    {
      title: "Support",
      description: "Customer care team available every day of the week.",
    },
    {
      title: "Packaging",
      description: "Eco-conscious packaging cushions every shipment.",
    },
  ];
}
