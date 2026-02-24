"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  History,
  Package,
  ShoppingBag,
  TrendingUp,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";
import SidebarBrand from "@/components/dashboard/SidebarBrand";

type NavItem = {
  label: string;
  href: string;
  Icon: React.ElementType;
};

const topNav: NavItem[] = [
  { label: "Home", href: "/dashboard", Icon: Home },
  { label: "Wallet", href: "/wallet", Icon: Wallet },
  { label: "History", href: "/history", Icon: History },
  { label: "Products", href: "/products", Icon: Package },
  { label: "Orders", href: "/orders", Icon: ShoppingBag },
  { label: "Earnings", href: "/earnings", Icon: TrendingUp },
];

const bottomNav: NavItem[] = [
  { label: "Profile", href: "/profile", Icon: User },
  { label: "Settings", href: "/settings", Icon: Settings },
  { label: "Help", href: "/help", Icon: HelpCircle },
];

export default function SidebarContent({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const baseRow =
    "w-[247.33px] h-[48px] px-[16px] rounded-[18px] flex items-center gap-[24px] transition";
  const inactiveRow = "text-slate-500 hover:bg-slate-50 hover:text-slate-800";

  const activeStyle = {
    background: "linear-gradient(180deg, #00B86B 0%, #00E096 100%)",
    boxShadow:
      "0px 4px 6px -4px rgba(0,184,107,0.25), 0px 10px 15px -3px rgba(0,184,107,0.25)",
  } as const;

  const renderList = (items: NavItem[]) =>
    items.map((item) => {
      const active = isActive(item.href);
      return (
        <li key={item.href}>
          <Link
            href={item.href}
            onClick={onNavigate}
            className={[baseRow, active ? "text-white" : inactiveRow].join(" ")}
            style={active ? activeStyle : undefined}
          >
            <item.Icon
              className={[
                "h-5 w-5 shrink-0",
                active ? "text-white" : "text-slate-400",
              ].join(" ")}
            />
            <span className="text-sm font-medium">{item.label}</span>
            {active && (
              <span className="ml-auto h-2.5 w-2.5 rounded-full bg-white/90" />
            )}
          </Link>
        </li>
      );
    });

  return (
    <div className="h-full flex flex-col">
      <SidebarBrand />

      <div className="flex-1 overflow-y-auto">
        <nav className="px-5 pt-4">
          <ul className="space-y-3">{renderList(topNav)}</ul>
        </nav>

        <div className="my-6 h-px w-full bg-slate-100" />

        <nav className="px-5 pb-6">
          <ul className="space-y-3">{renderList(bottomNav)}</ul>
        </nav>
      </div>
    </div>
  );
}
