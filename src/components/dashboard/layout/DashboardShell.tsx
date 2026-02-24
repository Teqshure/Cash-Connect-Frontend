"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import SidebarContent from "@/components/SidebarContent";
import Topbar from "@/components/dashboard/Topbar";
import RightSidebarSection from "@/components/dashboard/right-rail/RightSidebarSection";
import MobileDashboard from "@/components/dashboard/mobileDashbord/MobileDashboard";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
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
          <div className="fixed left-0 top-0 z-50 h-screen w-[288px] bg-white shadow-xl">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Desktop View - lg and above */}
      <div className="hidden lg:block lg:pl-[288px]">
        <div className="w-full px-4 sm:px-6 lg:pl-0 lg:pr-4">
          <div className="min-h-screen grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_227px] gap-4 items-stretch">
            <div className="min-w-0 flex flex-col">
              <Topbar />
              <main className="pt-4 min-w-0 flex-1">{children}</main>
            </div>

            <aside className="hidden xl:block h-full">
              <div className="sticky top-3">
                <RightSidebarSection />
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Mobile View - below lg  */}
      <div className="lg:hidden">
        <Topbar />
        <MobileDashboard />
        {/* Children are now handled inside MobileDashboard if needed */}
      </div>
    </div>
  );
}
