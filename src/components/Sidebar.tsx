"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    Settings,
    BarChart3,
    LogOut,
    ChevronRight,
    Hexagon,
    ShieldCheck
} from 'lucide-react';
import { cn } from "@/lib/utils";

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
    { icon: ShoppingCart, label: 'Orders', href: '/orders' },
    { icon: Package, label: 'Products', href: '/products' },
    { icon: BarChart3, label: 'Analytics', href: '/analytics' },
    { icon: Users, label: 'Customers', href: '/customers' },
    { icon: Hexagon, label: 'Branches', href: '/branches' },
    { icon: ShieldCheck, label: 'Admins', href: '/admins' },
    { icon: Settings, label: 'Settings', href: '/settings' },
];



import { useUser } from '@/components/UserContext';

export default function Sidebar() {
    const pathname = usePathname();

    // Use dynamic role from UserContext
    const { role: userRole, logout } = useUser();

    const filteredNavItems = navItems.filter((item) => {
        // Super Admin: Hide Branches and Customers
        if (userRole === 'super-admin') {
            if (item.label === 'Branches' || item.label === 'Customers' || item.label === 'Products' || item.label === 'Orders') return false;
            return true;
        }

        // Admin: Show Branches, Hide Customers, Hide Admins (default)
        if (userRole === 'admin') {
            if (item.label === 'Customers' || item.label === 'Admins') return false;
            return true;
        }

        // User: Show Customers, Hide Branches, Hide Admins (default)
        if (userRole === 'user') {
            if (item.label === 'Branches' || item.label === 'Admins') return false;
            return true;
        }

        return true;
    });

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col z-50 transition-all duration-300">
            <div className="mb-10 flex items-center gap-3 px-2">
                <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                    <Hexagon className="text-white fill-white/20" size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-black tracking-tighter dark:text-white text-slate-900">
                        RESTRAU BEE
                    </h1>
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-black">POS ADMIN</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1.5">
                {filteredNavItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300",
                                isActive
                                    ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-cyan-500 dark:hover:text-white"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={20} className={cn("transition-transform", !isActive && "group-hover:scale-110")} />
                                <span className="font-bold text-sm tracking-tight">{item.label}</span>
                            </div>
                            {!isActive && <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 mb-6 border border-slate-200 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase text-slate-500 mb-1">Weekly Goal</p>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-black tracking-tight">$4/5k</span>
                        <span className="text-[10px] font-bold text-cyan-500">80%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-500 w-[80%]" />
                    </div>
                </div>

                <button
                    onClick={() => {
                        logout();
                        window.location.href = "/login";
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all font-bold text-sm cursor-pointer"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
