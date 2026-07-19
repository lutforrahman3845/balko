/**
 * Shell variants the dashboard can render in. The choice is a presentation
 * concern only — every page renders unchanged inside any of them.
 */
export type LayoutVariant = "sidebar" | "rail" | "topnav" | "twocolumn";

export interface LayoutVariantMeta {
  value: LayoutVariant;
  label: string;
  description: string;
}

export const LAYOUT_VARIANTS: LayoutVariantMeta[] = [
  {
    value: "sidebar",
    label: "Sidebar",
    description: "Full-width navigation column. Best for deep menus.",
  },
  {
    value: "rail",
    label: "Icon rail",
    description: "Icons only, labels on hover. Maximises content width.",
  },
  {
    value: "topnav",
    label: "Top nav",
    description: "Horizontal menu bar. Best for shallow menus and wide tables.",
  },
  {
    value: "twocolumn",
    label: "Two column",
    description: "Section rail plus a nested page menu. Best for large apps.",
  },
];

export const DEFAULT_LAYOUT_VARIANT: LayoutVariant = "sidebar";

export function isLayoutVariant(value: unknown): value is LayoutVariant {
  return LAYOUT_VARIANTS.some((variant) => variant.value === value);
}
