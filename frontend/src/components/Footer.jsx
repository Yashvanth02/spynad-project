export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black" data-testid="footer">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 items-start">
        <div className="col-span-2">
          <div className="flex items-start">
            <img src="/SPYNAD logo.png" alt="Spynad logo" className="h-[126px] w-[126px] object-contain -mt-8" />
          </div>
          <p className="mt-4 text-zinc-500 text-sm max-w-sm">
            A digital atelier crafting high-performance websites, brand systems & motion for bold brands.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-bold">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li><a href="#top" className="hover:text-white">Home</a></li>
            <li><a href="#about" className="hover:text-white">About Us</a></li>
            <li><a href="#services" className="hover:text-white">Services</a></li>
            <li><a href="#portfolio" className="hover:text-white">Projects</a></li>
            <li><a href="#contact" className="hover:text-white">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-600 font-bold">Connect</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-300">
            <li><a href="mailto:spynadmarketing@gmail.com" className="hover:text-white">spynadmarketing@gmail.com</a></li>
            <li><a href="#contact" className="text-white font-semibold hover:text-zinc-100">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 py-4 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-zinc-600">
          <span>© {new Date().getFullYear()} Spynad. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
