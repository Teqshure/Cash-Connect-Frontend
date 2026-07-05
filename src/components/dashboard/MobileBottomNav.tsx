"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Wallet, Box, History, Settings } from "lucide-react";

const bottomTabs = [
  { label: "Home",     href: "/dashboard", Icon: Home },
  { label: "Wallet",   href: "/wallet",    Icon: Wallet },
  { label: "Products", href: "/product",   Icon: Box },
  { label: "History",  href: "/history",   Icon: History },
  { label: "Settings", href: "/settings",  Icon: Settings },
];

export default function MobileBottomNav({ onClick }: { onClick?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-4 pt-0 pointer-events-none">
      <div
        className="pointer-events-auto mx-auto max-w-sm rounded-[28px] bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_-4px_24px_rgba(0,0,0,0.1)] px-2 py-2 flex items-center justify-around"
      >
        {bottomTabs.map(({ label, href, Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClick}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-[18px] transition-all duration-200 relative group"
            >
              {active ? (
                <span className="absolute inset-0 rounded-[18px] bg-emerald-500 shadow-[0_4px_14px_rgba(0,184,107,0.35)]" />
              ) : null}
              <Icon
                className={[
                  "h-5 w-5 relative z-10 transition-all",
                  active ? "text-white" : "text-slate-400 group-hover:text-slate-600",
                ].join(" ")}
              />
              <span
                className={[
                  "text-[10px] font-semibold relative z-10 transition-all",
                  active ? "text-white" : "text-slate-400 group-hover:text-slate-600",
                ].join(" ")}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
