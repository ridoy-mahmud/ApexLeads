"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Play, Pause, Square, Settings2, Sparkles, BrainCircuit, Globe, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function CrawlStudio() {
  const [activeTab, setActiveTab] = useState("configure");
  const [crawlStatus, setCrawlStatus] = useState("idle"); // idle, running, paused
  const [progress, setProgress] = useState({ crawled: 0, queued: 0, skipped: 0, currentUrl: "" });
  const [strategy, setStrategy] = useState("LLM");

  const startCrawl = () => {
    setCrawlStatus("running");
    setProgress({ crawled: 0, queued: 125, skipped: 0, currentUrl: "Initializing..." });
    
    // Simulation interval
    const interval = setInterval(() => {
      setProgress(p => {
        if (p.crawled >= 150) {
          clearInterval(interval);
          setCrawlStatus("idle");
          return p;
        }
        return {
          crawled: p.crawled + 1,
          queued: Math.max(0, p.queued + Math.floor(Math.random() * 3) - 1),
          skipped: p.skipped + (Math.random() > 0.8 ? 1 : 0),
          currentUrl: `https://example.com/company/${Math.random().toString(36).substring(7)}`
        };
      });
    }, 800);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">Crawl Operation</span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tighter uppercase text-white">Crawl Studio</h1>
        </div>
        
        {/* Run Controls */}
        <div className="flex items-center gap-2 bg-[#111] p-1 border border-white/10 shadow-sm w-full sm:w-auto">
          {crawlStatus === "idle" ? (
            <button 
              onClick={startCrawl}
              className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-white text-black px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/90 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Launch Crawl
            </button>
          ) : (
            <>
              <button 
                onClick={() => setCrawlStatus("paused")}
                className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-amber-400 text-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-amber-500 transition-colors"
              >
                <Pause className="w-4 h-4 fill-current" /> Pause
              </button>
              <button 
                onClick={() => setCrawlStatus("idle")}
                className="flex-1 sm:flex-none flex justify-center items-center gap-2 bg-rose-500 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-rose-600 transition-colors"
              >
                <Square className="w-4 h-4 fill-current" /> Stop
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Configuration */}
        <Card className="lg:col-span-2 rounded-none flex flex-col min-h-[600px] lg:h-[calc(100vh-140px)]">
          <div className="flex items-center border-b border-white/5">
            <button 
              onClick={() => setActiveTab("configure")}
              className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === "configure" ? "bg-white/5 text-white" : "border-transparent text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              Configuration
            </button>
            <button 
              onClick={() => setActiveTab("monitor")}
              className={`flex-1 py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors ${activeTab === "monitor" ? "bg-white/5 text-white" : "border-transparent text-white/40 hover:text-white hover:bg-white/5"}`}
            >
              Live Monitor
            </button>
          </div>

          <CardContent className="flex-1 overflow-y-auto p-6">
            <AnimatePresence mode="wait">
              {activeTab === "configure" ? (
                <motion.div 
                  key="config"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Strategy Selection */}
                  <div>
                    <h3 className="text-[10px] uppercase tracking-widest text-white/60 font-bold mb-3 flex items-center gap-2">
                       <BrainCircuit className="w-4 h-4 text-purple-400" />
                       Intelligence Strategy
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: "BFS", name: "Standard (BFS)", desc: "Crawl everything linked", icon: Globe, color: "blue" },
                        { id: "LLM", name: "LLM-Prioritized", desc: "Craw4LLM Scoring", icon: Sparkles, color: "purple" },
                        { id: "SEM", name: "Semantic Focused", desc: "Neural Embeddings", icon: BrainCircuit, color: "emerald" },
                        { id: "RL", name: "RL-Driven (TRES)", desc: "Learns link patterns", icon: RefreshCcw, color: "rose" },
                      ].map(s => (
                        <div 
                          key={s.id}
                          onClick={() => setStrategy(s.id)}
                          className={`
                            relative p-4 cursor-pointer transition-all border
                            ${strategy === s.id ? 'border-purple-400 bg-white/5' : 'border-white/10 hover:border-white/30 bg-[#050505]'}
                          `}
                        >
                          {strategy === s.id && <div className={`absolute top-3 right-3 w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)] ${s.color === "blue" ? "bg-blue-400 shadow-blue-400" : s.color === "purple" ? "bg-purple-400 shadow-purple-400" : s.color === "emerald" ? "bg-emerald-400 shadow-emerald-400" : "bg-rose-400 shadow-rose-400"}`} />}
                          <s.icon className={`w-6 h-6 mb-2 ${s.color === "blue" ? "text-blue-400" : s.color === "purple" ? "text-purple-400" : s.color === "emerald" ? "text-emerald-400" : "text-rose-400"}`} />
                          <div className="font-bold text-white tracking-widest font-mono text-[10px] uppercase">{s.name}</div>
                          <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{s.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  {/* Seed URLs */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-white/60 font-bold mb-2">Seed URLs</label>
                    <textarea 
                      className="w-full h-32 p-3 bg-[#050505] border border-white/10 rounded-none text-sm focus:ring-1 focus:ring-blue-500 outline-none font-mono text-white/80"
                      placeholder="https://example.com&#10;https://example2.com"
                      defaultValue="https://news.ycombinator.com&#10;https://techcrunch.com/startups/"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-[10px] uppercase tracking-widest text-white/40">One URL per line</span>
                      <button className="text-[10px] font-bold text-blue-400 uppercase tracking-widest hover:underline">Upload CSV</button>
                    </div>
                  </div>

                  {/* AI Prompt (Dynamic based on strategy) */}
                  <AnimatePresence>
                    {(strategy === 'LLM' || strategy === 'SEM') && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-white/5 border border-white/10 space-y-3 mt-4">
                          <label className="block text-[10px] uppercase tracking-widest text-white font-bold flex items-center gap-2">
                             <Sparkles className="w-4 h-4 text-purple-400" /> 
                             {strategy === 'LLM' ? "Scoring Prompt (Craw4LLM)" : "Ideal Content Description (Semantic)"}
                          </label>
                          <textarea 
                            className="w-full h-24 p-3 bg-[#050505] border border-white/10 text-sm focus:ring-1 focus:ring-purple-400 outline-none text-white placeholder:text-white/30"
                            placeholder={strategy === 'LLM' ? "Score pages highly if they discuss B2B SaaS pricing or product features..." : "Looking for directories of AI startups, especially those listing founders..."}
                            defaultValue={strategy === 'LLM' ? "Prioritize pages that look like company \"About Us\" or \"Team\" pages. Deprioritize blog posts and legal policies." : "B2B SaaS companies offering marketing automation with pricing pages"}
                          />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Settings Grid */}
                  <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 mb-1">Max Depth</label>
                       <input type="number" defaultValue={3} className="w-full p-3 bg-[#050505] border border-white/10 rounded-none text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white font-mono" />
                     </div>
                     <div>
                       <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 mb-1">Concurrency</label>
                       <input type="number" defaultValue={10} className="w-full p-3 bg-[#050505] border border-white/10 rounded-none text-sm focus:ring-1 focus:ring-blue-500 outline-none text-white font-mono" />
                     </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div 
                  key="monitor"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6 h-full flex flex-col"
                >
                  <div className="flex-1 bg-[#050505] border border-white/10 p-4 font-mono text-sm overflow-hidden flex flex-col shadow-inner">
                    <div className="flex items-center justify-between text-white/40 mb-4 border-b border-white/10 pb-2">
                      <div className="flex gap-4">
                        <span><span className="text-blue-400 font-bold">{progress.crawled}</span> Crawled</span>
                        <span><span className="text-amber-400 font-bold">{progress.queued}</span> Queued</span>
                        <span><span className="text-white/20 font-bold">{progress.skipped}</span> Skipped</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${crawlStatus === 'running' ? 'bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse' : 'bg-white/20'}`} />
                        <span className="uppercase text-[10px] tracking-widest font-bold">{crawlStatus}</span>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 text-white/60">
                      {progress.currentUrl ? (
                         <>
                           <div className="text-purple-400">&gt; Engine started. Strategy: <span className="font-bold">{strategy}</span></div>
                           <div className="text-blue-300">&gt; Fetching: {progress.currentUrl}</div>
                           {strategy === 'LLM' && <div className="text-emerald-400">&gt; LLM Score: 0.88 - Proceeding to extract</div>}
                           {strategy === 'SEM' && <div className="text-emerald-400">&gt; Vector Cosine Similarity: 0.92 - Prioritizing links</div>}
                           <div className="text-white/40">&gt; Discovered 14 new links. Adding 3 to queue based on policy.</div>
                           <div className="animate-pulse text-white/20 mt-4">_</div>
                         </>
                      ) : (
                        <div className="h-full flex items-center justify-center text-white/40 italic uppercase text-[10px] tracking-[0.3em]">
                          Waiting for crawl to launch...
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Right Column: Project Context */}
        <Card className="rounded-none">
          <CardHeader className="border-b border-white/10 pb-4">
            <CardTitle className="text-xl flex items-center gap-2">
              <Settings2 className="w-5 h-5 text-white/40" />
              Advanced Parameters
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 space-y-6">
            <div>
              <label className="flex items-center justify-between text-[10px] uppercase font-bold tracking-[0.2em] text-white/60 mb-2">
                Proxy Pool
                <span className="text-[9px] bg-emerald-400/20 text-emerald-400 p-1 border border-emerald-400/30 uppercase tracking-widest font-bold">12 Active</span>
              </label>
              <select className="w-full p-3 bg-[#050505] border border-white/10 rounded-none text-xs text-white uppercase tracking-wider font-mono outline-none shadow-sm">
                <option>Datacenter Rotation</option>
                <option>Residential IPs</option>
                <option>Custom List</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-white/60 mb-2">Browser Engine</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 border border-white/10 bg-[#050505] hover:bg-white/5 transition-colors cursor-pointer">
                  <input type="radio" name="browser" defaultChecked className="w-4 h-4 text-blue-500 bg-[#050505] border-white/20" />
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold text-white">Cheerio (Fast)</div>
                    <div className="text-[10px] text-white/40 tracking-wider">Static HTML parsing. High throughput.</div>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 border border-white/10 bg-[#050505] hover:bg-white/5 transition-colors cursor-pointer">
                  <input type="radio" name="browser" className="w-4 h-4 text-blue-500 bg-[#050505] border-white/20" />
                  <div>
                    <div className="text-xs uppercase tracking-widest font-bold text-white">Puppeteer</div>
                    <div className="text-[10px] text-white/40 tracking-wider">Full headless Chrome. Extracts SPA content.</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 border-white/20 bg-[#050505] rounded-none focus:ring-0 focus:ring-offset-0" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Respect robots.txt (Strict)</span>
              </label>
            </div>
             <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-500 border-white/20 bg-[#050505] rounded-none focus:ring-0 focus:ring-offset-0" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/80">Extract Contact info</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
