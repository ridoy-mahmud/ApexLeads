"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { 
  Area, 
  AreaChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { ArrowUpRight, Activity, Network, Users, Database } from "lucide-react";

const activityData = [
  { time: "00:00", pages: 1200 }, { time: "04:00", pages: 3000 },
  { time: "08:00", pages: 8000 }, { time: "12:00", pages: 15000 },
  { time: "16:00", pages: 20000 }, { time: "20:00", pages: 18000 },
  { time: "24:00", pages: 10000 },
];

const qualityData = [
  { name: "Excellent", value: 4500, color: "#10B981" },
  { name: "Good", value: 3000, color: "#3B82F6" },
  { name: "Fair", value: 1500, color: "#F59E0B" },
  { name: "Poor", value: 500, color: "#EF4444" },
];

const domainData = [
  { domain: "linkedin.com", count: 4500 },
  { domain: "crunchbase.com", count: 3200 },
  { domain: "github.com", count: 2800 },
  { domain: "twitter.com", count: 1900 },
  { domain: "ycombinator.com", count: 1200 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1">System Metrics</span>
          <h1 className="text-4xl font-bold tracking-tighter uppercase text-white">Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          <select className="bg-[#111] border border-white/10 text-white text-[10px] uppercase tracking-wider rounded-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <button className="bg-white text-black px-6 py-3 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white/90 active:scale-[0.98] transition-transform">
            Export Report
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Pages Crawled", value: "842,501", change: "+12.5%", icon: Network, color: "text-blue-500", bg: "bg-white/5" },
          { title: "Data Extracted", value: "3.2M", change: "+18.2%", icon: Database, color: "text-emerald-400", bg: "bg-white/5" },
          { title: "Leads Qualified", value: "12,409", change: "+8.1%", icon: Users, color: "text-purple-400", bg: "bg-white/5" },
          { title: "Active Workers", value: "24 / 50", change: "+4", icon: Activity, color: "text-rose-400", bg: "bg-white/5" },
        ].map((kpi, i) => (
          <Card key={i} className="hover:bg-white/5 transition-colors rounded-none">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`p-3 border border-white/10 ${kpi.bg}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">{kpi.title}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-3xl font-light tracking-tighter text-white">{kpi.value}</h3>
                  <span className="text-[10px] font-mono text-emerald-400 bg-white/5 px-1.5 py-0.5 border border-white/10 flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    {kpi.change}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <Card className="lg:col-span-2 rounded-none">
          <CardHeader className="pb-4">
            <CardTitle>Crawl Activity Volume</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorPages" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderRadius: '0', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="pages" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorPages)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Quality Distribution */}
        <Card className="rounded-none">
          <CardHeader className="pb-4">
            <CardTitle>Content Quality Scoring</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="h-[220px] w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={qualityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {qualityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#111', borderRadius: '0', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-4xl font-light tracking-tighter text-white">92%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Above avg</span>
              </div>
            </div>
            <div className="w-full mt-4 space-y-2">
              {qualityData.map((item, i) => (
                 <div key={i} className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-3">
                     <span className="w-2 h-2 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.5)]" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}></span>
                     <span className="text-white/60 font-medium text-xs uppercase tracking-wider">{item.name}</span>
                   </div>
                   <span className="font-mono text-white text-xs">{(item.value / 9500 * 100).toFixed(1)}%</span>
                 </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Domains Bar Chart */}
        <Card className="lg:col-span-3 rounded-none">
          <CardHeader className="pb-4">
            <CardTitle>Top Domains Crawled</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={domainData} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="domain" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.6)", fontFamily: 'monospace' }} width={120} />
                  <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#111', borderRadius: '0', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }} itemStyle={{ color: '#fff' }} />
                  <Bar dataKey="count" fill="#2563eb" barSize={16} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
