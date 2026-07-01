"use client";

import { ReactNode, useEffect } from "react";
import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import { Quicksand } from "next/font/google";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const isHydrated = useAuthStore((s: any) => s.isHydrated);
  const token = useAuthStore((s: any) => s.token);

  useEffect(() => {
    if (isHydrated && !token) {
      router.push("/login");
    }
  }, [isHydrated, token, router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const response = await originalFetch(...args);
        if (response.status === 401) {
          useAuthStore.getState().logout();
          router.push("/login");
        }
        return response;
      };
      return () => {
        window.fetch = originalFetch;
      };
    }
  }, [router]);

  // Prevent flash of unauthenticated content during hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
      </div>
    );
  }

  if (!token) {
    return null;
  }

  return (
    <div className={quicksand.className}>
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
