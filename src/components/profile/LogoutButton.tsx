"use client";

import { useState } from "react";
import { LogOut, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

type Props = {
  className?: string;
};

export default function LogoutButton({ className }: Props) {
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
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`
        w-full h-[52px]
        rounded-[14px]
        border border-rose-200
        bg-rose-50
        flex items-center justify-center gap-2
        text-[14px] font-semibold text-rose-600
        hover:bg-rose-100 transition
        cursor-pointer
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className || ""}
      `}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
