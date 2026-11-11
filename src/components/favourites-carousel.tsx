import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { FAVOURITES } from "@/lib/products";
import { useCart } from "@/lib/cart";

/**
 * Circular (3D ring) carousel of the most-bought gear.
 * Cards sit on a rotating ring in 3D space; the card facing the viewer
 * is highlighted and offers a quick add-to-cart.
 */
export function FavouritesCarousel() {
  const { add } = useCart();
  const items = FAVOURITES;
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);

  const [radius, setRadius] = useState(600);

useEffect(() => {
  const update = () => {
    const w = window.innerWidth;
    setRadius(w < 640 ? 300 : w < 1024 ? 450 : 600);
  };
  update();
  window.addEventListener("resize", update);
  return () => window.removeEventListener("resize", update);
}, []);

  useEffect(() => {
    if (paused) return;
    const t = window.setInterval(() => setIndex((i) => i + 1), 3200);
    return () => window.clearInterval(t);
  }, [paused]);

  const step = 360 / count;
  const front = ((index % count) + count) % count;

  return (
    <div
      className="relative mx-auto h-[440px] w-full max-w-7xl select-none sm:h-[560px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Center emblem */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <p className="font-display text-6xl font-bold text-primary/10 sm:text-8xl">TOXIC</p>
        <p className="font-display -mt-2 text-xs font-bold tracking-[0.5em] uppercase text-primary/30 sm:text-sm">
          Most Wanted
        </p>
      </div>

      {/* 3D ring */}
      <div
        className="absolute inset-0"
        style={{ perspective: "2200px" }}
      >
        <div
          className="absolute top-1/2 left-1/2 h-0 w-0 transition-transform duration-700 ease-out"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${-index * step}deg)`,
          }}
        >
          {items.map((product, i) => {
            const isFront = i === front;
            return (
              <div
                key={product.id + i}
                className="absolute top-0 left-0 w-48 sm:w-64"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                }}
              >
                <div
                  className={`rounded-2xl border bg-card/95 p-3 backdrop-blur-sm transition-all duration-500 ${
                    isFront
                      ? "border-primary/60 shadow-[0_0_40px_-5px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]"
                      : "border-border opacity-70"
                  }`}
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-panel">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      width={1024}
                      height={1024}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-2 truncate font-display text-xs font-semibold tracking-wide sm:text-sm">
                    {product.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-primary">
                      ${product.price}
                    </span>
                    {isFront && (
                      <button
                        aria-label={`Add ${product.name} to cart`}
                        onClick={() => {
                          add(product.id);
                          setAddedId(product.id);
                          window.setTimeout(() => setAddedId(null), 1200);
                        }}
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    )}
                    {addedId === product.id && (
                      <span className="text-xs font-bold text-toxic">Added</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <button
        aria-label="Previous item"
        onClick={() => setIndex((i) => i - 1)}
        className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary sm:left-8"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        aria-label="Next item"
        onClick={() => setIndex((i) => i + 1)}
        className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-primary sm:right-8"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2">
        {items.map((p, i) => (
          <button
            key={p.id}
            aria-label={`Go to ${p.name}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === front ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
