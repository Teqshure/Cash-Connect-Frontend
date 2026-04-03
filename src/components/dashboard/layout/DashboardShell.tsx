"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/leftSideBar/Sidebar";
import SidebarContent from "@/components/dashboard/leftSideBar/SidebarContent";
import Topbar from "@/components/dashboard/Topbar";
import RightSidebarSection from "@/components/dashboard/right-rail/RightSidebarSection";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();
  const hideRightRail =
    pathname.startsWith("/wallet") || pathname.startsWith("/help");

  return (
    <div className="min-h-screen bg-slate-50 -mt-14 lg:mt-0">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/30"
          />
          <div className="fixed left-0 top-0 z-50 h-screen w-[288px] bg-white shadow-xl overflow-y-auto">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden lg:block lg:pl-[288px]">
        {/* Topbar */}
        <div className="fixed top-0 left-[288px] right-0 z-40 bg-white">
          <Topbar onOpenSidebar={() => setOpen(true)} />
        </div>

        {/* Content */}
        <div className="pt-[110px] px-4 xl:px-6">
          <div
            className={[
              "grid gap-6 items-start w-full",
              hideRightRail
                ? "grid-cols-1"
                : "xl:grid-cols-[minmax(0,1fr)_227px]",
            ].join(" ")}
          >
            {/* Main */}
            <main className="min-w-0 w-full">{children}</main>

            {/* Right Sidebar */}
            {!hideRightRail && (
              <aside className="hidden xl:block w-[227px]">
                <div className="sticky top-[24px]">
                  <RightSidebarSection />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <Topbar onOpenSidebar={() => setOpen(true)} />
        <div className="px-4 pt-6 pb-8">{children}</div>
      </div>
    </div>
  );
}
