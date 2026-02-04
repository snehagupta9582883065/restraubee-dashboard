"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import LiquidEther from "@/components/ui/liquid-ether";
import { motion } from "framer-motion";
import Footer from "@/components/ui/footer";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
    {
        title: "The Future of Cloud Kitchens in 2026",
        category: "Industry Trends",
        date: "Jan-1-2026",
        image: "/home/kot.jpeg"
    },
    {
        title: "How Data Analytics is Changing Restaurants",
        category: "Technology",
        date: "Jan-1-2026",
        image: "/dashboardimg.png"
    }
];

export default function BlogPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });

            gsap.from(".blog-card", {
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 70%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <div className="min-h-screen bg-white font-sans text-gray-900 pt-32 pb-20 px-4 relative overflow-hidden">
                {/* Liquid Ether Background */}
                <div className="absolute inset-0 w-full h-full z-0 opacity-40">
                    <LiquidEther
                        colors={['#43dfb0', '#c8f3f4', '#88ddc4']}
                        mouseForce={25}
                        autoSpeed={0.3}
                    />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10">
                    <div ref={headerRef} className="container mx-auto px-4 mb-24 max-w-7xl text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/50 border border-teal-100 shadow-sm text-teal-900 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-teal-500" />
                            <span className="font-bold">Latest Editorial</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.85]">
                            Insights & <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600">Stories.</span>
                        </h1>
                        <p className="max-w-xl text-xl md:text-2xl text-gray-500 leading-relaxed font-medium mx-auto lg:mx-0">
                            Curated articles on restaurant management, technology, and growth strategies from industry experts.
                        </p>
                    </div>

                    <div ref={gridRef} className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                        {blogs.map((blog, i) => (
                            <motion.div
                                key={i}
                                className="blog-card group relative"
                                whileHover={{ y: -12 }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                            >
                                {/* Card Glow Effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-[3.5rem] opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500" />

                                <div className="relative bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3.2rem] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.04)] hover:shadow-[0_48px_80px_rgba(0,0,0,0.08)] transition-all duration-500">
                                    {/* Image Container */}
                                    <div className="aspect-[16/9] overflow-hidden relative">
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Category Tag Overlay */}
                                        <div className="absolute top-6 left-6">
                                            <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
                                                {blog.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="p-10 lg:p-12">
                                        <div className="flex items-center gap-4 text-xs font-bold text-teal-600 mb-6 uppercase tracking-[0.2em] opacity-80">
                                            <span>{blog.date}</span>
                                            <span className="w-1 h-1 bg-teal-200 rounded-full" />
                                            <span>5 min read</span>
                                        </div>

                                        <h2 className="text-3xl lg:text-4xl font-extrabold text-[#1d1d1f] group-hover:text-teal-600 transition-colors leading-[1.15] mb-8 tracking-tight">
                                            {blog.title}
                                        </h2>

                                        <div className="flex items-center justify-between">
                                            {/* <div className="flex items-center gap-3 text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-all">
                                                <span>Read Article</span>
                                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all">
                                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                                                </div>
                                            </div> */}

                                            {/* Hidden share/save for premium feel */}
                                            {/* <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-all">
                                                <Sparkles className="w-4 h-4" />
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
