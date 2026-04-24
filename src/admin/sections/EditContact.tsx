import { useState, useEffect } from "react";
import { usePortfolioData, API_BASE_URL } from "@/hooks/usePortfolioData";
import { toast } from "sonner";
import { Save, Loader2, Plus, Trash2 } from "lucide-react";
import RippleButton from "@/components/ui/RippleButton";

const SOCIAL_ICON_OPTIONS = ["Github", "Linkedin", "Twitter", "Instagram", "Youtube", "Globe", "Mail"];

const EditContact = () => {
  const { data, isLoading, refetch } = usePortfolioData();
  const [formData, setFormData] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data?.profile?.contact) {
      setFormData(data.profile.contact);
    }
  }, [data]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/portfolio/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
        body: JSON.stringify({ contact: formData }),
      });

      if (response.ok) {
        toast.success("Contact info updated!");
        refetch();
      } else {
        toast.error("Failed to update");
      }
    } catch {
      toast.error("Backend connection error");
    } finally {
      setSaving(false);
    }
  };

  const updateSocial = (index: number, field: string, value: string) => {
    const updatedSocials = [...(formData?.socials || [])];
    updatedSocials[index] = { ...updatedSocials[index], [field]: value };
    setFormData({ ...formData, socials: updatedSocials });
  };

  const addSocial = () => {
    setFormData({
      ...formData,
      socials: [...(formData.socials || []), { name: "", url: "", icon: "Github" }],
    });
  };

  const removeSocial = (index: number) => {
    const updatedSocials = (formData?.socials || []).filter((_: any, i: number) => i !== index);
    setFormData({ ...formData, socials: updatedSocials });
  };

  if (isLoading || !formData) return <Loader2 className="animate-spin text-primary mx-auto mt-20" size={40} />;

  return (
    <div className="max-w-4xl space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contact Information</h1>
        <p className="text-muted-foreground mt-1">Manage your phone, email, location, and social links.</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-8">
        {/* Basic Contact Info */}
        <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm space-y-6">
          <h2 className="text-xl font-bold">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Phone</label>
              <input
                value={formData.phone || ""}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Location</label>
              <input
                value={formData.location || ""}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-background/50 border border-border/50 rounded-xl p-3 outline-none focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="p-8 rounded-[2rem] bg-card border border-border/50 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Social Links</h2>
            <button
              type="button"
              onClick={addSocial}
              className="flex items-center gap-2 text-sm font-bold text-primary hover:bg-primary/10 px-4 py-2 rounded-full transition-colors"
            >
              <Plus size={16} /> Add Link
            </button>
          </div>

          <div className="space-y-4">
            {(formData.socials || []).map((social: any, index: number) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border border-border/50 rounded-2xl relative">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Platform Name</label>
                  <input
                    value={social.name || ""}
                    onChange={e => updateSocial(index, "name", e.target.value)}
                    placeholder="e.g. GitHub"
                    className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL</label>
                  <input
                    value={social.url || ""}
                    onChange={e => updateSocial(index, "url", e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Icon</label>
                  <div className="flex gap-2">
                    <select
                      value={social.icon || "Github"}
                      onChange={e => updateSocial(index, "icon", e.target.value)}
                      className="flex-1 bg-background border border-border/50 rounded-xl p-3 outline-none focus:border-primary"
                    >
                      {SOCIAL_ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                    <button
                      type="button"
                      onClick={() => removeSocial(index)}
                      className="p-3 hover:bg-destructive/10 text-destructive rounded-xl transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-6">
          <RippleButton
            disabled={saving}
            type="submit"
            className="w-full md:w-auto px-10 h-14 bg-primary text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
            Save Contact Info
          </RippleButton>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
