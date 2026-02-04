"use client";

import { Hero } from "@/components/hero";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import React from "react";
import { motion } from "framer-motion";
import {
    CreditCard,
    BarChart3,
    LayoutGrid,
    Users,
    Receipt,
    Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import Footer from "@/components/ui/footer";

// Bento Grid Component
const BentoGrid = ({ className, children }: { className?: string; children?: React.ReactNode }) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto ",
                className
            )}
        >
            {children}
        </div>
    );
};

const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
    image,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
    image?: string;
}) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={cn(
                "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 bg-white border border-gray-100 flex flex-col space-y-4",
                className
            )}
        >
            <div className="flex flex-1 w-full h-full min-h-[8rem] rounded-xl bg-gradient-to-br from-gray-50 to-gray-100/50 border border-gray-100 overflow-hidden relative">
                {header}
                {image && (
                    <img
                        src={image}
                        alt={typeof title === 'string' ? title : ""}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover/bento:opacity-100 group-hover/bento:scale-105 transition-all duration-500"
                    />
                )}
            </div>
            <div className="group-hover/bento:translate-x-2 transition duration-200">
                <div className="mb-2 text-restaubee-navy">
                    {icon}
                </div>
                <div className="font-bold text-gray-900 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-normal text-gray-400 text-sm">
                    {description}
                </div>
            </div>
        </motion.div>
    );
};

// Main Page Component
export default function Home() {
    const items = [
        {
            title: "Smart Billing",
            description: "Touch-optimized POS that handles high volume with ease.",
            header: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />,
            icon: <Receipt className="h-6 w-6 text-blue-500" />,
            image: "/home/smartbilling.jpeg",
            className: "md:col-span-2",
        },
        {
            title: "Inventory",
            description: "Real-time tracking of every ingredient and recipe.",
            header: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />,
            icon: <Package className="h-6 w-6 text-green-500" />,
            image: "/home/inventory.jpeg",
            className: "md:col-span-1",
        },
        {
            title: "Table Management",
            description: "Beautifully visual floor plans and reservation tracking.",
            header: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />,
            icon: <LayoutGrid className="h-6 w-6 text-teal-500" />,
            image: "/home/table.jpeg",
            className: "md:col-span-1",
        },
        {
            title: "Analytics",
            description: "Deep insights into your sales and staff performance.",
            header: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />,
            icon: <BarChart3 className="h-6 w-6 text-orange-500" />,
            image: "/dashboardimg.png",
            className: "md:col-span-1",
        },
        {
            title: "Integrated Payments",
            description: "Fast, secure payments with zero hidden fees.",
            header: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />,
            icon: <CreditCard className="h-6 w-6 text-emerald-500" />,
            image: "/home/payment.jpeg",
            className: "md:col-span-1",
        },
        {
            title: "CRM & Loyalty",
            description: "Keep customers coming back with built-in tools.",
            header: <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-full" />,
            icon: <Users className="h-6 w-6 text-purple-500" />,
            image: "/home/crm.png",
            className: "md:col-span-3",
        },
    ];

    return (
        <main className="min-h-screen bg-[#ffffff] text-[#1d1d1f] selection:bg-blue-100">
            <Hero />

            {/* Bento Grid Section */}
            <section className="py-32 px-4 bg-gray-50/50">
                <div className="container mx-auto max-w-7xl mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
                        Everything you need.
                        <span className="text-[#86868b] block mt-2">Nothing you don't.</span>
                    </h2>
                    <p className="max-w-xl mx-auto text-xl text-[#86868b] font-medium">
                        Powerful tools designed to work together seamlessly.
                    </p>
                </div>

                <BentoGrid>
                    {items.map((item, i) => (
                        <BentoGridItem
                            key={i}
                            title={item.title}
                            description={item.description}
                            header={item.header}
                            icon={item.icon}
                            image={item.image}
                            className={item.className}
                        />
                    ))}
                </BentoGrid>
            </section>

            {/* Macbook Scroll / Showcase */}
            <div className="bg-white overflow-hidden py-32">
                <div className="scale-75 md:scale-100">
                    <MacbookScroll
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f7a65d?auto=format&fit=crop&w=1600&q=80"
                        showGradient={false}
                        badge={
                            <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl p-4 flex gap-4 items-center border border-gray-100">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                    <Receipt className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Revenue</p>
                                    <p className="text-xl font-bold text-[#1d1d1f]">free</p>
                                </div>
                            </div>
                        }
                    />
                </div>
            </div>

            <Footer />
        </main>
    );
}
