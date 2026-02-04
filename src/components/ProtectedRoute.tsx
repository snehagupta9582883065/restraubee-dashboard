"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./UserContext";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { token } = useUser();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (!storedToken && !token) {
            router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, [token, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-500 animate-spin" />
                    <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-500 w-6 h-6 animate-pulse" />
                </div>
                <p className="mt-4 text-slate-500 dark:text-slate-400 font-bold animate-pulse">
                    Verifying Session...
                </p>
            </div>
        );
    }

    return <>{children}</>;
}
