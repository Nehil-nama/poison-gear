import type { Category } from "@/lib/products";

export const CATEGORY_HIGHLIGHTS: Record<Category, string[]> = {
  mouse: [
    "Lightweight shell built for fast flicks",
    "Optical sensor tuned for tracking accuracy",
    "Low-latency connection for competitive play",
    "PTFE feet for a smooth, consistent glide",
  ],
  keyboard: [
    "Hot-swappable switches you can change yourself",
    "Per-key lighting in the Poison Gear green",
    "Rigid frame with no flex under heavy typing",
    "Fast polling for instant key response",
  ],
  mousepad: [
    "Stitched edges that won't fray",
    "Consistent surface for precise tracking",
    "Non-slip base that stays put on any desk",
    "Easy to clean and built to last",
  ],
  chair: [
    "Adjustable armrests, backrest and recline",
    "High-density foam that holds its shape",
    "Built for long sessions without back strain",
    "Sturdy base with smooth-rolling casters",
  ],
  controller: [
    "Anti-drift sticks for lasting accuracy",
    "Fast, responsive input for competitive play",
    "Comfortable grip for long sessions",
    "Works with PC and common consoles",
  ],
};

export const SERVICE_PERKS = [
  { title: "Free shipping over $99", note: "$9 flat rate under that" },
  { title: "2-year warranty", note: "On every Poison Gear product" },
];