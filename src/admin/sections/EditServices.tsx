import { useState, useEffect } from "react";
import { usePortfolioData, API_BASE_URL } from "@/hooks/usePortfolioData";
import { toast } from "sonner";
import { Plus, Trash2, Save, Edit2, X, Loader2 } from "lucide-react";
import RippleButton from "@/components/ui/RippleButton";

const ICON_OPTIONS = ["Layout", "Server", "Code", "Video", "Database", "Sparkles", "Globe", "Zap"];
const COLOR_OPTIONS = [
  { label: "Primary", value: "hsl(var(--primary))" },
  { label: "Emerald", value: "#10b981" },
  { label: "Amber", value: "#f59e0b" },
  { label: "Blue", value: "#3b82f6" },
  { label: "Violet", value: "#8b5cf6" },
  { label: "Rose", value: "#f43f5e" },
];

const EditServices = () => {
  const { data, isLoading, refetch } = usePortfolioData();
  const [addingNew, setAddingNew] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({ title: "", description: "", icon: "Code", color: "#3b82f6" });
  const [saving, setSaving] = useState(false);

  const startEdit = (service: any) => {
    setFormData(service);
    setEditingId(service._id);
    setAddingNew(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const isNew = addingNew;
    const url = isNew
      ? `${API_BASE_URL}/portfolio/services`
      : `${API_BASE_URL}/portfolio/services/${editingId}`;

    try {
      const response = await fetch(url, {
        method: isNew ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(isNew ? "Service added!" : "Service updated!");
        setAddingNew(false);
        setEditingId(null);
        refetch();
      } else {
        toast.error("Failed to save service");
      }
    } catch {
      toast.error("Backend connection error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await fetch(`${API_BASE_URL}/portfolio/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      });
      toast.success("Service deleted");
      refetch();
    } catch {
      toast.error("Error deleting");
    }
  };

  if (isLoading) return <Loader2 className="animate-spin text-primary mx-auto mt-20" size={40} />;

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">What you offer, listed on the homepage.</p>
        </div>
        <RippleButton onClick={() => { setAddingNew(true); setEditingId(null); setFormData({ title: "", description: "", icon: "Code", color: "#3b82f6" }); }} className="w-full sm:w-auto rounded-full px-6 bg-primary text-primary-foreground flex items-center justify-center gap-2 font-bold py-3 text-sm sm:text-base">
          <Plus size={18} /> Add Service
        </RippleButton>
      </div>

      {(addingNew || editingId) && (
        <div className="p-8 rounded-[2.5rem] bg-card border border-primary/20 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">{addingNew ? "New Service" : "Edit Service"}</h2>
            <button onClick={() => { setAddingNew(false); setEditingId(null); }}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</label>
              <input required value={formData.title || ""} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Icon</label>
              <select value={formData.icon} onChange={e => setFormData({ ...formData, icon: e.target.value })} className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary">
                {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea required value={formData.description || ""} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary h-24" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Color</label>
              <select value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary">
                {COLOR_OPTIONS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
            <div className="flex items-end justify-end">
              <RippleButton type="submit" disabled={saving} className="w-full px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center justify-center gap-2 shadow-xl shadow-primary/20">
                {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Save Service
              </RippleButton>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {data.services?.map((service: any) => (
          <div key={service._id} className="p-5 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-card border border-border/50 flex flex-col sm:flex-row gap-4 items-start relative sm:static">
            <div className="flex w-full sm:w-auto items-center justify-between sm:block">
              <div className="w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center" style={{ background: `${service.color}20`, color: service.color }}>
                <span className="text-xs font-bold">{service.icon}</span>
              </div>
              <div className="flex gap-1 sm:hidden">
                <button onClick={() => startEdit(service)} className="p-2 hover:bg-primary/10 text-primary rounded-lg"><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(service._id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"><Trash2 size={16} /></button>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-lg">{service.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-3 sm:line-clamp-2">{service.description}</p>
            </div>
            <div className="hidden sm:flex gap-2 shrink-0">
              <button onClick={() => startEdit(service)} className="p-2 hover:bg-primary/10 text-primary rounded-lg"><Edit2 size={16} /></button>
              <button onClick={() => handleDelete(service._id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditServices;
