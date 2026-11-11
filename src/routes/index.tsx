import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Radiation } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FavouritesCarousel } from "@/components/favourites-carousel";
import { MouseStory } from "@/components/mouse-story";
import { SquadMarquee } from "@/components/squad-marquee";
import { ProductCard } from "@/components/product-card";
import { TOXIC_PRODUCTS, heroImage } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Poison Gear — Toxic Performance Gaming Gear" },
      {
        name: "description",
        content:
          "Mice, keyboards, mousepads, chairs and controllers engineered to toxic perfection. Explore the Armory, the limited Toxic line and squad setups.",
      },
      { property: "og:title", content: "Poison Gear — Toxic Performance Gaming Gear" },
      {
        property: "og:description",
        content:
          "Premium black & toxic-green gaming gear. Mice, keyboards, pads, chairs and controllers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LandingPage,
});

function SectionHeading({
  kicker,
  title,
  body,
}: {
  kicker: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="font-display text-xs font-bold tracking-[0.45em] uppercase text-primary">
        {kicker}
      </p>
      <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
        {title}
      </h2>
      {body && <p className="mt-4 text-muted-foreground">{body}</p>}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Poison Gear lineup glowing in toxic green"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      <div className="absolute inset-0 bg-grid opacity-30" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <p className="font-display inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-[0.3em] uppercase text-primary">
            <Radiation className="h-4 w-4" /> Season 04 drop live
          </p>
          <h1 className="font-display mt-6 text-5xl leading-[1.05] font-bold tracking-tight text-foreground sm:text-7xl">
            ENGINEERED TO
            <span className="text-primary text-glow"> TOXIC </span>
            PERFECTION
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Mice, keyboards, pads, chairs and controllers built in the dark and finished in
            acid green. If it doesn't win you rounds, it doesn't ship.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              to="/armory"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground shadow-[0_0_36px_-6px_color-mix(in_oklab,var(--color-primary)_60%,transparent)] transition-all hover:bg-primary/85"
            >
              Enter the Armory
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/toxic"
              className="inline-flex items-center gap-2 rounded-xl border border-toxic/60 bg-toxic/10 px-7 py-3.5 font-display text-sm font-bold tracking-widest uppercase text-toxic transition-colors hover:bg-toxic/20"
            >
              Toxic Line
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.35em] uppercase text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}

function ToxicStrip() {
  return (
    <section id="toxic" className="relative bg-haze py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Limited Series"
          title='THE "TOXIC" LINE'
          body="Translucent shells, acid-green internals, numbered units. Once a drop sells out, it never returns."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOXIC_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/toxic"
            className="group inline-flex items-center gap-2 font-display text-sm font-bold tracking-widest uppercase text-toxic transition-colors hover:text-primary"
          >
            View the full Toxic line
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function MostWanted() {
  return (
    <section id="most-wanted" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Community Verified"
          title="MOST WANTED"
          body="The gear the squad keeps re-buying. Rotate the ring, grab what everyone else already runs."
        />
      </div>
      <div className="mt-8">
        <FavouritesCarousel />
      </div>
    </section>
  );
}

function SquadSection() {
  return (
    <section id="squad" className="overflow-hidden border-y border-border/60 bg-panel py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          kicker="Bought Together"
          title="SQUAD SETUPS"
          body="Proven pairings — the bundles squads keep checking out together, streaming down the line."
        />
      </div>
      <div className="mt-12">
        <SquadMarquee />
      </div>
    </section>
  );
}

function About() {
  const stats = [
    { value: "58g", label: "Flagship mouse weight" },
    { value: "30K", label: "DPI optical sensor" },
    { value: "8K", label: "Hz polling rate" },
    { value: "0", label: "Excuses left" },
  ];
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-display text-xs font-bold tracking-[0.45em] uppercase text-primary">
            About Poison Gear
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            BORN IN THE DARK.
            <br />
            <span className="text-primary text-glow">FINISHED IN ACID.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Poison Gear started as a workshop obsession: build gear that never gives a player a
            reason to lose. Every product is tuned on the ladder before it earns the skull —
            tested across thousands of hours of ranked play, then stripped of every gram and
            millisecond that doesn't help.
          </p>
          <p className="mt-4 text-muted-foreground">
            The Toxic line is where engineering meets mischief — limited runs with translucent
            shells and internals we're proud to show off. Numbered, logged, never restocked.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="aura-hover rounded-2xl border border-border bg-card p-7 text-center"
            >
              <p className="font-display text-4xl font-bold text-primary text-glow sm:text-5xl">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border/60 bg-panel py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="font-display text-xs font-bold tracking-[0.45em] uppercase text-primary">
            Contact
          </p>
          <h2 className="font-display mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
            TALK TO THE WORKSHOP
          </h2>
          <p className="mt-6 max-w-md text-muted-foreground">
            Gear questions, squad discount requests, or a Toxic drop idea — the workshop reads
            everything.
          </p>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-muted-foreground">support@poisongear.com</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-muted-foreground">Mon–Fri · 10:00–18:00 IST</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
              <span className="text-muted-foreground">@poisongear everywhere</span>
            </li>
          </ul>
        </div>

        <form
          className="rounded-2xl border border-border bg-card p-7"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const note = form.querySelector<HTMLElement>("[data-sent]");
            if (note) note.hidden = false;
            form.reset();
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Name
              </span>
              <input
                required
                className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary/60"
                placeholder="Your name"
              />
            </label>
            <label className="block">
              <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Email
              </span>
              <input
                type="email"
                required
                className="mt-1.5 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-primary/60"
                placeholder="you@squad.gg"
              />
            </label>
          </div>
          <label className="mt-4 block">
            <span className="font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Message
            </span>
            <textarea
              required
              rows={5}
              className="mt-1.5 w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none transition-colors focus:border-primary/60"
              placeholder="What's on your mind?"
            />
          </label>
          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-primary py-3.5 font-display text-sm font-bold tracking-widest uppercase text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Send message
          </button>
          <p data-sent hidden className="mt-3 text-center text-sm font-semibold text-toxic">
            Message sent — the workshop will get back to you.
          </p>
        </form>
      </div>
    </section>
  );
}

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <ToxicStrip />
        <MostWanted />
        <MouseStory />
        <SquadSection />
        <About />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}
