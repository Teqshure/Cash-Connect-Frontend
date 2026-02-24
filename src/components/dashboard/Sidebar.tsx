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

export default function Sidebar() {
  const pathname = usePathname();

  // Active when exact match OR nested route
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Shared item sizing (Figma active button sizing)
  const baseRow =
    "w-[247.33px] h-[48px] px-[16px] rounded-[18px] flex items-center gap-[24px] transition";

  const inactiveRow = "text-slate-500 hover:bg-slate-50 hover:text-slate-800";

  const activeStyle = {
    background: "linear-gradient(180deg, #00B86B 0%, #00E096 100%)",
    boxShadow:
      "0px 4px 6px -4px rgba(0,184,107,0.25), 0px 10px 15px -3px rgba(0,184,107,0.25)",
  } as const;

  return (
    <aside
      className="fixed left-0 top-0 z-40 w-[288px] h-screen bg-white"
      style={{ borderRight: "0.67px solid rgba(0,0,0,0.0588)" }}
    >
      {/* Keeps Brand fixed; nav area handles overflow */}
      <div className="h-full flex flex-col">
        {/* Brand header stays put */}
        <SidebarBrand />

        {/* Nav area scrolls (scrollbar hidden) */}
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {/* Top links */}
          <nav className="px-5 pt-3">
            <ul className="space-y-2">
              {topNav.map((item) => {
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        baseRow,
                        active ? "text-white" : inactiveRow,
                      ].join(" ")}
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
              })}
            </ul>
          </nav>

          {/* Divider */}
          <div className="my-4 h-px w-full bg-slate-100" />

          {/* Bottom links */}
          <nav className="px-5 pb-5">
            <ul className="space-y-2">
              {bottomNav.map((item) => {
                const active = isActive(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        baseRow,
                        active ? "text-white" : inactiveRow,
                      ].join(" ")}
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
              })}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  );
}
