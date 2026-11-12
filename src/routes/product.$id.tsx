import { useState } from "react";
import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Heart, Check, Minus, Plus, ShieldCheck, Star, Truck } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart";
import { notifyAdded } from "@/lib/notify";
import { CATEGORY_HIGHLIGHTS, SERVICE_PERKS } from "@/lib/product-details";
import { CATEGORY_LABELS, PRODUCTS, getProduct, type Product } from "@/lib/products";
import { StockBar } from "@/components/stock-bar";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Poison Gear` },
      { name: "description", content: loaderData?.product.tagline ?? "Poison Gear" },
      { property: "og:title", content: `${loaderData?.product.name ?? "Product"} — Poison Gear` },
      { property: "og:type", content: "website" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  // The key resets quantity when you move between related products.
  return <ProductView key={product.id} product={product} />;
}

function ProductView({ product }: { product: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const related = [
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category),
    ...PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category),
  ].slice(0, 4);

  const handleAdd = () => {
    add(product.id, qty);
    notifyAdded(qty > 1 ? `${qty}× ${product.name}` : product.name, () =>
      navigate({ to: "/cart" }),
    );
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-16">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <Link
            to="/armory"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" /> Back to the Armory
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-panel">
              <img
                src={product.image}
                alt={product.name}
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider ${
                    product.toxic
                      ? "bg-toxic text-primary-foreground"
                      : "border border-primary/40 bg-primary/15 text-primary"
                  }`}
                >
                  {product.badge}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <p className="font-display text-xs font-bold tracking-[0.4em] uppercase text-primary">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                {product.name}
              </h1>
              <div className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
                <span>/ 5 rating</span>
              </div>
              <p className="mt-5 text-lg text-muted-foreground">{product.tagline}</p>

              <p className="font-display mt-6 text-4xl font-bold text-primary">
                ${product.price * qty}
              </p>
              {qty > 1 && (
                <p className="text-sm text-muted-foreground">${product.price} each</p>
              )}

              {product.toxic && product.unitsLeft !== undefined && product.totalUnits && (
  <div className="mt-4 max-w-sm">
    <StockBar unitsLeft={product.unitsLeft} totalUnits={product.totalUnits} />
  </div>
)}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <button
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center font-display text-lg font-bold">{qty}</span>
                  <button
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(10, q + 1))}
                    className="flex h-11 w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={handleAdd}
                  className={`flex h-11 flex-1 items-center justify-center gap-2 rounded-xl px-8 font-display text-sm font-bold tracking-widest uppercase transition-all sm:flex-none ${
                    added
                      ? "bg-toxic text-primary-foreground"
                      : "bg-primary text-primary-foreground shadow-[0_0_36px_-6px_color-mix(in_oklab,var(--color-primary)_60%,transparent)] hover:bg-primary/85"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="h-4 w-4" /> Added
                    </>
                  ) : (
                    "Add to cart"
                  )}
                </button>

                <button
  type="button"
  aria-label={wished ? "Remove from wishlist" : "Save to wishlist"}
  aria-pressed={wished}
  onClick={() => toggle(product.id)}
  className="flex h-11 w-11 items-center justify-center rounded-xl border border-border transition-colors hover:border-primary/60"
>
  <Heart
    className={`h-5 w-5 transition-colors ${
      wished ? "fill-primary text-primary" : "text-foreground"
    }`}
  />
</button>
              </div>

              <ul className="mt-10 space-y-3">
                {CATEGORY_HIGHLIGHTS[product.category].map((line) => (
                  <li key={line} className="flex items-start gap-3 text-sm text-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                    {line}
                  </li>
                ))}
              </ul>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {SERVICE_PERKS.map((perk, i) => (
                  <div
                    key={perk.title}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
                  >
                    {i === 0 ? (
                      <Truck className="h-5 w-5 shrink-0 text-primary" />
                    ) : (
                      <ShieldCheck className="h-5 w-5 shrink-0 text-primary" />
                    )}
                    <div>
                      <p className="text-sm font-semibold text-foreground">{perk.title}</p>
                      <p className="text-xs text-muted-foreground">{perk.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <section className="mt-20">
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              YOU MAY ALSO LIKE
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}