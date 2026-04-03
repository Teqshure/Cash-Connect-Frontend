"use client";

import { FileText, ChevronRight } from "lucide-react";

function Item({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between py-2 cursor-pointer">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-slate-400" />
        <p className="text-[13px] text-slate-700">{title}</p>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400" />
    </div>
  );
}

export default function LegalLinks() {
  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm">
      <Item title="Terms of Service" />
      <Item title="Privacy Policy" />
    </div>
  );
}
