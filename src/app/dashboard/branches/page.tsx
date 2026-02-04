"use client";

import Header from "@/components/Header";
import {
    Plus,
    Search,
    Filter,
    MapPin,
    MoreVertical,
    TrendingUp,
    Users,
    ChevronDown,
    Building2,
    Phone,
    X,
    TrendingDown,
    LayoutGrid,
    List,
    FileText,
    Key,
    ShieldCheck,
    Settings2,
    Mail,
    Upload,
    Camera,
    Clock,
    Lock,
    TriangleAlert,
    ArrowRight,
    Loader2,
    Hexagon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useUser } from "@/components/UserContext";
import { useDate } from "@/components/DateContext";

const initialBranches = [
    {
        id: 1,
        name: "Downtown Central",
        manager: "Rajesh Kumar",
        address: "123 MG Road, Bangalore",
        phone: "+91 98765 00001",
        email: "central@restraubee.com",
        status: "Active",
        staff: 24,
        revenue: "$125,400",
        performance: "+15%",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop"
    },
    {
        id: 2,
        name: "Indiranagar Hub",
        manager: "Sanjana Rao",
        address: "456 100ft Rd, Bangalore",
        phone: "+91 98765 00002",
        email: "indiranagar@restraubee.com",
        status: "Active",
        staff: 18,
        revenue: "$98,200",
        performance: "+8%",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=250&fit=crop"
    },
    {
        id: 3,
        name: "Whitefield Plaza",
        manager: "Amit Shah",
        address: "789 ITPL Rd, Bangalore",
        phone: "+91 98765 00003",
        email: "whitefield@restraubee.com",
        status: "Maintenance",
        staff: 15,
        revenue: "$45,600",
        performance: "-5%",
        image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&h=250&fit=crop"
    },
    {
        id: 4,
        name: "Koramangala 4th Block",
        manager: "Priya Menon",
        address: "321 80ft Rd, Bangalore",
        phone: "+91 98765 00004",
        email: "koramangala@restraubee.com",
        status: "Active",
        staff: 22,
        revenue: "$112,000",
        performance: "+12%",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&h=250&fit=crop"
    }
];

