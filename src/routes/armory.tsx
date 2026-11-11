import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { PRODUCTS, CATEGORY_LABELS, type Category } from "@/lib/products";

export const Route = createFileRoute("/armory")({
  head: () => ({
    meta: [
      { title: "The Armory — Poison Gear" },
      {
        name: "description",
        content:
          "Browse every Poison Gear weapon: gaming mice, keyboards, mousepads, chairs and controllers.",
      },
      { property: "og:title", content: "The Armory — Poison Gear" },
      {
        property: "og:description",
        content: "Every Poison Gear weapon: mice, keyboards, pads, chairs and controllers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ArmoryPage,
});

const FILTERS: Array<{ key: Category | "all"; label: string }> = [
  { key: "all", label: "All Gear" },
  ...(Object.keys(CATEGORY_LABELS) as Category[]).map((key) => ({
    key,
    label: CATEGORY_LABELS[key],
  })),
];

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";
const MAX_PRICE = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 10) * 10;

function ArmoryPage() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(MAX_PRICE);

  const visible = PRODUCTS.filter((p) => {
    const matchesCategory = filter === "all" || p.category === filter;
    const matchesQuery =
      query.trim() === "" ||
      `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery && p.price <= maxPrice;
  }).sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  const clearFilters = () => {
    setFilter("all");
    setQuery("");
    setSort("featured");
    setMaxPrice(MAX_PRICE);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        <section className="relative overflow-hidden border-b border-border/60 bg-haze py-16 sm:py-20">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <p className="font-display text-xs font-bold tracking-[0.45em] uppercase text-primary">
              Full Catalog
            </p>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              THE ARMORY
            </h1>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Every weapon we forge — mice, keyboards, mousepads, chairs and controllers.
              Filter it, search it, stock up.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`rounded-full px-4 py-2 font-display text-xs font-bold uppercase tracking-widest transition-all ${
                    filter === f.key
                      ? "bg-primary text-primary-foreground shadow-[0_0_24px_-4px_color-mix(in_oklab,var(--color-primary)_60%,transparent)]"
                      : "border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="relative sm:w-64">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search gear…"
                className="h-10 w-full rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-display text-xs font-bold uppercase tracking-widest">
                Max price
              </span>
              <input
                type="range"
                min={0}
                max={MAX_PRICE}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-40 accent-[var(--color-primary)]"
              />
              <span className="w-12 font-display font-bold text-foreground">${maxPrice}</span>
            </label>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>
                {visible.length} {visible.length === 1 ? "item" : "items"}
              </span>
              <label className="flex items-center gap-3">
                <span className="font-display text-xs font-bold uppercase tracking-widest">
                  Sort
                </span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className="h-10 rounded-lg border border-input bg-card px-3 text-sm text-foreground outline-none focus:border-primary/60"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="rating">Top rated</option>
                </select>
              </label>
            </div>
          </div>

          {visible.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">
                No gear matches those filters. Try widening your search.
              </p>
              <button
                onClick={clearFilters}
                className="mt-6 rounded-xl border border-primary/50 px-6 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary/10"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visible.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
