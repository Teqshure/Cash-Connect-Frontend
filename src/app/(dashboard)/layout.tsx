"use client";

import { ReactNode, useEffect } from "react";
import DashboardShell from "@/components/dashboard/layout/DashboardShell";
import { Quicksand } from "next/font/google";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, usePathname } from "next/navigation";
import { useTransactionStore } from "@/store/Transactionstore";
import { useGlobalPaymentStore } from "@/store/globalPayment";

import EmailVerificationModal from "@/components/dashboard/EmailVerificationModal";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHydrated = useAuthStore((s: any) => s.isHydrated);
  const token = useAuthStore((s: any) => s.token);

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  // Refresh user balance and transactions on mount
  useEffect(() => {
    if (!token) return;

    const refreshUser = useAuthStore.getState().refreshUser;
    const fetchTransactions = useTransactionStore.getState().fetchTransactions;
    const fetchGlobalTransactions = useGlobalPaymentStore.getState().fetchTransactions;

    // Refresh instantly on mount/token change
    refreshUser();
    fetchTransactions(true, false);
    fetchGlobalTransactions(false);
  }, [token]);

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
        } else if (response.status === 403) {
          const clone = response.clone();
          clone.json().then((data: any) => {
            if (data?.email_unverified) {
              window.dispatchEvent(new Event("cc_email_unverified"));
            }
          }).catch(() => {});
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
      <EmailVerificationModal />
      <DashboardShell>{children}</DashboardShell>
    </div>
  );
}
