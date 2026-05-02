import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Business Websites",
    desc: "High-converting marketing sites engineered for speed, SEO & scale.",
    tags: ["CMS", "SEO", "Analytics"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80",
    detail: "We build sharp, conversion-focused websites for service brands, startups and B2B teams that need clarity, authority and measurable inbound growth.",
    deliverables: ["Brand-led UI system", "SEO-ready page architecture", "CMS editing flow", "Analytics and lead tracking", "Conversion optimization", "Performance and speed"],
    stats: ["2-5 weeks", "Core Web Vitals", "Lead-gen first"],
  },
  {
    n: "02",
    title: "eCommerce Stores",
    desc: "Shopify, custom & headless storefronts optimized to sell.",
    tags: ["Shopify", "Stripe", "Headless"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&q=80",
    detail: "From polished Shopify builds to headless storefronts, we shape commerce experiences that make discovery, product education and checkout feel effortless.",
    deliverables: ["Product and collection UX", "Checkout and payment setup", "Campaign landing pages", "Conversion tracking", "Inventory & fulfillment flow", "Revenue analytics"],
    stats: ["Shopify + custom", "Fast checkout", "CRO focused"],
  },
  {
    n: "03",
    title: "Portfolio Websites",
    desc: "Editorial, immersive sites that turn your work into a statement.",
    tags: ["Editorial", "Motion", "3D"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1400&q=80",
    detail: "For creators, studios and premium personal brands, we create expressive portfolio systems where case studies, motion and content direction do the selling.",
    deliverables: ["Case study structure", "Motion-led storytelling", "Media-rich project pages", "Simple content updates", "Brand narrative", "Interactive visuals"],
    stats: ["Editorial feel", "Motion detail", "Creator-ready"],
  },
  {
    n: "04",
    title: "Custom Web Solutions",
    desc: "SaaS, dashboards, APIs & full-stack apps built end-to-end.",
    tags: ["React", "FastAPI", "DB"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80",
    detail: "When the product needs more than pages, we design and engineer full-stack web systems with clean interfaces, dependable APIs and launch-ready workflows.",
    deliverables: ["Product UX and dashboards", "API and database design", "Auth and user roles", "Deployment support", "Workflow automation", "Scaling infrastructure"],
    stats: ["Full-stack", "Scalable base", "Workflow-first"],
  },
];

export default function Services() {
  const [hover, setHover] = useState(null);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const goToContact = () => {
    setOpen(null);
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <section id="services" className="relative py-20 md:py-32 bg-black" data-testid="services-section">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 02 — Services</p>
            <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9]">
              What we<br />
              <span className="text-stroke">engineer</span>
            </h2>
          </div>
          <p className="max-w-xs text-zinc-400 font-light">
            Four verticals, one obsession: building digital products that outperform the room.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s, i) => (
            <motion.button
              key={s.n}
              type="button"
              onClick={() => setOpen(s)}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
              className="relative group overflow-hidden border border-white/10 bg-[#030303] p-4 text-left transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
              data-testid={`service-row-${i}`}
              data-cursor="hover"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(135deg,rgba(255,255,255,0.10),transparent_36%)]" />
              <div className="relative flex h-full min-h-[520px] flex-col">
                <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/[0.03]">
                  <motion.img
                    src={s.image}
                    alt=""
                    className="h-full w-full object-cover grayscale contrast-125 opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100"
                    animate={{ scale: hover === i ? 1.08 : 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute left-4 top-4 font-mono text-xs text-zinc-300">{s.n}</div>
                </div>

                <div className="flex flex-1 flex-col justify-between px-1 pb-1 pt-6">
                  <div>
                    <div>
                      <motion.h3
                        animate={{ x: hover === i ? 8 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="font-display font-black text-3xl md:text-4xl tracking-tighter leading-[0.94]"
                      >
                        {s.title}
                      </motion.h3>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {s.tags.map((tag) => (
                          <span key={tag} className="border border-white/15 px-3 py-2 text-[11px] font-mono text-zinc-400 uppercase tracking-[0.16em]">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors font-light leading-relaxed mt-5 text-sm">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-8 flex justify-end border-t border-white/10 pt-5">
                    <motion.span
                      animate={{ scale: hover === i ? 1.03 : 1 }}
                      className="inline-flex shrink-0 items-center overflow-hidden rounded-full border border-white/15 bg-black text-zinc-500 transition-colors group-hover:bg-white group-hover:text-black group-hover:border-white"
                    >
                      <span className="px-5 text-xs font-mono uppercase tracking-[0.18em] transition-colors">
                        Details
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center border-l border-white/15 group-hover:border-black/15">
                        <motion.span animate={{ rotate: hover === i ? 45 : 0 }}>
                          <ArrowRight size={17} />
                        </motion.span>
                      </span>
                    </motion.span>
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[220] bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setOpen(null)}
            data-testid="service-modal"
          >
            <motion.div
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative w-full max-w-5xl h-[calc(100vh-2rem)] md:h-[680px] md:max-h-[calc(100vh-4rem)] overflow-hidden border border-white/15 bg-[#050505] shadow-[0_0_120px_rgba(255,255,255,0.08)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="service-modal-title"
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white hover:text-black"
                aria-label="Close service details"
                data-testid="service-modal-close"
              >
                <X size={16} />
              </button>
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,0.12),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_38%)]" />
              <div className="relative grid h-full min-h-0 md:grid-cols-12">
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 p-6 md:p-8 lg:p-10 flex min-h-0 flex-col gap-8">
                  <div>
                    <p className="text-xs tracking-[0.28em] uppercase text-zinc-500 font-bold font-mono">/ Service {open.n}</p>
                  </div>

                  <div className="aspect-[16/10] md:aspect-auto md:flex-1 md:min-h-0 overflow-hidden border border-white/10 bg-white/[0.03]">
                    <img
                      src={open.image}
                      alt={open.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 id="service-modal-title" className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-[0.92] mt-6">
                      {open.title}
                    </h3>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {open.tags.map((tag) => (
                        <span key={tag} className="border border-white/15 px-3 py-2 text-xs font-mono text-zinc-300 uppercase tracking-[0.16em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 p-6 md:p-8 lg:p-10 flex min-h-0 flex-col">
                  <div>
                    <p className="text-zinc-400 font-light text-base md:text-lg leading-relaxed">
                      {open.detail}
                    </p>
                  </div>

                  <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {open.deliverables.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 + index * 0.06 }}
                        className="border border-white/10 bg-[#050505] p-6 h-32 flex items-center justify-center text-center"
                      >
                        <p className="text-zinc-300 font-medium leading-tight">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col md:flex-row gap-5 md:items-center md:justify-between border-t border-white/10 pt-6">
                    <p className="text-sm text-zinc-500 font-light max-w-md">
                      Want this built around your brand, product and launch goals?
                    </p>
                    <button
                      type="button"
                      onClick={goToContact}
                      className="glow-btn shrink-0 bg-white text-black rounded-full px-7 py-4 font-semibold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 transition-transform"
                      data-testid="service-contact-button"
                    >
                      Contact us
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
