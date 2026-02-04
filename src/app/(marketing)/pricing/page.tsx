"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ShieldCheck, Zap, HeartHandshake, Sparkles, ChevronRight } from "lucide-react";
import LiquidEther from "@/components/ui/liquid-ether";
import { motion } from "framer-motion";
import Footer from "@/components/ui/footer";

gsap.registerPlugin(ScrollTrigger);

export default function PricingPage() {
    const headerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const benefitsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.from(headerRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power4.out"
            })
                .from(cardRef.current, {
                    scale: 0.9,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power2.out"
                }, "-=0.5");

            // Benefits stagger
            gsap.from(".benefit-item", {
                scrollTrigger: {
                    trigger: benefitsRef.current,
                    start: "top 80%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });

        }, headerRef);

        return () => ctx.revert();
    }, []);

    const benefits = [
        {
            icon: ShieldCheck,
            title: "No Hidden Costs",
            description: "What you see is what you get. No setup fees, no AMC, no surprises."
        },
        {
            icon: Zap,
            title: "Unlimited Access",
            description: "Full access to all features, including Billing, Inventory, and CRM."
        },
        {
            icon: HeartHandshake,
            title: "Lifetime Support",
            description: "Our dedicated support team is available 24/7 to help you succeed."
        }
    ];

    return (
        <>
            <div className="min-h-screen bg-white font-sans text-gray-900 pt-32 px-4 relative overflow-hidden">
                {/* Liquid Ether Background */}
                <div className="absolute inset-0 w-full h-full z-0 opacity-40">
                    <LiquidEther
                        colors={['#43dfb0', '#c8f3f4', '#88ddc4']}
                        mouseForce={0}
                        autoSpeed={0.3}
                    />
                    <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]" />
                </div>

                <div className="relative z-10 mb-10">
                    <div ref={headerRef} className="text-center mb-16 px-4">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/50 border border-teal-100 shadow-sm text-teal-900 text-sm font-medium mb-8"
                        >
                            <Sparkles className="w-4 h-4 text-teal-500" />
                            <span className="font-bold">Transparent Pricing</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600">Free Forever.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl mx-auto leading-relaxed">
                            We believe in empowering restaurants, not charging them for it. Our core POS is completely free.
                        </p>
                    </div>

                    <div className="container mx-auto max-w-6xl">
                        <div
                            ref={cardRef}
                            className="bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-12 md:p-20 shadow-[0_32px_64px_rgba(0,0,0,0.06)] relative overflow-hidden group"
                        >
                            {/* Decorative Gradients */}
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-teal-200/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-200/30 transition-colors" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-200/20 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

                            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                                <div className="flex-1 space-y-10">
                                    <div>
                                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Professional Plan</h2>
                                        <p className="text-gray-500 text-xl font-medium">Full access to our powerful operating system.</p>
                                    </div>

                                    <div className="space-y-5">
                                        {[
                                            "Completely Free to Download",
                                            "Unlimited Sales & Inventory",
                                            "Unlimited Outlets & Employees",
                                            "Offline-First Reliability",
                                            "Real-time Cloud Sync"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className="w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
                                                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                                                </div>
                                                <span className="text-xl text-gray-700 font-semibold">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="text-center lg:text-right flex flex-col items-center lg:items-end">
                                    <div className="flex items-start">
                                        <span className="text-4xl font-bold text-gray-900 mt-6">$</span>
                                        <div className="text-[10rem] font-black leading-none tracking-tighter text-gray-900 drop-shadow-sm">
                                            0
                                        </div>
                                    </div>
                                    <div className="text-teal-600 text-2xl font-bold mt-2 uppercase tracking-widest">
                                        Always Free
                                    </div>
                                    <button className="mt-12 group relative overflow-hidden px-12 py-5 bg-gray-900 text-white text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:translate-y-[-4px] active:scale-95 transition-all">
                                        <span className="relative z-10 flex items-center gap-2">
                                            Get Started Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                    <p className="text-gray-400 text-sm mt-6 font-medium">No credit card required. No hidden fees.</p>
                                </div>
                            </div>
                        </div>

                        <div ref={benefitsRef} className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
                            {benefits.map((benefit, i) => (
                                <div key={i} className="benefit-item text-center p-8 bg-white/30 backdrop-blur-xl border border-white/40 rounded-3xl hover:border-teal-200 transition-colors group">
                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500/10 to-emerald-500/10 rounded-2xl flex items-center justify-center text-teal-600 mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">
                                        <benefit.icon className="w-10 h-10" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{benefit.title}</h3>
                                    <p className="text-gray-500 leading-relaxed font-medium">
                                        {benefit.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
