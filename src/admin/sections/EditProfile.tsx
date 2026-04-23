import { useState, useEffect } from "react";
import { usePortfolioData } from "@/hooks/usePortfolioData";
import { toast } from "sonner";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import RippleButton from "@/components/ui/RippleButton";

const EditProfile = () => {
  const { data, isLoading, refetch } = usePortfolioData();
  const [formData, setFormData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.profile) {
      setFormData(data.profile);
    }
  }, [data]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch("http://localhost:5000/api/portfolio/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Profile updated successfully!");
        refetch();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (err) {
      toast.error("Error connecting to backend");
    } finally {
      setSaving(false);
    }
  };

  const updateNested = (key: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value
      }
    }));
  };

  if (isLoading || !formData) return <Loader2 className="animate-spin" />;

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Identity & Hero</h1>
        <p className="text-muted-foreground mt-1">Manage your name, role, and bio displayed in the Hero section.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Main Info Card */}
        <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
              <input
                value={formData.name || ""}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Professional Role</label>
              <input
                value={formData.role || ""}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Short Bio (Hero)</label>
            <textarea
              value={formData.bio || ""}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all h-24"
            />
          </div>
        </div>

        {/* About Section Info */}
        <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm space-y-6">
          <h2 className="text-xl font-bold">About Section Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Heading</label>
              <input
                value={formData.about?.heading || ""}
                onChange={e => updateNested('about', 'heading', e.target.value)}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Heading Accent</label>
              <input
                value={formData.about?.headingAccent || ""}
                onChange={e => updateNested('about', 'headingAccent', e.target.value)}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
            <textarea
              value={formData.about?.description || ""}
              onChange={e => updateNested('about', 'description', e.target.value)}
              className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all h-32"
            />
          </div>
        </div>

        <div className="sticky bottom-6">
          <RippleButton
            disabled={saving}
            type="submit"
            className="w-full md:w-auto px-10 h-14 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </RippleButton>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
