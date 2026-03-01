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
  const hideRightRail = pathname.startsWith("/wallet");

  return (
    <div className="min-h-screen bg-slate-50 -mt-14">
      {/* Desktop sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
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

      {/* Desktop View - lg and above */}
      <div className="hidden lg:block lg:pl-[288px]">
        <div className="w-full px-4 sm:px-6 lg:pl-0 lg:pr-4">
          <div
            className={[
              "min-h-screen grid grid-cols-1 gap-4 items-start",
              hideRightRail
                ? "xl:grid-cols-1"
                : "xl:grid-cols-[minmax(0,1fr)_227px]",
            ].join(" ")}
          >
            <div className="min-w-0 flex flex-col">
              <Topbar onOpenSidebar={() => setOpen(true)} />
              <main className="min-w-0 flex-1 px-4 py-4">{children}</main>
            </div>

            {!hideRightRail && (
              <aside className="hidden xl:block h-full">
                <div className="sticky top-3">
                  <RightSidebarSection />
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="lg:hidden">
        <Topbar onOpenSidebar={() => setOpen(true)} />
        <div className="pb-8">{children}</div>
      </div>
    </div>
  );
}
