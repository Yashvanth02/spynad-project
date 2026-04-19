import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { api, formatApiErrorDetail } from "@/lib/api";
import { toast } from "sonner";
import MagneticButton from "@/components/MagneticButton";

const PROJECT_TYPES = ["Business Website", "eCommerce Store", "Portfolio Website", "Custom Web App", "Branding & Creatives", "Other"];
const BUDGETS = ["< $2k", "$2k–$5k", "$5k–$15k", "$15k+", "Not sure yet"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project_type: PROJECT_TYPES[0], budget: BUDGETS[2], message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email & message.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/contact", form);
      setDone(true);
      toast.success("Message sent. We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", project_type: PROJECT_TYPES[0], budget: BUDGETS[2], message: "" });
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-40 bg-black overflow-hidden" data-testid="contact-section">
      <div className="absolute inset-0 noise-layer" />
      <div className="beam top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-6">/ 07 — Final call</p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-black text-6xl md:text-8xl lg:text-[11vw] tracking-tighter uppercase leading-[0.88]"
          data-testid="contact-headline"
        >
          Let's build<br />
          something<br />
          <span className="text-stroke">people can't ignore.</span>
        </motion.h2>

        <div className="mt-20 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-zinc-400 font-light max-w-sm">
              Tell us about your project. We reply within 24 hours with next steps, timeline & a ballpark.
            </p>
            <div className="mt-10 space-y-4 text-sm font-mono text-zinc-400">
              <div className="flex gap-3"><Check size={16} className="text-white shrink-0 mt-0.5" /> Free 30-min strategy call</div>
              <div className="flex gap-3"><Check size={16} className="text-white shrink-0 mt-0.5" /> Fixed-price, fixed-timeline quote</div>
              <div className="flex gap-3"><Check size={16} className="text-white shrink-0 mt-0.5" /> Senior designer + dev on every project</div>
            </div>
          </div>

          <form onSubmit={submit} className="md:col-span-7 space-y-8" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Your name</label>
                <input className="input-line" value={form.name} onChange={update("name")} placeholder="Jane Doe" data-testid="contact-name" required />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Email</label>
                <input type="email" className="input-line" value={form.email} onChange={update("email")} placeholder="you@brand.com" data-testid="contact-email" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Project type</label>
                <select className="input-line appearance-none bg-black" value={form.project_type} onChange={update("project_type")} data-testid="contact-project-type">
                  {PROJECT_TYPES.map((t) => <option key={t} value={t} className="bg-black">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Budget</label>
                <select className="input-line appearance-none bg-black" value={form.budget} onChange={update("budget")} data-testid="contact-budget">
                  {BUDGETS.map((t) => <option key={t} value={t} className="bg-black">{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Tell us about your project</label>
              <textarea rows={4} className="input-line resize-none" value={form.message} onChange={update("message")} placeholder="Goals, audience, deadlines..." data-testid="contact-message" required />
            </div>

            <MagneticButton
              type="submit"
              disabled={submitting || done}
              data-testid="contact-submit"
              className="glow-btn bg-white text-black rounded-full px-10 py-5 font-semibold text-base disabled:opacity-60"
            >
              {done ? "Sent ✓" : submitting ? "Sending..." : "Send the brief"}
              {!done && !submitting && <ArrowRight size={18} />}
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}
