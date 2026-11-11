import { Link } from "@tanstack/react-router";
import { Github, Skull, Twitch, Twitter, Youtube } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
              <Skull className="h-5 w-5" />
            </span>
            <span className="font-display text-lg font-bold tracking-widest uppercase">
              Poison<span className="text-primary">Gear</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Engineered to toxic perfection. Gear built for players who refuse to blame their setup.
          </p>
          <div className="mt-5 flex gap-3">
            {[Twitter, Twitch, Youtube, Github].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><Link to="/armory" className="transition-colors hover:text-primary">The Armory</Link></li>
            <li><Link to="/toxic" className="transition-colors hover:text-primary">Toxic Line</Link></li>
            <li><Link to="/cart" className="transition-colors hover:text-primary">Your Cart</Link></li>
            <li><Link to="/checkout" className="transition-colors hover:text-primary">Checkout</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
            Support
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li><a href="mailto:support@poisongear.com" className="transition-colors hover:text-primary">support@poisongear.com</a></li>
            <li><a href="#contact" className="transition-colors hover:text-primary">Contact us</a></li>
            <li><a href="#" className="transition-colors hover:text-primary">Shipping & returns</a></li>
            <li><a href="#" className="transition-colors hover:text-primary">2-year warranty</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
            The Drip
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Toxic drops sell out in hours. Get the heads-up first.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="you@squad.gg"
              className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/60"
            />
            <button
              type="submit"
              className="h-10 shrink-0 rounded-lg bg-primary px-4 font-display text-sm font-bold uppercase text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Poison Gear. All rights reserved.</p>
          <p>Demo storefront — checkout is simulated, no real payments are processed.</p>
        </div>
      </div>
    </footer>
  );
}
