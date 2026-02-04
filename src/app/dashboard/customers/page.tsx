"use client";

import Header from "@/components/Header";
import Image from "next/image";
import {
    Users,
    Search,
    MoreVertical,
    Mail,
    Phone,
    ArrowUpRight,
    TrendingUp,
    MapPin,
    Calendar,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";

const initialCustomers = [
    { id: 1, name: "Sneha Kapur", email: "sneha@example.com", phone: "+1 234 567 8901", orders: 42, spent: "$1,240.50", points: 850, lastVisit: "2 days ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { id: 2, name: "Arjun Verma", email: "arjun@example.com", phone: "+1 234 567 8902", orders: 15, spent: "$450.25", points: 230, lastVisit: "5 days ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { id: 3, name: "Priya Singh", email: "priya@example.com", phone: "+1 234 567 8903", orders: 8, spent: "$185.00", points: 120, lastVisit: "1 week ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: 4, name: "Rahul Malhotra", email: "rahul@example.com", phone: "+1 234 567 8904", orders: 24, spent: "$680.75", points: 410, lastVisit: "Today", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { id: 5, name: "Anjali Gupta", email: "anjali@example.com", phone: "+1 234 567 8905", orders: 56, spent: "$2,100.00", points: 1450, lastVisit: "3 days ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" },
];

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const tableRef = useRef(null);

    const filteredCustomers = useMemo(() => {
        return initialCustomers.filter(customer =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.phone.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".customer-row",
                { opacity: 0, x: -10 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }, tableRef);
        return () => ctx.revert();
    }, [filteredCustomers]);

    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Customer Database</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Manage guest information and loyalty rewards</p>
                </div>

                <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl items-center gap-6 shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-500 border border-cyan-500/10">
                            <Users size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Guests</p>
                            <p className="text-lg font-black tracking-tight">{initialCustomers.length * 256}</p>
                        </div>
                    </div>
                    <div className="h-8 w-px bg-slate-100 dark:bg-slate-800" />
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/10">
                            <TrendingUp size={20} />
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                            <p className="text-lg font-black tracking-tight text-emerald-500">+12%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Grid Controls */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, email or phone..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-10 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors">
                            <X size={16} />
                        </button>
                    )}
                </div>
                <button className="bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-300 dark:border-slate-800 px-6 py-3 rounded-lg font-black text-[11px] uppercase tracking-widest hover:border-cyan-500 transition-all shadow-sm">
                    Filters
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none" ref={tableRef}>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Customer</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Orders</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Spent</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Loyalty Points</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Last Visit</th>
                                <th className="text-right px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Manage</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <tr key={customer.id} className="customer-row hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 group-hover:border-cyan-500/20 transition-colors bg-slate-100 dark:bg-slate-800">
                                                    <Image src={customer.img} alt={customer.name} width={48} height={48} className="w-full h-full object-cover" unoptimized />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black dark:text-white tracking-tight">{customer.name}</p>
                                                    <div className="flex items-center gap-3 mt-1.5 opacity-60">
                                                        <span className="text-[10px] font-bold flex items-center gap-1 group-hover:text-cyan-500 transition-colors"><Mail size={10} /> {customer.email}</span>
                                                        <span className="text-[10px] font-bold flex items-center gap-1"><Phone size={10} /> {customer.phone}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-black tracking-tight">{customer.orders}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-0.5">Orders</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-black text-emerald-500 tracking-tight">{customer.spent}</span>
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mt-0.5">Lifetime</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/10 font-bold group-hover:scale-110 transition-transform">
                                                    ★
                                                </div>
                                                <span className="text-sm font-black tracking-tight">{customer.points}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-[11px] font-black text-slate-500 dark:text-slate-400">{customer.lastVisit}</span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-3 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-all">
                                                <MoreVertical size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Users size={64} className="mb-6 opacity-10" />
                                            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-30">No guests found</p>
                                            <button onClick={() => setSearchQuery("")} className="mt-6 text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:underline">Clear search</button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Activity Highlights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-slate-400">
                        <TrendingUp size={16} className="text-cyan-500" />
                        Vip Guests
                    </h3>
                    <div className="space-y-5">
                        {[1, 5].map(id => {
                            const customer = initialCustomers.find(c => c.id === id);
                            if (!customer) return null;
                            return (
                                <div key={id} className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden border border-slate-100 dark:border-slate-800 group-hover:border-cyan-500/30 transition-all">
                                        <Image src={customer.img} alt={customer.name} width={40} height={40} unoptimized />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-black group-hover:text-cyan-500 transition-colors tracking-tight">{customer.name}</p>
                                        <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">{customer.points} Points</p>
                                    </div>
                                    <div className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg group-hover:scale-110 transition-transform">
                                        <ArrowUpRight size={14} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-slate-400">
                        <MapPin size={16} className="text-rose-500" />
                        Top Locations
                    </h3>
                    <div className="space-y-4">
                        {[
                            { area: "Indiranagar", count: 452, color: "bg-cyan-500" },
                            { area: "Whitefield", count: 218, color: "bg-blue-500" },
                            { area: "Koramangala", count: 184, color: "bg-indigo-500" },
                        ].map(item => (
                            <div key={item.area}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">{item.area}</span>
                                    <span className="text-xs font-black tracking-tight">{item.count}</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: `${(item.count / 500) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-2 text-slate-400">
                        <Calendar size={16} className="text-amber-500" />
                        Quick Actions
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm active:scale-95">Blast Email</button>
                        <button className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm active:scale-95">Add Reward</button>
                        <button className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm active:scale-95">New Group</button>
                        <button className="p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all shadow-sm active:scale-95">Support</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
