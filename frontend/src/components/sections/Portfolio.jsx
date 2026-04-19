import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Monolith Studio",
    category: "Brand Site · Architecture",
    image: "https://images.unsplash.com/photo-1592839961515-64c68091f712?w=1600&q=80",
    year: "2025",
    span: "md:col-span-8",
    about: "Editorial, parallax-driven portfolio for a boutique architecture firm. Custom CMS + 3D hero.",
  },
  {
    id: 2,
    title: "Halo Cosmetics",
    category: "eCommerce · Beauty",
    image: "https://images.unsplash.com/photo-1631214524020-3c8167274cf5?w=1200&q=80",
    year: "2025",
    span: "md:col-span-4",
    about: "Headless Shopify storefront. Animated product stories & checkout optimization boosted CVR +38%.",
  },
  {
    id: 3,
    title: "Field & Foundry",
    category: "Business Site · B2B",
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&q=80",
    year: "2024",
    span: "md:col-span-5",
    about: "Lead-gen engine for a construction tech firm. 3x pipeline in 90 days post-launch.",
  },
  {
    id: 4,
    title: "Nocturne OS",
    category: "SaaS · Dashboard",
    image: "https://images.pexels.com/photos/8408538/pexels-photo-8408538.jpeg?auto=compress&w=1600&q=80",
    year: "2025",
    span: "md:col-span-7",
    about: "Full-stack analytics dashboard with real-time data, RBAC, and motion-driven onboarding.",
  },
];

export default function Portfolio() {
  const [open, setOpen] = useState(null);

  return (
    <section id="portfolio" className="relative py-24 md:py-40 bg-black" data-testid="portfolio-section">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 03 — Selected Work</p>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9]">
              Recent<br />
              <span className="text-stroke">ship-outs.</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-400 font-light">
            A curated slice. Full case studies available on request.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setOpen(p)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08 }}
              className={`group relative col-span-1 ${p.span} aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-2xl text-left`}
              data-testid={`portfolio-item-${p.id}`}
              data-cursor="hover"
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-105 group-hover:scale-110 transition-transform duration-[1200ms] ease-out"
                style={{ backgroundImage: `url(${p.image})`, filter: "grayscale(1) contrast(1.05)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-mono">{p.category}</span>
                  <span className="text-xs font-mono text-zinc-400">{p.year}</span>
                </div>
                <div className="flex justify-between items-end">
                  <h3 className="font-display font-black text-3xl md:text-5xl tracking-tighter leading-none">{p.title}</h3>
                  <motion.div
                    whileHover={{ rotate: 45 }}
                    className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowUpRight size={18} />
                  </motion.div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
            data-testid="portfolio-modal"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden"
            >
              <div className="relative aspect-[16/9] bg-cover bg-center" style={{ backgroundImage: `url(${open.image})`, filter: "grayscale(1)" }}>
                <button onClick={() => setOpen(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center" data-testid="close-modal"><X size={16}/></button>
              </div>
              <div className="p-8">
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 font-mono">{open.category} · {open.year}</p>
                <h3 className="font-display font-black text-4xl md:text-5xl tracking-tighter mt-3">{open.title}</h3>
                <p className="text-zinc-400 mt-4 font-light">{open.about}</p>
                <button onClick={() => { setOpen(null); document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); }}
                  className="mt-8 bg-white text-black rounded-full px-6 py-3 font-semibold text-sm inline-flex items-center gap-2 hover:scale-105 transition-transform">
                  Start a similar project <ArrowUpRight size={16}/>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
