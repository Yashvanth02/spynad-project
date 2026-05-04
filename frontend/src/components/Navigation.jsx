import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#top" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#portfolio" },
  { label: "Contact Us", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-black/50 border-b border-white/5" : "bg-transparent"
        }`}
        data-testid="main-nav"
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          <a href="/" className="group flex h-full w-[104px] md:w-[162px] items-center justify-start overflow-visible" data-testid="logo">
            <img
              src="/SPYNAD logo.png"
              alt="Spynad logo"
              className="h-[104px] w-[104px] md:h-[162px] md:w-[162px] object-contain object-left transition-transform"
            />
          </a>

          <nav className="hidden md:flex items-center gap-11">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-${l.label.toLowerCase()}`}
                className="text-base lg:text-[17px] font-semibold text-zinc-300 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            data-testid="nav-cta"
            className="hidden md:inline-flex items-center gap-2 bg-white text-black rounded-full px-7 py-3 text-base font-semibold hover:scale-[1.03] transition-transform"
          >
            Let's Talk
          </a>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden w-10 h-10 rounded-full border border-white/15 flex items-center justify-center"
            data-testid="nav-menu-open"
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu size={18} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] min-h-dvh overflow-y-auto bg-black md:hidden"
            data-testid="mobile-nav"
          >
            <div className="flex items-center justify-between px-5 py-4">
              <img src="/SPYNAD logo.png" alt="Spynad logo" className="h-20 w-20 object-contain object-left" />
              <button onClick={() => setOpen(false)} data-testid="nav-menu-close" aria-label="Close menu">
                <X size={22} />
              </button>
            </div>
            <div className="flex flex-col px-5 pt-8 gap-5">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-3xl sm:text-4xl font-display font-bold leading-none">
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setOpen(false)} className="mt-8 bg-white text-black rounded-full py-4 text-center font-semibold">
                Let's Talk
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
