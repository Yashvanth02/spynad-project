import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const services = [
  { n: "01", title: "Business Websites", desc: "High-converting marketing sites engineered for speed, SEO & scale.", tags: ["CMS", "SEO", "Analytics"] },
  { n: "02", title: "eCommerce Stores", desc: "Shopify, custom & headless storefronts optimized to sell.", tags: ["Shopify", "Stripe", "Headless"] },
  { n: "03", title: "Portfolio Websites", desc: "Editorial, immersive sites that turn your work into a statement.", tags: ["Editorial", "Motion", "3D"] },
  { n: "04", title: "Custom Web Solutions", desc: "SaaS, dashboards, APIs & full-stack apps built end-to-end.", tags: ["React", "FastAPI", "DB"] },
];

export default function Services() {
  const [hover, setHover] = useState(null);
  return (
    <section id="services" className="relative py-24 md:py-40 bg-black" data-testid="services-section">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 01 — Services</p>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9]">
              What we<br />
              <span className="text-stroke">engineer</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-400 font-light">
            Four verticals, one obsession: building digital products that outperform the room.
          </p>
        </div>

        <div className="border-t border-white/10">
          {services.map((s, i) => (
            <motion.div
              key={s.n}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="relative group border-b border-white/10 py-8 md:py-12 grid grid-cols-12 gap-4 md:gap-6 items-center cursor-pointer overflow-hidden"
              data-testid={`service-row-${i}`}
            >
              <AnimatePresence>
                {hover === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.15 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: "url(https://images.unsplash.com/photo-1590503002120-e14b164def47?w=1600&q=80)", filter: "grayscale(1)" }}
                  />
                )}
              </AnimatePresence>
              <span className="col-span-2 md:col-span-1 font-mono text-xs md:text-sm text-zinc-600">{s.n}</span>
              <div className="col-span-10 md:col-span-5">
                <motion.h3
                  animate={{ x: hover === i ? 12 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="font-display font-bold text-3xl md:text-5xl lg:text-6xl tracking-tighter"
                >
                  {s.title}
                </motion.h3>
              </div>
              <p className="hidden md:block md:col-span-4 text-zinc-400 text-base font-light">{s.desc}</p>
              <div className="col-span-12 md:col-span-2 flex md:justify-end items-center mt-2 md:mt-0">
                <motion.div
                  animate={{ rotate: hover === i ? 45 : 0, scale: hover === i ? 1.1 : 1 }}
                  className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center"
                >
                  <ArrowUpRight size={18} />
                </motion.div>
              </div>
              <p className="col-span-12 text-zinc-500 md:hidden text-sm font-light">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
