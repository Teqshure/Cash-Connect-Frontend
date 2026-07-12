"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Home,
  Wallet,
  History,
  Box,
  ShoppingCart,
  User,
  Settings,
  HelpCircle,
  LucideIcon,
  Globe,
} from "lucide-react";

import SidebarBrand from "@/components/dashboard/leftSideBar/SidebarBrand";

type NavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

const topNav: NavItem[] = [
  { label: "Home",           href: "/dashboard",      Icon: Home },
  { label: "Wallet",         href: "/wallet",         Icon: Wallet },
  { label: "Products",       href: "/product",        Icon: Box },
  { label: "Payouts", href: "/payouts", Icon: Globe },
  { label: "History",        href: "/history",        Icon: History },
  { label: "Orders",         href: "/orders",         Icon: ShoppingCart },
];

const bottomNav: NavItem[] = [
  { label: "Profile",  href: "/profile",  Icon: User },
  { label: "Settings", href: "/settings", Icon: Settings },
  { label: "Help",     href: "/help",     Icon: HelpCircle },
];

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const baseRow =
    "w-full h-[44px] px-[16px] rounded-[18px] flex items-center gap-[18px] transition font-medium";

  const inactiveRow = "text-slate-500 hover:bg-slate-50 hover:text-slate-800";

  const activeStyle = {
    background: "linear-gradient(180deg, #00B86B 0%, #00E096 100%)",
    boxShadow: "0px 10px 25px rgba(0,184,107,0.25)",
  } as const;

  const renderNav = (items: NavItem[]) =>
    items.map((item) => {
      const active = isActive(item.href);

      return (
        <li key={item.href}>
          <Link
            href={item.href}
            className={[baseRow, active ? "text-white" : inactiveRow].join(" ")}
            style={active ? activeStyle : undefined}
          >
            <item.Icon
              className={[
                "h-[20px] w-[20px] shrink-0",
                active ? "text-white" : "text-slate-400",
              ].join(" ")}
            />
            <span className="text-[15px]">{item.label}</span>
            {active && (
              <span className="ml-auto h-2.5 w-2.5 rounded-full bg-white/90" />
            )}
          </Link>
        </li>
      );
    });

  return (
    <aside
      className="fixed left-0 top-0 z-40 w-[288px] h-screen bg-white"
      style={{
        borderRight: "0.67px solid rgba(0,0,0,0.06)",
      }}
    >
      <div className="h-full flex flex-col">
        <SidebarBrand />

        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Nav */}
          <nav className="px-5 pt-4">
            <ul className="space-y-2">{renderNav(topNav)}</ul>
          </nav>

          {/* Divider */}
          <div className="mx-5 my-5 h-[1px] bg-[#00000014]" />

          {/* Bottom Nav */}
          <nav className="px-5">
            <ul className="space-y-2">{renderNav(bottomNav)}</ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
