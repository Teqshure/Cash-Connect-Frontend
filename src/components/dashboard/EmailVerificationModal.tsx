"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { Mail, AlertTriangle, Loader2, CheckCircle2, RefreshCw, X, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmailVerificationModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function EmailVerificationModal({ isOpen: externalIsOpen, onClose }: EmailVerificationModalProps) {
  const user = useAuthStore((s: any) => s.user);
  const verifyEmail = useAuthStore((s: any) => s.verifyEmail);
  const resendVerificationCode = useAuthStore((s: any) => s.resendVerificationCode);
  const refreshUser = useAuthStore((s: any) => s.refreshUser);

  const [modalOpen, setModalOpen] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  // Global window listener for 403 unverified events
  useEffect(() => {
    const handleUnverifiedEvent = () => {
      setModalOpen(true);
    };
    window.addEventListener("cc_email_unverified", handleUnverifiedEvent);
    return () => window.removeEventListener("cc_email_unverified", handleUnverifiedEvent);
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

  const handleOpenModal = () => {
    setModalOpen(true);
    setTimer(60);
    setCanResend(false);
    setErrorMsg(null);
    setSuccessMsg(null);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    if (onClose) onClose();
  };

  // OTP Input Handlers
  const handleOtpChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim().slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    const nextFocus = Math.min(pastedData.length, 5);
    otpRefs.current[nextFocus]?.focus();
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setErrorMsg("Please enter all 6 digits of your verification code.");
      return;
    }
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await verifyEmail(user.email, code);
      setSuccessMsg("Email verified successfully! Transactions unlocked.");
      if (refreshUser) refreshUser();
      setTimeout(() => {
        handleCloseModal();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid or expired verification code.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setErrorMsg(null);
    try {
      await resendVerificationCode(user.email);
      setTimer(60);
      setCanResend(false);
      setSuccessMsg("A new 6-digit verification code has been sent to your email.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to resend verification code.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      {/* PERSISTENT DASHBOARD BANNER FOR UNVERIFIED USERS */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm text-amber-900 sticky top-0 z-40 shadow-xs">
        <div className="flex items-center gap-2 font-medium">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Email Unverified:</strong> Please verify your email (<strong>{user.email}</strong>) to unlock deposits, withdrawals, & trading.
          </span>
        </div>
        <button
          onClick={handleOpenModal}
          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs transition cursor-pointer shrink-0 shadow-xs active:scale-95"
        >
          Verify Email Now
        </button>
      </div>

      {/* VERIFICATION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 space-y-6">
            
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-xs">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Verify Your Email</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                Enter the 6-digit code sent to <span className="font-bold text-slate-800 underline">{user.email}</span> to unlock all Cash Connect features.
              </p>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-emerald-100 font-medium">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                {successMsg}
              </div>
            )}

            {errorMsg && (
              <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-100 font-medium">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleVerify} className="space-y-6">
              {/* 6 OTP Inputs */}
              <div className="flex justify-center gap-2 sm:gap-2.5">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-extrabold bg-slate-50 border-2 border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 rounded-xl outline-none transition-all text-slate-800"
                    autoFocus={index === 0}
                  />
                ))}
              </div>

              <Button
                type="submit"
                disabled={isLoading || otp.join("").length < 6}
                className="w-full h-12 text-base font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Code...</>
                ) : (
                  "Verify & Unlock Account"
                )}
              </Button>

              {/* Resend Code Section */}
              <div className="text-center space-y-2 pt-1">
                <p className="text-xs text-slate-500 font-medium">
                  Didn't get the code? Check your spam folder.
                </p>
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={isResending}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline transition cursor-pointer"
                  >
                    {isResending ? (
                      <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Resending Code...</>
                    ) : (
                      <><RefreshCw className="w-3.5 h-3.5" /> Resend 6-Digit Code</>
                    )}
                  </button>
                ) : (
                  <p className="text-xs text-slate-400 font-semibold">
                    Resend code available in <span className="text-emerald-600 font-bold">{timer}s</span>
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
