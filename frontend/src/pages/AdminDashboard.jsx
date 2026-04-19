import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, formatApiErrorDetail } from "@/lib/api";
import { toast } from "sonner";
import { LogOut, Trash2, Mail, RefreshCcw } from "lucide-react";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = typeof window !== "undefined" ? localStorage.getItem("spynad_admin_email") : "";

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/contacts");
      setContacts(data);
    } catch (err) {
      if (err.response?.status === 401) {
        nav("/admin/login");
        return;
      }
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("spynad_admin_token");
    if (!token) { nav("/admin/login"); return; }
    load();
     
  }, []);

  const logout = () => {
    localStorage.removeItem("spynad_admin_token");
    localStorage.removeItem("spynad_admin_email");
    nav("/admin/login");
  };

  const del = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    try {
      await api.delete(`/admin/contacts/${id}`);
      setContacts((c) => c.filter((x) => x.id !== id));
      toast.success("Deleted.");
    } catch (err) {
      toast.error(formatApiErrorDetail(err.response?.data?.detail) || "Delete failed");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white" data-testid="admin-dashboard">
      <header className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-xl z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-display font-black text-sm">S</div>
            <div>
              <div className="font-display font-bold text-lg tracking-tight leading-none">spynad · admin</div>
              <div className="text-xs text-zinc-500 font-mono mt-0.5">{email}</div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={load} className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/5" data-testid="refresh-btn" aria-label="Refresh">
              <RefreshCcw size={15} />
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 border border-white/15 rounded-full px-4 py-2 text-sm hover:bg-white hover:text-black transition-colors" data-testid="logout-btn">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-12">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono">Inbox</p>
            <h1 className="font-display font-black text-4xl md:text-6xl tracking-tighter mt-2">Leads ({contacts.length})</h1>
          </div>
        </div>

        {loading ? (
          <div className="text-zinc-500 font-mono text-sm">Loading...</div>
        ) : contacts.length === 0 ? (
          <div className="border border-dashed border-white/10 rounded-2xl p-16 text-center">
            <Mail className="mx-auto text-zinc-600" />
            <p className="mt-4 text-zinc-500">No leads yet. Share the site to start collecting inquiries.</p>
          </div>
        ) : (
          <div className="border border-white/10 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-[0.2em] text-zinc-500 font-mono border-b border-white/10">
              <span className="col-span-2">Name</span>
              <span className="col-span-3">Email</span>
              <span className="col-span-2">Project</span>
              <span className="col-span-1">Budget</span>
              <span className="col-span-3">Message</span>
              <span className="col-span-1 text-right">Action</span>
            </div>
            {contacts.map((c) => (
              <div key={c.id} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-6 py-5 border-b border-white/5 last:border-0 hover:bg-white/[0.02]" data-testid={`contact-row-${c.id}`}>
                <div className="md:col-span-2"><div className="font-semibold">{c.name}</div><div className="text-xs text-zinc-500 font-mono md:hidden">{c.email}</div></div>
                <div className="md:col-span-3 text-zinc-300 text-sm font-mono hidden md:block truncate">{c.email}</div>
                <div className="md:col-span-2 text-zinc-400 text-sm">{c.project_type}</div>
                <div className="md:col-span-1 text-zinc-400 text-sm">{c.budget || "—"}</div>
                <div className="md:col-span-3 text-zinc-400 text-sm line-clamp-3">{c.message}</div>
                <div className="md:col-span-1 md:text-right flex md:block gap-2 items-center">
                  <span className="text-xs text-zinc-600 font-mono md:hidden">{new Date(c.created_at).toLocaleDateString()}</span>
                  <button onClick={() => del(c.id)} className="w-9 h-9 rounded-full border border-white/10 inline-flex items-center justify-center hover:bg-red-500/10 hover:border-red-500/40 hover:text-red-400 transition-colors" data-testid={`delete-${c.id}`} aria-label="Delete">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="md:col-span-12 text-xs text-zinc-600 font-mono hidden md:block">{new Date(c.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
