"use client";

import Header from "@/components/Header";
import Image from "next/image";
import {
    Plus,
    Search,
    Filter,
    Edit3,
    Trash2,
    Star,
    ChevronDown,
    X,
    Package,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";

const initialProducts = [
    { id: 1, productName: 'Classic Cheeseburger', categoryName: 'Main Course', productPrice: 12.99, stock: 45, rating: 4.8, sales: 156, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop' },
    { id: 2, productName: 'Margherita Pizza', categoryName: 'Main Course', productPrice: 15.50, stock: 28, rating: 4.7, sales: 124, img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop' },
    { id: 3, productName: 'Caesar Salad', categoryName: 'Salads', productPrice: 9.99, stock: 12, rating: 4.5, sales: 93, img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&h=400&fit=crop' },
    { id: 4, productName: 'Penne Carbonara', categoryName: 'Pasta', productPrice: 14.20, stock: 34, rating: 4.9, sales: 85, img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=400&h=400&fit=crop' },
    { id: 5, productName: 'Tiramisu', categoryName: 'Desserts', productPrice: 7.50, stock: 18, rating: 4.6, sales: 64, img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=400&fit=crop' },
    { id: 6, productName: 'Chocolate Lava Cake', categoryName: 'Desserts', productPrice: 8.99, stock: 8, rating: 4.9, sales: 42, img: 'https://images.unsplash.com/photo-1624353335562-b45ed6934c9d?w=400&h=400&fit=crop' },
];

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const gridRef = useRef(null);

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

    const categories = useMemo(() => {
        return ["All", ...Array.from(new Set(initialProducts.map(p => p.categoryName)))];
    }, []);

    const filteredProducts = useMemo(() => {
        return initialProducts.filter(product => {
            const matchesSearch = product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "All" || product.categoryName === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter]);

    const handleAddItem = () => {
        // Simulate adding to global list
        setIsAddModalOpen(false);
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

    useEffect(() => {
        if (viewMode === 'grid') {
            const ctx = gsap.context(() => {
                gsap.fromTo(".product-card",
                    { opacity: 0, y: 30, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
                );
            }, gridRef);
            return () => ctx.revert();
        }
    }, [filteredProducts, viewMode]);

    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Menu Items</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Manage your restaurant menu and inventory</p>
                </div>

                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center justify-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-lg font-black text-[11px] uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all"
                >
                    <Plus size={18} />
                    Add New Item
                </button>
            </div>

            {/* Grid Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search items by name, ID or category..."
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
                    <div className="relative min-w-[180px]">
                        <button
                            onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                            className={cn(
                                "w-full flex items-center gap-2 bg-white dark:bg-slate-900 border px-4 py-3.5 rounded-xl transition-all shadow-sm",
                                isCategoryOpen ? "border-cyan-500 ring-4 ring-cyan-500/5" : "border-slate-200 dark:border-slate-800"
                            )}
                        >
                            <Filter size={18} className={cn(categoryFilter !== "All" ? "text-cyan-500" : "text-slate-400")} />
                            <span className="text-xs font-black uppercase tracking-tight flex-1 text-left">{categoryFilter}</span>
                            <ChevronDown size={16} className={cn("text-slate-400 transition-transform", isCategoryOpen && "rotate-180")} />
                        </button>

                        {isCategoryOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-30 animate-in fade-in zoom-in-95 duration-200">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => {
                                            setCategoryFilter(cat);
                                            setIsCategoryOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all",
                                            categoryFilter === cat
                                                ? "bg-cyan-500 text-white"
                                                : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                        )}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                viewMode === 'grid'
                                    ? "bg-white dark:bg-slate-900 shadow-lg text-cyan-500"
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            )}
                        >
                            Grid
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                "px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                                viewMode === 'list'
                                    ? "bg-white dark:bg-slate-900 shadow-lg text-cyan-500"
                                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                            )}
                        >
                            List
                        </button>
                    </div>
                </div>
            </div>

            {/* Add Item Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsAddModalOpen(false)}
                    />
                    <div className="relative w-full max-w-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[20px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
                        {/* Header */}
                        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-2xl font-black uppercase tracking-tight">Register product</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Add a new item to the global master catalog</p>
                            </div>
                            <button
                                onClick={() => setIsAddModalOpen(false)}
                                className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <div className="p-8 max-h-[500px] overflow-y-auto space-y-6 scrollbar-hide">
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
                                                "flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
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
                                                "flex-1 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
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
                                        <div className="w-full h-32 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/50 transition-all bg-slate-50/50 dark:bg-slate-900/50">
                                            {newItem.image ? (
                                                <div className="flex items-center gap-3">
                                                    <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-500">
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

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                ID: PROD-{Math.floor(Math.random() * 9000) + 1000}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddItem}
                                    disabled={!newItem.productName || newItem.productPrice <= 0}
                                    className="px-8 py-3 bg-cyan-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                >
                                    Finalize Creation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" ref={gridRef}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div key={product.id} className="product-card group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                                <div className="relative h-56 overflow-hidden">
                                    <Image
                                        src={product.img}
                                        alt={product.productName}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                    <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                        <button className="p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-all shadow-xl hover:scale-110 active:scale-90">
                                            <Edit3 size={18} />
                                        </button>
                                        <button className="p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all shadow-xl hover:scale-110 active:scale-90">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-white/20">
                                        <Star size={14} className="text-amber-500 fill-amber-500" />
                                        <span className="text-xs font-black">{product.rating}</span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="min-w-0">
                                            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-cyan-500 mb-1.5">{product.categoryName}</p>
                                            <h3 className="text-base font-black dark:text-white truncate group-hover:text-cyan-500 transition-colors">{product.productName}</h3>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-6">
                                        <p className="text-lg font-black tracking-tight">${product.productPrice.toFixed(2)}</p>
                                        <div className="flex flex-col text-right">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Monthly Sales</span>
                                            <span className="text-sm font-black mt-0.5 text-cyan-500">{product.sales}</span>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Stock Level</span>
                                            <span className={cn(
                                                "text-[10px] font-black px-2 py-0.5 rounded-md",
                                                product.stock < 10 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                                            )}>{product.stock} Units</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-1000 delay-300",
                                                    product.stock < 10 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                                                )}
                                                style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-24 flex flex-col items-center justify-center text-slate-400">
                            <Package size={64} className="mb-6 opacity-10" />
                            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-30">No products found</p>
                            <p className="text-xs font-bold mt-3">Try clarifying your search or category</p>
                            <button onClick={() => { setSearchQuery(""); setCategoryFilter("All"); }} className="mt-8 text-cyan-500 text-[10px] font-black uppercase tracking-widest hover:underline">Clear all filters</button>
                        </div>
                    )}
                </div>
            ) : (
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm animate-in fade-in duration-500">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-950/20 border-b border-slate-100 dark:border-slate-800">
                                    <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Product</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Price</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Stock</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Sales</th>
                                    <th className="text-left px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rating</th>
                                    <th className="text-right px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <tr key={product.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-800">
                                                        <Image
                                                            src={product.img}
                                                            alt={product.productName}
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-sm font-black dark:text-white">{product.productName}</h4>
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: P-{1000 + product.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                                    {product.categoryName}
                                                </span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="text-sm font-black tracking-tight">${product.productPrice.toFixed(2)}</span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={cn(
                                                        "w-2 h-2 rounded-full",
                                                        product.stock < 10 ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
                                                    )} />
                                                    <span className={cn(
                                                        "text-[11px] font-black uppercase tracking-widest",
                                                        product.stock < 10 ? "text-rose-500" : "text-emerald-500"
                                                    )}>
                                                        {product.stock} Units
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4">
                                                <span className="text-[11px] font-bold text-slate-500">{product.sales} sold</span>
                                            </td>
                                            <td className="px-8 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <Star size={14} className="text-amber-500 fill-amber-500" />
                                                    <span className="text-xs font-black">{product.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-all">
                                                        <Edit3 size={16} />
                                                    </button>
                                                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7} className="px-8 py-20 text-center">
                                            <p className="text-sm font-black uppercase tracking-widest text-slate-400">No products found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
