import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="App grain">
      <AnimatePresence mode="wait">
        {loading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

export default App;
