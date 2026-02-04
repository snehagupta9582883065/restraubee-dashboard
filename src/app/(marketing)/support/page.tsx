"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MessageCircle, Mail, Phone, ChevronDown, ChevronRight, Sparkles } from "lucide-react";
import LiquidEther from "@/components/ui/liquid-ether";
import Footer from "@/components/ui/footer";

const faqs = [
    {
        question: "How do I install Restaubee on my system?",
        answer: "Simply navigate to the Download page, choose your operating system (Mac or Windows), and run the installer. The wizard will guide you through the setup."
    },
    {
        question: "Is it really free?",
        answer: "Yes! Our core POS software is completely free to use. We only charge for optional premium integrations like third-party delivery management or payment gateways."
    },
    {
        question: "Can I use it offline?",
        answer: "Absolutely. Restaubee is a hybrid system. It works perfectly offline and syncs your data to the cloud once you're back online."
    },
    {
        question: "How do I import my existing menu?",
        answer: "We provide an easy Excel import tool. You can also contact our support team, and we'll help you migrate your data from your old POS."
    }
];

export default function SupportPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                    {/* Header */}
                    <section className="pt-20 pb-20 px-4 text-center">
                        <div className="max-w-3xl mx-auto">
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/50 border border-teal-100 shadow-sm text-teal-900 text-sm font-medium mb-8"
                            >
                                <Sparkles className="w-4 h-4 text-teal-500" />
                                <span className="font-bold">24/7 Support Center</span>
                            </motion.div>

                            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-tight">
                                How can we <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600">help you?</span>
                            </h1>

                            <div className="relative max-w-xl mx-auto group">
                                <input
                                    type="text"
                                    placeholder="Search for answers..."
                                    className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white/40 backdrop-blur-xl border border-white/60 focus:bg-white focus:ring-4 focus:ring-teal-500/10 focus:border-teal-400 outline-none text-xl font-medium transition-all shadow-lg"
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-teal-500 w-6 h-6 transition-colors" />
                            </div>
                        </div>
                    </section>

                    {/* Support Actions */}
                    <section className="py-20 px-4">
                        <div className="container mx-auto max-w-6xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                                {[
                                    { icon: MessageCircle, title: "Live Chat", desc: "Instantly chat with our team", action: "Start Chat" },
                                    { icon: Mail, title: "Email Us", desc: "Get a response within 24h", action: "support@restaubee.com" },
                                    { icon: Phone, title: "Call Us", desc: "Mon-Sat, 9am - 9pm", action: "1800-RESTAU-BEE" }
                                ].map((card, i) => (
                                    <div key={i} className="bg-white/30 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all border border-white/40 group cursor-pointer hover:translate-y-[-4px]">
                                        <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 shadow-lg transition-transform">
                                            <card.icon className="w-7 h-7" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{card.title}</h3>
                                        <p className="text-gray-500 mb-8 font-medium">{card.desc}</p>
                                        <div className="font-bold text-teal-600 flex items-center gap-2 group-hover:gap-3 transition-all tracking-tight">
                                            {card.action} <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* FAQ Accordion */}
                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight text-gray-900">Frequently Asked Questions</h2>

                                <div className="space-y-6">
                                    {faqs.map((faq, index) => (
                                        <div key={index} className="bg-white/40 backdrop-blur-xl rounded-3xl border border-white/60 overflow-hidden hover:border-teal-200 transition-colors">
                                            <button
                                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                                className="w-full flex items-center justify-between p-8 text-left hover:bg-white/20 transition-colors group"
                                            >
                                                <span className="font-bold text-xl text-gray-900 group-hover:text-teal-600 transition-colors">{faq.question}</span>
                                                <div className={`p-2 rounded-full border transition-all duration-300 ${openIndex === index ? "bg-teal-500 border-teal-500 text-white rotate-180" : "bg-white border-gray-100 text-gray-400 group-hover:border-teal-200 group-hover:text-teal-500"}`}>
                                                    <ChevronDown className="w-5 h-5" />
                                                </div>
                                            </button>
                                            <AnimatePresence>
                                                {openIndex === index && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="px-8 pb-8 text-gray-500 text-lg leading-relaxed font-medium">
                                                            {faq.answer}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
}
