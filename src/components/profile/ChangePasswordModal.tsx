"use client";

import { useState } from "react";
import { X, Lock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
  const requestPasswordChangeOtp = useAuthStore((s: any) => s.requestPasswordChangeOtp);
  const changePassword = useAuthStore((s: any) => s.changePassword);

  const [step, setStep] = useState<1 | 2>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Form fields
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (!isOpen) return null;

  const handleRequestOtp = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const msg = await requestPasswordChangeOtp();
      setSuccess(msg || "Verification code sent to your email!");
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyAndChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await changePassword(otp, newPassword, confirmPassword);
      setSuccess("Password updated successfully!");
      // Reset form and close after delay
      setTimeout(() => {
        setStep(1);
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");
        setSuccess(null);
        onClose();
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Failed to update password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    setSuccess(null);
    setStep(1);
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-[20px] w-full max-w-md p-8 shadow-xl overflow-y-auto max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-slate-800">
            <Lock className="h-5 w-5 text-emerald-600" />
            <h2 className="text-[18px] font-semibold">Change Password</h2>
          </div>
          <button 
            onClick={handleClose}
            className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs flex items-start gap-2.5 border border-red-100 mb-4">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-xs flex items-start gap-2.5 border border-emerald-100 mb-4">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <p className="font-medium">{success}</p>
          </div>
        )}

        {step === 1 ? (
          <div className="flex flex-col gap-4 text-center">
            <p className="text-[13px] text-slate-500 leading-relaxed">
              For security, we will send a 6-digit verification code (OTP) to your registered email address to verify your password change request.
            </p>
            <button
              onClick={handleRequestOtp}
              disabled={isLoading}
              className="mt-2 w-full h-[48px] rounded-xl bg-emerald-600 text-white font-medium text-[14px] hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Code...
                </>
              ) : (
                "Request Verification Code"
              )}
            </button>
          </div>
        ) : (
          <form onSubmit={handleVerifyAndChange} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-700">Verification Code (OTP)</label>
              <input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-700">New Password</label>
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-medium text-slate-700">Confirm New Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-[48px] px-4 rounded-xl border border-slate-200 text-[14px] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 w-full h-[48px] rounded-xl bg-emerald-600 text-white font-medium text-[15px] hover:bg-emerald-700 transition flex items-center justify-center gap-2 disabled:opacity-75 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating Password...
                </>
              ) : (
                "Update Password"
              )}
            </button>

            <div className="text-center mt-2">
              <button
                type="button"
                onClick={handleRequestOtp}
                disabled={isLoading}
                className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer disabled:opacity-50"
              >
                Resend verification code
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
