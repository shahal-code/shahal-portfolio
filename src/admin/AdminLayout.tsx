import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { 
  LayoutDashboard, User, Code, Briefcase, 
  MessageSquare, Settings, LogOut, Menu, X,
  ExternalLink, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close sidebar when navigating on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    toast.success("Logged out successfully");
    navigate("/home");
  };

  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Hero & Profile", path: "/profile", icon: User },
    { name: "Skills", path: "/skills", icon: Code },
    { name: "Projects", path: "/projects", icon: Briefcase },
    { name: "Services", path: "/services", icon: Sparkles },
    { name: "Contact Info", path: "/contact", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop Floating Sidebar */}
      <aside className="hidden md:flex flex-col w-72 p-6 h-screen sticky top-0 shrink-0">
        <div className="flex-1 bg-card/80 backdrop-blur-xl border border-border/50 rounded-[2.5rem] flex flex-col shadow-2xl shadow-black/20 overflow-hidden">
          <div className="p-8 pb-4 flex items-center justify-between">
            <Link to="/home" className="flex flex-col gap-1 group">
              <span className="text-xl font-black bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient-x bg-clip-text text-transparent tracking-tighter">PORTFOLIO</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Admin Systems</span>
            </Link>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-[1.02]" 
                      : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  <Icon size={20} className={isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"} />
                  <span className="font-bold text-sm tracking-tight">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-border/50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full px-5 py-4 text-destructive hover:bg-destructive/10 rounded-2xl transition-all font-bold text-sm group"
            >
              <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay (For deep menus if needed) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-hidden">
        {/* Desktop Top Header (Floating) */}
        <header className="h-20 flex items-center justify-between px-6 sm:px-10 shrink-0">
          <div className="flex items-center gap-4">
             <div className="md:hidden p-2 rounded-xl bg-primary/10 text-primary">
                <LayoutDashboard size={20} />
             </div>
             <h2 className="text-xl font-bold tracking-tight md:hidden">Admin</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Dashboard
            </div>
            <button 
              onClick={handleLogout}
              className="md:hidden p-2.5 rounded-xl bg-destructive/10 text-destructive"
            >
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
          </div>
        </div>
      </main>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-card/90 backdrop-blur-2xl border border-primary/20 rounded-3xl h-20 z-[100] flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:hidden">
        {navItems.slice(0, 4).map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center gap-1 w-14 h-14 rounded-2xl transition-all duration-300 ${
                isActive 
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 -translate-y-4" 
                  : "text-muted-foreground hover:text-primary"
              }`}
            >
              <Icon size={22} />
              {!isActive && <span className="text-[9px] font-bold uppercase tracking-tighter">{item.name.split(' ')[0]}</span>}
            </Link>
          );
        })}
        {/* More Menu Toggle for Mobile */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-muted-foreground"
        >
          <Menu size={22} />
          <span className="text-[9px] font-bold uppercase tracking-tighter">More</span>
        </button>
      </nav>

      {/* Floating Mobile Extra Menu */}
      <div 
        className={`fixed inset-x-6 bottom-32 z-[110] bg-card/95 backdrop-blur-2xl border border-primary/20 rounded-[2.5rem] p-6 shadow-2xl transition-all duration-300 transform ${
          isSidebarOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'
        } md:hidden`}
      >
        <div className="grid grid-cols-2 gap-4">
          {navItems.slice(4).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 p-4 rounded-2xl bg-background/50 border border-border/50"
                onClick={() => setIsSidebarOpen(false)}
              >
                <Icon size={18} className="text-primary" />
                <span className="text-sm font-bold">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
