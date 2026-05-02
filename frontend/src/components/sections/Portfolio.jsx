import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Unavo",
    category: "Food · Cloud Kitchen",
    image: "/unavo.png",
    year: "2025",
    span: "md:col-span-6",
    about: "Vibrant cloud kitchen brand launch with menu storytelling, conversion-first ordering UX, and rapid consumer appeal.",
  },
  {
    id: 2,
    title: "Reelio",
    category: "Video Production · Creative",
    image: "/reelio.png",
    year: "2025",
    span: "md:col-span-6",
    about: "Bold production studio showcase with cinematic portfolio presentation and motion-led brand positioning.",
  },
];

const collaborators = [
  "Emerald Associates",
  "Reelio",
  "Unavo",
  "Teenu Cabs",
  "Foreign Language Club",
  "Klutch Fitness",
  "Aries Gym",
  "Tiron World",
  "Qutemail",
  "Bartr",
];

export default function Portfolio() {
  const [open, setOpen] = useState(null);
  const collaboratorLoop = [...collaborators, ...collaborators];

  return (
    <section id="portfolio" className="relative py-5 md:py-7 bg-black" data-testid="portfolio-section">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-2">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 05 — Projects</p>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9]">
              Recent<br />
              <span className="text-stroke">ship-outs.</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-400 font-light">
            A curated slice. Full case studies available on request.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 mt-6">
          {projects.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setOpen(p)}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-2xl text-left bg-[#080808]"
              data-testid={`portfolio-item-${p.id}`}
              data-cursor="hover"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr] items-start">
                <div className="relative overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-auto object-contain transition-transform duration-[1200ms] ease-out group-hover:scale-105 filter grayscale contrast-[1.05] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="relative flex flex-col justify-start items-start bg-black/95 p-6 md:p-8">
                  <div className="w-full">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-5">
                      <span className="text-xs tracking-[0.2em] uppercase text-zinc-400 font-mono">{p.category}</span>
                      <span className="text-xs font-mono text-zinc-400">{p.year}</span>
                    </div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display font-black text-4xl md:text-5xl tracking-tighter leading-none text-white">{p.title}</h3>
                      <motion.div
                        whileHover={{ rotate: 45 }}
                        className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ArrowUpRight size={18} />
                      </motion.div>
                    </div>
                    <p className="mt-5 text-sm md:text-base text-zinc-300 leading-7">
                      {p.about}
                    </p>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-6 md:mt-8 border-y border-white/10 py-4 overflow-hidden" data-testid="collaborations-marquee">
          <div className="flex items-center justify-between gap-12 mb-8">
            <p className="text-xs tracking-[0.28em] uppercase text-zinc-500 font-bold font-mono">Our collaborations</p>
            <div className="hidden md:block h-px flex-1 bg-white/10" />
          </div>
          <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "34s" }}>
            {collaboratorLoop.map((name, index) => (
              <div key={`${name}-${index}`} className="flex items-center gap-12 px-10">
                <span className="font-display font-black uppercase tracking-tighter text-4xl md:text-6xl lg:text-7xl leading-none whitespace-nowrap text-white">
                  {name}
                </span>
                <span className="h-3 w-3 rounded-full bg-white shrink-0" />
              </div>
            ))}
          </div>
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
