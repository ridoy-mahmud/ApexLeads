"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart, 
  Settings, 
  Network, 
  Database, 
  Users, 
  FolderKanban, 
  Workflow, 
  Activity,
  Menu,
  Bell,
  Search,
  Bot
} from "lucide-react";
import { useAppStore } from "@/store";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: BarChart },
  { name: "Crawl Studio", href: "/dashboard/crawls", icon: Network },
  { name: "Extraction", href: "/dashboard/extractions", icon: Database },
  { name: "Lead Finder", href: "/dashboard/leads", icon: Users },
  { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
  { name: "Workflows", href: "/dashboard/workflows", icon: Workflow },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, user } = useAppStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768 && sidebarOpen) {
        useAppStore.setState({ sidebarOpen: false });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F0F0F0] font-sans flex overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className={`
              fixed md:static inset-y-0 left-0 z-50
              w-64 bg-[#050505] text-[#F0F0F0] flex flex-col border-r border-white/10 shadow-2xl
            `}
          >
            <div className="flex items-center gap-3 p-6 h-20 border-b border-white/10">
              <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="text-xl font-black tracking-tighter uppercase text-white">NEXUS_CRAWL</span>
            </div>
            
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-4 mt-2 px-3">
                Core Modules
              </div>
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link 
                    href={item.href} 
                    key={item.name}
                    onClick={() => {
                      if (isMobile && sidebarOpen) {
                        useAppStore.setState({ sidebarOpen: false });
                      }
                    }}
                  >
                    <div className={`
                      flex items-center gap-3 px-3 py-2.5 transition-colors text-sm font-medium
                      ${isActive ? "bg-white/10 text-white border-l-2 border-blue-600" : "text-white/60 hover:bg-white/5 hover:text-white border-l-2 border-transparent"}
                    `}>
                      <item.icon className={`w-5 h-5 ${isActive ? "text-blue-500" : "text-white/40"}`} />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                 <div className="w-8 h-8 flex items-center justify-center text-white font-medium border border-white/20">
                   {user?.name.charAt(0)}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                   <p className="text-[10px] uppercase tracking-widest text-white/40 truncate">{user?.role}</p>
                 </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#050505]">
        {/* Top Header */}
        <header className="h-20 bg-[#050505] border-b border-white/10 flex items-center justify-between px-4 lg:px-8 z-40 sticky top-0 shadow-sm">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={toggleSidebar}
              className="p-2 hover:bg-white/5 text-white/60 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="max-w-md w-full hidden sm:block relative">
               <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
               <input 
                 type="text" 
                 placeholder="Search sequence or command (Cmd+K)..." 
                 className="w-full bg-[#111] border border-white/10 rounded-none pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-white outline-none transition-all placeholder:text-white/30"
               />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-5">
             <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 text-emerald-400 rounded-none text-[10px] uppercase tracking-[0.2em] font-semibold border border-white/10 hidden sm:flex">
               <Activity className="w-3.5 h-3.5" />
               3 Active Crawls
             </div>
             <button className="relative p-2 hover:bg-white/5 text-white/40 transition-colors">
               <Bell className="w-5 h-5" />
               <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-600 border border-[#050505]"></span>
             </button>
             <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-colors shadow-sm">
               <Bot className="w-4 h-4 text-black" />
               AI Assistant
             </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </div>
      </main>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}
