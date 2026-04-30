"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building, Settings as SettingsIcon, Bell, CreditCard, Shield, Globe, Key, Plus, Users, Activity } from "lucide-react";
import { useState } from "react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", name: "Account Profile", icon: User },
    { id: "organization", name: "Organization", icon: Building },
    { id: "users", name: "User Management", icon: Users },
    { id: "billing", name: "Billing & Plans", icon: CreditCard },
    { id: "api", name: "API Keys", icon: Key },
    { id: "proxies", name: "Proxy Pool", icon: Globe },
    { id: "audit", name: "Audit Logs", icon: Activity },
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

              {activeTab === "users" && (
                 <div className="space-y-6">
                   <div className="flex justify-between items-center mb-4">
                     <p className="text-white/60 text-xs font-mono">Manage team members and their access levels.</p>
                     <button className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors">
                       <Plus className="w-4 h-4" /> Invite User
                     </button>
                   </div>
                   
                   <div className="w-full bg-[#050505] border border-white/10 overflow-hidden">
                     <table className="w-full text-left text-sm whitespace-nowrap">
                       <thead className="bg-[#111] border-b border-white/10 uppercase text-[10px] tracking-widest text-white/40 font-bold">
                         <tr>
                           <th className="px-4 py-3">User</th>
                           <th className="px-4 py-3">Role</th>
                           <th className="px-4 py-3">Status</th>
                           <th className="px-4 py-3 text-right">Actions</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-white/80">
                         <tr className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-4">
                             <div className="font-bold text-white">Admin User</div>
                             <div className="text-[10px] font-mono text-white/40">admin@nexuscrawl.com</div>
                           </td>
                           <td className="px-4 py-4">
                             <span className="px-2 py-1 bg-white/10 text-[10px] uppercase tracking-widest font-bold">Admin</span>
                           </td>
                           <td className="px-4 py-4">
                             <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                               <span className="text-[10px] uppercase tracking-widest text-emerald-400">Active</span>
                             </div>
                           </td>
                           <td className="px-4 py-4 text-right">
                             <button className="text-[10px] text-white/40 hover:text-white uppercase tracking-widest font-bold">Edit</button>
                           </td>
                         </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-4">
                             <div className="font-bold text-white">Analyst Configurator</div>
                             <div className="text-[10px] font-mono text-white/40">analyst@nexuscrawl.com</div>
                           </td>
                           <td className="px-4 py-4">
                             <span className="px-2 py-1 bg-white/10 text-[10px] uppercase tracking-widest font-bold">Analyst</span>
                           </td>
                           <td className="px-4 py-4">
                             <div className="flex items-center gap-2">
                               <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                               <span className="text-[10px] uppercase tracking-widest text-blue-400">Invited</span>
                             </div>
                           </td>
                           <td className="px-4 py-4 text-right">
                             <button className="text-[10px] text-rose-500 hover:text-rose-400 uppercase tracking-widest font-bold">Revoke</button>
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 </div>
              )}

              {activeTab === "proxies" && (
                 <div className="space-y-6">
                   <div className="flex justify-between items-center mb-4">
                     <p className="text-white/60 text-xs font-mono">Configure custom rotating proxies and Datacenter APIs.</p>
                     <button className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 text-blue-400 px-4 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-colors">
                       <Plus className="w-4 h-4" /> Add Proxy
                     </button>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="p-4 bg-[#050505] border border-white/10">
                       <div className="flex justify-between items-start mb-4">
                         <div>
                           <div className="font-bold uppercase tracking-widest text-white text-[10px]">BrightData Residential</div>
                           <div className="font-mono text-xs text-white/40 mt-1">Status: Active</div>
                         </div>
                         <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
                       </div>
                       <div className="text-[10px] font-mono text-white/60 mb-4">IP Pool: 50,000+ IPs</div>
                       <div className="flex gap-2">
                         <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white transition-colors">Configure</button>
                       </div>
                     </div>
                     <div className="p-4 bg-[#050505] border border-white/10">
                       <div className="flex justify-between items-start mb-4">
                         <div>
                           <div className="font-bold uppercase tracking-widest text-white text-[10px]">Internal Datacenter IPs</div>
                           <div className="font-mono text-xs text-white/40 mt-1">Status: Offline</div>
                         </div>
                         <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]"></div>
                       </div>
                       <div className="text-[10px] font-mono text-white/60 mb-4">IP Pool: 500 IPs</div>
                       <div className="flex gap-2">
                         <button className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-white transition-colors">Reconnect</button>
                       </div>
                     </div>
                   </div>
                 </div>
              )}

              {activeTab === "audit" && (
                 <div className="space-y-6">
                   <p className="text-white/60 text-xs font-mono mb-4">A complete log of system events, logins, and API access.</p>
                   <div className="w-full bg-[#050505] border border-white/10 overflow-hidden">
                     <table className="w-full text-left text-sm whitespace-nowrap">
                       <thead className="bg-[#111] border-b border-white/10 uppercase text-[10px] tracking-widest text-white/40 font-bold">
                         <tr>
                           <th className="px-4 py-3">Event</th>
                           <th className="px-4 py-3">User/System</th>
                           <th className="px-4 py-3">IP Address</th>
                           <th className="px-4 py-3 text-right">Timestamp</th>
                         </tr>
                       </thead>
                       <tbody className="divide-y divide-white/5 text-white/80 font-mono text-xs">
                         <tr className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3">
                             <span className="text-blue-400">api_key.created</span>
                           </td>
                           <td className="px-4 py-3 text-white/60">admin@nexuscrawl.com</td>
                           <td className="px-4 py-3 text-white/60">192.168.1.1</td>
                           <td className="px-4 py-3 text-right text-white/40">2 mins ago</td>
                         </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3">
                             <span className="text-amber-400">crawl_job.paused</span>
                           </td>
                           <td className="px-4 py-3 text-white/60">API Runtime</td>
                           <td className="px-4 py-3 text-white/60">10.0.0.14</td>
                           <td className="px-4 py-3 text-right text-white/40">15 mins ago</td>
                         </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3">
                             <span className="text-emerald-400">user.login</span>
                           </td>
                           <td className="px-4 py-3 text-white/60">admin@nexuscrawl.com</td>
                           <td className="px-4 py-3 text-white/60">192.168.1.1</td>
                           <td className="px-4 py-3 text-right text-white/40">1 hr ago</td>
                         </tr>
                         <tr className="hover:bg-white/5 transition-colors">
                           <td className="px-4 py-3">
                             <span className="text-rose-500">extraction.failed</span>
                           </td>
                           <td className="px-4 py-3 text-white/60">System</td>
                           <td className="px-4 py-3 text-white/60">Local Runtime</td>
                           <td className="px-4 py-3 text-right text-white/40">3 hrs ago</td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                 </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
