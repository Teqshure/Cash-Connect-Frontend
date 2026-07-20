"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { CheckCircle, Circle, X, UserCircle, CreditCard, Camera, PartyPopper, Sparkles, Award } from "lucide-react";
import confetti from "canvas-confetti";

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

export function fireCelebrationConfetti() {
  const count = 250;
  const defaults = {
    origin: { x: 0.5, y: 0.5 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  // Google-style center burst with colorful ribbons, streamers & shapes
  fire(0.25, {
    spread: 35,
    startVelocity: 65,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'],
  });
  fire(0.2, {
    spread: 75,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'],
  });
  fire(0.35, {
    spread: 120,
    decay: 0.91,
    scalar: 0.9,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'],
  });
  fire(0.1, {
    spread: 140,
    startVelocity: 35,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'],
  });
  fire(0.1, {
    spread: 150,
    startVelocity: 55,
    colors: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4'],
  });
}

export default function OnboardingChecklist() {
  const router = useRouter();
  const user = useAuthStore((s: any) => s.user);
  const [dismissed, setDismissed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const allDone = CHECKLIST.every((item) => item.check(user));

  useEffect(() => {
    try {
      const storedDismissed = localStorage.getItem("cc_onboarding_dismissed");
      if (storedDismissed === "true") setDismissed(true);

      const celebrated = localStorage.getItem("cc_congrats_celebrated");
      if (allDone && celebrated !== "true") {
        setShowCelebration(true);
        // Trigger exact center burst confetti explosion
        fireCelebrationConfetti();
        // Fire second burst after 400ms for extra excitement
        setTimeout(() => fireCelebrationConfetti(), 400);
      }
    } catch {}
  }, [allDone]);

  const handleDismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem("cc_onboarding_dismissed", "true");
    } catch {}
  };

  const handleCloseCelebration = () => {
    setShowCelebration(false);
    try {
      localStorage.setItem("cc_congrats_celebrated", "true");
    } catch {}
  };

  const completedCount = CHECKLIST.filter((item) => item.check(user)).length;

  return (
    <>
      {/* CONGRATULATIONS CELEBRATION MODAL */}
      {showCelebration && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative border border-slate-100 text-center space-y-6 animate-in zoom-in-95 duration-300">
            
            <button
              onClick={handleCloseCelebration}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center mx-auto text-white shadow-xl shadow-emerald-200 relative">
              <PartyPopper className="w-10 h-10 animate-bounce" />
              <div className="absolute -top-1 -right-1 bg-amber-400 rounded-full p-1 text-slate-900 shadow-sm">
                <Sparkles className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs">
                <Award className="w-3.5 h-3.5" /> 100% Account Setup Completed
              </span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Congratulations, {user?.fullname?.split(" ")[0] || "User"}! 🎉
              </h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                You've completed all 3 account setup steps! Your Cash Connect account is now fully optimized and ready for unlimited trading.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2.5 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Profile picture uploaded</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Bank account registered</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-600">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>Profile details completed</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  fireCelebrationConfetti();
                }}
                type="button"
                className="w-full py-2 text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" /> Re-trigger Burst Animation
              </button>

              <button
                onClick={handleCloseCelebration}
                className="w-full h-12 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 transition cursor-pointer active:scale-95"
              >
                Start Trading & Transacting &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHECKLIST CARD (renders if not dismissed and steps remaining) */}
      {!dismissed && !allDone && (
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
      )}
    </>
  );
}
