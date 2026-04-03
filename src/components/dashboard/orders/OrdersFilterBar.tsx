"use client";

import { SlidersHorizontal, Search } from "lucide-react";
import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function OrdersFilterBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="flex justify-end items-center gap-3">
      {/* Filter (UI for now) */}
      <button
        className="
          flex items-center gap-2
          px-4 h-[36px]
          rounded-full
          border border-slate-200
          bg-white
          text-[13px]
          text-slate-600
          hover:bg-slate-50
          transition
          cursor-pointer
        "
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filter
      </button>

      {/* Search */}
      <div
        className="
          flex items-center gap-2
          h-[36px]
          px-4
          rounded-full
          border border-slate-200
          bg-white
          w-[260px]
        "
      >
        <Search className="h-4 w-4 text-slate-400" />
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onSearch(e.target.value);
          }}
          placeholder="Search transactions..."
          className="w-full bg-transparent outline-none text-[13px]"
        />
      </div>
    </div>
  );
}
