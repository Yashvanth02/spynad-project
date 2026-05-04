import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import MagneticButton from "@/components/MagneticButton";

const PROJECT_TYPES = ["Business Website", "eCommerce Store", "Custom Web App", "Automation", "Social Media Marketing", "Logo & Poster Design", "Video Production"];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", project_type: PROJECT_TYPES[0], message: "" });
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.project_type || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Construct WhatsApp message
    const whatsappMessage = `Hi, I'm ${form.name}. Email: ${form.email}. Contact number: ${form.phone}. Project: ${form.project_type}. Message: ${form.message}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(whatsappMessage)}`; // Replace 1234567890 with your actual WhatsApp number

    // Construct email
    const emailSubject = `New Project Inquiry from ${form.name}`;
    const emailBody = `Name: ${form.name}\nEmail: ${form.email}\nContact Number: ${form.phone}\nProject Type: ${form.project_type}\n\nMessage:\n${form.message}`;
    const emailUrl = `mailto:hello@spynad.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Open email client
    window.open(emailUrl, '_blank');

    setDone(true);
    toast.success("Opening WhatsApp and email. We'll be in touch!");
    setForm({ name: "", email: "", phone: "", project_type: PROJECT_TYPES[0], message: "" });
  };

  return (
    <section id="contact" className="relative py-20 md:py-32 bg-black overflow-hidden" data-testid="contact-section">
      <div className="absolute inset-0 noise-layer" />
      <div className="beam top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-white/5" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12">
        <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-bold font-mono mb-6">/ 07 — Final call</p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display font-black text-[3.25rem] sm:text-6xl md:text-8xl lg:text-[11vw] tracking-tighter uppercase leading-[0.92] md:leading-[0.88]"
          data-testid="contact-headline"
        >
          Let's build<br />
          something<br />
          <span className="text-stroke">people can't ignore.</span>
        </motion.h2>

        <div className="mt-12 md:mt-20 grid md:grid-cols-12 gap-10 md:gap-12">
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

          <form onSubmit={submit} className="md:col-span-7 space-y-7 md:space-y-8" data-testid="contact-form">
            <div className="grid sm:grid-cols-2 gap-7 md:gap-8">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Your name</label>
                <input className="input-line" value={form.name} onChange={update("name")} placeholder="Jane Doe" data-testid="contact-name" required />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Email</label>
                <input type="email" className="input-line" value={form.email} onChange={update("email")} placeholder="you@brand.com" data-testid="contact-email" required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-7 md:gap-8">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Contact number</label>
                <input type="tel" className="input-line" value={form.phone} onChange={update("phone")} placeholder="+91 98765 43210" data-testid="contact-phone" required />
              </div>
              <div className="relative">
                <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Project type</label>
                <select className="input-line appearance-none bg-black pr-10" value={form.project_type} onChange={update("project_type")} data-testid="contact-project-type" required>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t} className="bg-black">{t}</option>)}
                </select>
                <ChevronDown className="pointer-events-none absolute right-0 top-[50%] h-5 w-5 -translate-y-1/2 text-zinc-400" />
              </div>
            </div>

            <div>
              <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Tell us about your project</label>
              <textarea rows={4} className="input-line resize-none" value={form.message} onChange={update("message")} placeholder="Goals, audience, deadlines..." data-testid="contact-message" required />
            </div>

            <MagneticButton
              type="submit"
              disabled={done}
              data-testid="contact-submit"
              className="glow-btn w-full sm:w-auto justify-center bg-white text-black rounded-full px-8 sm:px-10 py-5 font-semibold text-base disabled:opacity-60"
            >
              {done ? "Sent ✓" : "Send the brief"}
              {!done && <ArrowRight size={18} />}
            </MagneticButton>
          </form>
        </div>
      </div>
    </section>
  );
}
