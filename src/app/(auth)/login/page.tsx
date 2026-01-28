"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader2, ArrowRight, Hexagon } from "lucide-react";
import { useUser } from "@/components/UserContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useUser();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Determine user role and name
                const token = data.accessToken || data.token;
                const role = data.roles?.includes("ROLE_ADMIN") ? "admin" : "user";
                const name = data.firstName
                    ? `${data.firstName} ${data.lastName || ""}`
                    : (data.username ? data.username.split("@")[0] : "User");

                // Update global state and localStorage
                login(token || "", role, name);

                router.push("/");
            } else {
                setError(data.message || "Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative bg-slate-50 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="w-full max-w-md z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-2xl shadow-xl shadow-cyan-500/20 mb-6">
                        <Hexagon className="text-white fill-white/20" size={32} />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter text-slate-900 mb-2 uppercase">RESTRAU BEE</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Login to your POS Admin</p>
                </div>

                <div className="glass p-8 rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-2xl transition-all shadow-xl shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold animate-in slide-in-from-top-2">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-500">Password</label>
                                <Link href="#" className="text-[10px] font-black uppercase text-cyan-600 hover:text-cyan-700 transition-colors tracking-widest">Forgot Password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={20} />
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full h-14 bg-white border border-slate-200 rounded-2xl pl-12 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold placeholder:text-slate-300"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-200 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 overflow-hidden group"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin text-white" size={20} />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-500 font-bold text-sm">
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-cyan-600 hover:text-cyan-700 transition-colors uppercase tracking-widest text-xs font-black ml-1">
                            Create Account
                        </Link>
                    </p>
                </div>

                <div className="mt-10 flex items-center justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Fast</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Secure</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Reliable</div>
                </div>
            </div>
        </div>
    );
}
