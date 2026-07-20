"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Google from "@/components/icons/google";
import Apple from "@/components/icons/apple";
import Facebook from "@/components/icons/facebook";
import { Eye, EyeOff, Loader2, AlertCircle, Mail, ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const router = useRouter();
  const { login, verifyEmail, resendVerificationCode, loginWithGoogle, isLoading, error, isAuthenticated } =
    useAuthStore();

  const [step, setStep] = useState<"login" | "verify">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // 6-Digit OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && step !== "verify") {
      router.push("/dashboard");
    }
  }, [isAuthenticated, step, router]);

  // Timer countdown for OTP resend
  useEffect(() => {
    let interval: any = null;
    if (step === "verify" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      const res = await login(formData.email, formData.password);
      if (res?.requires_verification) {
        setStep("verify");
        setTimer(60);
        setCanResend(false);
        setSuccessMsg(`A 6-digit verification code was sent to ${formData.email}`);
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setLocalError(err.message || "Login failed. Please check your credentials.");
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      await loginWithGoogle(credentialResponse.credential);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
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

  // Submit Verify OTP Code
  const handleVerifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) {
      setLocalError("Please enter all 6 digits of your verification code.");
      return;
    }
    setLocalError(null);
    try {
      await verifyEmail(formData.email, code);
      setSuccessMsg("Email verified successfully!");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (err: any) {
      setLocalError(err.message || "Invalid or expired verification code.");
    }
  };

  // Resend Code
  const handleResendCode = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setLocalError(null);
    try {
      await resendVerificationCode(formData.email);
      setTimer(60);
      setCanResend(false);
      setSuccessMsg("A new 6-digit verification code has been sent to your email.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setLocalError(err.message || "Failed to resend verification code.");
    } finally {
      setIsResending(false);
    }
  };

  if (isAuthenticated && step !== "verify") {
    return null;
  }

  return (
    <div className="space-y-4 w-full overflow-hidden">
      {step === "login" ? (
        <>
          <div className="space-y-1">
            <p className="text-gray-500 lg:hidden block text-[8px]">
              Welcome back!!!
            </p>
            <h1 className="text-lg lg:text-4xl font-semibold lg:text-center text-primary-dark lg:mb-4">
              Log In
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {(error || localError) && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error || localError}
              </div>
            )}

            {/* Desktop: Social Login */}
            <div className="hidden lg:block space-y-6">
              <div className="relative">
                <div className="absolute inset-0 opacity-0 cursor-pointer z-10">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {}}
                    width="100%"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600 pointer-events-none">
                  <Google className="h-5 w-5" />
                  <span className="text-sm">Log In with Google</span>
                </div>
              </div>

              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-zinc-400 font-bold">
                    Or
                  </span>
                </div>
              </div>
            </div>

            {/* Form inputs */}
            <div className="space-y-5">
              <Input
                label="Email:"
                placeholder=""
                type="email"
                required
                variant="underline"
                inline
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={isLoading}
              />

              <div className="relative">
                <Input
                  label="Password:"
                  placeholder=""
                  type={showPassword ? "text" : "password"}
                  required
                  variant="underline"
                  inline
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-3 text-zinc-400 hover:text-zinc-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <div className="text-right">
                <Link
                  href="/forgot-password"
                  className="text-xs text-primary-light hover:text-primary-hover font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 text-base font-semibold rounded-xl bg-primary-dark hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Logging In...</>
              ) : (
                "Log In"
              )}
            </Button>

            {/* Mobile Social Login */}
            <div className="space-y-4 pt-4 lg:hidden">
              <div className="text-center text-[10px] text-zinc-600">
                Sign in With
              </div>

              <div className="flex justify-center items-center">
                <div className="relative hover:scale-110 transition-transform">
                  <div className="absolute inset-0 opacity-0 cursor-pointer z-10 flex items-center justify-center">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => {}}
                      type="icon"
                    />
                  </div>
                  <div className="pointer-events-none">
                    <Google className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <p className="text-center text-primary-dark text-xs mt-4">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-primary hover:text-primary-hover underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>

            <div className="hidden lg:block pt-2">
              <p className="text-primary-dark font-bold text-xs">
                Don't have an account?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-primary-light hover:text-primary-hover underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </>
      ) : (
        /* STEP 2: 6-DIGIT EMAIL VERIFICATION STEP */
        <div className="space-y-6 max-w-md mx-auto pt-2">
          <button
            onClick={() => setStep("login")}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </button>

          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
              <Mail className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Verify Your Email</h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              We sent a 6-digit verification code to{" "}
              <span className="font-bold text-slate-800 underline">{formData.email}</span>. Please enter it below to complete login.
            </p>
          </div>

          {successMsg && (
            <div className="bg-emerald-50 text-emerald-700 p-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-emerald-100 font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              {successMsg}
            </div>
          )}

          {(error || localError) && (
            <div className="bg-rose-50 text-rose-600 p-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-rose-100 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error || localError}
            </div>
          )}

          <form onSubmit={handleVerifySubmit} className="space-y-6">
            {/* 6 OTP Inputs */}
            <div className="flex justify-center gap-2 sm:gap-3">
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
              className="w-full h-12 text-base font-semibold rounded-xl bg-primary-dark hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> Verifying Code...</>
              ) : (
                "Verify & Complete Login"
              )}
            </Button>

            {/* Resend Code Section */}
            <div className="text-center space-y-2 pt-2">
              <p className="text-xs text-slate-500 font-medium">
                Didn't receive the code? Check spam or resend.
              </p>
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 underline transition cursor-pointer"
                >
                  {isResending ? (
                    <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Resending Code...</>
                  ) : (
                    <><RefreshCw className="w-3.5 h-3.5" /> Resend Verification Code</>
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
      )}
    </div>
  );
}
