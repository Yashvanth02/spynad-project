import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const marketingServices = [
  {
    n: "01",
    title: "Social Media Marketing",
    short: "Campaign strategy, content calendars and performance loops for brands that need attention to turn into demand.",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=1200&q=80",
    tags: ["Strategy", "Content", "Growth"],
    detail: "We build social systems that make your brand easy to remember and hard to ignore: positioning, content pillars, posting rhythm, creative direction and performance review.",
    grid: ["Content calendar", "Platform strategy", "Ad-ready creatives", "Monthly optimization", "Audience research", "Performance reporting"],
    signal: "Organic + paid",
  },
  {
    n: "02",
    title: "Logo & Poster Design",
    short: "Identity marks, poster systems and campaign graphics shaped to feel sharp, memorable and premium.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    tags: ["Logo", "Posters", "Identity"],
    detail: "From a clean logo suite to launch posters and social-first graphics, we create visual systems that hold together across web, print, reels and campaigns.",
    grid: ["Logo directions", "Poster key visuals", "Social templates", "Brand usage kit", "Color and type system", "Export-ready assets"],
    signal: "Visual identity",
  },
  {
    n: "03",
    title: "Video Production",
    short: "Scroll-stopping reels, brand films, product videos and motion edits designed for clarity, retention and marketing impact.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&q=80",
    tags: ["Reels", "Motion", "Editing"],
    detail: "We plan, edit and polish marketing video assets that give your product or brand a cinematic pulse, from fast social edits to launch films and explainers.",
    grid: ["Script and storyboard", "Shoot planning", "Editing and grading", "Motion graphics", "Short-form cutdowns", "Sound and captions"],
    signal: "Video engine",
  },
  {
    n: "04",
    title: "Campaign Creatives",
    short: "Launch visuals, ad sets, landing-page assets and creative variations built around one clear conversion goal.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&q=80",
    tags: ["Ads", "Launch", "Funnels"],
    detail: "We connect design, copy and motion into campaign packs that can move across Meta ads, Google placements, landing pages and launch announcements.",
    grid: ["Creative concepts", "Ad variations", "Landing assets", "Campaign messaging", "Format adaptations", "Launch asset pack"],
    signal: "Launch ready",
  },
];

