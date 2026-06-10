"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Users,
  Gift,
  Bitcoin,
  SendHorizonal,
  Wallet,
  UserCheck,
  HelpCircle,
  TrendingUp,
  Settings,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  Icon: React.ElementType;
};

const topNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", Icon: LayoutDashboard },
  { label: "User Management", href: "/admin/users", Icon: Users },
  { label: "Giftcards", href: "/admin/giftcards", Icon: Gift },
  { label: "Crypto Trades", href: "/admin/crypto", Icon: Bitcoin },
  { label: "Global Payout", href: "/admin/payout", Icon: SendHorizonal },
  { label: "Wallet Funding", href: "/admin/wallet", Icon: Wallet },
];

const bottomNav: NavItem[] = [
  { label: "KYC Verification", href: "/admin/kyc", Icon: UserCheck },
  { label: "Support Tickets", href: "/admin/support", Icon: HelpCircle },
  { label: "Rates Management", href: "/admin/rates", Icon: TrendingUp },
  { label: "Settings", href: "/admin/settings", Icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const navItem = (item: NavItem) => {
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-200 group ${
          active
            ? "bg-white text-slate-800 shadow-sm"
            : "text-slate-300 hover:text-white hover:bg-white/5"
        }`}
      >
        <item.Icon
          className={`w-5.5 h-5.5 shrink-0 transition-colors ${
            active ? "text-slate-700" : "text-white/60 group-hover:text-white"
          }`}
          strokeWidth={1.6}
        />
        <span
          className={`text-[14px] font-semibold ${active ? "text-slate-800" : "text-white/70 group-hover:text-white"}`}
        >
          {item.label}
        </span>
      </Link>
    );
  };

  return (
    <aside className="fixed left-0 top-0 z-40 w-65 h-screen bg-[#192038] flex flex-col pt-7 pb-6 px-5">
      {/* Brand */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#00B86B] to-[#00E096] flex items-center justify-center shadow-[0_4px_20px_rgb(0,184,107,0.25)] shrink-0">
          <Image
            src="/images/dashboard/dashboardnav/walletlogo.png"
            alt="Logo"
            width={22}
            height={22}
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-[#00B86B] font-bold text-[17px] leading-tight tracking-tight">
            CashConnect
          </h1>
          <p className="text-slate-400/70 text-[11px] font-medium mt-0.5">
            Financial Freedom
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-between overflow-y-auto no-scrollbar">
        {/* Top Nav */}
        <nav className="space-y-1">{topNav.map(navItem)}</nav>

        {/* Bottom Nav */}
        <nav className="space-y-1 pt-6 border-t border-white/[0.07]">
          {bottomNav.map(navItem)}
        </nav>
      </div>
    </aside>
  );
}
