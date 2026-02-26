"use client";

import Image from "next/image";
import avartarimg from "../../../public/images/dashboard/avatar.png";
import { Bell, Search, Menu, Settings, Gift, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

function getPageTitle(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/wallet")) return "Wallet";
  if (pathname.startsWith("/history")) return "History";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/exchange")) return "Exchange";
  if (pathname.startsWith("/transactions")) return "Transactions";
  // Fallback: auto-capitalise the first path segment
  const segment = pathname.split("/").filter(Boolean)[0] ?? "Dashboard";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

export default function Topbar({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const user = useAuthStore((s) => s.user);
  const name = getFirstName(user?.fullname);
  const pathname = usePathname();

  const isHistoryPage = pathname === "/History";
  const pageTitle = getPageTitle(pathname);

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="lg:hidden h-[56px] bg-white flex items-center justify-between px-4 border-b border-slate-100 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            className="h-10 w-10 rounded-full grid place-items-center hover:bg-slate-50"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-slate-700" />
          </button>

          {/* ← was hardcoded "Dashboard", now reflects active route */}
          <p className="text-[16px] font-semibold text-slate-800">
            {pageTitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="h-10 w-10 rounded-full grid place-items-center hover:bg-slate-50"
            aria-label="Settings"
          >
            <Settings className="h-5 w-5 text-slate-700" />
          </button>
          <button
            className="h-10 w-10 rounded-full grid place-items-center hover:bg-slate-50"
            aria-label="Rewards"
          >
            <Gift className="h-5 w-5 text-slate-700" />
          </button>
          <button
            className="relative h-10 w-10 rounded-full grid place-items-center hover:bg-slate-50"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-slate-700" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <div className="flex items-center gap-1">
            <div className="relative h-9 w-9 rounded-full overflow-hidden border border-slate-200 bg-slate-200">
              <Image
                src={avartarimg}
                alt="Profile"
                fill
                className="object-cover"
                sizes="36px"
                priority
              />
            </div>
            <ChevronDown className="h-4 w-4 text-slate-600" />
          </div>
        </div>
      </header>

      {/* DESKTOP TOPBAR */}
      <header
        className="
          hidden lg:flex
          h-[104px]
          w-full
          bg-white
          px-[28px]
          items-center justify-between
          gap-[13px]
          border-b border-slate-100
          sticky top-0 z-50
        "
      >
        <div className="min-w-0 w-[390px] h-[91px] flex items-center">
          <p className="text-[20px] leading-[28px] font-medium text-slate-900 whitespace-nowrap">
            Good Morning, {name}! <span className="ml-1">👋</span>
          </p>
        </div>

        <div className="w-[424px] h-[36px] flex items-center justify-end gap-[13px]">
          {!isHistoryPage && (
            <div className="flex-1 h-[36px] rounded-full border border-slate-200 bg-white flex items-center px-3 gap-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full bg-transparent outline-none text-[12px] text-slate-700 placeholder:text-slate-400"
              />
            </div>
          )}

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
    </>
  );
}
