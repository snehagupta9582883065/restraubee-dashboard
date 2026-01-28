"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
    User,
    Mail,
    Lock,
    Phone,
    MapPin,
    Loader2,
    ArrowRight,
    Hexagon,
    ChevronRight
} from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        address: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                // Handle successful signup
            } else {
                setError(data.message || "Registration failed. Please check your details.");
            }                router.push("/login");

        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 py-12 relative bg-slate-50 overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="w-full max-w-2xl z-10 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500 rounded-xl shadow-lg shadow-cyan-500/20 mb-4">
                        <Hexagon className="text-white fill-white/20" size={24} />
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900 mb-2 uppercase">RESTRAU BEE</h1>
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Create your POS admin account</p>
                </div>

                <div className="glass p-8 rounded-[2rem] border border-slate-200 bg-white/70 backdrop-blur-2xl transition-all shadow-xl shadow-slate-200/50">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-bold">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">First Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        placeholder="Henry"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Last Name */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Last Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        placeholder="Jhon"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="henryjhon@restraubee.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        placeholder="+91 12345 67890"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>

                            {/* Address */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-slate-500 ml-1">Business Address</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={18} />
                                    <input
                                        type="text"
                                        name="address"
                                        required
                                        placeholder="Delhi, India"
                                        value={formData.address}
                                        onChange={handleChange}
                                        className="w-full h-12 bg-white border border-slate-200 rounded-xl pl-11 pr-4 text-slate-900 focus:outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/5 transition-all font-bold text-sm placeholder:text-slate-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-200 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-cyan-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3 overflow-hidden group mt-4"
                        >
                            {loading ? (
                                <Loader2 className="animate-spin text-white" size={20} />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-slate-500 font-bold text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="text-cyan-600 hover:text-cyan-700 transition-colors uppercase tracking-widest text-[10px] font-black ml-1 flex items-center justify-center gap-1 mt-2 group">
                            Back to Login <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        By joining, you agree to our <span className="text-slate-600 underline cursor-pointer hover:text-cyan-600">Terms of Service</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
