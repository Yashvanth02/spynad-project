import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });
  const ref = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    setVisible(true);

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target;
      if (!el) return;
      const interactive = el.closest("a, button, [role='button'], input, textarea, .magnetic, [data-cursor='hover']");
      setHovering(!!interactive);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!visible) return null;

  return (
    <motion.div
      ref={ref}
      style={{ translateX: sx, translateY: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[9999] mix-blend-difference"
      data-testid="custom-cursor"
    >
      <motion.div
        animate={{ width: hovering ? 56 : 14, height: hovering ? 56 : 14, x: hovering ? -28 : -7, y: hovering ? -28 : -7 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="rounded-full bg-white"
      />
    </motion.div>
  );
}
