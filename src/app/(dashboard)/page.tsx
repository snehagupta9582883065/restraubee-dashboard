"use client";

import Header from "@/components/Header";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  Filter,
  MoreVertical,
  ChevronDown,
  Calendar,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { cn } from "@/lib/utils";
import { useDate } from "@/components/DateContext";
import { useUser } from "@/components/UserContext";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const stats = [
  { label: 'Total Sales', value: '$8,245', change: '+18.2%', trend: 'up', icon: DollarSign, color: 'cyan', iconBg: 'bg-cyan-500/10' },
  { label: 'Orders', value: '452', change: '+12.5%', trend: 'up', icon: ShoppingBag, color: 'orange', iconBg: 'bg-orange-500/10' },
  { label: 'Items Sold', value: '1,292', change: '+16.8%', trend: 'up', icon: Package, color: 'rose', iconBg: 'bg-rose-500/10' },
  { label: 'Avg Order Value', value: '$18.24', change: '+5.5%', trend: 'up', icon: DollarSign, color: 'emerald', iconBg: 'bg-emerald-500/10' },
];

const performanceData = [
  { time: '9 AM', revenue: 800 },
  { time: '11 AM', revenue: 1200 },
  { time: '1 PM', revenue: 900 },
  { time: '3 PM', revenue: 1600 },
  { time: '5 PM', revenue: 2400 },
  { time: '7 PM', revenue: 1800 },
  { time: '9 PM', revenue: 1100 },
];

const paymentData = [
  { name: 'Card', value: 57.3, color: '#06b6d4' },
  { name: 'Online', value: 24.1, color: '#3b82f6' },
  { name: 'Cash', value: 14.9, color: '#f59e0b' },
  { name: 'Other', value: 3.7, color: '#8b5cf6' },
];

