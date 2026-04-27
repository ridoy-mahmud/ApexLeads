"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Code2, Sparkles, Layout, ScanLine, Play, Save, Loader2, AlertCircle } from "lucide-react";
import { motion } from "motion/react";
import { runAISchemaExtraction } from "@/app/actions/extraction";

export default function ExtractionWorkbench() {
  const [method, setMethod] = useState("AI_SCHEMA");
  const [url, setUrl] = useState("https://example.com");
  const [schemaDef, setSchemaDef] = useState(JSON.stringify({
    "company_name": "string",
    "meta_description": "string"
  }, null, 2));
  
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTestExtraction = () => {
    setError(null);
    setResult(null);
    startTransition(async () => {
      if (method === "AI_SCHEMA") {
        const res = await runAISchemaExtraction(url, schemaDef);
        if (res.success) {
          setResult(res.data);
        } else {
          setError(res.error || "Unknown error occurred");
        }
      }
    });
  };

  return (
    <div className="space-y-6 flex flex-col h-[calc(100vh-100px)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Data Modeling</span>
          <h1 className="text-4xl font-bold tracking-tighter text-white uppercase">Extraction Workbench</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-[#111] border border-white/10 text-white px-4 py-3 text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-white/5 transition-colors">
            <Save className="w-4 h-4" /> Save Template
          </button>
          <button 
            onClick={handleTestExtraction}
            disabled={isPending}
            className="flex items-center gap-2 bg-white disabled:opacity-50 text-black px-6 py-3 font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white/90 active:scale-[0.98] transition-all"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin text-black" /> : <Play className="w-4 h-4 text-black" />} 
            Run Test
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        
        {/* Left Toolbar */}
        <div className="lg:col-span-1 border border-white/10 bg-[#050505] rounded-none shadow-sm flex flex-col overflow-hidden">
          <div className="p-4 border-b border-white/10 bg-[#111]">
            <h3 className="font-bold text-[10px] uppercase tracking-widest text-white/60">Extraction Strategies</h3>
          </div>
          <div className="p-3 space-y-2 overflow-y-auto flex-1">
            {[
              { id: "CSS", icon: Code2, title: "CSS / XPath (Manual)", desc: "Standard DOM querying" },
              { id: "AI_SCHEMA", icon: Sparkles, title: "AI Schema (SCRIBES)", desc: "LLM maps HTML to JSON" },
              { id: "INDEX", icon: Search, title: "Index-Based (Fast)", desc: "Chunk & Predict strategy" },
              { id: "LAYOUT", icon: Layout, title: "Visual Layout (LTDE)", desc: "Geometry-based extraction" },
              { id: "VISION", icon: ScanLine, title: "Multimodal Vision", desc: "Screenshot to JSON via GPT-4o" },
            ].map((m) => (
              <div 
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`p-3 border cursor-pointer transition-all ${method === m.id ? 'border-purple-400 bg-white/5' : 'border-transparent hover:border-white/10 hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <m.icon className={`w-4 h-4 ${method === m.id ? 'text-purple-400' : 'text-white/40'}`} />
                  <span className={`text-[10px] uppercase tracking-widest font-bold ${method === m.id ? 'text-white' : 'text-white/60'}`}>{m.title}</span>
                </div>
                <div className="text-[10px] text-white/40 pl-6 tracking-wide font-mono">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Center Canvas */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          <Card className="flex-1 flex flex-col border-white/10 shadow-sm border rounded-none">
             {method === "AI_SCHEMA" && (
                <div className="flex-1 p-6 flex flex-col h-full overflow-hidden bg-[#111]">
                  <div className="flex items-center gap-2 mb-4 shrink-0">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <h3 className="text-xl font-medium tracking-tight italic serif text-white">AI Schema Extraction (SCRIBES)</h3>
                  </div>
                  
                  <div className="mb-4 shrink-0">
                     <label className="block text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">Target URL for Test</label>
                     <input 
                       type="text" 
                       value={url}
                       onChange={e => setUrl(e.target.value)}
                       placeholder="https://news.ycombinator.com" 
                       className="w-full p-3 bg-[#050505] border border-white/10 rounded-none text-sm text-white focus:ring-1 focus:ring-purple-400 outline-none shadow-sm font-mono"
                     />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
                    <div className="flex flex-col h-full">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">JSON Schema Definition</label>
                      <textarea 
                        className="flex-1 w-full p-4 bg-[#050505] border border-white/10 rounded-none font-mono text-xs text-blue-400 outline-none focus:ring-1 focus:ring-purple-400 resize-none shadow-inner"
                        value={schemaDef}
                        onChange={e => setSchemaDef(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex flex-col h-full">
                      <label className="block text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">Extraction Output</label>
                      <div className="flex-1 w-full bg-[#050505] rounded-none p-4 font-mono text-xs text-emerald-400 overflow-auto shadow-inner border border-white/10">
                         {isPending && <div className="flex items-center gap-2 text-purple-400"><Loader2 className="w-4 h-4 animate-spin" /> Analyzing DOM and extracting via Gemini 2.5...</div>}
                         {!isPending && error && <div className="text-rose-400 flex items-start gap-2"><AlertCircle className="w-4 h-4 shrink-0 mt-0.5" /> {error}</div>}
                         {!isPending && !error && result && (
                           <pre>{JSON.stringify(result, null, 2)}</pre>
                         )}
                         {!isPending && !error && !result && (
                           <span className="text-white/20 uppercase tracking-[0.2em]">Run test to see structured output...</span>
                         )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-4 rounded-none bg-white/5 border border-white/10 flex gap-3 shrink-0">
                     <div className="text-2xl">💡</div>
                     <div className="text-xs uppercase tracking-widest text-emerald-400 leading-relaxed font-bold">
                       <strong>SCRIBES Learning Mode Active:</strong> <span className="text-white/60 font-medium">Once the LLM successfully extracts this schema, NEXUS CRAWL synthesizes a deterministic CSS script.</span>
                     </div>
                  </div>
                </div>
             )}
             
             {method === "VISION" && (
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center bg-[#111]">
                  <div className="w-16 h-16 bg-white/5 text-blue-400 flex items-center justify-center mb-4 border border-white/10">
                     <ScanLine className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-medium tracking-tight italic serif text-white mb-2">Multimodal Vision Parsing</h3>
                  <p className="text-white/40 font-mono max-w-md text-[10px] uppercase tracking-widest leading-relaxed mb-6">
                    Drop a URL here. We will render the page using Puppeteer, take a full-page screenshot, and pass the image directly to Gemini 1.5 Pro to extract data exactly as a human sees it visually.
                  </p>
                  <div className="flex w-full max-w-md mx-auto">
                    <input type="text" placeholder="https://..." className="flex-1 bg-[#050505] border border-white/10 text-white px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 font-mono text-xs" />
                    <button className="bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-white/90 transition border border-white">Fetch Visuals</button>
                  </div>
                </div>
             )}
             
             {(method !== "AI_SCHEMA" && method !== "VISION") && (
                <div className="flex-1 flex items-center justify-center text-white/40 bg-[#111] font-mono text-xs uppercase tracking-widest">
                  <p>Configuration panel for {method} strategy</p>
                </div>
             )}
          </Card>
        </div>

      </div>
    </div>
  );
}
