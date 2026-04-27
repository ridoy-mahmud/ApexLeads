"use client";

import { useEffect, useState } from "react";
import { Filter, Search, Table, Columns, Copy } from "lucide-react";

export default function DataExplorer() {
  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-100px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Global Database</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Data Explorer</h1>
        </div>
      </div>

      <div className="flex-1 bg-[#050505] border border-white/10 rounded-none shadow-sm flex flex-col overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#111]">
          <div className="flex gap-2 w-full max-w-sm">
             <div className="relative w-full">
               <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
               <input type="text" placeholder="SQL AND (KEY LIKE '%VAL%')" className="w-full pl-9 pr-3 py-3 text-[10px] uppercase font-mono tracking-widest border border-white/10 outline-none focus:ring-1 focus:ring-blue-400 bg-[#050505] text-white/80 shadow-sm" />
             </div>
          </div>
          <div className="flex gap-2">
             <button className="p-3 border border-white/10 bg-[#050505] text-white/60 hover:text-white hover:bg-white/5 transition-colors shadow-sm"><Filter className="w-4 h-4" /></button>
             <button className="p-3 border border-white/10 bg-[#050505] text-white/60 hover:text-white hover:bg-white/5 transition-colors shadow-sm"><Columns className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8 text-center text-white/40 bg-[#050505]">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 border border-white/10 bg-white/5 flex items-center justify-center mb-4">
               <Table className="w-8 h-8 text-white/20" />
            </div>
            <p className="text-[10px] uppercase tracking-widest font-mono">Select a specific extraction run or entity type to view records.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
