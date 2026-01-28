"use client";

import { useTheme } from "next-themes";
import {
    Search,
    Bell,
    Moon,
    Sun,
    Calendar,
    ChevronDown,
    Check
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useDate, TimeRange } from "./DateContext";
import { useUser, UserRole } from "./UserContext";
import { cn } from "@/lib/utils";

function UserDisplay() {
    const { role, userName } = useUser();

    return (
        <div className="text-right hidden sm:block">
            <p className="text-sm font-bold dark:text-white text-slate-900 leading-none capitalize">{userName}</p>
            <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">
                {role === "admin" ? "Administrator" : role === "super-admin" ? "Super Admin" : "Branch Staff"}
            </p>
        </div>
    );
}

export default function Header() {
    const { theme, setTheme } = useTheme();
    const { timeRange, setTimeRange } = useDate();
    const { role } = useUser();
    const [mounted, setMounted] = useState(false);
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
    const dateDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event: MouseEvent) => {
            if (dateDropdownRef.current && !dateDropdownRef.current.contains(event.target as Node)) {
                setIsDateDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsDateDropdownOpen]);

    const timeOptions: TimeRange[] = ["Day", "Week", "Month", "Year"];

    return (
        <header className="flex items-center justify-between mb-8 px-2 transition-all duration-300">
            <div className="flex items-center gap-8 flex-1">
                <h2 className="text-2xl font-bold dark:text-white text-slate-900 hidden lg:block">
                    RESTRAU BEE <span className="font-light text-slate-500">POS ANALYTICS</span>
                </h2>

                <div className="relative group max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search analytics, orders, items..."
                        className="w-full bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 rounded-lg py-2.5 pl-10 pr-4 outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-all backdrop-blur-sm"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-300/50 dark:bg-slate-800/50 px-1.5 py-0.5 rounded-sm border border-slate-400/20">
                        <span className="opacity-70">⌘</span> K
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative" ref={dateDropdownRef}>
                    <button
                        onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                        className={cn(
                            "flex items-center gap-2 bg-white dark:bg-slate-900/50 border px-4 py-2 rounded-lg backdrop-blur-sm transition-all hover:border-cyan-500 group",
                            isDateDropdownOpen ? "border-cyan-500 ring-2 ring-cyan-500/10" : "border-slate-300 dark:border-slate-800"
                        )}
                    >
                        <Calendar size={16} className="text-cyan-500" />
                        <span className="text-sm font-semibold">{timeRange}</span>
                        <ChevronDown size={14} className={cn("text-slate-400 transition-transform", isDateDropdownOpen && "rotate-180")} />
                    </button>

                    {isDateDropdownOpen && (
                        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                            {timeOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        setTimeRange(option);
                                        setIsDateDropdownOpen(false);
                                    }}
                                    className={cn(
                                        "w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-bold transition-all",
                                        timeRange === option
                                            ? "bg-cyan-500 text-white"
                                            : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                                    )}
                                >
                                    {option}
                                    {timeRange === option && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2 border-l border-slate-300 dark:border-slate-800 pl-4 ml-2">
                    <button
                        onClick={() => setTheme(theme === "dark" || theme === "system" ? "light" : "dark")}
                        className="p-2 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 hover:border-cyan-500 transition-all text-slate-600 dark:text-slate-300 cursor-pointer flex items-center justify-center min-w-[40px] min-h-[40px]"
                        aria-label="Toggle theme"
                    >
                        {mounted && (theme === "dark" ? <Sun size={18} /> : <Moon size={18} />)}
                        {!mounted && <div className="w-[18px] h-[18px]" />}
                    </button>

                    <button className="relative p-2 rounded-lg bg-white dark:bg-slate-900/50 border border-slate-300 dark:border-slate-800 hover:border-cyan-500 transition-all text-slate-600 dark:text-slate-300">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950" />
                    </button>
                </div>

                <div className="flex items-center gap-3 pl-2">
                    <UserDisplay />
                    <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-cyan-500/20 p-0.5">
                        <Image
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`}
                            alt="User"
                            width={40}
                            height={40}
                            className="w-full h-full object-cover rounded-md bg-slate-800"
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}
