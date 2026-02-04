"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, ChevronRight, HelpCircle, LogIn, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import { useUser } from "./UserContext";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Pricing", href: "/pricing" },
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/support" },
];

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const { token } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (pathname === "/login" || pathname === "/signup") return null;

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-auto md:min-w-[900px] rounded-full transition-all duration-500",
                    scrolled
                        ? "bg-white/90 backdrop-blur-2xl border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 px-6"
                        : "bg-white/60 backdrop-blur-xl border border-white/20 shadow-[0_4px_16px_rgba(0,0,0,0.04)] py-4 px-8"
                )}
            >
                <div className="flex items-center justify-between gap-8">
                    {/* Logo Section */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                            <img
                                src="/logoweb.jpeg"
                                alt="Restaubee"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <span className="font-extrabold text-2xl text-restaubee-navy tracking-tight transition-colors">
                            Restau<span className="ml-1.5 inline-flex items-center px-1 rounded bg-white leading-none h-4">
                                <span className="text-black">B</span>
                                <span className="text-[#F59A00] uppercase">ee</span>
                            </span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                        isActive ? "text-restaubee-navy" : "text-gray-500 hover:text-restaubee-navy"
                                    )}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-white shadow-sm rounded-full"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{link.name}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="hidden md:flex">
                            <button className="bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white px-7 py-2.5 rounded-full text-sm font-extrabold shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-[1.03] active:scale-95 transition-all">
                                Login
                            </button>
                        </Link>

                        <Link href="/download" className="hidden md:flex">
                            <button className="flex items-center gap-2 bg-restaubee-navy text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-restaubee-navy/20 hover:scale-[1.03] active:scale-95">
                                Download
                            </button>
                        </Link>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden p-2 rounded-full hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <Menu className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-white/95 backdrop-blur-xl md:hidden flex flex-col p-6"
                    >
                        <div className="flex items-center justify-between mb-12">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg overflow-hidden border border-gray-100 p-1">
                                    <img src="/logoweb.jpeg" alt="Restaubee" className="h-full w-full object-contain" />
                                </div>
                                <span className="font-bold text-xl text-restaubee-navy">Restaubee</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 rounded-full bg-gray-100"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="text-3xl font-bold text-restaubee-navy flex items-center justify-between border-b border-gray-100 pb-4"
                                    >
                                        {link.name}
                                        <ChevronRight className="w-5 h-5 text-gray-300" />
                                    </motion.div>
                                </Link>
                            ))}
                            <Link href="/support" onClick={() => setMobileMenuOpen(false)}>
                                <motion.div
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-3xl font-bold text-gray-500 flex items-center justify-between border-b border-gray-100 pb-4"
                                >
                                    Support
                                    <HelpCircle className="w-6 h-6 text-gray-300" />
                                </motion.div>
                            </Link>

                            <div className="mt-8 flex flex-col gap-4">
                                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="w-full bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20"
                                    >
                                        Login <LogIn className="w-5 h-5" />
                                    </motion.button>
                                </Link>

                                <Link href="/download" onClick={() => setMobileMenuOpen(false)}>
                                    <motion.button
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="w-full bg-restaubee-navy text-white font-bold py-4 rounded-xl text-lg flex items-center justify-center gap-2 shadow-lg shadow-restaubee-navy/20"
                                    >
                                        Download App <Download className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
