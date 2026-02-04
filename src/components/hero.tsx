"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ChevronRight, PlayCircle, Command, Sparkles } from "lucide-react";
import LiquidEther from "./ui/liquid-ether";

export const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    // Container Scroll Animation for the Image
    const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), {
        stiffness: 100,
        damping: 30
    });
    const rotateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 0]), {
        stiffness: 100,
        damping: 30
    });
    const translateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [0, 0]), {
        stiffness: 100,
        damping: 30
    });

    // Initial Animation for Dashboard
    const initialRotateX = { rotateX: 20, z: -100, opacity: 0 };
    const animateRotateX = { rotateX: 0, z: 0, opacity: 1 };

    return (
        <section ref={containerRef} className="relative w-full flex flex-col items-center justify-start bg-[#ffffff] overflow-hidden pt-32 pb-20 perspective-[1000px]">
            {/* Liquid Ether Background */}
            <div className="absolute inset-0 w-full h-full z-0 opacity-40">
                <LiquidEther
                    colors={['#43dfb0', '#c8f3f4', '#88ddc4']}
                    mouseForce={0}
                    autoSpeed={0.3}
                />
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/50 border border-teal-100 shadow-sm text-teal-900 text-sm font-medium mb-8 hover:border-teal-200 transition-all cursor-default"
                >
                    <Sparkles className="w-4 h-4 text-teal-500" />
                    {/* <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 font-bold">New AI Features</span> */}
                    {/* <span className="w-1 h-1 rounded-full bg-teal-200 mx-1" /> */}
                    <span>v0.1 Available Now</span>
                </motion.div>

                {/* Headline - Split for impact */}
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-semibold tracking-tighter text-[#1d1d1f] mb-8 leading-[0.9] flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        Master your
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
                        className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 pb-2"
                    >
                        Restaurant.
                    </motion.span>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-xl md:text-2xl text-[#86868b] max-w-2xl mx-auto mb-12 leading-relaxed font-medium"
                >
                    The intelligent ecosystem for modern dining. Swift. Seamless.
                    {/* <span className="text-[#1d1d1f] font-semibold"> Beautiful. Fast. Free.</span> */}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.45 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
                >
                    <Link href="/download">
                        <button className="relative group overflow-hidden bg-[#1d1d1f] text-white px-8 py-4 rounded-full font-medium text-lg min-w-[200px] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20 active:scale-95">
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Get Started Free <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </Link>
                    <button className="bg-white text-[#1d1d1f] border border-gray-200 px-8 py-4 rounded-full font-medium text-lg min-w-[200px] hover:bg-gray-50 transition-all flex items-center justify-center gap-2 group">
                        <PlayCircle className="w-5 h-5 text-gray-400 group-hover:text-teal-500 transition-colors" />
                        Watch Demo
                    </button>
                </motion.div>

                {/* 3D Dashboard Visualization */}
                <motion.div
                    style={{
                        rotateX: rotateX,
                        rotateY: rotateY,
                        z: translateZ,
                        transformStyle: "preserve-3d"
                    }}
                    initial={{ rotateX: 20, y: 100, opacity: 0 }}
                    animate={{ rotateX: 0, y: 0, opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
                    className="relative w-full max-w-6xl mx-auto aspect-[16/10] bg-gray-900 rounded-t-[2rem] border-[8px] border-b-0 border-[#1d1d1f] shadow-2xl overflow-hidden group"
                >
                    {/* Simulated Browser Bar */}
                    <div className="absolute top-0 left-0 right-0 h-10 bg-[#2d2d2f] flex items-center px-4 gap-2 z-20">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>
                        <div className="mx-auto bg-[#3d3d3f] rounded-md px-32 py-1 text-xs text-gray-500 font-mono">Restaubee.com/dashboard</div>
                    </div>

                    {/* Dashboard Image */}
                    <img
                        src="/dashboardimg.png"
                        alt="Dashboard"
                        className="w-full h-full object-cover mt-10 opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                    />

                    {/* Floating Cards (Overlay) */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-lg w-64"
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400">
                                $
                            </div>
                            <div className="text-white text-sm font-medium">Real-time Sales</div>
                        </div>
                        <div className="text-2xl font-bold text-white tracking-widest">$12,402</div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 0.8 }}
                        className="absolute top-20 right-10 bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-xl shadow-lg w-56 transform rotate-3 hover:rotate-0 transition-transform"
                    >
                        <div className="flex gap-2 items-center mb-1">
                            <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                            <span className="text-xs text-teal-200">Integration</span>
                        </div>
                        <div className="text-white font-medium text-sm">Zomato Order Received</div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Gradients for blending */}
            <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#ffffff] to-transparent z-10" />
        </section>
    );
};
