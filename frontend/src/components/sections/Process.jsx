import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Discovery", text: "We map your goals, audience & competitors. Brief gets sharp before a pixel moves." },
  { n: "02", title: "Design", text: "Moodboards, wireframes, high-fidelity. You see the direction before we build." },
  { n: "03", title: "Development", text: "Hand-coded, performant, accessible. CMS, animations, integrations — all wired in." },
  { n: "04", title: "Launch", text: "QA, staging, go-live. We ship with confidence and measurable KPIs." },
  { n: "05", title: "Support", text: "Post-launch iteration, performance tuning, growth experiments — as long as you need." },
];

export default function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 60%", "end 40%"] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-40 bg-black" data-testid="process-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="mb-16 md:mb-24">
          <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 04 — Process</p>
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9]">
            From zero to<br /><span className="text-stroke">shipped.</span>
          </h2>
        </div>

        <div className="relative pl-8 md:pl-20">
          {/* Vertical line */}
          <div className="absolute left-2 md:left-8 top-0 bottom-0 w-px bg-white/10" />
          <motion.div style={{ height: lineHeight }} className="absolute left-2 md:left-8 top-0 w-px bg-white" />

          <div className="space-y-16 md:space-y-28">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: i * 0.05 }}
                className="relative grid md:grid-cols-12 gap-6 items-start"
                data-testid={`process-step-${i}`}
              >
                <div className="absolute -left-[28px] md:-left-[53px] top-2 w-3 h-3 rounded-full bg-white ring-4 ring-black" />
                <div className="md:col-span-3 font-mono text-sm text-zinc-500">STEP {s.n}</div>
                <div className="md:col-span-9">
                  <h3 className="font-display font-bold text-4xl md:text-6xl tracking-tighter">{s.title}</h3>
                  <p className="mt-4 text-zinc-400 max-w-2xl font-light text-base md:text-lg">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
