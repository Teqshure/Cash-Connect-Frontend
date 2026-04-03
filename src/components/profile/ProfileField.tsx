"use client";

import { ChevronRight } from "lucide-react";

export default function ProfileField({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div
      className="
        flex items-center justify-between
        p-3 rounded-[12px]
        hover:bg-slate-50
        transition cursor-pointer
      "
    >
      <div className="flex items-center gap-3">
        <div className="text-slate-500">{icon}</div>

        <div>
          <p className="text-[13px] text-slate-600">{label}</p>
          <p className="text-[14px] font-medium text-slate-800">{value}</p>
        </div>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400" />
    </div>
  );
}
