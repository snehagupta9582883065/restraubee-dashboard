"use client";

import Header from "@/components/Header";
import {
    User,
    Bell,
    Lock,
    Globe,
    CreditCard,
    Trash2,
    Camera,
    Check,
    Loader2
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function SettingsPage() {
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setSaveSuccess(true);
            setTimeout(() => setSaveSuccess(false), 3000);
        }, 1500);
    };

    const menuItems = [
        { id: 'profile', icon: User, label: 'Profile Information', active: true },
        { id: 'notifications', icon: Bell, label: 'Notifications', active: false },
        { id: 'security', icon: Lock, label: 'Security', active: false },
        { id: 'system', icon: Globe, label: 'System Preferences', active: false },
        { id: 'billing', icon: CreditCard, label: 'Billing & Plans', active: false },
    ];

    return (
        <div className="pb-12 animate-in fade-in duration-700">
            <Header />

            <div className="mb-8">
                <h2 className="text-3xl font-black uppercase tracking-tight">System Settings</h2>
                <p className="text-slate-500 dark:text-slate-400 font-bold text-sm mt-1">Configure your personal preferences and account security</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            className={cn(
                                "w-full flex items-center gap-3 px-6 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all text-left group",
                                item.active
                                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                                    : "text-slate-500 hover:bg-white dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800"
                            )}
                        >
                            <item.icon size={18} className={cn(item.active ? "text-white" : "text-slate-400 group-hover:text-cyan-500")} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Profile Section */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-sm">
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-8 border-b border-slate-50 dark:border-slate-800 pb-4">Personal Profile</h3>

                        <div className="flex flex-col md:flex-row gap-10">
                            <div className="relative group">
                                <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-slate-50 dark:border-slate-800 group-hover:border-cyan-500/20 transition-all shadow-xl">
                                    <Image
                                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
                                        alt="User"
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                        unoptimized
                                    />
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-3 bg-cyan-500 text-white rounded-xl shadow-xl hover:scale-110 active:scale-95 transition-all outline-none ring-4 ring-white dark:ring-slate-900">
                                    <Camera size={18} />
                                </button>
                            </div>

                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Full Name</label>
                                    <input type="text" defaultValue="Sneha Kapur" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 outline-none focus:border-cyan-500 transition-all font-black text-sm shadow-inner" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Email Address</label>
                                    <input type="email" defaultValue="sneha@restraubee.com" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 outline-none focus:border-cyan-500 transition-all font-black text-sm shadow-inner" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Phone Number</label>
                                    <input type="text" defaultValue="+91 98765 43210" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 outline-none focus:border-cyan-500 transition-all font-black text-sm shadow-inner" />
                                </div>
                                <div className="space-y-2 group">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1 group-focus-within:text-cyan-500 transition-colors">Designation</label>
                                    <input type="text" defaultValue="Senior Admin" className="w-full bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800 rounded-xl px-5 py-3.5 outline-none focus:border-cyan-500 transition-all font-black text-sm shadow-inner" disabled />
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 flex justify-end gap-3 pt-6 border-t border-slate-50 dark:border-slate-800">
                            <button className="px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all">Cancel</button>
                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                className={cn(
                                    "flex items-center gap-2 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-70",
                                    saveSuccess
                                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                                        : "bg-cyan-500 text-white shadow-cyan-500/20"
                                )}
                            >
                                {isSaving ? <Loader2 size={16} className="animate-spin" /> : saveSuccess ? <Check size={16} /> : null}
                                {isSaving ? "Saving..." : saveSuccess ? "Saved!" : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div>
                                <h4 className="text-rose-500 font-black uppercase text-[11px] tracking-[0.2em] mb-1">Danger Zone</h4>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-bold">Permanently delete your account and all branch data. This action cannot be undone.</p>
                            </div>
                            <button className="whitespace-nowrap flex items-center gap-2 bg-rose-500 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-rose-500/20 hover:scale-105 active:scale-95 transition-all">
                                <Trash2 size={18} />
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
