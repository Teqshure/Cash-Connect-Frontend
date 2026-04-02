"use client";

import { ArrowRight } from "lucide-react";

export default function OrdersHeader() {
  return (
    <div className="flex items-center justify-between mb-4">
      <p className="text-[16px] font-semibold text-slate-800">My orders</p>

      <button className="flex items-center gap-1 text-[13px] text-emerald-600 hover:underline">
        View All <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
