"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center",
                className
            )}
        >
            <div
                className="absolute w-[150vw] h-[150vw] bg-[conic-gradient(from_0deg_at_50%_50%,#050c1c_0deg,#1a2e5a_60deg,#050c1c_120deg,#c42e3b_180deg,#050c1c_240deg,#1a2e5a_300deg,#050c1c_360deg)] opacity-10 blur-[80px] animate-[spin_60s_linear_infinite]"
                style={{ transformOrigin: "center center" }}
            />
            <div className="absolute inset-0 bg-restaubee-navy/80 z-10" />
            <div className="absolute inset-0 bg-grid-white/[0.03] z-20" />
        </div>
    );
};
