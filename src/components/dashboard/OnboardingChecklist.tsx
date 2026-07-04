"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { CheckCircle, Circle, X, UserCircle, CreditCard, Camera } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  href: string;
  check: (user: any) => boolean;
}

const CHECKLIST: ChecklistItem[] = [
  {
    id: "profile_picture",
    label: "Upload profile picture",
    description: "Add a photo so your account looks complete.",
    icon: Camera,
    href: "/profile",
    check: (user) => !!(user?.profile_image),
  },
  {
    id: "bank_account",
    label: "Add bank account",
    description: "Required for receiving withdrawals and payments.",
    icon: CreditCard,
    href: "/settings",
    check: (user) => !!(
      user?.account_number ||
      (user as any)?.bank_account?.account_number ||
      ((user as any)?.bank_accounts && (user as any)?.bank_accounts.length > 0) ||
      ((user as any)?.bankAccounts && (user as any)?.bankAccounts.length > 0)
    ),
  },
  {
    id: "complete_profile",
    label: "Complete your profile",
    description: "Add phone number and country to your profile.",
    icon: UserCircle,
    href: "/settings",
    check: (user) => !!(user?.phone && user?.country),
  },
];

export default function OnboardingChecklist() {
  const router = useRouter();
  const user = useAuthStore((s: any) => s.user);
  const [dismissed, setDismissed] = useState(false);

  // Auto-dismiss if all steps done
  const allDone = CHECKLIST.every((item) => item.check(user));

  useEffect(() => {
    // Check localStorage for permanent dismissal
    try {
      const stored = localStorage.getItem("cc_onboarding_dismissed");
      if (stored === "true") setDismissed(true);
    } catch {}
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("cc_onboarding_dismissed", "true");
    } catch {}
  };

  if (dismissed || allDone) return null;

  const completedCount = CHECKLIST.filter((item) => item.check(user)).length;

  return (
    <div className="bg-white rounded-[20px] border border-emerald-100 shadow-sm p-5 mb-5 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute top-4 right-4 h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition cursor-pointer"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5 text-slate-500" />
      </button>

      {/* Header */}
      <div className="mb-4">
        <p className="text-[15px] font-bold text-slate-800">Complete Your Account</p>
        <p className="text-[12px] text-slate-500 mt-0.5">
          {completedCount} of {CHECKLIST.length} steps completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / CHECKLIST.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {CHECKLIST.map((item) => {
          const done = item.check(user);
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => !done && router.push(item.href)}
              className={[
                "w-full flex items-center gap-3 p-3 rounded-[14px] transition text-left",
                done
                  ? "bg-emerald-50 cursor-default"
                  : "bg-slate-50 hover:bg-slate-100 cursor-pointer",
              ].join(" ")}
            >
              {done ? (
                <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-slate-300 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={["text-[13px] font-semibold", done ? "text-emerald-700 line-through" : "text-slate-800"].join(" ")}>
                  {item.label}
                </p>
                {!done && (
                  <p className="text-[11px] text-slate-500 mt-0.5 truncate">{item.description}</p>
                )}
              </div>
              {!done && (
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                  <Icon className="h-4 w-4 text-emerald-600" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