export default function MarketingServices() {
  const [active, setActive] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    if (!active) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setActive(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  const goToContact = () => {
    setActive(null);
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  return (
    <section id="marketing" className="relative overflow-hidden bg-black py-20 md:py-32" data-testid="marketing-section">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(115deg,rgba(255,255,255,0.06),transparent_28%,transparent_72%,rgba(255,255,255,0.04))]" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end mb-14 md:mb-20">
          <div className="md:col-span-7">
            <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 03 - Marketing Services</p>
            <h2 className="font-display font-black text-4xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.92] md:leading-[0.9]">
              What we<br />
              <span className="text-stroke">amplify</span>
            </h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-zinc-400 font-light max-w-sm">
            Creative marketing systems for the world around your website: social, identity, campaign visuals and video.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {marketingServices.map((service, index) => (
              <motion.button
                key={service.title}
                type="button"
                onClick={() => setActive(service)}
                onMouseEnter={() => setHover(index)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(index)}
                onBlur={() => setHover(null)}
                onTouchStart={() => setHover(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.75, delay: index * 0.08 }}
                className="group relative overflow-hidden border border-white/10 bg-black/70 p-3 sm:p-4 text-left transition-colors hover:border-white/25 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/70 focus-visible:ring-offset-4 focus-visible:ring-offset-black"
                data-testid={`marketing-card-${index}`}
                data-cursor="hover"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_34%)]" />
                <div className="relative flex min-h-[460px] sm:min-h-[500px] lg:min-h-[520px] flex-col">
                  <div className="relative aspect-[4/3] overflow-hidden border border-white/10 bg-white/[0.03]">
                    <motion.img
                      src={service.image}
                      alt=""
                      className="h-full w-full object-cover transition-all duration-700"
                      initial={{
                        filter: "grayscale(1) contrast(1.25) saturate(0)",
                        opacity: 0.75,
                      }}
                      whileInView={{
                        filter: "grayscale(0) contrast(1) saturate(1.35)",
                        opacity: 1,
                      }}
                      viewport={{ once: true, amount: 0.01 }}
                      animate={{
                        scale: hover === index ? 1.08 : 1,
                      }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"
                      initial={{ opacity: 1 }}
                      whileInView={{ opacity: 0.2 }}
                      viewport={{ once: true, amount: 0.01 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute left-4 top-4 font-mono text-xs text-zinc-300">{service.n}</div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between px-2 pb-2 pt-7">
                    <div>
                      <h3 className="font-display font-black text-[2rem] sm:text-3xl md:text-4xl tracking-tighter leading-[0.96]">
                        {service.title}
                      </h3>
                      <div className="mt-5 flex flex-wrap items-center gap-2">
                        {service.tags.map((tag) => (
                          <span key={tag} className="border border-white/15 px-3 py-2 text-[11px] font-mono text-zinc-400 uppercase tracking-[0.16em]">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <p className="text-zinc-500 group-hover:text-zinc-300 transition-colors font-light mt-5 text-sm leading-relaxed">
                        {service.short}
                      </p>
                    </div>

                    <div className="mt-8 flex justify-end border-t border-white/10 pt-5">
                      <span className="inline-flex shrink-0 items-center overflow-hidden rounded-full border border-white/15 bg-black text-zinc-500 transition-colors group-hover:bg-white group-hover:text-black group-hover:border-white">
                        <span className="px-5 text-xs font-mono uppercase tracking-[0.18em] transition-colors">
                          Details
                        </span>
                        <span className="flex h-11 w-11 items-center justify-center border-l border-white/15 transition-colors group-hover:border-black/15 group-hover:rotate-45">
                          <ArrowRight size={16} />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[220] bg-black/85 backdrop-blur-2xl flex items-center justify-center overflow-hidden p-2 sm:p-4 md:p-8"
            onClick={() => setActive(null)}
            data-testid="marketing-modal"
          >
            <motion.div
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 22, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
              onClick={(event) => event.stopPropagation()}
              className="relative h-[calc(100dvh-1rem)] w-full max-w-5xl overflow-hidden border border-white/15 bg-[#050505] shadow-[0_0_120px_rgba(255,255,255,0.08)] sm:h-[calc(100dvh-2rem)] md:h-[680px] md:max-h-[calc(100vh-4rem)]"
              role="dialog"
              aria-modal="true"
              aria-labelledby="marketing-modal-title"
            >
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(135deg,rgba(255,255,255,0.12),transparent_32%),linear-gradient(45deg,transparent_62%,rgba(255,255,255,0.06))]" />
              <div className="relative grid h-full min-h-0 grid-rows-[auto_1fr] md:grid-rows-1 md:grid-cols-12">
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-white/10 p-4 sm:p-5 md:p-8 lg:p-10 flex min-h-0 flex-col gap-3 sm:gap-4 md:gap-8">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[10px] md:text-xs tracking-[0.24em] md:tracking-[0.28em] uppercase text-zinc-500 font-bold font-mono">/ Marketing {active.n}</p>
                    <button
                      type="button"
                      onClick={() => setActive(null)}
                      className="flex h-9 w-9 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white transition-colors hover:bg-white hover:text-black"
                      aria-label="Close marketing details"
                      data-testid="marketing-modal-close"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  <div className="h-[28dvh] min-h-40 max-h-56 sm:min-h-48 md:h-auto md:aspect-auto md:flex-1 md:min-h-0 md:max-h-none overflow-hidden border border-white/10 bg-white/[0.03]">
                    <motion.img
                      src={active.image}
                      alt=""
                      initial={{ scale: 1.08, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div>
                    <h3 id="marketing-modal-title" className="font-display font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-[0.94] mt-1 md:mt-6">
                      {active.title}
                    </h3>
                    <div className="mt-3 md:mt-6 flex flex-wrap gap-2">
                      {active.tags.map((tag) => (
                        <span key={tag} className="border border-white/15 px-2.5 py-1.5 md:px-3 md:py-2 text-[10px] md:text-xs font-mono text-zinc-300 uppercase tracking-[0.14em] md:tracking-[0.16em]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-7 p-4 sm:p-5 md:p-8 lg:p-10 flex min-h-0 flex-col overflow-hidden">
                  <div>
                    <p className="text-zinc-400 font-light text-sm md:text-lg leading-6 md:leading-relaxed">
                      {active.detail}
                    </p>
                  </div>

                  <div className="mt-4 md:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                    {active.grid.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.14 + index * 0.06 }}
                        className="border border-white/10 bg-[#050505] p-2.5 md:p-6 min-h-14 md:h-32 flex items-center justify-center text-center"
                      >
                        <p className="text-zinc-300 text-xs md:text-base font-medium leading-tight">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-col md:flex-row gap-3 md:gap-5 md:items-center md:justify-between border-t border-white/10 pt-3 md:pt-6">
                    <p className="text-xs md:text-sm text-zinc-500 font-light max-w-md">
                      Need creative assets that move with your website and campaigns?
                    </p>
                    <button
                      type="button"
                      onClick={goToContact}
                      className="glow-btn shrink-0 bg-white text-black rounded-full px-5 md:px-7 py-3 md:py-4 font-semibold text-sm inline-flex items-center justify-center gap-2 whitespace-nowrap hover:scale-105 transition-transform"
                      data-testid="marketing-contact-button"
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
