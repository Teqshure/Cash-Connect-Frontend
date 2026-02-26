"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  History,
  ShoppingCart,
  Package,
  Coins,
  User,
  Settings,
  HelpCircle,
  X,
} from "lucide-react";

type Props = {
  onNavigate?: () => void;
};

const nav = [
  { label: "Home", href: "/dashboard", icon: Home },
  { label: "Wallet", href: "/wallet", icon: Wallet },
  { label: "History", href: "/history", icon: History },
  { label: "My Orders", href: "/orders", icon: ShoppingCart },
  { label: "Product", href: "/products", icon: Package },
  { label: "Earnings", href: "/earnings", icon: Coins },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Setting", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
];

export default function SidebarContent({ onNavigate }: Props) {
  const pathname = usePathname();

  return (
    <div className="h-full w-full bg-white">
      {/* top */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
        <span className="text-[16px] font-semibold text-slate-800">Menu</span>
        <button
          type="button"
          onClick={onNavigate}
          className="h-9 w-9 rounded-full bg-slate-100 grid place-items-center cursor-pointer hover:bg-slate-200 transition"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-slate-600" />
        </button>
      </div>

      {/* links */}
      <div className="px-3 py-2 space-y-1">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");

          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={[
                "flex items-center gap-3 rounded-[12px] px-3 py-3 text-[14px]",
                "transition cursor-pointer",
                active
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              <Icon
                className={
                  active ? "h-5 w-5 text-emerald-600" : "h-5 w-5 text-slate-400"
                }
              />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
