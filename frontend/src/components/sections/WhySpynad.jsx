import { motion } from "framer-motion";
import { Zap, Sparkles, Target, Layers } from "lucide-react";

const pillars = [
  { icon: Zap, title: "Blazing speed", text: "Sub-second loads, 100 Lighthouse, edge delivery by default." },
  { icon: Sparkles, title: "Creative edge", text: "Visuals that feel designed — not assembled from templates." },
  { icon: Target, title: "Conversion-first", text: "Every pixel earns its place. CTAs, copy & UX tuned to convert." },
  { icon: Layers, title: "Full-stack", text: "Frontend, backend, DB, deployment. One team, zero handoffs." },
];

export default function WhySpynad() {
  return (
    <section className="relative py-24 md:py-40 bg-black" data-testid="why-section">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5 md:sticky md:top-32 self-start">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 02 — Why Spynad</p>
            <h2 className="font-display font-black text-5xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-[0.9]">
              Built<br />different.
            </h2>
            <p className="mt-8 text-zinc-400 max-w-md font-light">
              We're the unreasonable partner your competitors wish they'd hired first. Small team, senior output, zero fluff.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[
                { k: "4.9", l: "Avg. rating" },
                { k: "60+", l: "Projects shipped" },
                { k: "100%", l: "On-time launch" },
              ].map((m, i) => (
                <div key={i}>
                  <div className="font-display font-black text-3xl md:text-4xl">{m.k}</div>
                  <div className="text-xs text-zinc-500 tracking-widest uppercase mt-1">{m.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-4 md:gap-6">
            {pillars.map((P, i) => (
              <motion.div
                key={P.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/[0.04] hover:border-white/20 transition-all"
                data-testid={`pillar-${i}`}
              >
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <P.icon size={28} strokeWidth={1.5} className="text-white" />
                <h3 className="font-display text-2xl md:text-3xl font-bold mt-6 tracking-tight">{P.title}</h3>
                <p className="text-zinc-400 mt-3 font-light text-sm md:text-base">{P.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
