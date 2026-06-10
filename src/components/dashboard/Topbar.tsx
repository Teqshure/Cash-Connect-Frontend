"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import avartarimg from "../../../public/images/dashboard/avatar.png";
import { Bell, Search, Menu, Gift, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTransactionStore } from "@/store/Transactionstore";
import { usePathname, useRouter } from "next/navigation";

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

function getPageTitle(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/wallet")) return "Wallet";
  if (pathname.startsWith("/History")) return "History";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/exchange")) return "Exchange";
  if (pathname.startsWith("/transactions")) return "Transactions";
  if (pathname.startsWith("/notifications")) return "Notifications";

  const segment = pathname.split("/").filter(Boolean)[0] ?? "Dashboard";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

const ProfileMenu = ({ router, withChevron = false }: { router: any, withChevron?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer outline-none focus:outline-none hover:opacity-80 transition"
      >
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
        {withChevron && <ChevronDown className="h-4 w-4 text-slate-600" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 py-2 z-50">
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/settings");
            }}
            className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Settings
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/profile");
            }}
            className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Profile Settings
          </button>
        </div>
      )}
    </div>
  );
};

export default function Topbar({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const router = useRouter();
  const user = useAuthStore((s: any) => s.user);
  const name = getFirstName(user?.fullname);
  const pathname = usePathname();

  const isHistoryPage = pathname === "/History";
  const pageTitle = getPageTitle(pathname);

  // ✅ SEARCH STORE
  const setSearchQuery = useTransactionStore((s: any) => s.setSearchQuery);

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

          <p className="text-[16px] font-semibold text-slate-800">
            {pageTitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="h-10 w-10 rounded-full grid place-items-center hover:bg-slate-50"
            aria-label="Rewards"
          >
            <Gift className="h-5 w-5 text-slate-700" />
          </button>

          {/* ✅ CLICK → NOTIFICATIONS */}
          <button
            onClick={() => router.push("/notifications")}
            className="relative h-[36px] w-[36px] rounded-full cursor-pointer hover:bg-slate-50 transition"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5  text-slate-700" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <ProfileMenu router={router} withChevron />
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
        {/* LEFT */}
        <div className="min-w-0 w-[390px] h-[91px] flex items-center">
          <p className="text-[20px] leading-[28px] font-medium text-slate-900 whitespace-nowrap">
            Good Morning, {name}! <span className="ml-1">👋</span>
          </p>
        </div>

        {/* RIGHT */}
        <div className="w-[424px] h-[36px] flex items-center justify-end gap-[13px]">
          {!isHistoryPage && (
            <div className="flex-1 h-[36px] rounded-full border border-slate-200 bg-white flex items-center px-3 gap-2">
              <Search className="h-4 w-4 text-slate-400" />

              {/* ✅ SEARCH WORKING */}
              <input
                type="text"
                placeholder="Search transactions..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none text-[12px] text-slate-700 placeholder:text-slate-400"
              />
            </div>
          )}

          {/* ✅ CLICK → NOTIFICATIONS */}
          <button
            type="button"
            onClick={() => router.push("/notifications")}
            aria-label="Notifications"
            className="relative h-[36px] w-[36px] rounded-full cursor-pointer border border-slate-200 bg-white grid place-items-center hover:bg-slate-50 transition"
          >
            <Bell className="h-4 w-4 text-slate-500" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          <ProfileMenu router={router} />
        </div>
      </header>
    </>
  );
}
