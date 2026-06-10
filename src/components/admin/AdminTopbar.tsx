"use client";

import { Search, Bell } from "lucide-react";
import Image from "next/image";

export default function AdminTopbar() {
  return (
    <header className="h-18 flex items-center justify-between px-8 bg-[#ffffff] sticky top-0 z-30">
      {/* Left: Greeting */}
      <div className="flex items-center gap-2 min-w-50">
        <h2 className="text-[18px] font-bold text-slate-800 tracking-tight">
          Good Admin!
        </h2>
        <span className="text-[18px]">👋</span>
      </div>

      {/* Center: Search */}
      <div className="relative w-85">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search transactions..."
          className="w-full h-10 pl-10 pr-4 bg-white border border-slate-200 rounded-full text-[13px] text-slate-600 placeholder:text-slate-400 font-medium focus:outline-none focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 transition-all"
        />
      </div>

      {/* Right: Bell + Profile */}
      <div className="flex items-center gap-4 min-w-50 justify-end">
        {/* Bell */}
        <button className="relative w-10 h-10 flex items-center justify-center bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
          <Bell className="w-4.5 h-4.5 text-slate-500" strokeWidth={1.8} />
          <span className="absolute top-2 right-2 w-1.75 h-1.75 bg-rose-500 rounded-full border-[1.5px] border-white" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="text-right leading-none">
            <p className="text-[13px] font-bold text-slate-800">Admin User</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
              Super Admin
            </p>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 border border-slate-200">
            <Image
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=AdminUser"
              alt="Admin Avatar"
              width={40}
              height={40}
              unoptimized
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
