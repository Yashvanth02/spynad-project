import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

const HEADLINE = [
  ["websites", "that"],
  ["don't", "just"],
  ["look", "good -"],
  ["they", "convert."],
];

const MOBILE_HEADLINE = [
  ["websites", "that"],
  ["don't", "just"],
  ["look", "good -"],
  ["they", "convert."],
];

export default function Hero() {
  return (
    <section id="top" className="relative min-h-[86svh] md:min-h-screen overflow-hidden pt-24 md:pt-40 pb-8 md:pb-20" data-testid="hero-section">
      {/* Background layers */}
      <div className="absolute inset-0 noise-layer" />
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ duration: 2 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url(https://images.unsplash.com/photo-1611856132849-844daa7ec58e?crop=entropy&cs=srgb&fm=jpg&w=1600&q=80)", filter: "grayscale(1) contrast(1.1)", opacity: 0.25 }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black" />

      {/* Floating beams */}
      <div className="beam top-[20%] left-[10%] w-[400px] h-[400px] bg-white/10" />
      <div className="beam bottom-[10%] right-[5%] w-[500px] h-[500px] bg-white/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="text-[10px] sm:text-xs tracking-[0.22em] sm:tracking-[0.3em] uppercase text-zinc-500 font-bold mb-6 md:mb-8 font-mono"
          data-testid="hero-eyebrow"
        >
          / Digital Studio · Est. 2025
        </motion.p>

        <h1 className="md:hidden max-w-full font-display font-black uppercase leading-[0.92] tracking-[-0.012em] text-white" data-testid="hero-headline">
          {MOBILE_HEADLINE.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-w-full gap-x-[0.12em] text-[clamp(2.45rem,11.6vw,4.35rem)] whitespace-nowrap"
              >
                {line.map((w, j) => (
                  <span key={j} className={j === 1 && i === 3 ? "text-stroke" : ""}>{w}</span>
                ))}
              </motion.div>
            </div>
          ))}
        </h1>

        <h1 className="hidden md:block font-display font-black uppercase leading-[0.88] tracking-tighter text-white" aria-hidden="true">
          {HEADLINE.map((line, i) => (
            <div key={i} className="overflow-hidden">
              <motion.div
                initial={{ y: "110%" }} animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-x-[0.18em] md:text-[10vw] lg:text-[8.2vw]"
              >
                {line.map((w, j) => (
                  <span key={j} className={j === 1 && i === 3 ? "text-stroke" : ""}>{w}</span>
                ))}
              </motion.div>
            </div>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-10 md:mt-16 grid md:grid-cols-12 gap-8 items-end"
        >
          <p className="md:col-span-5 text-base md:text-lg text-zinc-400 font-light max-w-md">
            Custom websites built for brands, startups & creators who refuse to blend in. Engineered for speed. Designed to convert.
          </p>

          <div className="md:col-span-7 flex flex-col sm:flex-row gap-4 sm:justify-end">
            <MagneticButton
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="glow-btn bg-white text-black rounded-full px-6 sm:px-8 py-4 font-semibold text-sm group justify-center"
              data-testid="hero-cta-primary"
            >
              Get Your Website
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}
            className="rounded-full px-6 sm:px-8 py-4 font-medium text-sm border border-white/20 text-white hover:bg-white hover:text-black transition-colors justify-center"
              data-testid="hero-cta-secondary"
            >
              <Play size={14} />
              View Projects
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
          className="mt-10 md:mt-24 flex items-center gap-4 text-zinc-600 font-mono text-[10px] sm:text-xs tracking-widest"
        >
          <div className="w-16 h-px bg-zinc-700" />
          SCROLL TO EXPLORE
        </motion.div>
      </div>
    </section>
  );
}
