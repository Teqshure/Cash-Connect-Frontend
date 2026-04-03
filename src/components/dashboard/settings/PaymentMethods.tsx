"use client";

import { Plus } from "lucide-react";

function MethodItem({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex items-center justify-between bg-slate-50 rounded-[14px] px-4 py-3">
      <div>
        <p className="text-[13px] font-medium text-slate-800">{title}</p>
        <p className="text-[12px] text-slate-500">{subtitle}</p>
      </div>

      <button className="text-[12px] text-emerald-600 cursor-pointer font-medium">
        Edit
      </button>
    </div>
  );
}

export default function PaymentMethods() {
  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm">
      <p className="text-[15px] font-semibold text-slate-800 mb-4">
        Payment Methods
      </p>

      {/* Add Button */}
      <button
        className="
          w-full h-[44px]
          rounded-full
          bg-emerald-600
          cursor-pointer
          text-white
          text-[13px]
          font-medium
          flex items-center justify-center gap-2
          mb-4
          hover:bg-emerald-700
          transition
        "
      >
        <Plus className="h-4 w-4" />
        Add Payment Method
      </button>

      <div className="flex flex-col gap-3">
        <MethodItem title="PayPal" subtitle="**** **** 4567" />
        <MethodItem title="Bank Account" subtitle="Wells Fargo ••••1234" />
        <MethodItem title="Zelle" subtitle="john@email.com" />
      </div>
    </div>
  );
}
