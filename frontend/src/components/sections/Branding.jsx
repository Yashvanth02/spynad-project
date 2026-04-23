const ITEMS = ["Logo Design", "Social Creatives", "Video Editing", "Motion Graphics", "Brand Systems", "Campaign Design", "3D Visuals"];

export default function Branding() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <section className="relative py-24 md:py-32 bg-black overflow-hidden" data-testid="branding-section">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 mb-12">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-4">/ 05 — Beyond Web</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-[0.9]">
            Brand &<br /><span className="text-stroke">creatives.</span>
          </h2>
          <p className="max-w-sm text-zinc-400 font-light">
            Websites are the home. We also build the world around them — logos, campaigns, social, motion and video.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="marquee-track">
          {doubled.map((t, i) => (
            <div key={i} className="flex items-center gap-10 px-10">
              <span className="font-display font-black uppercase tracking-tighter text-[14vw] md:text-[11vw] leading-none text-stroke whitespace-nowrap">
                {t}
              </span>
              <span className="w-4 h-4 rounded-full bg-white shrink-0" />
            </div>
          ))}
        </div>
      </div>

      <div className="marquee-track mt-6 md:mt-10" style={{ animationDirection: "reverse", animationDuration: "40s" }}>
        {doubled.map((t, i) => (
          <div key={i} className="flex items-center gap-10 px-10">
            <span className="font-display font-black uppercase tracking-tighter text-[14vw] md:text-[11vw] leading-none text-white whitespace-nowrap">
              {t}
            </span>
            <span className="w-4 h-4 rounded-full border border-white shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
