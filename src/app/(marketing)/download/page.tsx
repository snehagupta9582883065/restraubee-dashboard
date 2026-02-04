"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Apple, Monitor, Download, Laptop, Sparkles, ChevronRight, PlayCircle } from "lucide-react";
import LiquidEther from "@/components/ui/liquid-ether";
import { motion } from "framer-motion";
import Footer from "@/components/ui/footer";

export default function DownloadPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const macBtnRef = useRef<HTMLButtonElement>(null);
    const winBtnRef = useRef<HTMLButtonElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(titleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from([macBtnRef.current, winBtnRef.current], {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.2,
                    ease: "back.out(1.7)"
                }, "-=0.5");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const steps = [
        { title: "Download", desc: "Get the latest installer for your operating system." },
        { title: "Install", desc: "Run the setup wizard to install Restaubee locally." },
        { title: "Scale", desc: "Sign in and start scaling your restaurant business." }
    ];

    return (
        <div ref={containerRef} className="min-h-screen bg-white font-sans flex flex-col relative overflow-hidden pt-32">
            {/* Liquid Ether Background - Consistent with Home */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-40">
                <LiquidEther
                    colors={['#43dfb0', '#c8f3f4', '#88ddc4']}
                    mouseForce={25}
                    autoSpeed={0.3}
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 mb-20 lg:mb-32">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/50 border border-teal-100 shadow-sm text-teal-900 text-sm font-medium mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-teal-500" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 font-bold">Stable v2.4.0</span>
                        <span className="w-1 h-1 rounded-full bg-teal-200 mx-1" />
                        <span>Available for Windows & Mac</span>
                    </motion.div>

                    <h1 ref={titleRef} className="text-6xl md:text-8xl font-bold text-gray-900 mb-8 tracking-tighter leading-tight">
                        Power up with <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600">Restaubee POS</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed mb-16 font-medium">
                        Experience the world's most elegant restaurant management system, natively optimized for your desktop.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        {/* Windows Button */}
                        <button
                            ref={winBtnRef}
                            className="group relative w-full h-64 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 flex flex-col items-center justify-center gap-6 overflow-hidden p-8"
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />

                            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-500">
                                <Monitor className="w-10 h-10" />
                            </div>

                            <div className="text-center">
                                <div className="font-extrabold text-gray-900 text-2xl mb-1">Windows</div>
                                <div className="text-sm text-teal-600/60 font-medium">Windows 10 & 11 (64-bit)</div>
                            </div>

                            <div className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 group-hover:bg-teal-600 transition-colors">
                                Download .exe <Download className="w-4 h-4" />
                            </div>
                        </button>

                        {/* Mac Button */}
                        <button
                            ref={macBtnRef}
                            className="group relative w-full h-64 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-500 flex flex-col items-center justify-center gap-6 overflow-hidden p-8"
                        >
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors" />

                            <div className="w-20 h-20 bg-gray-900 text-white rounded-[2rem] flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-teal-700 transition-all duration-500">
                                <Apple className="w-10 h-10" />
                            </div>

                            <div className="text-center">
                                <div className="font-extrabold text-gray-900 text-2xl mb-1">macOS</div>
                                <div className="text-sm text-teal-600/60 font-medium">Intel & Apple Silicon</div>
                            </div>

                            <div className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 group-hover:bg-teal-600 transition-colors">
                                Download .dmg <Download className="w-4 h-4" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Installation Steps - Redesigned */}
            <div className="bg-white/40 backdrop-blur-md border-t border-teal-100/50 py-24">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-16">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Set up in minutes</h3>
                        <p className="text-gray-500 font-medium">Follow these three simple steps to get started with Restaubee.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, i) => (
                            <div key={i} className="relative group">
                                <div className="mb-6 flex items-center gap-4">
                                    <div className="w-14 h-14 bg-teal-50 border border-teal-100 rounded-2xl flex items-center justify-center text-xl font-black text-teal-600 shadow-sm group-hover:bg-teal-600 group-hover:text-white transition-all duration-300">
                                        {i + 1}
                                    </div>
                                    <div className="h-px flex-1 bg-gradient-to-r from-teal-100 to-transparent md:block hidden" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h4>
                                <p className="text-gray-500 leading-relaxed text-sm font-medium">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* System Requirements Footer */}
            <div className="py-12 border-t border-gray-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="flex flex-wrap justify-center gap-8 text-[13px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>4GB RAM Minimum</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-200 mt-1.5 md:block hidden" />
                        <span>500MB Free Space</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-200 mt-1.5 md:block hidden" />
                        <span>MacOS 12+ / Win 10+</span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
