import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, ShoppingCart, Skull } from "lucide-react";
import { CartDrawer } from "@/components/cart-drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet";
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
  const [menuOpen, setMenuOpen] = useState(false);

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

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:border-primary/50 hover:text-primary md:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent
          side="left"
          className="w-72 border-border bg-background p-0"
        >
          <div className="border-b border-border p-6">
            <SheetTitle className="font-display text-lg font-bold tracking-widest uppercase text-foreground">
              Poison<span className="text-primary text-glow">Gear</span>
            </SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
          </div>
          <nav className="flex flex-col p-4">
            {[{ label: "Home", to: "/" }, ...NAV].map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 font-display text-base font-semibold uppercase tracking-wider transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </header>
  );
}