import { Link } from "@tanstack/react-router";
import { ArrowRight, Package } from "lucide-react";
import { SQUAD_BUNDLES } from "@/lib/products";

function BundleCard({ bundle }: { bundle: (typeof SQUAD_BUNDLES)[number] }) {
  return (
    <article className="aura-hover w-[340px] shrink-0 rounded-2xl border border-border bg-card p-6 sm:w-[400px]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-display text-xs font-bold tracking-[0.3em] uppercase text-primary">
            Squad Setup
          </p>
          <h3 className="font-display mt-1 text-xl font-bold text-foreground">{bundle.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{bundle.blurb}</p>
        </div>
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
          <Package className="h-5 w-5" />
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {bundle.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-lg border border-border/70 bg-panel px-3 py-2 text-sm text-foreground"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <span className="font-display text-2xl font-bold text-primary">${bundle.price}</span>
          <span className="ml-2 text-sm text-muted-foreground line-through">${bundle.worth}</span>
        </div>
        <Link
          to="/armory"
          className="group flex items-center gap-1.5 font-display text-sm font-bold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
        >
          Shop setup
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/**
 * Squad setups in a continuous horizontal moving line (marquee).
 * Pauses on hover.
 */
export function SquadMarquee() {
  const doubled = [...SQUAD_BUNDLES, ...SQUAD_BUNDLES];
  return (
    <div className="relative overflow-hidden py-2">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

      <div className="marquee-track gap-6 pr-6">
        {doubled.map((bundle, i) => (
          <BundleCard key={bundle.id + i} bundle={bundle} />
        ))}
      </div>
    </div>
  );
}
