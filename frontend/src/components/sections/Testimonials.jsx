import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    q: "Synad completely transformed how we approach our website experience. The team didn't just deliver a sleek design - they built a platform that actually converts. Since launch, we've seen a noticeable improvement in engagement and user retention.",
    a: "Team Unavo",
    r: "Unavo",
  },
  {
    q: "Working with Synad was seamless from start to finish. They understood our brand instantly and translated it into a website that feels both dynamic and intuitive. It's rare to find a team that balances creativity with performance this well.",
    a: "Reelio Team",
    r: "Reelio",
  },
  {
    q: "Synad's marketing strategy gave our brand the clarity and direction it needed. From campaign execution to messaging, everything felt intentional and results-driven. We've seen stronger reach, better conversions, and a more defined brand presence.",
    a: "Emerald Associates",
    r: "Emerald",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % quotes.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative py-12 md:py-16 bg-black" data-testid="testimonials-section">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-10">/ 06 — Testimonials</p>
        <div className="relative min-h-[40vh] md:min-h-[55vh] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
              transition={{ duration: 0.8 }}
              className="font-display font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl tracking-tight leading-[1.16] md:leading-[1.1] max-w-5xl"
              data-testid={`testimonial-${i}`}
            >
              &ldquo;{quotes[i].q}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            <motion.div
              key={`a-${i}`}
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm"
            >
              <div className="w-10 h-px bg-zinc-600" />
              <span className="font-mono text-zinc-400 leading-relaxed">{quotes[i].a} — {quotes[i].r}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex gap-3">
          {quotes.map((_, k) => (
            <button
              key={k}
              onClick={() => setI(k)}
              data-testid={`testimonial-dot-${k}`}
              aria-label={`Testimonial ${k+1}`}
              className={`h-1.5 rounded-full transition-all ${k===i ? "w-10 bg-white" : "w-4 bg-white/20"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
