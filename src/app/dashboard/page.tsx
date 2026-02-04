"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "@/components/ui/Button";

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login"); // Protect the route
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!isAuthenticated) {
    return null; // Or a loading spinner while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full border border-gray-100">
        <h1 className="text-4xl font-extrabold text-primary mb-4">
          Welcome, {user?.fullname || "User"}!
        </h1>
        <p className="text-zinc-600 mb-8">
          You have successfully logged in to CashConnect.
        </p>

        <div className="space-y-4">
          <div className="bg-zinc-50 p-4 rounded-xl text-left text-sm text-zinc-600">
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            {user?.country && (
              <p>
                <strong>Country:</strong> {user?.country}
              </p>
            )}
          </div>

          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors"
            variant="primary"
          >
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
}
