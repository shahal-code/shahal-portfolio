import { useState, useEffect, useRef } from "react";
import { usePortfolioData, API_BASE_URL } from "@/hooks/usePortfolioData";
import { toast } from "sonner";
import { Plus, Trash2, Save, X, Loader2 } from "lucide-react";
import RippleButton from "@/components/ui/RippleButton";
import IconRenderer, { AVAILABLE_ICONS } from "@/components/IconRenderer";
import { Search } from "lucide-react";

const EditSkills = () => {
  const { data, isLoading, refetch } = usePortfolioData();
  const [addingNew, setAddingNew] = useState(false);
  const [formData, setFormData] = useState<any>({ name: "", icon: "", category: "Frontend" });
  const [saving, setSaving] = useState(false);
  const [iconSearch, setIconSearch] = useState("");
  const [showIconBrowser, setShowIconBrowser] = useState(false);
  const iconBrowserRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (iconBrowserRef.current && !iconBrowserRef.current.contains(event.target as Node)) {
        setShowIconBrowser(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/skills`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Skill added!");
        setAddingNew(false);
        setFormData({ name: "", icon: "", category: "Frontend" });
        refetch();
      } else {
        toast.error("Failed to add skill");
      }
    } catch (err) {
      toast.error("Error connecting to backend");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this skill?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/skills/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${localStorage.getItem("admin_token")}` }
      });
      if (response.ok) {
        toast.success("Skill removed");
        refetch();
      }
    } catch (err) {
      toast.error("Error");
    }
  };

  if (isLoading) return <Loader2 className="animate-spin text-primary mx-auto mt-20" />;

  const categories = ["Frontend", "Backend", "Database", "Styling", "Tools", "Design"];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Technical Skills</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage your expertise and tech stack.</p>
        </div>
        <RippleButton onClick={() => setAddingNew(true)} className="w-full sm:w-auto rounded-full px-6 bg-primary text-primary-foreground flex items-center justify-center gap-2 font-bold py-3 text-sm sm:text-base">
          <Plus size={18} /> Add Skill
        </RippleButton>
      </div>

      {addingNew && (
        <div className="p-8 rounded-[2.5rem] bg-card border border-primary/20 animate-fade-in shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">New Skill</h2>
            <button onClick={() => setAddingNew(false)}><X size={20} /></button>
          </div>
          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Skill Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2 relative">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Icon Name</label>
              <div className="flex gap-2">
                <div className="relative flex-1" ref={iconBrowserRef}>
                  <input 
                    required 
                    value={formData.icon} 
                    onFocus={() => setShowIconBrowser(true)}
                    onChange={e => {
                      setFormData({...formData, icon: e.target.value});
                      setIconSearch(e.target.value);
                    }} 
                    className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary pr-10" 
                    placeholder="Search or type icon..." 
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Search size={16} />
                  </div>
                  {showIconBrowser && (
                    <div className="absolute top-full left-0 right-0 mt-2 p-5 bg-card/95 backdrop-blur-xl border border-primary/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[100] max-h-[350px] overflow-y-auto custom-scrollbar">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                        {AVAILABLE_ICONS.filter(i => i.toLowerCase().includes(iconSearch.toLowerCase())).map(icon => (
                          <button
                            key={icon}
                            type="button"
                            onClick={() => {
                              setFormData({...formData, icon});
                              setShowIconBrowser(false);
                            }}
                            className="group p-3 rounded-2xl hover:bg-primary/20 flex flex-col items-center justify-center gap-2 transition-all border border-border/20 hover:border-primary/40 bg-background/50 overflow-hidden"
                          >
                            <div className="w-8 h-8 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-110">
                              <IconRenderer name={icon} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-[10px] truncate w-full text-muted-foreground group-hover:text-foreground font-semibold text-center">{icon}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-12 h-12 flex items-center justify-center bg-background border border-border/50 rounded-xl text-primary">
                  <IconRenderer name={formData.icon} />
                </div>
              </div>
            </div>
            <div className="md:col-span-3 flex justify-end">
               <RippleButton type="submit" disabled={saving} className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center gap-2 shadow-xl shadow-primary/20">
                 {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Save Skill
               </RippleButton>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {data.skills.map((skill: any) => (
          <div key={skill._id} className="relative group p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-card border border-border/50 flex flex-col items-center gap-2 sm:gap-3 text-center transition-all hover:border-primary/30">
            <button onClick={() => handleDelete(skill._id)} className="absolute top-2 right-2 p-1.5 bg-destructive/10 text-destructive rounded-lg opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <Trash2 size={12} className="sm:w-3.5 sm:h-3.5" />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-primary">
              <IconRenderer name={skill.icon} className="w-full h-full" />
            </div>
            <div>
              <p className="font-bold text-xs sm:text-sm tracking-tight truncate w-full max-w-[100px]">{skill.name}</p>
              <p className="text-[8px] sm:text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5 sm:mt-1">{skill.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditSkills;
