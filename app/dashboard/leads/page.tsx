"use client";

import { useState } from "react";
import { Filter, Download, Mail, Building, MapPin, Tag, ChevronDown, CheckSquare, Square } from "lucide-react";

const mockLeads = [
  { id: 1, company: "Acme Corp", domain: "acme.io", industry: "SaaS", location: "San Francisco, CA", score: 92, contact: "j.doe@acme.io" },
  { id: 2, company: "Global Tech", domain: "globaltech.com", industry: "Enterprise", location: "New York, NY", score: 88, contact: "info@globaltech.com" },
  { id: 3, company: "Nova Marketing", domain: "novamarketing.agency", industry: "Agency", location: "Austin, TX", score: 85, contact: "hello@novamarketing.agency" },
  { id: 4, company: "BuildIt Software", domain: "buildit.dev", industry: "Dev Tools", location: "Remote", score: 79, contact: "founders@buildit.dev" },
  { id: 5, company: "Quantum Cloud", domain: "quantumcloud.net", industry: "Infrastructure", location: "Seattle, WA", score: 71, contact: "sales@quantumcloud.net" },
  { id: 6, company: "Finserve Solutions", domain: "finservesol.com", industry: "Fintech", location: "London, UK", score: 68, contact: "contact@finservesol.com" },
];

export default function LeadFinder() {
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelected(prev => prev.length === mockLeads.length ? [] : mockLeads.map(l => l.id));
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-100px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Target Acquisition</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Lead Finder</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#111] border border-white/10 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-colors">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center gap-2 bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 active:scale-[0.98] transition-colors">
            <Download className="w-4 h-4" /> Export {selected.length > 0 ? `(${selected.length})` : "All"}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-[#050505] border border-white/10 rounded-none flex flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/10 flex flex-wrap items-center gap-3 bg-[#111]">
           <div className="flex-1 min-w-[200px]">
             <input 
               type="text" 
               placeholder="Natural language search (e.g. 'Software agencies in Texas')..." 
               className="w-full bg-[#050505] border border-white/10 rounded-none px-4 py-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder:text-white/30 font-medium text-white"
             />
           </div>
           {['Industry', 'Location', 'ICP Score'].map(filter => (
             <button key={filter} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-none text-[10px] uppercase tracking-widest font-bold text-white/60 hover:bg-white/10 transition-colors">
               {filter} <ChevronDown className="w-3 h-3 opacity-50" />
             </button>
           ))}
        </div>

        {/* Data Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full whitespace-nowrap text-left text-sm text-white">
            <thead className="bg-[#111] sticky top-0 z-10 box-border border-b border-white/10 text-white/40 font-bold text-[10px] tracking-[0.2em] uppercase">
              <tr>
                <th className="px-6 py-4 w-12 cursor-pointer" onClick={toggleAll}>
                  {selected.length === mockLeads.length ? <CheckSquare className="w-4 h-4 text-blue-600" /> : <Square className="w-4 h-4" />}
                </th>
                <th className="px-4 py-4">Company Details</th>
                <th className="px-4 py-4">Industry / Tags</th>
                <th className="px-4 py-4">Location</th>
                <th className="px-4 py-4">Contact Extraction</th>
                <th className="px-4 py-4">ICP Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className={`hover:bg-white/5 transition-colors ${selected.includes(lead.id) ? 'bg-white/5' : ''}`}>
                  <td className="px-6 py-4 cursor-pointer" onClick={() => toggleSelect(lead.id)}>
                    {selected.includes(lead.id) ? <CheckSquare className="w-4 h-4 text-blue-500" /> : <Square className="w-4 h-4 text-white/20" />}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-white/10 bg-[#111] flex items-center justify-center font-bold text-white/40">
                        {lead.company.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{lead.company}</div>
                        <a href={`https://${lead.domain}`} target="_blank" className="text-[10px] font-mono text-blue-400 hover:underline">{lead.domain}</a>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-white/10 bg-white/5 text-white/80 text-[10px] font-bold uppercase tracking-wider">
                      <Tag className="w-3 h-3 text-white/40" /> {lead.industry}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-white/60">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-white/40" /> {lead.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1.5 text-white/80">
                      <Mail className="w-3.5 h-3.5 text-white/40" /> 
                      <span className="truncate max-w-[150px] block font-mono text-[10px]">{lead.contact}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                       <span className={`text-[10px] font-mono font-bold ${lead.score >= 80 ? 'text-emerald-400' : lead.score >= 70 ? 'text-amber-400' : 'text-rose-400'}`}>
                         {lead.score}
                       </span>
                       <div className="w-16 h-1.5 bg-white/10 rounded-none overflow-hidden">
                         <div 
                           className={`h-full ${lead.score >= 80 ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : lead.score >= 70 ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-rose-500 shadow-[0_0_8px_#ef4444]'}`}
                           style={{ width: `${lead.score}%` }}
                         />
                       </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination bar */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-white/40 bg-[#111] relative z-20">
          <div>Showing 1 to 6 of 12,409 leads</div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-white/10 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-white/10 hover:bg-white/5 hover:text-white transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