export default function BranchesPage() {
    const { timeRange } = useDate();
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("General");
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<string[]>([]);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [branches, setBranches] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const gridRef = useRef(null);
    const toastRef = useRef(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        name: "",
        userEmail: "",
        userPassword: "",
        description: "",
        location: "",
        phone: "",
        status: "Active",
        activeStaff: 0,
        workingHours: "",
        image: "",
        copyInventoryFrom: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchBranches = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/branches`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token || ""
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBranches(Array.isArray(data) ? data : []);
            } else {
                console.error("Failed to fetch branches");
            }
        } catch (err) {
            console.error("Error fetching branches:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredBranches = useMemo(() => {
        return branches.filter(branch => {
            const matchesSearch = (branch.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (branch.location || branch.address || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (branch.managerEmail || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesStatus = statusFilter === "All Status" || branch.status === statusFilter;
            return matchesSearch && matchesStatus;
        });
    }, [branches, searchQuery, statusFilter]);

    useEffect(() => {
        fetchBranches();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(".branch-anim",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" }
            );
        }, gridRef);
        return () => ctx.revert();
    }, [filteredBranches, viewMode, isLoading]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors.includes(name)) {
            setErrors(prev => prev.filter(err => err !== name));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImagePreview(result);
                setFormData(prev => ({ ...prev, image: result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const validateTab = (tab: string) => {
        const newErrors: string[] = [];
        if (tab === "General") {
            if (!formData.name) newErrors.push("name");
            if (!formData.userEmail) newErrors.push("userEmail");
            if (!formData.location) newErrors.push("location");
        }
        if (tab === "Staff & Ops") {
            if (!formData.phone) newErrors.push("phone");
            if (!formData.activeStaff) newErrors.push("activeStaff");
            if (!formData.workingHours) newErrors.push("workingHours");
        }
        if (tab === "Security") {
            if (!formData.userPassword) newErrors.push("userPassword");
        }

        if (newErrors.length > 0) {
            setErrors(newErrors);
            setShowErrorToast(true);

            // GSAP Animation for toast
            setTimeout(() => {
                gsap.fromTo(toastRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                );
            }, 0);

            // Auto-hide toast after 4 seconds
            setTimeout(() => {
                setShowErrorToast(false);
            }, 4000);
        } else {
            setErrors([]);
            setShowErrorToast(false);
        }

        return newErrors.length === 0;
    };

    const handleCreateBranch = async () => {
        if (!validateTab("Security")) return;

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            console.log("Branch Creation - Sending x-access-token:", token ? "Token present" : "Token missing");
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/branches`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token || ""
                },
                body: JSON.stringify({
                    ...formData,
                    activeStaff: Number(formData.activeStaff)
                }),
            });

            if (response.ok) {
                setIsModalOpen(false);
                // Reset form
                setFormData({
                    name: "",
                    userEmail: "",
                    userPassword: "",
                    description: "",
                    location: "",
                    phone: "",
                    status: "Active",
                    activeStaff: 0,
                    workingHours: "",
                    image: "",
                    copyInventoryFrom: null
                });
                setImagePreview(null);
                // Refresh branches
                fetchBranches();
                // Optionally show success toast
            } else {
                const data = await response.json();
                setErrors([data.message || "Failed to create branch"]);
                setShowErrorToast(true);
            }
        } catch (err) {
            setErrors(["Something went wrong. Please try again."]);
            setShowErrorToast(true);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinue = () => {
        if (!validateTab(activeTab)) {
            return;
        }

        if (activeTab === "General") setActiveTab("Staff & Ops");
        else if (activeTab === "Staff & Ops") setActiveTab("Security");
    };

    const handleBack = () => {
        if (activeTab === "Staff & Ops") setActiveTab("General");
        else if (activeTab === "Security") setActiveTab("Staff & Ops");
    };

    const { role } = useUser();

    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Branch Management</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Monitor and manage all restaurant locations</p>
                </div>

                {role === "admin" && (
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center justify-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg font-black text-[11px] uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        <Plus size={18} />
                        Add New Branch
                    </button>
                )}
            </div>

            {/* Grid Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search branches by name, location or manager..."
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

                <div className="flex items-center gap-3">
                    <div className="relative min-w-[200px]">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className={cn(
                                "w-full flex items-center gap-2 bg-white dark:bg-slate-900 border px-4 py-3.5 rounded-xl transition-all shadow-sm",
                                isFilterOpen ? "border-cyan-500 ring-4 ring-cyan-500/5" : "border-slate-200 dark:border-slate-800"
                            )}
                        >
                            <Filter size={18} className={cn(statusFilter !== "All Status" ? "text-cyan-500" : "text-slate-400")} />
                            <span className="text-xs font-black uppercase tracking-tight flex-1 text-left">{statusFilter}</span>
                            <ChevronDown size={16} className={cn("text-slate-400 transition-transform", isFilterOpen && "rotate-180")} />
                        </button>

                        {isFilterOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                                {["All Status", "Active", "Maintenance"].map((status) => (
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

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                viewMode === "grid" ? "bg-white dark:bg-slate-900 shadow-lg text-cyan-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            )}
                        >
                            <LayoutGrid size={14} />
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2",
                                viewMode === "list" ? "bg-white dark:bg-slate-900 shadow-lg text-cyan-500" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            )}
                        >
                            <List size={14} />
                            List
                        </button>
                    </div>
                </div>
            </div>

            <div ref={gridRef} className="min-h-[400px] relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="w-12 h-12 text-cyan-500 animate-spin" />
                            <p className="text-sm font-black uppercase tracking-widest text-slate-500">Loading Branches...</p>
                        </div>
                    </div>
                ) : viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredBranches.length > 0 ? (
                            filteredBranches.map((branch) => (
                                <Link key={branch.id} href={`/branches/${branch.id}`} className="branch-anim branch-card group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/5 transition-all duration-500 block">
                                    <div className="flex flex-col sm:flex-row h-full">
                                        <div className="sm:w-2/5 relative min-h-[200px] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                            {branch.image ? (
                                                <Image
                                                    src={branch.image}
                                                    alt={branch.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                                                    <Hexagon size={48} className="opacity-20" />
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent sm:opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className={cn(
                                                "absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border shadow-xl z-10",
                                                branch.status === 'Active' ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : "bg-amber-500/20 text-amber-500 border-amber-500/30"
                                            )}>
                                                {branch.status}
                                            </div>
                                        </div>

                                        <div className="flex-1 p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h3 className="text-xl font-black dark:text-white leading-tight tracking-tight group-hover:text-cyan-500 transition-colors">{branch.name}</h3>
                                                    <div className="flex items-center gap-2 mt-2 text-slate-400">
                                                        <MapPin size={14} className="text-cyan-500" />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest leading-none">{branch.address || branch.location || "No Address"}</span>
                                                    </div>
                                                </div>
                                                <button className="p-2.5 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/5 rounded-lg transition-all">
                                                    <MoreVertical size={20} />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6 mb-8">
                                                <div>
                                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Monthly Revenue</p>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-lg font-black tracking-tight">{branch.revenue || "$0"}</span>
                                                        <div className={cn(
                                                            "flex items-center gap-0.5 text-[10px] font-black px-1.5 py-0.5 rounded-lg",
                                                            (branch.performance || "+0%").startsWith('+') ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                                                        )}>
                                                            {branch.performance || "+0%"}
                                                            {(branch.performance || "+0%").startsWith('+') ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <p className="text-[9px] font-black uppercase text-slate-400 tracking-[0.2em] mb-2">Total Staff</p>
                                                    <div className="flex items-center gap-2">
                                                        <div className="flex -space-x-2">
                                                            {[1, 2, 3].map(i => (
                                                                <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 overflow-hidden">
                                                                    <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${branch.id}-${i}`} alt="Avatar" width={28} height={28} unoptimized />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <span className="text-sm font-black tracking-tight">+{Math.max(0, (branch.staff || branch.activeStaff || 0) - 3)}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-3 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 group/item">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-500 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-all">
                                                        <Building2 size={14} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Manager</p>
                                                        <p className="dark:text-white">{branch.managerEmail}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 group/item">
                                                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-cyan-500 group-hover/item:bg-cyan-500 group-hover/item:text-white transition-all">
                                                        <Phone size={14} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Contact</p>
                                                        <p className="dark:text-white">{branch.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400">
                                <Building2 size={64} className="mb-6 opacity-10" />
                                <p className="text-xl font-black uppercase tracking-[0.3em] opacity-30">No branches found</p>
                                <button onClick={() => { setSearchQuery(""); setStatusFilter("All Status"); }} className="mt-6 text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:underline">Reset view</button>
                            </div>
                        )}
                    </div>
                ) : (
                    /* List View Implementation */
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800">
                                        <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Branch Details</th>
                                        <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                        <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Manager</th>
                                        <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Monthly Rev</th>
                                        <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Staff</th>
                                        <th className="text-right px-8 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                    {filteredBranches.map((branch) => (
                                        <tr
                                            key={branch.id}
                                            onClick={() => window.location.href = `/branches/${branch.id}`}
                                            className="branch-anim hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group cursor-pointer"
                                        >
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800">
                                                        <Image src={branch.image} alt={branch.name} width={48} height={48} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black dark:text-white leading-tight">{branch.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{branch.address}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={cn(
                                                    "px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border",
                                                    branch.status === 'Active' ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/10" : "bg-amber-500/5 text-amber-500 border-amber-500/10"
                                                )}>
                                                    {branch.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-black dark:text-white">{branch.manager}</span>
                                                    <span className="text-[10px] font-bold text-slate-500 mt-1">{branch.phone}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black tracking-tight">{branch.revenue}</span>
                                                    <span className={cn(
                                                        "text-[10px] font-black",
                                                        branch.performance.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                                                    )}>{branch.performance}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-5">
                                                <p className="text-xs font-black">{branch.staff} Members</p>
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
                )}
            </div>

            {/* Overview Stats */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
                <div className="relative group p-8 rounded-2xl bg-cyan-500/5 border border-cyan-500/10 overflow-hidden shadow-sm hover:shadow-cyan-500/10 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500 mb-2">Global Impact</p>
                    <h4 className="text-2xl font-black tracking-tight mt-1">Downtown Central</h4>
                    <div className="flex items-center gap-2 mt-2 text-emerald-500 font-black text-sm">
                        <TrendingUp size={16} />
                        <span>Highest revenue month</span>
                    </div>
                </div>
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full group-hover:scale-150 transition-transform" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Staffing</p>
                    <h4 className="text-2xl font-black tracking-tight mt-1">79 Members</h4>
                    <p className="text-[11px] font-bold text-slate-500 mt-2 flex items-center gap-2">
                        <Users size={14} className="text-cyan-500" />
                        Across all locations
                    </p>
                </div>
                <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-1/2 right-4 w-1 h-12 bg-amber-500/20 rounded-full group-hover:h-24 transition-all" />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Attention Required</p>
                    <h4 className="text-2xl font-black tracking-tight mt-1 text-amber-500">1 Location</h4>
                    <p className="text-[11px] font-bold text-slate-500 mt-2 truncate">Whitefield Plaza (Maintenance)</p>
                </div>
            </div>

            {/* Add Branch Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsModalOpen(false)}
                    />
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight">Add New Branch</h3>
                                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Register a new restaurant location</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-3 text-slate-400 hover:text-rose-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-all shadow-sm hover:scale-110 active:scale-95"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-slate-100 dark:border-slate-800 px-8 bg-white dark:bg-slate-900">
                            {["General", "Staff & Ops", "Security"].map((tab) => (
                                <div
                                    key={tab}
                                    className={cn(
                                        "py-4 px-6 text-[10px] font-black uppercase tracking-widest transition-all border-b-2",
                                        activeTab === tab
                                            ? "border-cyan-500 text-cyan-500"
                                            : "border-transparent text-slate-400"
                                    )}
                                >
                                    <div className="flex items-center gap-2">
                                        {tab === "General" && <Building2 size={14} />}
                                        {tab === "Staff & Ops" && <Settings2 size={14} />}
                                        {tab === "Security" && <ShieldCheck size={14} />}
                                        {tab}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-8 h-[450px] overflow-y-auto custom-scrollbar">
                            {activeTab === "General" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Branch Name */}
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Branch Name</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Indiranagar Hub"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Manager Email */}
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Manager Email</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                type="email"
                                                name="userEmail"
                                                value={formData.userEmail}
                                                onChange={handleInputChange}
                                                placeholder="manager@restraubee.com"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="space-y-2 group col-span-full">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Location / Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="Full physical address"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    {/* Image Field */}
                                    <div className="space-y-2 group col-span-full">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Branch Image</label>
                                        <div
                                            onClick={() => fileInputRef.current?.click()}
                                            className="relative h-40 w-full bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/[0.02] transition-all group/upload overflow-hidden"
                                        >
                                            {imagePreview ? (
                                                <>
                                                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                                                        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest shadow-xl">
                                                            <Upload size={14} className="text-cyan-500" />
                                                            Change Photo
                                                        </div>
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 group-hover/upload:text-cyan-500 group-hover/upload:scale-110 transition-all">
                                                        <Camera size={24} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-[11px] font-black uppercase tracking-widest dark:text-white">Click to upload branch image</p>
                                                        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-tight">PNG, JPG or WEBP (Max 5MB)</p>
                                                    </div>
                                                </>
                                            )}
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleImageUpload}
                                                accept="image/*"
                                                className="hidden"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-2 group col-span-full">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Branch Description</label>
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-4 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <textarea
                                                name="description"
                                                value={formData.description}
                                                onChange={handleInputChange}
                                                placeholder="Write a brief overview of this location..."
                                                rows={4}
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Staff & Ops" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Phone Number */}
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+91 00000 00000"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Status Selector */}
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Initial Status</label>
                                        <div className="relative">
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500">
                                                <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_rgba(6,182,212,0.5)]" />
                                            </div>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleInputChange}
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-10 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm appearance-none"
                                            >
                                                <option>Active</option>
                                                <option>Maintenance</option>
                                                <option>Closed</option>
                                            </select>
                                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                                        </div>
                                    </div>

                                    {/* Active Staff */}
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Active Staff</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                type="number"
                                                name="activeStaff"
                                                value={formData.activeStaff}
                                                onChange={handleInputChange}
                                                placeholder="e.g. 15"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>

                                    {/* Working Hours */}
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Working Hours</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                name="workingHours"
                                                value={formData.workingHours}
                                                onChange={handleInputChange}
                                                placeholder="9:00 AM - 11:00 PM"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "Security" && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                    {/* Password Creation */}
                                    <div className="space-y-2 group col-span-full">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Manager Password</label>
                                        <div className="relative">
                                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                            <input
                                                type="password"
                                                name="userPassword"
                                                value={formData.userPassword}
                                                onChange={handleInputChange}
                                                placeholder="••••••••"
                                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3.5 pl-12 pr-4 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex gap-4">
                            {activeTab === "General" ? (
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                                >
                                    Discard
                                </button>
                            ) : (
                                <button
                                    onClick={handleBack}
                                    className="flex-1 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 dark:hover:text-white transition-all bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                                >
                                    Back
                                </button>
                            )}

                            {activeTab !== "Security" ? (
                                <button
                                    onClick={handleContinue}
                                    className="flex-[2] px-6 py-4 bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    Continue
                                    <ArrowRight size={14} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleCreateBranch}
                                    disabled={isSubmitting}
                                    className="flex-[2] px-6 py-4 bg-cyan-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 size={14} className="animate-spin" />
                                            Deploying...
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={14} />
                                            Deploy Branch
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Floating Validation Notification */}
                    {showErrorToast && (
                        <div
                            ref={toastRef}
                            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3.5 bg-slate-900 border border-slate-800 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60] min-w-[300px]"
                        >
                            <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                                <TriangleAlert size={16} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[11px] font-black uppercase tracking-widest text-white">Please fill the mandatory details</p>
                            </div>
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
