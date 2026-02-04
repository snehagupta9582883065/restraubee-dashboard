"use client";

import Header from "@/components/Header";
import {
    ArrowLeft,
    TrendingUp,
    ShoppingBag,
    DollarSign,
    Users,
    MapPin,
    Phone,
    Mail,
    MoreVertical,
    Calendar,
    Building2,
    Clock,
    ArrowUpRight,
    Plus,
    Search,
    Star,
    Check,
    X,
    Bookmark
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useState, useMemo, useRef, useEffect } from "react";
import { gsap } from "gsap";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';

// Replaced static branchData with dynamic API fetching

const globalInventory = [
    { id: 1, productName: "Truffle Fries", productPrice: 12.00, categoryName: "Sides", branch: "Indiranagar Hub", image: "https://images.unsplash.com/photo-1573080493719-44933d7b8893?w=100" },
    { id: 2, productName: "Spicy Ramen", productPrice: 18.50, categoryName: "Mains", branch: "Downtown Central", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=100" },
    { id: 3, productName: "Avocado Toast", productPrice: 14.00, categoryName: "Breakfast", branch: "Whitefield Plaza", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=100" },
    { id: 4, productName: "Iced Latte", productPrice: 6.50, categoryName: "Drinks", branch: "Indiranagar Hub", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=100" },
    { id: 5, productName: "Cheesecake", productPrice: 9.00, categoryName: "Desserts", branch: "Downtown Central", image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?w=100" },
];

const localizedRevenue = [
    { day: 'Mon', revenue: 2400 },
    { day: 'Tue', revenue: 1398 },
    { day: 'Wed', revenue: 9800 },
    { day: 'Thu', revenue: 3908 },
    { day: 'Fri', revenue: 4800 },
    { day: 'Sat', revenue: 3800 },
    { day: 'Sun', revenue: 4300 },
];

const categoryMix = [
    { name: 'Burgers', value: 45 },
    { name: 'Drinks', value: 25 },
    { name: 'Sides', value: 20 },
    { name: 'Desserts', value: 10 },
];

const COLORS = ['#06b6d4', '#8b5cf6', '#3b82f6', '#10b981'];

const recentOrders = [
    { id: "#B-101", customer: "John Doe", items: "2x Burger, 1x Coke", amount: "$32.00", status: "Completed", time: "10 mins ago" },
    { id: "#B-102", customer: "Jane Smith", items: "1x Pizza, 2x Wings", amount: "$45.50", status: "Pending", time: "15 mins ago" },
    { id: "#B-103", customer: "Mark Ruffalo", items: "1x Pasta, 1x Wine", amount: "$28.00", status: "Completed", time: "30 mins ago" },
    { id: "#B-104", customer: "Tony Stark", items: "5x Cheeseburgers", amount: "$85.00", status: "Completed", time: "1 hour ago" },
];

const initialCustomers = [
    { id: 1, name: "Sneha Kapur", email: "sneha@example.com", phone: "+1 234 567 8901", orders: 42, spent: "$1,240.50", points: 850, lastVisit: "2 days ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha" },
    { id: 2, name: "Arjun Verma", email: "arjun@example.com", phone: "+1 234 567 8902", orders: 15, spent: "$450.25", points: 230, lastVisit: "5 days ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun" },
    { id: 3, name: "Priya Singh", email: "priya@example.com", phone: "+1 234 567 8903", orders: 8, spent: "$185.00", points: 120, lastVisit: "1 week ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { id: 4, name: "Rahul Malhotra", email: "rahul@example.com", phone: "+1 234 567 8904", orders: 24, spent: "$680.75", points: 410, lastVisit: "Today", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" },
    { id: 5, name: "Anjali Gupta", email: "anjali@example.com", phone: "+1 234 567 8905", orders: 56, spent: "$2,100.00", points: 1450, lastVisit: "3 days ago", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali" },
];

export default function BranchDashboard() {
    const params = useParams();
    const id = params?.id as string;
    const [branch, setBranch] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBranchDetails = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/branches/${id}`, {
                headers: {
                    "x-access-token": token || "",
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBranch(data);
            }
        } catch (error) {
            console.error("Error fetching branch details:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchBranchDetails();
        }
    }, [id]);

    // Tab State
    const [activeTab, setActiveTab] = useState("overview");

    // Customer State
    const [customerSearch, setCustomerSearch] = useState("");
    const customerTableRef = useRef(null);

    const filteredCustomers = useMemo(() => {
        return initialCustomers.filter(customer =>
            customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
            customer.email.toLowerCase().includes(customerSearch.toLowerCase()) ||
            customer.phone.toLowerCase().includes(customerSearch.toLowerCase())
        );
    }, [customerSearch]);

    useEffect(() => {
        if (activeTab === "customers") {
            const ctx = gsap.context(() => {
                gsap.fromTo(".customer-row",
                    { opacity: 0, x: -10 },
                    { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
                );
            }, customerTableRef);
            return () => ctx.revert();
        }
    }, [filteredCustomers, activeTab]);

    // Inventory State
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [invSearch, setInvSearch] = useState("");
    const [selectedSource, setSelectedSource] = useState("All Branches");
    const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);
    const [addedIds, setAddedIds] = useState<number[]>([]);

    // New Item Form State
    const [newItem, setNewItem] = useState({
        productName: "",
        productPrice: 0,
        categoryName: "Fast Food",
        companyName: "Foodies Ltd",
        description: "",
        status: "ACTIVE",
        taxPercentage: 5.0,
        productType: "VEG" as "VEG" | "NON_VEG",
        image: null as File | null
    });

    const filteredInventory = useMemo(() => {
        return globalInventory.filter(item => {
            const matchesSearch = item.productName.toLowerCase().includes(invSearch.toLowerCase()) ||
                item.categoryName.toLowerCase().includes(invSearch.toLowerCase());
            const matchesBranch = selectedSource === "All Branches" || item.branch === selectedSource;
            return matchesSearch && matchesBranch;
        });
    }, [invSearch, selectedSource]);

    const toggleBookmark = (id: number) => {
        setBookmarkedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
    };

    const addToBranch = (id: number) => {
        setAddedIds(prev => [...prev, id]);
    };

    const handleCreateNew = () => {
        // Simulate creation
        const id = Math.floor(Math.random() * 9000) + 1000;
        setAddedIds(prev => [...prev, id]);
        setIsCreatingNew(false);
        setNewItem({
            productName: "",
            productPrice: 0,
            categoryName: "Fast Food",
            companyName: "Foodies Ltd",
            description: "",
            status: "ACTIVE",
            taxPercentage: 5.0,
            productType: "VEG",
            image: null as File | null
        });
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-cyan-500/10 rounded-2xl" />
                    <div className="absolute inset-0 border-4 border-cyan-500 border-t-transparent rounded-2xl animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-cyan-500">
                        <Building2 size={32} />
                    </div>
                </div>
                <h2 className="text-xl font-black uppercase tracking-[0.3em] text-cyan-500/50 animate-pulse">Initializing Dashboard...</h2>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-4">Security protocols active & loading branch data</p>
            </div>
        );
    }

    if (!branch) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
                <Building2 size={64} className="text-slate-200 dark:text-slate-800 mb-6" />
                <h2 className="text-2xl font-black uppercase tracking-tight text-slate-900 dark:text-white">Branch Not Found</h2>
                <Link href="/branches" className="mt-6 px-6 py-3 bg-cyan-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20">
                    Back to Branches
                </Link>
            </div>
        );
    }
    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            {/* Back Navigation & Breadcrumb */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/branches"
                    className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:text-cyan-500 hover:border-cyan-500/50 transition-all shadow-sm group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <Link href="/branches" className="hover:text-cyan-500 transition-colors">Branches</Link>
                        <span>/</span>
                        <span className="text-cyan-500">{branch?.name}</span>
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tight mt-1">Branch Dashboard</h2>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl w-fit mb-8 border border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab("overview")}
                    className={cn(
                        "px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                        activeTab === "overview"
                            ? "bg-white dark:bg-slate-800 text-cyan-500 shadow-sm"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    )}
                >
                    <TrendingUp size={14} />
                    Overview
                </button>
                <button
                    onClick={() => setActiveTab("customers")}
                    className={cn(
                        "px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                        activeTab === "customers"
                            ? "bg-white dark:bg-slate-800 text-cyan-500 shadow-sm"
                            : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    )}
                >
                    <Users size={14} />
                    Customers
                </button>
            </div>

            {activeTab === "overview" ? (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Branch Hero Card */}
                        <div className="lg:col-span-2 relative h-[300px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl group">
                            <Image
                                src={branch.image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200"}
                                alt={branch.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">Live Branch Operations</span>
                                    </div>
                                    <h3 className="text-4xl font-black text-white tracking-tight leading-none mb-4">{branch.name}</h3>
                                    <div className="flex flex-wrap gap-4 text-white/70 text-[11px] font-bold">
                                        <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                                            <MapPin size={14} className="text-cyan-400" />
                                            {branch.address || branch.location || "No Address Set"}
                                        </div>
                                        <div className="flex items-center gap-2 backdrop-blur-md bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                                            <Building2 size={14} className="text-cyan-400" />
                                            Manager: {branch.manager || branch.managerEmail || "Branch Admin"}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsAddModalOpen(true)}
                                        className="px-6 py-3 bg-white text-cyan-500 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Item
                                    </button>
                                    <button className="px-6 py-3 bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all">
                                        Edit Branch
                                    </button>
                                    <button className="p-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all">
                                        <MoreVertical size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact & Info */}
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm flex flex-col justify-center">
                            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Branch Communications</h4>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm border border-cyan-500/10">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Phone Support</p>
                                        <p className="text-sm font-black dark:text-white mt-0.5">{branch.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-sm border border-purple-500/10">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Hub</p>
                                        <p className="text-sm font-black dark:text-white mt-0.5">{branch.managerEmail || branch.email || "No Email"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-sm border border-amber-500/10">
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Peak Hours</p>
                                        <p className="text-sm font-black dark:text-white mt-0.5">12:00 PM - 3:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analytics Subsection */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: "Daily Revenue", value: "$4,240", trend: "+15%", icon: DollarSign, color: "text-emerald-500" },
                            { label: "New Orders", value: "86 Items", trend: "+5%", icon: ShoppingBag, color: "text-cyan-500" },
                            { label: "Active Staff", value: "24 Members", trend: "Full", icon: Users, color: "text-purple-500" },
                            { label: "Avg Ticket", value: "$49.50", trend: "+2%", icon: TrendingUp, color: "text-amber-500" },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl hover:shadow-lg transition-all">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={cn("p-2 rounded-xl bg-slate-50 dark:bg-slate-800", stat.color)}>
                                        <stat.icon size={18} />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.trend}</span>
                                </div>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                                <h4 className="text-lg font-black tracking-tight">{stat.value}</h4>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                        {/* Branch Revenue Chart */}
                        <div className="lg:col-span-2 p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">Weekly Performance</h3>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Revenue statistics for the current week</p>
                                </div>
                                <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-cyan-500 transition-colors">
                                    <Calendar size={18} />
                                </button>
                            </div>

                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={localizedRevenue}>
                                        <defs>
                                            <linearGradient id="colorLoc" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 900, fill: '#94a3b8' }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                            itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            labelStyle={{ color: '#94a3b8', fontSize: '10px', textTransform: 'uppercase', fontWeight: '900', marginBottom: '4px' }}
                                        />
                                        <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={4} fillOpacity={1} fill="url(#colorLoc)" animationDuration={1500} />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Local Category Mix */}
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                            <h3 className="text-xl font-black uppercase tracking-tight mb-8">Branch Menu Share</h3>
                            <div className="h-[250px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoryMix}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={85}
                                            paddingAngle={8}
                                            dataKey="value"
                                            animationDuration={1500}
                                        >
                                            {categoryMix.map((entry, index) => (
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
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Impact</p>
                                    <p className="text-2xl font-black dark:text-white leading-none">High</p>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                {categoryMix.map((item, index) => (
                                    <div key={item.name} className="flex items-center gap-3">
                                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Branch Orders Table */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black uppercase tracking-tight">Recent Live Orders</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Real-time order flow for this branch</p>
                            </div>
                            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-500 hover:underline">
                                View All <ArrowUpRight size={14} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-950/20 text-left">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Order ID</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Guest</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice Items</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Total Price</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                    {recentOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                                            <td className="px-8 py-5">
                                                <span className="text-xs font-black text-cyan-500 bg-cyan-500/5 px-2.5 py-1.5 rounded-xl border border-cyan-500/10 inline-block">{order.id}</span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-sm font-black dark:text-white tracking-tight">{order.customer}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{order.time}</p>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 max-w-[200px] truncate">{order.items}</p>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-black tracking-tight">{order.amount}</td>
                                            <td className="px-8 py-5">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border",
                                                    order.status === 'Completed' ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" : "bg-amber-500/5 text-amber-500 border-amber-500/10"
                                                )}>{order.status}</span>
                                            </td>
                                            <td className="px-8 py-5 text-right">
                                                <button className="p-2.5 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/5 rounded-xl transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Customers Content */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, email or phone..."
                                value={customerSearch}
                                onChange={(e) => setCustomerSearch(e.target.value)}
                                className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-10 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                            />
                            {customerSearch && (
                                <button onClick={() => setCustomerSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:border-cyan-500 transition-all shadow-sm">
                            Export List
                        </button>
                    </div>

                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm" ref={customerTableRef}>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800">
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
                                                        <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/10 font-bold">
                                                            <Star size={14} className="fill-current" />
                                                        </div>
                                                        <span className="text-sm font-black tracking-tight">{customer.points}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <span className="text-[11px] font-black text-slate-500 dark:text-slate-400">{customer.lastVisit}</span>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <button className="p-3 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-xl transition-all">
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
                                                    <button onClick={() => setCustomerSearch("")} className="mt-6 text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:underline">Clear search</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Inventory Selection Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsAddModalOpen(false)}
                    />

                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in zoom-in-95 fade-in duration-300">
                        {/* Header */}
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight">
                                    {isCreatingNew ? "Define New Item" : "Source Inventory"}
                                </h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">
                                    {isCreatingNew ? "Create a unique item for this branch" : "Select products from other branches"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setIsCreatingNew(!isCreatingNew)}
                                    className="px-4 py-2 bg-slate-100 dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-cyan-500 hover:text-white transition-all flex items-center gap-2"
                                >
                                    {isCreatingNew ? <><ArrowLeft size={14} /> Back to Search</> : <><Plus size={14} /> Create New</>}
                                </button>
                                <button
                                    onClick={() => {
                                        setIsAddModalOpen(false);
                                        setIsCreatingNew(false);
                                    }}
                                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-rose-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {!isCreatingNew ? (
                            <>
                                {/* Search & Filter */}
                                <div className="p-6 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-50 dark:border-slate-800 space-y-4">
                                    <div className="relative group">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search global products..."
                                            value={invSearch}
                                            onChange={(e) => setInvSearch(e.target.value)}
                                            className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                        {["All Branches", "Downtown Central", "Indiranagar Hub", "Whitefield Plaza"].map(src => (
                                            <button
                                                key={src}
                                                onClick={() => setSelectedSource(src)}
                                                className={cn(
                                                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap border transition-all",
                                                    selectedSource === src
                                                        ? "bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-500/20"
                                                        : "bg-white dark:bg-slate-900 text-slate-400 border-slate-200 dark:border-slate-800 hover:border-cyan-500/50"
                                                )}
                                            >
                                                {src}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Inventory List */}
                                <div className="max-h-[400px] overflow-y-auto p-6 space-y-4">
                                    {filteredInventory.length > 0 ? (
                                        filteredInventory.map((item) => (
                                            <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-cyan-500/30 transition-all group">
                                                <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                                    <Image src={item.image} alt={item.productName} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-sm font-black dark:text-white truncate">{item.productName}</h4>
                                                        {bookmarkedIds.includes(item.id) && <Bookmark size={12} className="fill-amber-500 text-amber-500" />}
                                                    </div>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.categoryName}</span>
                                                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                        <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest truncate">{item.branch}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleBookmark(item.id)}
                                                        className={cn(
                                                            "p-2.5 rounded-xl border transition-all",
                                                            bookmarkedIds.includes(item.id)
                                                                ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                                                                : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-800 text-slate-400 hover:text-amber-500"
                                                        )}
                                                    >
                                                        <Star size={16} className={bookmarkedIds.includes(item.id) ? "fill-current" : ""} />
                                                    </button>
                                                    <button
                                                        onClick={() => addToBranch(item.id)}
                                                        disabled={addedIds.includes(item.id)}
                                                        className={cn(
                                                            "px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                                            addedIds.includes(item.id)
                                                                ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                                                                : "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:scale-105"
                                                        )}
                                                    >
                                                        {addedIds.includes(item.id) ? (
                                                            <><Check size={14} /> Added</>
                                                        ) : (
                                                            <><Plus size={14} /> Add</>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-20 text-center">
                                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-900 rounded-3xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                                                <ShoppingBag size={32} />
                                            </div>
                                            <p className="text-sm font-black uppercase tracking-widest text-slate-400">No products found</p>
                                            <p className="text-[10px] font-bold text-slate-500 mt-1">Try adjusting your filters or search terms</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <div className="p-8 max-h-[500px] overflow-y-auto space-y-6 animate-in slide-in-from-right-4 duration-300 scrollbar-hide">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Veggie Burger"
                                            value={newItem.productName}
                                            onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price</label>
                                        <div className="relative">
                                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                            <input
                                                type="number"
                                                placeholder="149.99"
                                                value={newItem.productPrice || ""}
                                                onChange={(e) => setNewItem({ ...newItem, productPrice: parseFloat(e.target.value) || 0 })}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-10 pr-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Type</label>
                                        <div className="flex gap-2 p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
                                            <button
                                                onClick={() => setNewItem({ ...newItem, productType: "VEG" })}
                                                className={cn(
                                                    "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                    newItem.productType === "VEG"
                                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                )}
                                            >
                                                Veg
                                            </button>
                                            <button
                                                onClick={() => setNewItem({ ...newItem, productType: "NON_VEG" })}
                                                className={cn(
                                                    "flex-1 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                                    newItem.productType === "NON_VEG"
                                                        ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20"
                                                        : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                                                )}
                                            >
                                                Non-Veg
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Fast Food"
                                            value={newItem.categoryName}
                                            onChange={(e) => setNewItem({ ...newItem, categoryName: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Foodies Ltd"
                                            value={newItem.companyName}
                                            onChange={(e) => setNewItem({ ...newItem, companyName: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                        />
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                                        <textarea
                                            placeholder="e.g. Fresh and tasty burger"
                                            value={newItem.description}
                                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm min-h-[80px] resize-none"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tax (%)</label>
                                        <div className="relative">
                                            <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">%</span>
                                            <input
                                                type="number"
                                                value={newItem.taxPercentage}
                                                onChange={(e) => setNewItem({ ...newItem, taxPercentage: parseFloat(e.target.value) || 0 })}
                                                className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Status</label>
                                        <select
                                            value={newItem.status}
                                            onChange={(e) => setNewItem({ ...newItem, status: e.target.value })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-black text-[10px] uppercase tracking-widest appearance-none cursor-pointer"
                                        >
                                            <option>ACTIVE</option>
                                            <option>INACTIVE</option>
                                            <option>OUT_OF_STOCK</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2 col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Product Image</label>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) setNewItem({ ...newItem, image: file });
                                                }}
                                                className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/50 transition-all bg-slate-50/50 dark:bg-slate-900/50">
                                                {newItem.image ? (
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-3 bg-cyan-500/10 rounded-xl text-cyan-500">
                                                            <Check size={20} />
                                                        </div>
                                                        <div>
                                                            <p className="text-xs font-black uppercase truncate max-w-[200px]">{newItem.image.name}</p>
                                                            <p className="text-[10px] font-bold text-slate-400">File uploaded successfully</p>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Plus size={24} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-500 transition-colors">veggie-burger.png</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {isCreatingNew ? `ID: PROD-${Math.floor(Math.random() * 9000) + 1000}` : `${addedIds.length} Products added to branch`}
                            </p>
                            <div className="flex gap-3">
                                {isCreatingNew ? (
                                    <button
                                        onClick={handleCreateNew}
                                        disabled={!newItem.productName || newItem.productPrice <= 0}
                                        className="px-8 py-3 bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                    >
                                        Finalize & Add
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            setIsAddModalOpen(false);
                                            setIsCreatingNew(false);
                                        }}
                                        className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
