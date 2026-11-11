import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — Poison Gear" },
      {
        name: "description",
        content: "Review the Poison Gear in your cart and head to checkout.",
      },
      { property: "og:title", content: "Your Cart — Poison Gear" },
      { property: "og:description", content: "Review your cart and head to checkout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, total, count, setQty, remove, clear } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4 pt-16">
          <div className="text-center">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card text-primary">
              <ShoppingBag className="h-9 w-9" />
            </span>
            <h1 className="font-display mt-6 text-3xl font-bold text-foreground">
              Your cart is empty
            </h1>
            <p className="mt-3 text-muted-foreground">
              The Armory is full of gear that wants to come home with you.
            </p>
            <Link
              to="/armory"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Enter the Armory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            YOUR CART
          </h1>
          <p className="mt-2 text-muted-foreground">
            {count} {count === 1 ? "item" : "items"} loaded and ready.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <ul className="space-y-4">
              {items.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-display truncate font-semibold text-foreground">
                      {product.name}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">{product.tagline}</p>
                    <p className="font-display mt-1 font-bold text-primary">
                      ${product.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      aria-label="Decrease quantity"
                      onClick={() => setQty(product.id, qty - 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center font-display font-bold">{qty}</span>
                    <button
                      aria-label="Increase quantity"
                      onClick={() => setQty(product.id, qty + 1)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() => remove(product.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={clear}
                  className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-destructive"
                >
                  Clear cart
                </button>
              </li>
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold uppercase tracking-widest text-foreground">
                Order Summary
              </h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">${total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className="font-semibold text-toxic">Free</dd>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between text-base">
                    <dt className="font-display font-bold uppercase tracking-widest">Total</dt>
                    <dd className="font-display font-bold text-primary">${total}</dd>
                  </div>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground shadow-[0_0_36px_-6px_color-mix(in_oklab,var(--color-primary)_60%,transparent)] transition-colors hover:bg-primary/85"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-center text-xs text-muted-foreground">
                Free shipping over $99 · 2-year warranty
              </p>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
