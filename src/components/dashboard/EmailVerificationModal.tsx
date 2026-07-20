"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, AlertTriangle, Loader2, CheckCircle2, RefreshCw, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmailVerificationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function EmailUnverifiedBanner() {
  const user = useAuthStore((s: any) => s.user);
  const isUnverified = !!(user && user.email_verified_at === null);

  if (!user || !isUnverified) return null;

  return (
    <div className="bg-amber-500 text-white px-4 py-2.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs sm:text-sm border-t border-amber-600/30">
      <div className="flex items-center gap-2 min-w-0">
        <ShieldAlert className="w-4 h-4 text-amber-100 shrink-0" />
        <span className="leading-tight">
          <strong>Email Unverified:</strong> Please verify your email (<strong className="underline">{user.email}</strong>) to unlock all features.
        </span>
      </div>
      <button
        onClick={() => window.dispatchEvent(new Event("cc_open_email_verification"))}
        className="w-full sm:w-auto px-3.5 py-1.5 bg-white text-amber-900 hover:bg-amber-50 rounded-lg font-bold text-xs transition cursor-pointer shrink-0 shadow-xs text-center active:scale-95"
      >
        Verify Email Now
      </button>
    </div>
  );
}

export default function EmailVerificationModal({ isOpen: externalIsOpen, onClose }: EmailVerificationModalProps) {
  const user = useAuthStore((s: any) => s.user);
  const verifyEmail = useAuthStore((s: any) => s.verifyEmail);
  const resendVerificationCode = useAuthStore((s: any) => s.resendVerificationCode);
  const refreshUser = useAuthStore((s: any) => s.refreshUser);

  const [modalOpen, setModalOpen] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const isUnverified = !!(user && user.email_verified_at === null);

  // Sync external isOpen state if provided
  useEffect(() => {
    if (externalIsOpen !== undefined) {
      setModalOpen(externalIsOpen);
    }
  }, [externalIsOpen]);

  // Global window listener for unverified / verification open events
  useEffect(() => {
    const handleUnverifiedEvent = () => {
      setModalOpen(true);
      setTimer(60);
      setCanResend(false);
      setErrorMsg(null);
      setSuccessMsg(null);
    };
    window.addEventListener("cc_email_unverified", handleUnverifiedEvent);
    window.addEventListener("cc_open_email_verification", handleUnverifiedEvent);
    return () => {
      window.removeEventListener("cc_email_unverified", handleUnverifiedEvent);
      window.removeEventListener("cc_open_email_verification", handleUnverifiedEvent);
    };
  }, []);

  // Timer countdown
  useEffect(() => {
    let interval: any = null;
    if (modalOpen && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [modalOpen, timer]);

  if (!user || !isUnverified) return null;

  const handleCloseModal = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  const handleResend = async () => {
    if (isResending) return;
    setIsResending(true);
    setErrorMsg(null);
    try {
      await resendVerificationCode(user.email);
      setTimer(60);
      setCanResend(false);
      setSuccessMsg("Verification link sent! Please check your email inbox to verify.");
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to resend verification email.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/* VERIFICATION RESEND MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-6 text-center">
            
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
              <Mail className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verify Your Email</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                We sent a verification link to <span className="font-bold text-slate-800 underline">{user.email}</span>. Click the button in your email to verify and unlock your account.
              </p>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 text-emerald-700 p-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-emerald-100 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="bg-rose-50 text-rose-600 p-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-100 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <div className="pt-2 space-y-3">
              <button
                type="button"
                onClick={handleResend}
                disabled={isResending || (!canResend && !!successMsg)}
                className="w-full h-12 text-sm font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition"
              >
                {isResending ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Sending Verification Email...</>
                ) : (
                  <><RefreshCw className="w-4 h-4" /> Resend Verification Email</>
                )}
              </button>

              {!canResend && !successMsg && (
                <p className="text-xs text-slate-400 font-semibold">
                  Resend available in <span className="text-emerald-600 font-bold">{timer}s</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
