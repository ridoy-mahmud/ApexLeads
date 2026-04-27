"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Workflow, Plus, Play, Pause, MoreVertical, GitMerge, Clock, Globe } from "lucide-react";

export default function Workflows() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Process Logic</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Workflows Automation</h1>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/90 active:scale-[0.98] transition-transform">
          <Plus className="w-4 h-4" /> Initialize Sequence
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: "Daily SaaS Pricing Monitor", trigger: "Schedule (Daily)", steps: 4, status: "Active", runs: 142 },
          { name: "Competitor Blog Lead Gen", trigger: "Webhook", steps: 3, status: "Paused", runs: 12 },
          { name: "Y-Combinator Batch Extractor", trigger: "Manual", steps: 5, status: "Active", runs: 5 },
        ].map((w, i) => (
          <Card key={i} className="hover:border-blue-500 transition-colors cursor-pointer group rounded-none">
            <CardContent className="p-5">
               <div className="flex justify-between items-start mb-4 border-b border-white/10 pb-4">
                 <div className="flex items-center gap-2">
                   <div className="p-2 border border-white/10 group-hover:bg-white/5 transition-colors">
                     <GitMerge className="w-5 h-5 text-white/60 group-hover:text-blue-500 h-[1.2rem] w-[1.2rem]" />
                   </div>
                   <h3 className="text-xl font-medium tracking-tight italic serif">{w.name}</h3>
                 </div>
                 <button className="p-1 text-white/40 hover:text-white transition-colors">
                   <MoreVertical className="w-4 h-4" />
                 </button>
               </div>
               
               <div className="space-y-3 mb-5 px-1 font-mono text-xs">
                 <div className="flex items-center gap-2">
                   <Clock className="w-4 h-4 text-emerald-400" />
                   <span className="text-white/40 uppercase tracking-widest">Trigger:</span>
                   <span className="text-white">{w.trigger}</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Workflow className="w-4 h-4 text-blue-500" />
                   <span className="text-white/40 uppercase tracking-widest">Steps:</span>
                   <span className="text-white">{w.steps} Actions</span>
                 </div>
                 <div className="flex items-center gap-2">
                   <Globe className="w-4 h-4 text-purple-400" />
                   <span className="text-white/40 uppercase tracking-widest">Runs:</span>
                   <span className="text-white">{w.runs}</span>
                 </div>
               </div>
               
               <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-1.5 px-2 py-1 border border-white/10 bg-white/5">
                    <div className={`w-2 h-2 ${w.status === "Active" ? "bg-emerald-400 shadow-[0_0_8px_#34d399]" : "bg-amber-400 shadow-[0_0_8px_#fbbf24]"}`} />
                    <span className="text-white/80">{w.status}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 border border-transparent hover:border-white/10 text-white transition-colors">
                      <Play className="w-4 h-4" />
                    </button>
                     <button className="p-2 hover:bg-white/10 border border-transparent hover:border-white/10 text-white transition-colors">
                      <Pause className="w-4 h-4" />
                    </button>
                  </div>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
