import { usePortfolioData } from "@/hooks/usePortfolioData";
import { Loader2, User, Code, Briefcase, Sparkles, MessageSquare } from "lucide-react";

const Dashboard = () => {
  const { data, isLoading } = usePortfolioData();

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="animate-spin text-primary w-10 h-10" />
      </div>
    );
  }

  const stats = [
    { name: "Projects", count: data?.projects?.length || 0, icon: Briefcase, color: "text-blue-500" },
    { name: "Skills", count: data?.skills?.length || 0, icon: Code, color: "text-green-500" },
    { name: "Services", count: data?.services?.length || 0, icon: Sparkles, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2 text-base sm:text-lg">Quick summary of your portfolio content.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] bg-card border border-border/50 shadow-sm backdrop-blur-3xl group hover:border-primary/30 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] sm:text-sm font-bold uppercase tracking-widest text-muted-foreground">{stat.name}</p>
                <h3 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">{stat.count}</h3>
              </div>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-background/50 flex items-center justify-center border border-border/50 group-hover:scale-110 transition-transform ${stat.color}`}>
                <stat.icon className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Profile Summary Card */}
        <div className="p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] bg-card border border-border/50 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <User size={24} />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold">Identity</h2>
          </div>
          <div className="space-y-5 sm:space-y-4">
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Active Name</p>
              <p className="text-base sm:text-lg font-semibold">{data?.profile?.name || "Not set"}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Current Role</p>
              <p className="text-base sm:text-lg font-semibold">{data?.profile?.role || "Not set"}</p>
            </div>
            <div>
              <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-muted-foreground">Contact Email</p>
              <p className="text-sm sm:text-md break-all">{data?.profile?.contact?.email || "Not set"}</p>
            </div>
          </div>
        </div>

        {/* Quick Tips or Info */}
        <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/20 flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="text-primary" /> Did you know?
          </h3>
          <p className="text-muted-foreground leading-relaxed italic">
            "Your portfolio represents your digital identity. Keeping it updated with your latest projects and skills shows continuous growth and professional activity."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
