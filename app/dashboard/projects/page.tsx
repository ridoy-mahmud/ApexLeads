"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FolderKanban, Plus, MoreVertical, Users, Code, Calendar } from "lucide-react";

export default function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Workspace Allocation</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Projects</h1>
        </div>
        <button className="flex items-center gap-2 bg-white hover:bg-white/90 text-black px-6 py-3 font-bold uppercase tracking-[0.2em] text-[10px] transition-transform active:scale-[0.98]">
          <Plus className="w-4 h-4" /> New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Q1 SaaS Competitor Intel", crawls: 4, leads: 1240, status: "Active", color: "bg-emerald-400 font-bold shadow-[0_0_8px_#34d399]" },
          { name: "Local Biotech Agencies", crawls: 1, leads: 340, status: "Paused", color: "bg-amber-400 font-bold shadow-[0_0_8px_#fbbf24]" },
          { name: "Fintech Startup Funding Round", crawls: 12, leads: 4890, status: "Active", color: "bg-emerald-400 font-bold shadow-[0_0_8px_#34d399]" },
          { name: "Y-Combinator Alumni Scraping", crawls: 2, leads: 110, status: "Archived", color: "bg-white/20" },
        ].map((p, i) => (
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
               </div>
               
               <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em]">
                  <span className="flex items-center gap-1.5 text-white/40">
                    <Calendar className="w-3.5 h-3.5" /> Updated 2d ago
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 ${p.color}`} />
                    <span className="text-white/80">{p.status}</span>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
