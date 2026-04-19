export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black" data-testid="footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-display font-black">S</div>
            <span className="font-display font-bold text-2xl">spynad</span>
          </div>
          <p className="mt-4 text-zinc-500 text-sm max-w-sm">
            A digital atelier crafting high-performance websites, brand systems & motion for bold brands.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-bold">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#portfolio" className="hover:text-white">Work</a></li>
            <li><a href="#process" className="hover:text-white">Process</a></li>
            <li><a href="/admin/login" className="hover:text-white">Admin</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-bold">Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li><a href="mailto:hello@spynad.com" className="hover:text-white">hello@spynad.com</a></li>
            <li><a href="#contact" className="hover:text-white">Get a quote</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Spynad. All rights reserved.</span>
          <span className="font-mono">v1.0 · built for the brave</span>
        </div>
      </div>
    </footer>
  );
}
