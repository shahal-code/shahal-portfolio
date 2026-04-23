import { useState } from "react";
import { usePortfolioData, API_BASE_URL } from "@/hooks/usePortfolioData";
import { toast } from "sonner";
import { Plus, Trash2, Edit2, Save, X, Loader2, ExternalLink } from "lucide-react";
import RippleButton from "@/components/ui/RippleButton";

const EditProjects = () => {
  const { data, isLoading, refetch } = usePortfolioData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addingNew, setAddingNew] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const startEdit = (project: any) => {
    setFormData(project);
    setEditingId(project._id);
    setAddingNew(false);
  };

  const startNew = () => {
    setFormData({ title: "", description: "", tags: [], image: "", github: "", demo: "" });
    setAddingNew(true);
    setEditingId(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const url = addingNew 
      ? `${API_BASE_URL}/portfolio/projects` 
      : `${API_BASE_URL}/portfolio/projects/${editingId}`;
    
    try {
      const response = await fetch(url, {
        method: addingNew ? "POST" : "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(addingNew ? "Project added!" : "Project updated!");
        setAddingNew(false);
        setEditingId(null);
        refetch();
      } else {
        toast.error("Failed to save project");
      }
    } catch (err) {
      toast.error("Error connecting to backend");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/projects/${id}`, {
        method: "DELETE",
        headers: { 
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        }
      });

      if (response.ok) {
        toast.success("Project deleted");
        refetch();
      } else {
        toast.error("Deletion failed");
      }
    } catch (err) {
      toast.error("Error connecting to backend");
    }
  };

  if (isLoading) return <Loader2 className="animate-spin text-primary mx-auto mt-20" size={40} />;

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Mini Projects</h1>
          <p className="text-muted-foreground mt-1 text-sm sm:text-base">Manage the projects showcase on your homepage.</p>
        </div>
        <RippleButton onClick={startNew} className="w-full sm:w-auto rounded-full px-6 bg-primary text-primary-foreground flex items-center justify-center gap-2 font-bold py-3 text-sm sm:text-base">
          <Plus size={18} /> Add New Project
        </RippleButton>
      </div>

      {(addingNew || editingId) && (
        <div className="p-8 rounded-[2.5rem] bg-card border border-primary/20 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">{addingNew ? "New Project" : "Edit Project"}</h2>
            <button onClick={() => { setAddingNew(false); setEditingId(null); }} className="p-2 hover:bg-muted rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Title</label>
              <input 
                required
                value={formData.title || ""} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Image URL</label>
              <input 
                required
                value={formData.image || ""} 
                onChange={e => setFormData({...formData, image: e.target.value})}
                className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Description</label>
              <textarea 
                required
                value={formData.description || ""} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary h-24"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">GitHub URL</label>
              <input 
                value={formData.github || ""} 
                onChange={e => setFormData({...formData, github: e.target.value})}
                className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Live Demo URL</label>
              <input 
                value={formData.demo || ""} 
                onChange={e => setFormData({...formData, demo: e.target.value})}
                className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Tags (comma separated)</label>
              <input 
                value={Array.isArray(formData.tags) ? formData.tags.join(", ") : formData.tags || ""} 
                onChange={e => setFormData({...formData, tags: e.target.value.split(",").map((s: string) => s.trim())})}
                className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
                placeholder="React, TypeScript, Tailwind"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4">
              <RippleButton disabled={saving} type="submit" className="px-10 py-4 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center gap-2">
                {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                Save Project
              </RippleButton>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {data.projects.map((project: any) => (
          <div key={project._id} className="p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] bg-card border border-border/50 flex flex-col gap-3 sm:gap-4 transition-all hover:border-primary/20">
            <div className="h-40 sm:h-48 rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
              <img src={project.image} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 px-1">
              <h3 className="text-lg sm:text-xl font-bold">{project.title}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
            </div>
            <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/50">
              <div className="flex gap-1 sm:gap-2">
                 <button onClick={() => startEdit(project)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"><Edit2 size={16} className="sm:w-[18px] sm:h-[18px]" /></button>
                 <button onClick={() => handleDelete(project._id)} className="p-2 hover:bg-destructive/10 text-destructive rounded-lg transition-colors"><Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" /></button>
              </div>
              <div className="flex items-center gap-3">
                {project.github && <ExternalLink size={14} className="text-muted-foreground" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditProjects;
