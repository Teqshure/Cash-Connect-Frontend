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
        prefetch={false}
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
      <div className="mb-10 px-2 flex items-center h-[30px] w-full">
        <Link href="/admin/dashboard" prefetch={false} className="block">
          <Image
            src="/images/cash-connect-logo.png"
            alt="Cash Connect Logo"
            width={110}
            height={30}
            className="object-contain brightness-0 invert"
            priority
          />
        </Link>
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
