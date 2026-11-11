import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Lock } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Poison Gear" },
      {
        name: "description",
        content: "Complete your Poison Gear order. Demo checkout — no real payment is processed.",
      },
      { property: "og:title", content: "Checkout — Poison Gear" },
      {
        property: "og:description",
        content: "Complete your Poison Gear order (demo checkout).",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CheckoutPage,
});

interface Confirmation {
  orderId: string;
  name: string;
  email: string;
  total: number;
  itemCount: number;
}

const fieldClass =
  "mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary/60";

function CheckoutPage() {
  const { items, total, count, shipping, grandTotal, clear } = useCart();
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [payment, setPayment] = useState("demo-card");

  // A direct visit with an empty cart goes back to the Armory.
  if (items.length === 0 && !confirmation) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4 pt-16">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground">
              Nothing to check out
            </h1>
            <p className="mt-3 text-muted-foreground">Add some gear to your cart first.</p>
            <Link
              to="/armory"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Enter the Armory
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (confirmation) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <SiteHeader />
        <main className="flex flex-1 items-center justify-center px-4 pt-16">
          <div className="w-full max-w-lg rounded-2xl border border-primary/40 bg-card p-10 text-center shadow-[0_0_80px_-20px_color-mix(in_oklab,var(--color-primary)_50%,transparent)]">
            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/15 text-primary">
              <CheckCircle2 className="h-10 w-10" />
            </span>
            <h1 className="font-display mt-6 text-4xl font-bold tracking-tight text-glow text-foreground">
              ORDER PLACED!
            </h1>
            <p className="mt-3 text-muted-foreground">
              Gear up, {confirmation.name.split(" ")[0] || "player"} — your order is confirmed and
              a receipt is on its way to {confirmation.email}.
            </p>
            <dl className="mt-8 space-y-3 rounded-xl border border-border bg-panel p-5 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Order ID</dt>
                <dd className="font-mono font-semibold text-primary">{confirmation.orderId}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Items</dt>
                <dd className="font-semibold">{confirmation.itemCount}</dd>
              </div>
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-display font-bold uppercase tracking-widest">Total paid</dt>
                <dd className="font-display font-bold text-primary">${confirmation.total}</dd>
              </div>
            </dl>
            <p className="mt-5 text-xs text-muted-foreground">
              Demo storefront — no real payment was processed.
            </p>
            <Link
              to="/armory"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Back to the Armory
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const orderId = `PG-${Date.now().toString(36).toUpperCase()}`;
    const snapshot: Confirmation = {
      orderId,
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      total: grandTotal,
      itemCount: count,
    };
    clear();
    setConfirmation(snapshot);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 pt-16">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            CHECKOUT
          </h1>
          <p className="mt-2 flex items-center gap-2 text-muted-foreground">
            <Lock className="h-4 w-4 text-primary" /> Demo checkout — no real payment is
            processed.
          </p>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
            <form onSubmit={handlePlaceOrder} className="rounded-2xl border border-border bg-card p-7">
              <h2 className="font-display text-lg font-bold uppercase tracking-widest text-foreground">
                1 · Squad Details
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Full name
                  </span>
                  <input name="name" required placeholder="Alex 'Toxin' Sharma" className={fieldClass} />
                </label>
                <label className="block">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Email
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@squad.gg"
                    className={fieldClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Address
                  </span>
                  <input
                    name="address"
                    required
                    placeholder="Street, city, state, PIN"
                    className={fieldClass}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Phone
                  </span>
                  <input name="phone" required type="tel" placeholder="+91 …" className={fieldClass} />
                </label>
              </div>

              <h2 className="font-display mt-10 text-lg font-bold uppercase tracking-widest text-foreground">
                2 · Payment
              </h2>
              <div className="mt-5 grid gap-3">
                {[
                  { key: "demo-card", label: "Demo Card", note: "Simulated card payment" },
                  { key: "demo-upi", label: "Demo UPI", note: "Simulated UPI payment" },
                  { key: "cod", label: "Cash on Delivery", note: "Pay when the gear arrives" },
                ].map((option) => (
                  <label
                    key={option.key}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                      payment === option.key
                        ? "border-primary/60 bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        value={option.key}
                        checked={payment === option.key}
                        onChange={() => setPayment(option.key)}
                        className="h-4 w-4 accent-[var(--color-primary)]"
                      />
                      <span className="font-display font-semibold tracking-wide text-foreground">
                        {option.label}
                      </span>
                    </span>
                    <span className="text-xs text-muted-foreground">{option.note}</span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-primary py-4 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground shadow-[0_0_36px_-6px_color-mix(in_oklab,var(--color-primary)_60%,transparent)] transition-colors hover:bg-primary/85"
              >
                Place Order · ${grandTotal}
              </button>
            </form>

            <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="font-display text-lg font-bold uppercase tracking-widest text-foreground">
                Your Gear
              </h2>
              <ul className="mt-5 space-y-3">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-center gap-3 text-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{product.name}</p>
                      <p className="text-muted-foreground">× {qty}</p>
                    </div>
                    <span className="font-display font-bold">${product.price * qty}</span>
                  </li>
                ))}
              </ul>
              <dl className="mt-5 space-y-3 border-t border-border pt-4 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className={`font-semibold ${shipping === 0 ? "text-toxic" : ""}`}>
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </dd>
                </div>
                <div className="flex justify-between text-base">
                  <dt className="font-display font-bold uppercase tracking-widest">Total</dt>
                  <dd className="font-display font-bold text-primary">${grandTotal}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
