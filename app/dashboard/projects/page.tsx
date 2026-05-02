"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Plus, MoreVertical, Users, Code, Calendar, Activity, Workflow, Filter, Clock, Newspaper } from "lucide-react";
import { useState } from "react";

const PROJECTS = [
  { name: "Q1 SaaS Competitor Intel", crawls: 4, leads: 1240, status: "Active", color: "bg-emerald-400 font-bold shadow-[0_0_8px_#34d399]", workflows: 2, lastCrawl: "2 hours ago", createdAt: "2026-04-15" },
  { name: "Local Biotech Agencies", crawls: 1, leads: 340, status: "Paused", color: "bg-amber-400 font-bold shadow-[0_0_8px_#fbbf24]", workflows: 0, lastCrawl: "5 days ago", createdAt: "2026-04-20" },
  { name: "Fintech Startup Funding Round", crawls: 12, leads: 4890, status: "Active", color: "bg-emerald-400 font-bold shadow-[0_0_8px_#34d399]", workflows: 5, lastCrawl: "10 mins ago", createdAt: "2026-04-28" },
  { name: "Y-Combinator Alumni Scraping", crawls: 2, leads: 110, status: "Archived", color: "bg-white/20 shadow-[0_0_8px_rgba(255,255,255,0.1)]", workflows: 0, lastCrawl: "1 month ago", createdAt: "2026-03-10" },
];

export default function Projects() {
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [fetchingNews, setFetchingNews] = useState(false);

  const handleFetchNews = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFetchingNews(true);
    setTimeout(() => {
      setFetchingNews(false);
      alert("Successfully fetched latest news from configured sources.");
    }, 2000);
  };

  const filteredProjects = PROJECTS.filter(p => {
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    
    if (dateFilter !== "All Time") {
      const createdDate = new Date(p.createdAt);
      const now = new Date("2026-04-30");
      const diffTime = Math.abs(now.getTime() - createdDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateFilter === "Last 7 Days" && diffDays > 7) return false;
      if (dateFilter === "Last 30 Days" && diffDays > 30) return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Workspace Allocation</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Projects</h1>
        </div>
        <button className="flex items-center gap-2 bg-white hover:bg-white/90 text-black px-6 py-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-transform active:scale-[0.98]">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 bg-[#050505] border border-white/10 p-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-white/40 border-r border-white/10 pr-3 w-full sm:w-auto">
          <Filter className="w-4 h-4" /> Filters
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          <div className="flex items-center gap-2">
             <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Status:</span>
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="bg-transparent border-none text-[10px] uppercase tracking-widest font-bold text-white focus:ring-0 cursor-pointer outline-none"
             >
               <option value="All" className="bg-[#111]">All</option>
               <option value="Active" className="bg-[#111]">Active</option>
               <option value="Paused" className="bg-[#111]">Paused</option>
               <option value="Archived" className="bg-[#111]">Archived</option>
             </select>
          </div>
          
          <div className="flex items-center gap-2">
             <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">Created:</span>
             <select 
               value={dateFilter}
               onChange={(e) => setDateFilter(e.target.value)}
               className="bg-transparent border-none text-[10px] uppercase tracking-widest font-bold text-white focus:ring-0 cursor-pointer outline-none"
             >
               <option value="All Time" className="bg-[#111]">All Time</option>
               <option value="Last 7 Days" className="bg-[#111]">Last 7 Days</option>
               <option value="Last 30 Days" className="bg-[#111]">Last 30 Days</option>
             </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((p, i) => (
          <Card key={i} className="hover:border-blue-400 transition-colors cursor-pointer group rounded-none">
            <CardContent className="p-5">
               <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                 <div className="flex items-center gap-2">
                   <div className="p-2 border border-white/10 group-hover:bg-white/5 transition-colors">
                     <FolderKanban className="w-5 h-5 text-white/40 group-hover:text-blue-400" />
                   </div>
                   <h3 className="text-xl font-medium tracking-tight italic serif text-white">{p.name}</h3>
                 </div>
                 <button className="p-1 text-white/40 hover:text-white transition-colors">
                   <MoreVertical className="w-4 h-4" />
                 </button>
               </div>
               
               <div className="space-y-3 mb-5 font-mono text-xs">
                 <div className="flex items-center justify-between">
                   <span className="text-white/60 flex items-center gap-1.5 uppercase tracking-widest"><Code className="w-4 h-4" /> Crawl Jobs</span>
                   <span className="font-bold text-white">{p.crawls}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-white/60 flex items-center gap-1.5 uppercase tracking-widest"><Users className="w-4 h-4" /> Leads Found</span>
                   <span className="font-bold text-white">{p.leads}</span>
                 </div>
                 <div className="flex items-center justify-between">
                   <span className="text-white/60 flex items-center gap-1.5 uppercase tracking-widest"><Workflow className="w-4 h-4" /> Active Workflows</span>
                   <span className="font-bold text-white">{p.workflows}</span>
                 </div>
               </div>
               
               <div className="pt-4 border-t border-white/10 flex flex-col xl:flex-row xl:items-center justify-between gap-3 text-[10px] uppercase font-bold tracking-[0.2em]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-white/40">
                      <Calendar className="w-3.5 h-3.5" /> {p.createdAt}
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-400/80">
                      <Clock className="w-3.5 h-3.5" /> Activity: {p.lastCrawl}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className={`px-2 py-1 text-[9px] tracking-widest uppercase font-bold border ${p.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : p.status === 'Paused' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/5 border-white/10 text-white/40'}`}>
                      {p.status}
                    </span>
                  </div>
               </div>
               
               {p.name === "Q1 SaaS Competitor Intel" && (
                 <div className="pt-3 mt-3 border-t border-white/5">
                   <button
                     onClick={handleFetchNews}
                     disabled={fetchingNews}
                     className="w-full flex items-center justify-center gap-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 py-2 text-[10px] uppercase tracking-widest font-bold border border-blue-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     <Newspaper className="w-3.5 h-3.5" />
                     {fetchingNews ? "Fetching..." : "Fetch Latest News"}
                   </button>
                 </div>
               )}
            </CardContent>
          </Card>
        ))}
        {filteredProjects.length === 0 && (
          <div className="lg:col-span-3 text-center border overflow-hidden p-8 border-white/10 bg-[#050505]">
            <span className="text-[10px] uppercase tracking-widest font-bold text-white/40">No projects found matching the current filters.</span>
          </div>
        )}
      </div>
    </div>
  );
}
