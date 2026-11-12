import { useState } from "react";
import { Check, Heart, Plus, Star } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";
import { Link, useNavigate } from "@tanstack/react-router";
import { notifyAdded } from "@/lib/notify";
import { useWishlist } from "@/lib/wishlist";
import { StockBar } from "@/components/stock-bar";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const navigate = useNavigate();
  const { has, toggle } = useWishlist();
  const wished = has(product.id);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product.id);
    notifyAdded(product.name, () => navigate({ to: "/cart" }));
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="aura-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-card">
    <div className="relative">
      <Link to="/product/$id" params={{ id: product.id }} className="relative block aspect-square overflow-hidden bg-panel">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={1024}
          height={1024}
          className="animate-in fade-in duration-700 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span
            className={`absolute top-3 left-3 rounded-full px-3 py-1 font-display text-[11px] font-bold uppercase tracking-wider ${
              product.toxic
                ? "bg-toxic text-primary-foreground"
                : "border border-primary/40 bg-primary/15 text-primary"
            }`}
          >
            {product.badge}
          </span>
        )}
        {product.toxic && product.unitsLeft !== undefined && (
          <span className="absolute right-3 bottom-3 rounded-full bg-background/80 px-3 py-1 text-[11px] font-semibold text-toxic backdrop-blur-sm">
            {product.unitsLeft} left
          </span>
        )}
      </Link>

      <button
    type="button"
    aria-label={wished ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
    aria-pressed={wished}
    onClick={() => toggle(product.id)}
    className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/80 backdrop-blur-sm transition-colors hover:border-primary/60"
  >
    <Heart
      className={`h-4 w-4 transition-colors ${
        wished ? "fill-primary text-primary" : "text-foreground"
      }`}
    />
  </button>
    </div>

      <div className="flex flex-1 flex-col gap-1 p-5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" />
          <span className="font-semibold text-foreground">{product.rating.toFixed(1)}</span>
          <span>· {product.category}</span>
        </div>
        <h3 className="font-display text-base font-semibold tracking-wide text-foreground">
  <Link
    to="/product/$id"
    params={{ id: product.id }}
    className="transition-colors hover:text-primary"
  >
    {product.name}
  </Link>
</h3>
        <p className="text-sm text-muted-foreground">{product.tagline}</p>

        {product.toxic && product.unitsLeft !== undefined && product.totalUnits && (
  <div className="mt-3">
    <StockBar unitsLeft={product.unitsLeft} totalUnits={product.totalUnits} />
  </div>
)}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-display text-lg font-bold text-foreground">
            ${product.price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-all ${
              added
                ? "bg-toxic text-primary-foreground"
                : "bg-primary text-primary-foreground hover:bg-primary/85"
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Added
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
