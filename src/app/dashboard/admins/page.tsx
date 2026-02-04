"use client";

import { useState } from 'react';
import {
    Search,
    Filter,
    MoreVertical,
    Shield,
    Mail,
    Phone,
    Calendar,
    CheckCircle2,
    XCircle
} from 'lucide-react';

const admins = [
    {
        id: 1,
        name: "Sarah Wilson",
        email: "sarah.w@restraubee.com",
        role: "Super Admin",
        status: "Active",
        lastActive: "2 mins ago",
        joinDate: "Jan 15, 2024",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
    },
    {
        id: 2,
        name: "Michael Chen",
        email: "m.chen@restraubee.com",
        role: "Admin",
        status: "Active",
        lastActive: "1 hour ago",
        joinDate: "Feb 01, 2024",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
        id: 3,
        name: "James Rodriguez",
        email: "j.rodriguez@restraubee.com",
        role: "Admin",
        status: "Inactive",
        lastActive: "2 days ago",
        joinDate: "Feb 10, 2024",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
        id: 4,
        name: "Emily Parker",
        email: "emily.p@restraubee.com",
        role: "Admin",
        status: "Active",
        lastActive: "5 mins ago",
        joinDate: "Mar 05, 2024",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
    },
];

import { useRouter } from 'next/navigation';
import { useUser, UserRole } from '@/components/UserContext';

export default function AdminsPage() {
    const router = useRouter();
    const { switchRole } = useUser();

    const handleRowClick = (role: string) => {
        // Map the display role to our system roles
        const systemRole: UserRole = role === 'Super Admin' ? 'super-admin' : role === 'User' ? 'user' : 'admin';
        switchRole(systemRole);
        router.push('/dashboard');
    };

    // Add mock user for testing user role
    const allUsers = [...admins, {
        id: 5,
        name: "David Miller",
        email: "david.m@restraubee.com",
        role: "User",
        status: "Active",
        lastActive: "10 mins ago",
        joinDate: "Mar 10, 2024",
        avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
    }];

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        Admin Management
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">
                        Manage system administrators and their permissions
                    </p>
                </div>
                <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm transition-colors flex items-center gap-2 shadow-lg shadow-cyan-500/20">
                    <Shield size={18} />
                    <span>Add New Admin</span>
                </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Total Admins</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">12</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Active Now</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">8</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                            <Shield size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-400">Super Admins</p>
                            <h3 className="text-2xl font-black text-slate-900 dark:text-white">3</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search admins by name or email..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all font-medium text-sm"
                    />
                </div>
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            {/* Admins List */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Admin</th>
                                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Role</th>
                                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Status</th>
                                <th className="py-4 px-6 text-xs font-black uppercase tracking-wider text-slate-500">Joined Date</th>
                                <th className="py-4 px-6 text-right text-xs font-black uppercase tracking-wider text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {allUsers.map((admin) => (
                                <tr key={admin.id} onClick={() => handleRowClick(admin.role)} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <img src={admin.avatar} alt={admin.name} className="w-10 h-10 rounded-full object-cover" />
                                            <div>
                                                <p className="font-bold text-sm text-slate-900 dark:text-white">{admin.name}</p>
                                                <p className="text-xs text-slate-500">{admin.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${admin.role === 'Super Admin'
                                            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                            : 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
                                            }`}>
                                            {admin.role === 'Super Admin' && <Shield size={12} />}
                                            {admin.role}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${admin.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'
                                                }`} />
                                            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                                {admin.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Calendar size={14} />
                                            <span className="text-sm font-medium">{admin.joinDate}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
