"use client";

import Header from "@/components/Header";
import Image from "next/image";
import {
    Plus,
    Search,
    Edit3,
    Trash2,
    Star,
    X,
    Package,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useUser } from "@/components/UserContext";

export default function ProductsPage() {
    const { role } = useUser();
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const gridRef = useRef(null);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
        message: "",
        type: 'success',
        visible: false
    });

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type, visible: true });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    };

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://restraubee-api.onrender.com";
    const [editingItem, setEditingItem] = useState<any>(null);
    const [editingCategory, setEditingCategory] = useState<any>(null);

    const [newItem, setNewItem] = useState({
        itemName: "",
        price: 0,
        categoryId: "",
        description: "",
        status: "ACTIVE",
        image: null as File | null
    });

    const openEditItemModal = (item: any) => {
        setEditingItem(item);
        setNewItem({
            itemName: item.itemName || item.productName || "",
            price: Number(item.price || item.productPrice || 0),
            categoryId: String(item.categoryId || ""),
            description: item.description || "",
            status: item.status || "ACTIVE",
            image: null
        });
        setIsAddModalOpen(true);
    };

    const openEditCategoryModal = (cat: any) => {
        setEditingCategory(cat);
        setNewCategoryName(cat.name);
        setIsCategoryModalOpen(true);
    };

    // Helper to get headers based on role
    const getHeaders = () => {
        const token = localStorage.getItem("token") || "";
        const branchId = localStorage.getItem("branchId") || localStorage.getItem("x-branch-id");

        const headers: any = {
            "Content-Type": "application/json",
            "x-access-token": token
        };

        if (branchId) {
            headers["x-branch-id"] = branchId;
        } else if (role === 'admin') {
            console.warn("User is admin but NO branchId found in localStorage!");
        }

        return headers;
    };

    const fetchInventory = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            if (!token) return;

            const url = `${baseUrl}/api/inventory`;
            const headers = getHeaders();
            delete headers["Content-Type"];

            const response = await fetch(url, {
                method: "GET",
                headers: headers
            });

            if (response.ok) {
                const data = await response.json();
                const categoriesData = data.categories || [];

                const derivedCategories = categoriesData.map((cat: any) => ({
                    id: cat.id,
                    name: cat.categoryName
                }));

                const uniqueCategories: any[] = [];
                const seenNames = new Set();
                derivedCategories.forEach((cat: any) => {
                    if (!seenNames.has(cat.name)) {
                        seenNames.add(cat.name);
                        uniqueCategories.push(cat);
                    }
                });
                setCategories(uniqueCategories);

                const allItems: any[] = [];
                categoriesData.forEach((cat: any) => {
                    if (cat.items && Array.isArray(cat.items)) {
                        cat.items.forEach((item: any) => {
                            allItems.push({
                                ...item,
                                categoryId: cat.id,
                                categoryName: cat.categoryName
                            });
                        });
                    }
                });
                setProducts(allItems);
            }
        } catch (error) {
            console.error("Failed to fetch inventory", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const bid = localStorage.getItem("branchId");
        if (!bid) {
            localStorage.setItem("branchId", "2");
        }
        fetchInventory();
    }, [role]);

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const matchesSearch = (product.itemName || product.productName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (product.categoryName || "").toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = categoryFilter === "All" || product.categoryName === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, categoryFilter, products]);

    const handleAddItem = async () => {
        try {
            const isEdit = !!editingItem;
            const url = isEdit
                ? `${baseUrl}/api/inventory/item/${editingItem.id || editingItem.itemId}`
                : `${baseUrl}/api/inventory/item`;

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: getHeaders(),
                body: JSON.stringify({
                    categoryId: parseInt(newItem.categoryId),
                    itemName: newItem.itemName,
                    price: newItem.price
                })
            });

            if (response.ok) {
                setIsAddModalOpen(false);
                setEditingItem(null);
                setNewItem({
                    itemName: "",
                    price: 0,
                    categoryId: "",
                    description: "",
                    status: "ACTIVE",
                    image: null
                });
                fetchInventory();
                showToast(isEdit ? "Item updated successfully!" : "Item added successfully!");
            } else {
                const data = await response.json();
                showToast(`Failed to ${isEdit ? 'update' : 'add'} item: ` + (data.message || "Unknown error"), 'error');
            }
        } catch (error) {
            console.error(error);
            showToast(`Error ${editingItem ? 'updating' : 'adding'} item`, 'error');
        }
    };

    const handleDeleteItem = async (id: number) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            const url = `${baseUrl}/api/inventory/item/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: getHeaders()
            });

            if (response.ok) {
                fetchInventory();
                showToast("Item deleted successfully!");
            } else {
                const data = await response.json();
                showToast("Failed to delete item: " + (data.message || "Unknown error"), 'error');
            }
        } catch (error) {
            console.error(error);
            showToast("Error deleting item", 'error');
        }
    };

    const handleAddCategory = async () => {
        try {
            const isEdit = !!editingCategory;
            const url = isEdit
                ? `${baseUrl}/api/inventory/category/${editingCategory.id}`
                : `${baseUrl}/api/inventory/category`;

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: getHeaders(),
                body: JSON.stringify({ categoryName: newCategoryName })
            });

            if (response.ok) {
                setIsCategoryModalOpen(false);
                setEditingCategory(null);
                setNewCategoryName("");
                showToast(isEdit ? "Category updated successfully!" : "Category added successfully!");
                fetchInventory();
            } else {
                const data = await response.json();
                showToast(`Failed to ${isEdit ? 'update' : 'add'} category: ` + (data.message || "Unknown error"), 'error');
            }
        } catch (error) {
            console.error(error);
            showToast(`Error ${editingCategory ? 'updating' : 'adding'} category`, 'error');
        }
    };

    const handleDeleteCategory = async (id: number) => {
        if (!confirm("Are you sure you want to delete this category and all its items?")) return;
        try {
            const url = `${baseUrl}/api/inventory/category/${id}`;
            const response = await fetch(url, {
                method: "DELETE",
                headers: getHeaders()
            });

            if (response.ok) {
                fetchInventory();
                setCategoryFilter("All");
                showToast("Category deleted successfully!");
            } else {
                const data = await response.json();
                showToast("Failed to delete category: " + (data.message || "Unknown error"), 'error');
            }
        } catch (error) {
            console.error(error);
            showToast("Error deleting category", 'error');
        }
    };

    useEffect(() => {
        if (viewMode === 'grid') {
            // Only animate if there are actually cards to animate
            const cards = document.querySelectorAll(".product-card");
            if (cards.length > 0) {
                const ctx = gsap.context(() => {
                    gsap.fromTo(".product-card",
                        { opacity: 0, y: 30, scale: 0.9 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }
                    );
                }, gridRef);
                return () => ctx.revert();
            }
        }
    }, [viewMode, products]);

    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-black uppercase tracking-tight">Menu Items</h2>
                    <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Manage your restaurant menu and inventory</p>
                </div>
            </div>

            {/* Row 1: Search & View Switcher */}
            <div className="flex flex-col lg:flex-row items-center gap-6 mb-4">
                <div className="flex-1 relative group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search items by name, ID or category..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-12 pr-10 outline-none focus:border-cyan-500 transition-all font-bold text-sm shadow-sm"
                    />
                    {searchQuery && (
                        <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition-colors">
                            <X size={16} />
                        </button>
                    )}
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
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

            {/* Row 2: Categories & Add Buttons */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                {/* Categories Carousel */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 -mx-2 px-2 [scrollbar-width:thin] [scrollbar-color:theme(colors.cyan.500/10)_transparent] [&::-webkit-scrollbar]:h-[2px] [&::-webkit-scrollbar-thumb]:bg-cyan-500/10 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                        {["All", ...categories.map(c => c.name)].map((cat) => {
                            const count = cat === "All"
                                ? products.length
                                : products.filter(p => p.categoryName === cat).length;
                            const catId = categories.find(c => c.name === cat)?.id;

                            return (
                                <button
                                    key={cat}
                                    onClick={() => setCategoryFilter(cat)}
                                    className={cn(
                                        "group flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 relative",
                                        categoryFilter === cat
                                            ? "bg-cyan-500 text-white shadow-xl shadow-cyan-500/25 scale-[1.05]"
                                            : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-cyan-500/50 hover:text-cyan-500 shadow-sm"
                                    )}
                                >
                                    <span>{cat}</span>
                                    <span className={cn(
                                        "px-1.5 py-0.5 rounded-md text-[9px] font-black transition-colors",
                                        categoryFilter === cat
                                            ? "bg-white/20 text-white"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-cyan-50 group-hover:text-cyan-600"
                                    )}>
                                        {count}
                                    </span>
                                    {cat !== "All" && categoryFilter === cat && (
                                        <div className="flex items-center border-l border-white/20 ml-1 pl-1 gap-1.5 animate-in fade-in slide-in-from-left-1">
                                            <div
                                                onClick={(e) => { e.stopPropagation(); openEditCategoryModal({ id: catId, name: cat }); }}
                                                className="p-1 hover:bg-white/20 rounded-md transition-colors cursor-pointer"
                                            >
                                                <Edit3 size={11} />
                                            </div>
                                            <div
                                                onClick={(e) => { e.stopPropagation(); if (catId) handleDeleteCategory(catId); }}
                                                className="p-1 hover:bg-white/20 rounded-md transition-colors text-rose-200 cursor-pointer"
                                            >
                                                <Trash2 size={11} />
                                            </div>
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => { setEditingCategory(null); setNewCategoryName(""); setIsCategoryModalOpen(true); }}
                        className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-5 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Add Category
                    </button>
                    <button
                        onClick={() => {
                            setEditingItem(null);
                            setNewItem({
                                itemName: "",
                                price: 0,
                                categoryId: "",
                                description: "",
                                status: "ACTIVE",
                                image: null
                            });
                            setIsAddModalOpen(true);
                        }}
                        className="flex items-center justify-center gap-2 bg-cyan-500 text-white px-5 py-3 rounded-lg font-black text-[10px] uppercase tracking-widest shadow-lg shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
                    >
                        <Plus size={16} />
                        Add New Item
                    </button>
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
                                <h3 className="text-2xl font-black uppercase tracking-tight">{editingItem ? 'Edit product' : 'Register product'}</h3>
                                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{editingItem ? 'Update existing item details' : 'Add a new item to the global master catalog'}</p>
                            </div>
                            <button
                                onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
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
                                        placeholder="e.g. Lobster"
                                        value={newItem.itemName}
                                        onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Price</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                                        <input
                                            type="number"
                                            placeholder="45.00"
                                            value={newItem.price || ""}
                                            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
                                            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 pl-10 pr-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                                    <select
                                        value={newItem.categoryId}
                                        onChange={(e) => setNewItem({ ...newItem, categoryId: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-black text-[10px] uppercase tracking-widest appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2 col-span-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Description</label>
                                    <textarea
                                        placeholder="e.g. Fresh and tasty"
                                        value={newItem.description}
                                        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm min-h-[80px] resize-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {editingItem ? 'UPDATE ITEM' : 'NEW ITEM'}
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => { setIsAddModalOpen(false); setEditingItem(null); }}
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddItem}
                                    disabled={!newItem.itemName || newItem.price <= 0 || !newItem.categoryId}
                                    className="px-8 py-3 bg-cyan-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                >
                                    {editingItem ? 'Update Item' : 'Add Item'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }

            {/* Add Category Modal */}
            {
                isCategoryModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <div
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-300"
                            onClick={() => setIsCategoryModalOpen(false)}
                        />
                        <div className="relative w-full max-w-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-[20px] shadow-2xl overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-5 duration-300">
                            {/* Header */}
                            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black uppercase tracking-tight">{editingCategory ? 'Edit Category' : 'Add Category'}</h3>
                                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{editingCategory ? 'Update category name' : 'Create a new product category'}</p>
                                </div>
                                <button
                                    onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                                    className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-rose-500 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Form */}
                            <div className="p-8 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category Name</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Beverages"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl py-4 px-5 outline-none focus:border-cyan-500 transition-all font-bold text-sm"
                                    />
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-6 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-50 dark:border-slate-800 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => { setIsCategoryModalOpen(false); setEditingCategory(null); }}
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddCategory}
                                    disabled={!newCategoryName}
                                    className="px-8 py-3 bg-cyan-500 text-white rounded-lg text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                                >
                                    {editingCategory ? 'Update Category' : 'Save Category'}
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                loading ? (
                    <div className="py-20 flex justify-center text-cyan-500">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-current"></div>
                    </div>
                ) : viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" ref={gridRef}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.id || product.itemId} className="product-card group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                                    <div className="relative h-56 overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        {product.img || product.image ? (
                                            <Image
                                                src={product.img || product.image}
                                                alt={product.itemName || product.productName || "Product"}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <Package size={48} />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 delay-75">
                                            <button
                                                onClick={() => openEditItemModal(product)}
                                                className="p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg text-slate-600 dark:text-slate-300 hover:text-cyan-500 transition-all shadow-xl hover:scale-110 active:scale-90"
                                            >
                                                <Edit3 size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteItem(product.id || product.itemId)}
                                                className="p-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all shadow-xl hover:scale-110 active:scale-90"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-white/20">
                                            <Star size={14} className="text-amber-500 fill-amber-500" />
                                            <span className="text-xs font-black">{product.rating || "New"}</span>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="min-w-0">
                                                <p className="text-[10px] uppercase font-black tracking-[0.2em] text-cyan-500 mb-1.5">{product.categoryName || "Unknown"}</p>
                                                <h3 className="text-base font-black dark:text-white truncate group-hover:text-cyan-500 transition-colors">{product.itemName || product.productName}</h3>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mt-6">
                                            <p className="text-lg font-black tracking-tight">${Number(product.price || product.productPrice).toFixed(2)}</p>
                                            <div className="flex flex-col text-right">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Monthly Sales</span>
                                                <span className="text-sm font-black mt-0.5 text-cyan-500">{product.sales || 0}</span>
                                            </div>
                                        </div>

                                        <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800/50">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Stock Level</span>
                                                <span className={cn(
                                                    "text-[10px] font-black px-2 py-0.5 rounded-md",
                                                    (product.stock || 0) < 10 ? "bg-rose-500/10 text-rose-500" : "bg-emerald-500/10 text-emerald-500"
                                                )}>{product.stock || 0} Units</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className={cn(
                                                        "h-full rounded-full transition-all duration-1000 delay-300",
                                                        (product.stock || 0) < 10 ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" : "bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
                                                    )}
                                                    style={{ width: `${Math.min(((product.stock || 0) / 50) * 100, 100)}%` }}
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
                                <p className="text-xs font-bold mt-3">Try checking back later or add a new item</p>
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
                                            <tr key={product.id || product.itemId} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-all group">
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative bg-slate-100 dark:bg-slate-800">
                                                            {product.img || product.image ? (
                                                                <Image
                                                                    src={product.img || product.image}
                                                                    alt={product.itemName || "Product"}
                                                                    fill
                                                                    className="object-cover"
                                                                />
                                                            ) : <div className="w-full h-full flex items-center justify-center"><Package size={20} className="text-slate-300" /></div>}
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-black dark:text-white">{product.itemName || product.productName}</h4>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ID: {product.id || product.itemId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                                                        {product.categoryName || "Uncategorized"}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <span className="text-sm font-black tracking-tight">${Number(product.price || product.productPrice).toFixed(2)}</span>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className={cn(
                                                            "w-2 h-2 rounded-full",
                                                            (product.stock || 0) < 10 ? "bg-rose-500 animate-pulse" : "bg-emerald-500"
                                                        )} />
                                                        <span className={cn(
                                                            "text-[11px] font-black uppercase tracking-widest",
                                                            (product.stock || 0) < 10 ? "text-rose-500" : "text-emerald-500"
                                                        )}>
                                                            {product.stock || 0} Units
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <span className="text-[11px] font-bold text-slate-500">{product.sales || 0} sold</span>
                                                </td>
                                                <td className="px-8 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <Star size={14} className="text-amber-500 fill-amber-500" />
                                                        <span className="text-xs font-black">{product.rating || "-"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button
                                                            onClick={() => openEditItemModal(product)}
                                                            className="p-2 text-slate-400 hover:text-cyan-500 hover:bg-cyan-500/10 rounded-lg transition-all"
                                                        >
                                                            <Edit3 size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteItem(product.id || product.itemId)}
                                                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all"
                                                        >
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
                )
            }
            {/* Toast Notification */}
            {toast.visible && (
                <div className={cn(
                    "fixed top-10 right-10 z-[300] flex items-center gap-4 px-6 py-5 rounded-[20px] border shadow-2xl animate-in slide-in-from-right duration-500",
                    toast.type === 'success'
                        ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                        : "bg-rose-50 border-rose-100 text-rose-700"
                )}>
                    {toast.type === 'success' ? <CheckCircle2 size={24} className="text-emerald-500" /> : <AlertCircle size={24} className="text-rose-500" />}
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">{toast.type === 'success' ? 'Success' : 'Error'}</p>
                        <p className="text-xs font-black uppercase tracking-widest mt-0.5">{toast.message}</p>
                    </div>
                    <button
                        onClick={() => setToast(prev => ({ ...prev, visible: false }))}
                        className="ml-4 p-2 hover:bg-black/5 rounded-lg transition-colors"
                    >
                        <X size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
