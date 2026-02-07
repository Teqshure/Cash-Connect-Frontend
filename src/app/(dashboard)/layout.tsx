import type { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import RightSidebarSection from "@/components/dashboard/right-rail/RightSidebarSection";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />

      {/* Content starts after sidebar */}
      <div className="pl-[288px] pr-6">
        <div
          className="grid gap-6 items-start"
          style={{
            gridTemplateColumns: "minmax(0, 902px) minmax(180px, 227px)",
          }}
        >
          {/* Left column */}
          <div className="min-w-0">
            {/* Topbar stays flush with sidebar (no extra left padding here) */}
            <Topbar />

            {/* ✅ Add inner left padding so cards/sections don't touch sidebar */}
            <main className="pt-6 pl-[28px]">{children}</main>
          </div>

          {/* Right rail */}
          <RightSidebarSection />
        </div>
      </div>
    </div>
  );
}
