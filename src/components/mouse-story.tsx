import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import mouseFull from "@/assets/products/mouse-viper.jpg";
import mouseCutaway from "@/assets/scroll/mouse-cutaway.jpg";
import mouseInternals from "@/assets/scroll/mouse-internals.jpg";

const STAGES = [
  {
    id: "shell",
    kicker: "01 · The Shell",
    title: "58 grams of obsession.",
    body: "A monocoque shell sculpted for claw, palm and fingertip grips — pared down gram by gram until nothing was left to remove.",
  },
  {
    id: "cutaway",
    kicker: "02 · Beneath",
    title: "The shell gives way.",
    body: "Watch the matte black skin dissolve into the machine: scroll encoder, oil-immersed switches, a board laid out like a circuit shrine.",
  },
  {
    id: "internals",
    kicker: "03 · Internals",
    title: "Every signal engineered.",
    body: "Copper 8K-ready antenna. 30,000 DPI optical sensor. 8,000 Hz polling through the PCB. Nothing inside is an accident.",
  },
];

function StageCaption({ p, range, stage }: { p: MotionValue<number>; range: number[]; stage: (typeof STAGES)[number] }) {
  const opacity = useTransform(p, range, [0, 1, 1, 0]);
  const y = useTransform(p, range, [40, 0, 0, -40]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="pointer-events-none absolute bottom-16 left-1/2 w-[min(92vw,560px)] -translate-x-1/2 text-center sm:bottom-24"
    >
      <p className="font-display text-xs font-bold tracking-[0.4em] uppercase text-primary">
        {stage.kicker}
      </p>
      <h3 className="font-display mt-2 text-3xl font-bold text-foreground sm:text-4xl">
        {stage.title}
      </h3>
      <p className="mt-3 text-sm text-muted-foreground sm:text-base">{stage.body}</p>
    </motion.div>
  );
}

/**
 * Apple-AirPods-style scroll story: the page pins a viewport-height stage
 * while the user scrolls, dissolving the mouse from full shell → cutaway →
 * exposed internals.
 */
export function MouseStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const fullOpacity = useTransform(p, [0, 0.2, 0.3], [1, 1, 0]);
  const fullScale = useTransform(p, [0, 0.3], [1, 1.12]);
  const cutOpacity = useTransform(p, [0.24, 0.34, 0.52, 0.62], [0, 1, 1, 0]);
  const cutScale = useTransform(p, [0.24, 0.62], [0.94, 1.08]);
  const insideOpacity = useTransform(p, [0.56, 0.68], [0, 1]);
  const insideScale = useTransform(p, [0.56, 1], [0.92, 1.05]);

  const lineWidth = useTransform(p, [0, 1], ["0%", "100%"]);

  return (
    <section id="interior" ref={ref} className="relative h-[340vh] bg-background">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_55%,color-mix(in_oklab,var(--color-primary)_10%,transparent),transparent_70%)]" />

        <p className="font-display absolute top-20 left-1/2 z-10 -translate-x-1/2 text-center text-xs font-bold tracking-[0.45em] uppercase text-muted-foreground sm:top-24">
          Inside the Viper V2
        </p>

        {/* Stage imagery */}
        <motion.img
          src={mouseFull}
          alt="Poison Viper V2 mouse, full shell"
          style={{ opacity: fullOpacity, scale: fullScale }}
          className="absolute h-[52vh] max-w-[86vw] object-contain sm:h-[62vh]"
        />
        <motion.img
          src={mouseCutaway}
          alt="Viper V2 cutaway revealing internal components"
          style={{ opacity: cutOpacity, scale: cutScale }}
          className="absolute h-[52vh] max-w-[86vw] object-contain sm:h-[62vh]"
        />
        <motion.img
          src={mouseInternals}
          alt="Viper V2 internal PCB, sensor and battery"
          style={{ opacity: insideOpacity, scale: insideScale }}
          className="absolute h-[52vh] max-w-[86vw] object-contain sm:h-[62vh]"
        />

        {/* Captions */}
        <StageCaption p={p} range={[0.02, 0.1, 0.2, 0.28]} stage={STAGES[0]!} />
        <StageCaption p={p} range={[0.3, 0.38, 0.5, 0.58]} stage={STAGES[1]!} />
        <StageCaption p={p} range={[0.62, 0.7, 0.92, 1]} stage={STAGES[2]!} />

        {/* Progress rail */}
        <div className="absolute bottom-6 left-1/2 h-[2px] w-40 -translate-x-1/2 overflow-hidden rounded-full bg-border sm:w-56">
          <motion.div
            style={{ width: lineWidth }}
            className="h-full bg-primary shadow-[0_0_12px_var(--color-primary)]"
          />
        </div>
      </div>
    </section>
  );
}
