"use client";

import StatCard from "@/components/admin/StatCard";
import {
  Users,
  TrendingUp,
  BarChart3,
  Gift,
  Bitcoin,
  Theater,
} from "lucide-react";
import RecentTransactionsTable from "@/components/admin/RecentTransactionsTable";
import ActivityChart from "@/components/admin/ActivityChart";
import VolumeChart from "@/components/admin/VolumeChart";

const stats = [
  {
    title: "Total Active Users",
    value: "18,765",
    change: 2.6,
    Icon: Users,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-500",
  },
  {
    title: "Total Transactions",
    value: "156,892",
    change: 8.2,
    Icon: TrendingUp,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
  },
  {
    title: "Total Volume",
    value: "₦2.4B",
    change: -0.1,
    Icon: BarChart3,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-500",
  },
  {
    title: "Gift Card Trades Today",
    value: "342",
    change: -0.1,
    Icon: Gift,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
  },
  {
    title: "Crypto Trades Today",
    value: "98",
    change: 2.6,
    Icon: Bitcoin,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
  },
  {
    title: "Pending KYC",
    value: "34",
    change: -0.1,
    Icon: Theater,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 pt-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[16px] font-bold text-slate-800">
              Data Activity
            </h3>
            <select className="bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-500 px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer">
              <option>Week</option>
              <option>Month</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ActivityChart />
          </div>
        </div>

        {/* Volume Distribution */}
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
          <h3 className="text-[16px] font-bold text-slate-800 mb-4">
            Volume Distribution
          </h3>
          <div className="h-56 w-full">
            <VolumeChart />
          </div>
          <div className="mt-6 space-y-3">
            {[
              { label: "Crypto", pct: "35%", color: "bg-blue-500" },
              { label: "Gift Cards", pct: "45%", color: "bg-amber-400" },
              { label: "Global Payouts", pct: "20%", color: "bg-orange-500" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${row.color}`} />
                  <span className="text-[13px] font-medium text-slate-500">
                    {row.label}
                  </span>
                </div>
                <span className="text-[13px] font-bold text-slate-800">
                  {row.pct}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white px-8 pt-8 pb-4 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)]">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[16px] font-bold text-slate-800">
            Recent Transactions
          </h3>
          <button className="text-emerald-500 text-[13px] font-semibold hover:underline">
            View All →
          </button>
        </div>
        <RecentTransactionsTable />
      </div>
    </div>
  );
}
