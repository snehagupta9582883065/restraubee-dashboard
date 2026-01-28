"use client";

import Header from "@/components/Header";
import {
    Search,
    Filter,
    ChevronDown,
    MoreVertical,
    ExternalLink,
    Download,
    Calendar,
    X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useDate } from "@/components/DateContext";

const initialOrders = [
    { id: "#1345", customer: "Alex Johnson", items: "2x Cheeseburgers, 1x Salad", total: "$42.50", status: "Completed", date: "Apr 24, 2024", time: "5:45 PM" },
    { id: "#1344", customer: "Sarah Miller", items: "1x Margherita Pizza", total: "$18.20", status: "Pending", date: "Apr 24, 2024", time: "5:30 PM" },
    { id: "#1343", customer: "David Chen", items: "2x Carbonara, 2x Coke", total: "$64.00", status: "Completed", date: "Apr 24, 2024", time: "5:15 PM" },
    { id: "#1342", customer: "Emma Wilson", items: "1x Salad", total: "$12.80", status: "Canceled", date: "Apr 24, 2024", time: "5:05 PM" },
    { id: "#1341", customer: "Michael Brown", items: "3x Tacos, 1x Beer", total: "$35.50", status: "Completed", date: "Apr 24, 2024", time: "4:50 PM" },
    { id: "#1340", customer: "Emily Davis", items: "1x Salmon Grill", total: "$28.00", status: "Completed", date: "Apr 24, 2024", time: "4:35 PM" },
];

export default function OrdersPage() {
    const { timeRange } = useDate();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const containerRef = useRef(null);

    const filteredOrders = useMemo(() => {
        return initialOrders.filter(order => {
            const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.customer.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "All" || order.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [searchQuery, statusFilter]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".order-row",
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: "power2.out" }
            );
        }, containerRef);
        return () => ctx.revert();
    }, [filteredOrders]);

    return (
        <div className="pb-12 animate-in fade-in duration-700" ref={containerRef}>
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Order Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Manage and track all restaurant orders</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md border border-slate-300 dark:border-slate-800 px-4 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider hover:border-cyan-500 transition-all group">
                        <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                        Export CSV
                    </button>
                    <button className="flex items-center gap-2 bg-cyan-500 text-white px-6 py-2.5 rounded-lg font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
                        Create Order
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                <div className="lg:col-span-2 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search by order ID, customer name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-10 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery("")}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-3.5 rounded-xl cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-sm">
                    <Calendar size={18} className="text-cyan-500" />
                    <span className="text-xs font-bold flex-1 text-slate-500 dark:text-slate-400">Date Range</span>
                    <ChevronDown size={16} className="text-slate-400" />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={cn(
                            "w-full flex items-center gap-2 bg-white dark:bg-slate-900 border px-4 py-3.5 rounded-xl transition-all shadow-sm",
                            isFilterOpen ? "border-cyan-500 ring-4 ring-cyan-500/5" : "border-slate-200 dark:border-slate-800"
                        )}
                    >
                        <Filter size={18} className={cn(statusFilter !== "All" ? "text-cyan-500" : "text-slate-400")} />
                        <span className="text-xs font-black uppercase tracking-tight flex-1 text-left">{statusFilter} Status</span>
                        <ChevronDown size={16} className={cn("text-slate-400 transition-transform", isFilterOpen && "rotate-180")} />
                    </button>

                    {isFilterOpen && (
                        <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                            {["All", "Completed", "Pending", "Canceled"].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setStatusFilter(status);
                                        setIsFilterOpen(false);
                                    }}
                                    className={cn(
                                        "w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all",
                                        statusFilter === status
                                            ? "bg-cyan-500 text-white"
                                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    )}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800">
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Order ID</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Customer</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Items</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Amount</th>
                                <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Time</th>
                                <th className="text-right px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="order-row hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                                        <td className="px-8 py-5">
                                            <span className="text-xs font-black text-cyan-500 bg-cyan-500/5 px-2 py-1 rounded-md border border-cyan-500/10 group-hover:scale-110 transition-transform inline-block">
                                                {order.id}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-sm font-black dark:text-white tracking-tight">{order.customer}</p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 max-w-[220px] truncate leading-relaxed">
                                                {order.items}
                                            </p>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={cn(
                                                "inline-flex items-center px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border",
                                                order.status === 'Completed' && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                                                order.status === 'Pending' && "bg-amber-500/10 text-amber-500 border-amber-500/20",
                                                order.status === 'Canceled' && "bg-rose-500/10 text-rose-500 border-rose-500/20"
                                            )}>
                                                <span className={cn(
                                                    "w-1 h-1 rounded-full mr-2",
                                                    order.status === 'Completed' && "bg-emerald-500",
                                                    order.status === 'Pending' && "bg-amber-500",
                                                    order.status === 'Canceled' && "bg-rose-500"
                                                )} />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className="text-sm font-black tracking-tight">{order.total}</span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-black dark:text-white">{order.time}</span>
                                                <span className="text-[9px] font-bold text-slate-500 mt-0.5">{order.date}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <div className="flex items-center justify-end gap-1.5 translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                                <button className="p-2.5 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-all">
                                                    <ExternalLink size={16} />
                                                </button>
                                                <button className="p-2.5 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-all">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-8 py-20 text-center">
                                        <div className="flex flex-col items-center justify-center text-slate-400">
                                            <Search size={48} className="mb-4 opacity-20" />
                                            <p className="text-lg font-black uppercase tracking-widest opacity-50">No orders found</p>
                                            <p className="text-xs font-bold mt-2">Try adjusting your filters or search query</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="px-8 py-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50/30 dark:bg-slate-900/30">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Showing <span className="text-slate-900 dark:text-white">{filteredOrders.length}</span> results
                    </p>
                    <div className="flex items-center gap-2">
                        <button className="h-10 px-6 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white dark:hover:bg-slate-800 transition-all" disabled>Prev</button>
                        <button className="h-10 px-6 border border-slate-200 dark:border-slate-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-white dark:hover:bg-slate-800 transition-all">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
