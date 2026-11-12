import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Heart } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/lib/cart";
import { notifyAdded } from "@/lib/notify";
import { useWishlist } from "@/lib/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Poison Gear" },
      { name: "description", content: "The Poison Gear you’ve saved for later." },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, count, clear } = useWishlist();
  const { add } = useCart();
  const navigate = useNavigate();

  const addAll = () => {
    items.forEach((p) => add(p.id));
    notifyAdded(`${count} ${count === 1 ? "item" : "items"}`, () =>
      navigate({ to: "/cart" }),
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pt-16">
        {items.length === 0 ? (
          <div className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card text-primary">
                <Heart className="h-9 w-9" />
              </span>
              <h1 className="font-display mt-6 text-3xl font-bold text-foreground">
                Your wishlist is empty
              </h1>
              <p className="mt-3 text-muted-foreground">
                Tap the heart on any gear to save it here for later.
              </p>
              <Link
                to="/armory"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
              >
                Enter the Armory <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
                  YOUR WISHLIST
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {count} {count === 1 ? "item" : "items"} saved for later.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={clear}
                  className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-destructive"
                >
                  Clear wishlist
                </button>
                <button
                  onClick={addAll}
                  className="rounded-xl bg-primary px-6 py-3 font-display text-xs font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
                >
                  Add all to cart
                </button>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}