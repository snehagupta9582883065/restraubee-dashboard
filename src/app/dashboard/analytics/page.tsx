"use client";

import Header from "@/components/Header";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    LineChart,
    Line,
    AreaChart,
    Area,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import {
    TrendingUp,
    Users,
    ShoppingBag,
    DollarSign,
    Clock,
    ChevronDown,
    ArrowUpRight,
    Zap,
    Calendar,
    Filter
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { useDate } from "@/components/DateContext";

const revenueData = [
    { name: 'Mon', revenue: 4000, orders: 120 },
    { name: 'Tue', revenue: 3000, orders: 98 },
    { name: 'Wed', revenue: 2000, orders: 86 },
    { name: 'Thu', revenue: 2780, orders: 110 },
    { name: 'Fri', revenue: 1890, orders: 75 },
    { name: 'Sat', revenue: 2390, orders: 105 },
    { name: 'Sun', revenue: 3490, orders: 140 },
];

const customerGrowth = [
    { month: 'Jan', new: 400, returning: 2400 },
    { month: 'Feb', new: 300, returning: 1398 },
    { month: 'Mar', new: 200, returning: 9800 },
    { month: 'Apr', new: 278, returning: 3908 },
    { month: 'May', new: 189, returning: 4800 },
    { month: 'Jun', new: 239, returning: 3800 },
];

const categoryDistribution = [
    { name: 'Burgers', value: 400 },
    { name: 'Pizza', value: 300 },
    { name: 'Salads', value: 300 },
    { name: 'Desserts', value: 200 },
];

const COLORS = ['#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6'];

export default function AnalyticsPage() {
    const { timeRange } = useDate();
    const [activeChart, setActiveChart] = useState("revenue");

    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Business Intelligence</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Real-time performance analytics across all branches</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl">
                        <Calendar size={18} className="text-cyan-500" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-500">{timeRange} View</span>
                    </div>
                    <button className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-cyan-500 transition-all shadow-sm">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            {/* Primary Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {[
                    { label: "Gross Revenue", value: "$482,400", trend: "+12.5%", icon: DollarSign, color: "text-cyan-500", bg: "bg-cyan-500/10" },
                    { label: "Total Orders", value: "14,250", trend: "+8.2%", icon: ShoppingBag, color: "text-blue-500", bg: "bg-blue-500/10" },
                    { label: "Average Ticket", value: "$33.85", trend: "-2.4%", icon: Zap, color: "text-amber-500", bg: "bg-amber-500/10" },
                    { label: "New Customers", value: "1,240", trend: "+15.8%", icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
                ].map((metric) => (
                    <div key={metric.label} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all duration-300 shadow-sm relative overflow-hidden">
                        <div className={cn("absolute top-0 right-0 w-24 h-24 blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform", metric.bg)} />
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("p-3 rounded-xl", metric.bg, metric.color)}>
                                <metric.icon size={20} />
                            </div>
                            <div className={cn(
                                "flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg",
                                metric.trend.startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                            )}>
                                {metric.trend}
                                {metric.trend.startsWith('+') ? <TrendingUp size={10} /> : <TrendingUp size={10} className="rotate-180" />}
                            </div>
                        </div>
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{metric.label}</p>
                        <h4 className="text-2xl font-black tracking-tight dark:text-white leading-none">{metric.value}</h4>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Revenue Chart */}
                <div className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Revenue Dynamics</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Comparison between revenue and volume</p>
                        </div>
                        <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl">
                            <button
                                onClick={() => setActiveChart("revenue")}
                                className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all", activeChart === "revenue" ? "bg-white dark:bg-slate-900 text-cyan-500 shadow-sm" : "text-slate-400")}
                            >Revenue</button>
                            <button
                                onClick={() => setActiveChart("orders")}
                                className={cn("px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all", activeChart === "orders" ? "bg-white dark:bg-slate-900 text-cyan-500 shadow-sm" : "text-slate-400")}
                            >Orders</button>
                        </div>
                    </div>

                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                    labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', fontWeight: '900', marginBottom: '4px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey={activeChart}
                                    stroke="#06b6d4"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                    animationDuration={1500}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xl font-black uppercase tracking-tight mb-8">Menu Share</h3>
                    <div className="h-[250px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={10}
                                    dataKey="value"
                                    animationDuration={1500}
                                >
                                    {categoryDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="transparent" />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                            <p className="text-2xl font-black dark:text-white leading-none">1.2k</p>
                        </div>
                    </div>

                    <div className="mt-8 space-y-3">
                        {categoryDistribution.map((item, index) => (
                            <div key={item.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-tighter">{item.name}</span>
                                </div>
                                <span className="text-xs font-black">{((item.value / 1200) * 100).toFixed(0)}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Customer Growth Trend */}
                <div className="lg:col-span-3 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black uppercase tracking-tight">Retention Analysis</h3>
                            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Growth of new vs returning customers</p>
                        </div>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-500 hover:text-cyan-600 transition-colors">
                            Full Report <ArrowUpRight size={14} />
                        </button>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={customerGrowth}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                                />
                                <Line
                                    type="stepAfter"
                                    dataKey="returning"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                    animationDuration={2000}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="new"
                                    stroke="#06b6d4"
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff' }}
                                    activeDot={{ r: 6, strokeWidth: 0 }}
                                    animationDuration={2000}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
