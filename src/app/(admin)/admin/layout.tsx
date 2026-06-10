import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <AdminSidebar />

      {/* Content area */}
      <div className="pl-72 flex flex-col min-h-screen">
        <AdminTopbar />

        <main className="flex-1 px-8 pb-12">{children}</main>
      </div>
    </div>
  );
}
