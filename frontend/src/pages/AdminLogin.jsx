import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";
import { api, formatApiErrorDetail } from "@/lib/api";
import { toast } from "sonner";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/admin/login", { email, password });
      localStorage.setItem("spynad_admin_token", data.access_token);
      localStorage.setItem("spynad_admin_email", data.email);
      toast.success("Welcome back.");
      nav("/admin");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6" data-testid="admin-login-page">
      <div className="absolute inset-0 noise-layer" />
      <motion.div
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
        className="relative w-full max-w-md"
      >
        <a href="/" className="inline-flex items-center gap-2 mb-10">
          <div className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center font-display font-black">S</div>
          <span className="font-display font-bold text-2xl">spynad</span>
        </a>

        <div className="flex items-center gap-2 text-zinc-500 text-xs font-mono tracking-widest uppercase mb-4">
          <Lock size={12} /> Admin Console
        </div>
        <h1 className="font-display font-black text-5xl tracking-tighter mb-10">Sign in.</h1>

        <form onSubmit={submit} className="space-y-8" data-testid="admin-login-form">
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Email</label>
            <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="input-line" placeholder="admin@spynad.com" data-testid="admin-email" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Password</label>
            <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="input-line" placeholder="••••••••" data-testid="admin-password" />
          </div>
          <button type="submit" disabled={loading} data-testid="admin-login-submit"
            className="glow-btn bg-white text-black rounded-full px-8 py-4 font-semibold text-sm inline-flex items-center gap-2 disabled:opacity-60">
            {loading ? "Signing in..." : "Enter"} <ArrowRight size={16} />
          </button>
        </form>
      </motion.div>
    </main>
  );
}
