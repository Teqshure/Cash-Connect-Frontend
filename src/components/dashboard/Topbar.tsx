"use client";

import Image from "next/image";
import avartarimg from "../../../public/images/dashboard/avatar.png";
import { Bell, Search } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

export default function Topbar() {
  const user = useAuthStore((s) => s.user);
  const name = getFirstName(user?.fullname);

  return (
    <header
      className="
    w-full max-w-[902px] h-[104px]
    bg-white
    px-[28px]
    flex items-center justify-between
    gap-[13px]
  "
    >
      {/* Greeting */}
      <div className="w-[390px] h-[91px] flex flex-col justify-center gap-[1px]">
        <p className="text-[20px] leading-[28px] font-medium text-slate-900">
          Good Morning, {name}!
          <span aria-hidden className="ml-2 text-[18px] align-middle">
            👋
          </span>
        </p>
      </div>

      {/* Controls */}
      <div className="w-[424px] h-[36px] flex items-center justify-end gap-[13px]">
        <div className="flex-1 h-[36px] rounded-full border border-slate-200 bg-white flex items-center px-3 gap-2">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-transparent outline-none text-[12px] text-slate-700 placeholder:text-slate-400"
          />
        </div>

        <button
          type="button"
          aria-label="Notifications"
          className="relative h-[36px] w-[36px] rounded-full border border-slate-200 bg-white grid place-items-center hover:bg-slate-50 transition"
        >
          <Bell className="h-4 w-4 text-slate-500" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
        </button>

        <div className="relative h-[36px] w-[36px] rounded-full overflow-hidden border border-slate-200 bg-slate-200">
          <Image
            src={avartarimg}
            alt="Profile"
            fill
            className="object-cover"
            sizes="36px"
            priority
          />
        </div>
      </div>
    </header>
  );
}
