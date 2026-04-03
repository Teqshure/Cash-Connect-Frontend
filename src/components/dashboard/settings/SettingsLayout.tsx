"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function SettingsPageContent() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      router.replace("/");
    } catch {
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[600px] mx-auto px-4 pt-8 pb-16 lg:pt-10 lg:px-10">
        {/* Page title — desktop only (mobile uses Topbar title) */}
        <h1 className="hidden lg:block text-[24px] font-semibold text-slate-900 mb-8">
          Settings
        </h1>

        {/* Logout button */}
        <button
          type="button"
          onClick={handleLogout}
          disabled={loading}
          className="
            w-full h-[52px]
            rounded-[14px]
            border border-rose-200
            bg-rose-50
            flex items-center justify-center gap-2
            text-[14px] font-semibold text-rose-600
            hover:bg-rose-100 transition
            cursor-pointer
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="h-4 w-4" />
          )}
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}
