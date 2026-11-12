import { createFileRoute } from "@tanstack/react-router";
import { Radiation } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { TOXIC_PRODUCTS } from "@/lib/products";
import { DropCountdown } from "@/components/drop-countdown";

export const Route = createFileRoute("/toxic")({
  head: () => ({
    meta: [
      { title: 'Toxic Line — Limited Editions | Poison Gear' },
      {
        name: "description",
        content:
          "Numbered, limited-edition Poison Gear with translucent shells and acid-green internals. Once a Toxic drop sells out, it never returns.",
      },
      { property: "og:title", content: "Toxic Line — Limited Editions | Poison Gear" },
      {
        property: "og:description",
        content: "Limited-edition gear with translucent shells and acid-green internals.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ToxicPage,
});

function ToxicPage() {
  const unitsLeft = TOXIC_PRODUCTS.reduce((n, p) => n + (p.unitsLeft ?? 0), 0);
  const totalUnits = TOXIC_PRODUCTS.reduce((n, p) => n + (p.totalUnits ?? 0), 0);
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        <section className="relative overflow-hidden border-b border-border/60 bg-haze py-20 sm:py-28">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6">
            <p className="font-display inline-flex items-center gap-2 rounded-full border border-toxic/60 bg-toxic/10 px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase text-toxic">
              <Radiation className="h-4 w-4" /> Handle with care
            </p>
            <h1 className="font-display mt-6 text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
              THE <span className="text-toxic text-glow">TOXIC</span> LINE
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
              Limited editions with translucent shells and acid-green internals. Each unit is
              numbered and logged — when a drop sells out, it never returns.
            </p>
            <div className="mx-auto mt-8 flex max-w-md justify-center gap-6 text-sm">
              <div className="rounded-xl border border-toxic/40 bg-toxic/5 px-5 py-3">
                <p className="font-display text-2xl font-bold text-toxic">{unitsLeft}</p>
                <p className="text-muted-foreground">units left</p>
              </div>
              <div className="rounded-xl border border-toxic/40 bg-toxic/5 px-5 py-3">
                <p className="font-display text-2xl font-bold text-toxic">{totalUnits}</p>
                <p className="text-muted-foreground">total units</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TOXIC_PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="mt-16">
  <DropCountdown />
</div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
