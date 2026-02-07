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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // ✅ Smaller row height so it doesn't squeeze the brand section
  // 44px is still a nice touch target on desktop
  const baseRow =
    "w-[247.33px] h-[44px] px-[14px] rounded-[18px] flex items-center gap-[18px] transition";

  const inactiveRow = "text-slate-500 hover:bg-slate-50 hover:text-slate-800";

  const activeStyle = {
    background: "linear-gradient(180deg, #00B86B 0%, #00E096 100%)",
    boxShadow:
      "0px 4px 6px -4px rgba(0,184,107,0.25), 0px 10px 15px -3px rgba(0,184,107,0.25)",
  } as const;

  return (
    <aside
      className="fixed left-0 top-0 z-40 w-[288px] h-screen min-h-[618px] bg-white overflow-hidden"
      style={{ borderRight: "0.67px solid rgba(0,0,0,0.0588)" }}
    >
      <div className="h-full flex flex-col justify-between">
        {/* Brand stays fixed at the top */}
        <SidebarBrand />

        {/* Menus fit without any internal scrolling */}
        <div className="flex flex-col justify-between flex-1">
          {/* Top nav */}
          <nav className="px-5 pt-3">
            {/* tighter vertical spacing */}
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
                          "h-[18px] w-[18px] shrink-0",
                          active ? "text-white" : "text-slate-400",
                        ].join(" ")}
                      />
                      <span className="text-[13px] font-medium">
                        {item.label}
                      </span>

                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-white/90" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Bottom nav pinned */}
          <nav className="px-5 pb-5">
            <div className="mb-3 h-px w-full bg-slate-100" />
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
                          "h-[18px] w-[18px] shrink-0",
                          active ? "text-white" : "text-slate-400",
                        ].join(" ")}
                      />
                      <span className="text-[13px] font-medium">
                        {item.label}
                      </span>

                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-white/90" />
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
