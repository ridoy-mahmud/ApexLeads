"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Settings as SettingsIcon, Bell, CreditCard, Shield, Globe, Key } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Account Profile", icon: User },
    { id: "organization", name: "Organization", icon: Building },
    { id: "billing", name: "Billing & Plans", icon: CreditCard },
    { id: "api", name: "API Keys", icon: Key },
    { id: "proxies", name: "Proxy Pool", icon: Globe },
    { id: "notifications", name: "Notifications", icon: Bell },
    { id: "security", name: "Security", icon: Shield },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1 block">System Configuration</span>
        <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Settings</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Navigation */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-[10px] uppercase tracking-widest font-bold transition-all border ${
                  isActive 
                  ? "border-blue-400 bg-white/5 text-blue-400" 
                  : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <tab.icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-white/40"}`} />
                {tab.name}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <Card className="border-white/10 shadow-sm rounded-none bg-[#111]">
            <CardHeader className="border-b border-white/10 pb-4">
              <CardTitle className="text-xl tracking-tight italic serif text-white">
                {tabs.find(t => t.id === activeTab)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              
              {activeTab === "profile" && (
                 <div className="space-y-6 max-w-md">
                   <div>
                     <label className="block text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">Full Name</label>
                     <input type="text" defaultValue="Admin User" className="w-full p-3 bg-[#050505] border border-white/10 rounded-none text-sm text-white focus:ring-1 focus:ring-blue-400 outline-none font-mono" />
                   </div>
                   <div>
                     <label className="block text-[10px] uppercase font-bold tracking-widest text-white/60 mb-2">Email Address</label>
                     <input type="email" defaultValue="admin@nexuscrawl.com" className="w-full p-3 bg-[#050505] border border-white/10 rounded-none text-sm text-white/40 cursor-not-allowed outline-none font-mono" disabled />
                   </div>
                   <button className="bg-white hover:bg-white/90 text-black px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold shadow-sm transition-transform active:scale-[0.98]">
                     Save Changes
                   </button>
                 </div>
              )}

              {activeTab === "api" && (
                 <div className="space-y-6">
                   <p className="text-white/60 text-xs font-mono">Use these keys to access the NEXUS CRAWL REST API from your applications. Do not share them.</p>
                   
                   <div className="p-4 bg-[#050505] border border-white/10 flex items-center justify-between">
                     <div>
                       <div className="font-bold uppercase tracking-widest text-white text-[10px]">Production Key</div>
                       <div className="font-mono text-xs text-blue-400 mt-1">nx_prod_8f92j29f8j29f8j29f8j2</div>
                     </div>
                     <div className="flex gap-2">
                       <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white transition-colors">Copy</button>
                       <button className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors">Revoke</button>
                     </div>
                   </div>

                   <button className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 px-6 py-3 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors">
                     <Plus className="w-4 h-4" /> Generate New Key
                   </button>
                 </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
