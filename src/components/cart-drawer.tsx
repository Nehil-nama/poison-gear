import { Link } from "@tanstack/react-router";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FREE_SHIPPING_THRESHOLD, useCart } from "@/lib/cart";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { items, count, total, shipping, grandTotal, setQty, remove } = useCart();
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - total, 0);
  const progress = Math.min((total / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-border bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border p-6 text-left">
          <SheetTitle className="font-display text-lg font-bold uppercase tracking-widest text-foreground">
            Your Cart
          </SheetTitle>
          <SheetDescription>
            {count} {count === 1 ? "item" : "items"} loaded
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card text-primary">
              <ShoppingBag className="h-7 w-7" />
            </span>
            <p className="font-display mt-5 text-xl font-bold text-foreground">
              Your cart is empty
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              The Armory is full of gear that wants to come home with you.
            </p>
            <Link
              to="/armory"
              onClick={close}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Enter the Armory <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-4 overflow-y-auto p-6">
              {items.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    width={1024}
                    height={1024}
                    loading="lazy"
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/product/$id"
                      params={{ id: product.id }}
                      onClick={close}
                      className="font-display block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="font-display text-sm font-bold text-primary">
                      ${product.price * qty}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQty(product.id, qty - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center font-display text-sm font-bold">
                        {qty}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQty(product.id, qty + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button
                    aria-label={`Remove ${product.name}`}
                    onClick={() => remove(product.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-t border-border p-6">
              <p className="text-sm text-muted-foreground">
                {remaining > 0 ? (
                  <>
                    You’re <span className="font-semibold text-primary">${remaining}</span> away
                    from free shipping
                  </>
                ) : (
                  <span className="font-semibold text-toxic">You’ve unlocked free shipping</span>
                )}
              </p>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-primary shadow-[0_0_12px_var(--color-primary)] transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd className="font-semibold">${total}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Shipping</dt>
                  <dd className={`font-semibold ${shipping === 0 ? "text-toxic" : ""}`}>
                    {shipping === 0 ? "Free" : `$${shipping}`}
                  </dd>
                </div>
                <div className="flex justify-between border-t border-border pt-3 text-base">
                  <dt className="font-display font-bold uppercase tracking-widest">Total</dt>
                  <dd className="font-display font-bold text-primary">${grandTotal}</dd>
                </div>
              </dl>

              <Link
                to="/checkout"
                onClick={close}
                className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground shadow-[0_0_36px_-6px_color-mix(in_oklab,var(--color-primary)_60%,transparent)] transition-colors hover:bg-primary/85"
              >
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/cart"
                onClick={close}
                className="mt-3 block text-center font-display text-xs font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                View full cart
              </Link>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}