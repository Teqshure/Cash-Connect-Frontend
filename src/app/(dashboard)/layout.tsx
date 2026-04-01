import { ReactNode } from "react";
import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={quicksand.className}>
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