const topSelling = [
  { name: 'Cheeseburger', price: '$1,248', sales: 156, rating: 4.8, img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100&h=100&fit=crop' },
  { name: 'Margherita Pizza', price: '$982', sales: 124, rating: 4.7, img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=100&h=100&fit=crop' },
  { name: 'Caesar Salad', price: '$745', sales: 93, rating: 4.5, img: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=100&h=100&fit=crop' },
  { name: 'Carbonara', price: '$612', sales: 85, rating: 4.9, img: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?w=100&h=100&fit=crop' },
];

const categories = [
  { name: 'Food', amount: '$5,971', percentage: 72.4, color: 'cyan' },
  { name: 'Drinks', amount: '$1,592', percentage: 19.3, color: 'blue' },
  { name: 'Desserts', amount: '$520', percentage: 6.2, color: 'orange' },
];

export default function DashboardPage() {
  const { timeRange } = useDate();
  const { role: userRole } = useUser();

  // Mock data adjustments based on timeRange
  const multiplier = timeRange === "Year" ? 365 : timeRange === "Month" ? 30 : timeRange === "Week" ? 7 : 1;
  const labelPrefix = timeRange === "Day" ? "Today's" : timeRange === "Week" ? "Weekly" : timeRange === "Month" ? "Monthly" : "Yearly";

  const stats = [
    { label: `${labelPrefix} Sales`, value: `$${(8245 * multiplier).toLocaleString()}`, change: '+18.2%', trend: 'up', icon: DollarSign, color: 'cyan', iconBg: 'bg-cyan-500/10' },
    { label: `${labelPrefix} Orders`, value: (452 * multiplier).toLocaleString(), change: '+12.5%', trend: 'up', icon: ShoppingBag, color: 'orange', iconBg: 'bg-orange-500/10' },
    { label: `${labelPrefix} Items Sold`, value: (1292 * multiplier).toLocaleString(), change: '+16.8%', trend: 'up', icon: Package, color: 'rose', iconBg: 'bg-rose-500/10' },
    { label: `Avg Order Value`, value: '$18.24', change: '+5.5%', trend: 'up', icon: DollarSign, color: 'emerald', iconBg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="pb-12 animate-in fade-in duration-700">
      <Header />

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-md group hover:border-cyan-500/50 transition-all">
            <div className="flex items-start justify-between">
              <div className={cn(
                "p-3 rounded-xl transition-transform group-hover:scale-110",
                stat.color === 'cyan' && "bg-cyan-500/10 text-cyan-500",
                stat.color === 'orange' && "bg-orange-500/10 text-orange-500",
                stat.color === 'rose' && "bg-rose-500/10 text-rose-500",
                stat.color === 'emerald' && "bg-emerald-500/10 text-emerald-500"
              )}>
                <stat.icon size={26} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.change}
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Performance Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold uppercase tracking-tight">Sales Performance</h3>
              <div className="flex gap-4 mt-2">
                <button className="text-xs font-bold text-cyan-500 underline decoration-2 underline-offset-4">Revenue</button>
                <button className="text-xs font-bold text-slate-400 hover:text-slate-200 transition-colors">Orders</button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700 text-xs font-bold">
                <Filter size={14} /> Filter: All <ChevronDown size={12} />
              </div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontSize: 11, fontWeight: 700 }}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', fontSize: '12px' }}
                  itemStyle={{ color: '#06b6d4', fontWeight: 'bold' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#06b6d4"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods Chart */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold uppercase tracking-tight mb-6">Payment Methods</h3>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {paymentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-3xl font-black">57.3%</p>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Card</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {paymentData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-bold text-slate-500">{item.name}</span>
                <span className="text-xs font-black ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {userRole === 'user' ? (
          <>
            {/* Top Selling Items */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">Top-Selling Items</h3>
                <button className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-md border border-slate-200 dark:border-slate-700">Filter: All <ChevronDown size={12} className="inline ml-1" /></button>
              </div>
              <div className="space-y-4">
                {topSelling.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-black transition-colors">{item.name}</p>
                      <p className="text-xs font-bold text-slate-500">{item.sales} Sales</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-cyan-500">{item.price}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500" style={{ width: `${(item.sales / 160) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Orders */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">Recent Orders</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Calendar size={14} /> Apr 24 <ChevronDown size={12} />
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { id: '1345', time: '5:45 PM', status: 'Completed', color: 'bg-emerald-500', items: '2 Cheeseburgers, 1 Salad' },
                  { id: '1344', time: '5:30 PM', status: 'Pending', color: 'bg-amber-500', items: '1 Margherita Pizza' },
                  { id: '1343', time: '5:15 PM', status: 'Completed', color: 'bg-emerald-500', items: '2 Carbonara, 2 Coke' },
                  { id: '1342', time: '5:05 PM', status: 'Canceled', color: 'bg-rose-500', items: '1 Salad' },
                ].map((order) => (
                  <div key={order.id} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs">#{order.id}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-slate-500">{order.time}</p>
                        <span className={`w-1.5 h-1.5 rounded-full ${order.color}`} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{order.status}</span>
                      </div>
                      <p className="text-xs font-black truncate mt-1">{order.items}</p>
                    </div>
                    <button className="p-1.5 text-slate-400 hover:text-cyan-500">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Admin: Revenue Overview */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">Detailed Revenue</h3>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <DollarSign size={14} /> This Month <ChevronDown size={12} />
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Gross Revenue</p>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">$124,500.00</h4>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                    <TrendingUp size={20} />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Net Profit</p>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white">$42,300.20</h4>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-500">
                    <DollarSign size={20} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Dine-in</p>
                    <p className="text-lg font-black">$65k</p>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Delivery</p>
                    <p className="text-lg font-black">$59k</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin: Branches Overview */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold uppercase tracking-tight">Branches</h3>
                <button className="text-xs font-bold text-slate-400 hover:text-cyan-500 transition-colors">View All</button>
              </div>
              <div className="space-y-4">
                {[
                  { name: "Downtown Main", revenue: "$45.2k", status: "Open", color: "bg-emerald-500" },
                  { name: "Westside Mall", revenue: "$28.4k", status: "Busy", color: "bg-amber-500" },
                  { name: "Airport Terminal 2", revenue: "$12.1k", status: "Open", color: "bg-emerald-500" },
                  { name: "Tech Park Kiosk", revenue: "$8.9k", status: "Closed", color: "bg-slate-400" },
                ].map((branch, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                        <MapPin size={20} className="text-slate-400 group-hover:text-cyan-500 transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm font-black group-hover:text-cyan-500 transition-colors">{branch.name}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${branch.color}`} />
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{branch.status}</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black">{branch.revenue}</p>
                      <ArrowUpRight size={14} className="text-emerald-500 inline-block" />
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-3 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400 font-bold text-xs uppercase tracking-widest hover:border-cyan-500 hover:text-cyan-500 transition-all flex items-center justify-center gap-2">
                <ArrowUpRight size={16} /> Manage Branches
              </button>
            </div>
          </>
        )}

        {/* Sales by Category */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold uppercase tracking-tight mb-6">Sales by Category</h3>
          <div className="space-y-8">
            {categories.map((cat) => (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      cat.color === 'cyan' && "bg-cyan-500/10 text-cyan-500",
                      cat.color === 'blue' && "bg-blue-600/10 text-blue-600",
                      cat.color === 'orange' && "bg-orange-500/10 text-orange-500"
                    )}>
                      {cat.name === 'Food' ? <ShoppingBag size={20} /> : cat.name === 'Drinks' ? <Package size={20} /> : <Users size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-black">{cat.name}</p>
                      <p className="text-[10px] font-bold text-slate-500">1,234 Items Sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black">{cat.amount}</p>
                    <p className="text-[10px] font-bold text-slate-500">{cat.percentage}% share</p>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      cat.color === 'cyan' && "bg-cyan-500",
                      cat.color === 'blue' && "bg-blue-600",
                      cat.color === 'orange' && "bg-orange-500"
                    )}
                    style={{ width: `${cat.percentage}%` }}
                  />
                </div>
              </div>
            ))}

          </div>

          <div className="mt-10 p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-center">
            <p className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Total Monthly Target</p>
            <h4 className="text-2xl font-black mt-1">$25,000.00</h4>
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 w-[65%]" />
              </div>
              <span className="text-[10px] font-bold text-cyan-500">65%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
