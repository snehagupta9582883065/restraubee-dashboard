"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type TimeRange = "Day" | "Week" | "Month" | "Year";

interface DateContextType {
    timeRange: TimeRange;
    setTimeRange: (range: TimeRange) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export function DateProvider({ children }: { children: ReactNode }) {
    const [timeRange, setTimeRange] = useState<TimeRange>("Day");

    return (
        <DateContext.Provider value={{ timeRange, setTimeRange }}>
            {children}
        </DateContext.Provider>
    );
}

export function useDate() {
    const context = useContext(DateContext);
    if (context === undefined) {
        throw new Error("useDate must be used within a DateProvider");
    }
    return context;
}
