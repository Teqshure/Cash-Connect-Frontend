"use client";

import DoubleUp from "@/components/icons/double-up";
import DoubleDown from "@/components/icons/double-down";

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  Icon: React.ElementType;
  iconBg: string; // e.g. "bg-blue-50"
  iconColor: string; // e.g. "text-blue-500"
}

export default function StatCard({
  title,
  value,
  change,
  Icon,
  iconBg,
  iconColor,
}: StatCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white px-6 py-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col gap-4">
      {/* Icon */}
      <div
        className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center`}
      >
        <Icon className={`w-7 h-7 ${iconColor}`} strokeWidth={2} />
      </div>

      {/* Title + Change */}
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold text-slate-700">{title}</p>
        <div
          className={`flex items-center gap-1 text-[13px] font-bold ${
            isPositive ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {isPositive ? (
            <DoubleUp className="w-5 h-5" />
          ) : (
            <DoubleDown className="w-5 h-5" />
          )}
          {isPositive ? "+" : ""}
          {change}%
        </div>
      </div>

      {/* Value */}
      <h3 className="text-[30px] font-bold text-slate-900 tracking-tight leading-none">
        {value}
      </h3>
    </div>
  );
}
