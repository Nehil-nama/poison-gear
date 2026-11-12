import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { ShoppingCart, Skull } from "lucide-react";
import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/lib/cart";

const NAV = [
  { label: "Armory", to: "/armory" },
  { label: "Toxic", to: "/toxic" },
  { label: "Cart", to: "/cart" },
];

export function SiteHeader() {
  const { count } = useCart();
  const location = useLocation();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
            <Skull className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold tracking-widest uppercase">
            Poison<span className="text-primary text-glow">Gear</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-4 py-2 font-display text-sm font-semibold uppercase tracking-wider transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}