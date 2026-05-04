import { motion } from "framer-motion";

const metrics = [
  { value: "60+", label: "Projects shipped" },
  { value: "4.9", label: "Average rating" },
  { value: "100%", label: "Launch focus" },
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-14 md:py-32" data-testid="about-section">
      <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(120deg,rgba(255,255,255,0.08),transparent_30%,transparent_72%,rgba(255,255,255,0.04))]" />

      <div className="relative max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-8 md:mb-10"
        >
          / 01 - About Us
        </motion.p>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="max-w-4xl">
              <p className="text-zinc-100 text-4xl sm:text-5xl lg:text-7xl font-display font-black uppercase tracking-tighter leading-[0.92] lg:leading-[0.9]">
                Websites,<br />
                <span className="text-stroke">brands & motion</span>
              </p>
              <p className="mt-6 md:mt-8 max-w-2xl text-zinc-300 text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
                Spynad is a web and creative studio building websites, stores, brand systems and campaign assets for teams that want sharper digital presence.
              </p>
              <p className="mt-5 max-w-xl text-zinc-500 font-light leading-relaxed">
                We combine strategy, interface design, motion and engineering so your online presence feels premium, performs fast and converts with intent.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="group relative overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/15 p-4 md:p-6 bg-white/5 shadow-[0_0_80px_rgba(0,0,0,0.25)] transition-all duration-500 ease-out hover:bg-white/95">
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(255,255,255,0.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.2) 1px,transparent 1px)] bg-[length:70px_70px] opacity-40 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.16),transparent_35%)] opacity-80 group-hover:opacity-100" />
              <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full border border-white/10 blur-xl" />
              <div className="pointer-events-none absolute -right-6 -bottom-6 h-20 w-20 rounded-full border border-white/10 blur-xl" />
              <motion.div
                initial={{ rotate: 0, scale: 1, opacity: 0.96 }}
                animate={{ rotate: [0, 2, 0], scale: [1, 1.02, 1], opacity: [0.96, 1, 0.96] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1 }}
                className="relative z-10 h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72"
              >
                <img
                  src="/whitelogowithbg.png"
                  alt="Spynad white logo"
                  className="absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ease-out group-hover:opacity-0"
                />
                <img
                  src="/blacklogowithng.png"
                  alt="Spynad black logo"
                  className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
              whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.98)" }}
              className="group min-h-36 md:min-h-44 p-6 md:p-8 bg-black text-white flex flex-col items-center justify-center text-center transition-colors"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 180, damping: 18, delay: index * 0.08 }}
                className="font-display font-black text-5xl md:text-6xl tracking-tighter transition-colors duration-300 group-hover:text-black"
              >
                {metric.value}
              </motion.div>
              <div className="text-xs text-zinc-500 group-hover:text-black tracking-[0.22em] uppercase mt-3 font-mono transition-colors duration-300">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
