"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Google from "@/components/icons/google";
import Apple from "@/components/icons/apple";
import Facebook from "@/components/icons/facebook";
import { Eye, EyeOff, Loader2, AlertCircle, ChevronDown, Mail, ArrowLeft, CheckCircle2, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

// Country list with dial codes
const COUNTRIES = [
  { code: "NG", name: "Nigeria", dial: "+234", flag: "🇳🇬" },
  { code: "US", name: "United States", dial: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dial: "+44", flag: "🇬🇧" },
  { code: "GH", name: "Ghana", dial: "+233", flag: "🇬🇭" },
  { code: "KE", name: "Kenya", dial: "+254", flag: "🇰🇪" },
  { code: "ZA", name: "South Africa", dial: "+27", flag: "🇿🇦" },
  { code: "CA", name: "Canada", dial: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dial: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dial: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dial: "+33", flag: "🇫🇷" },
  { code: "IT", name: "Italy", dial: "+39", flag: "🇮🇹" },
  { code: "IN", name: "India", dial: "+91", flag: "🇮🇳" },
  { code: "BR", name: "Brazil", dial: "+55", flag: "🇧🇷" },
  { code: "UG", name: "Uganda", dial: "+256", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", dial: "+255", flag: "🇹🇿" },
  { code: "ET", name: "Ethiopia", dial: "+251", flag: "🇪🇹" },
  { code: "SN", name: "Senegal", dial: "+221", flag: "🇸🇳" },
  { code: "CI", name: "Côte d'Ivoire", dial: "+225", flag: "🇨🇮" },
  { code: "CM", name: "Cameroon", dial: "+237", flag: "🇨🇲" },
  { code: "RW", name: "Rwanda", dial: "+250", flag: "🇷🇼" },
];

export default function SignupPage() {
  const router = useRouter();
  const { register, verifyEmail, resendVerificationCode, loginWithGoogle, isLoading, error, setError, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) router.push("/dashboard");
  }, [isAuthenticated, router]);

  const [step, setStep] = useState<"form" | "verify">("form");
  const [showPassword, setShowPassword] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    dialCode: "",
  });

  // 6-Digit OTP State
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

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

  const filteredCountries = COUNTRIES.filter((c) =>
    c.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const selectedCountry = COUNTRIES.find((c) => c.code === formData.country || c.name === formData.country);

  // Submit Step 1: Initial Registration Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    try {
      const fullPhone = formData.dialCode && formData.phone
        ? `${formData.dialCode}${formData.phone.replace(/^0/, "")}`
        : formData.phone;
      const res = await register(
        formData.fullname,
        formData.email,
        formData.password,
        fullPhone || undefined,
        formData.country || undefined,
      );

      if (res?.requires_verification) {
        setStep("verify");
        setTimer(60);
        setCanResend(false);
        setSuccessMsg(`Verification code sent to ${formData.email}`);
      } else {
        router.push("/dashboard?welcome=1");
      }
    } catch (err: any) {
      console.error(err);
      setLocalError(err.message || "Registration failed. Please check details and try again.");
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

  // Submit Step 2: Verify OTP Code
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
        router.push("/dashboard?welcome=1");
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
      setSuccessMsg("A new 6-digit code has been sent to your email.");
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err: any) {
      setLocalError(err.message || "Failed to resend verification code.");
    } finally {
      setIsResending(false);
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

  if (isAuthenticated) return null;

  return (
    <div className="space-y-4 w-full relative overflow-x-hidden overflow-y-visible">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-10 z-0 transform translate-x-1/4 -translate-y-1/4">
        <Image src="/images/lines_extracted.png" alt="" width={400} height={400} className="h-auto w-auto" />
      </div>

      <div className="relative z-10 space-y-4 lg:space-y-5">
        
        {/* STEP 1: REGISTRATION FORM */}
        {step === "form" ? (
          <>
            <div className="space-y-1">
              <h1 className="text-lg lg:text-4xl font-black mt-4 lg:text-center text-primary-dark lg:mb-4">
                Create Account
              </h1>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-5">
              {(error || localError) && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs sm:text-sm flex items-center gap-2 border border-red-100">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  {error || localError}
                </div>
              )}

              {/* Desktop social login */}
              <div className="hidden lg:block space-y-5">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="relative">
                      <div className="absolute inset-0 opacity-0 cursor-pointer z-10">
                        <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} width="100%" />
                      </div>
                      <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600 pointer-events-none">
                        <Google className="h-5 w-5" />
                        <span className="text-sm">Sign Up with Google</span>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600 cursor-pointer">
                    <Apple className="h-5 w-5 text-black" />
                    <span className="text-sm">Sign Up with Apple</span>
                  </button>
                </div>
                <div className="relative py-1">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-zinc-200" /></div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-zinc-400 font-bold">Or</span>
                  </div>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-5">
                <Input label="Full Name:" placeholder="" type="text" required variant="underline" inline
                  value={formData.fullname} onChange={(e) => setFormData({ ...formData, fullname: e.target.value })} disabled={isLoading} />

                <Input label="Email:" placeholder="" type="email" required variant="underline" inline
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={isLoading} />

                {/* Country dropdown */}
                <div className="flex items-end gap-0 border-b border-zinc-200 pb-2 relative">
                  <label className="text-sm font-medium text-zinc-700 w-32 shrink-0">Country:</label>
                  <div className="flex-1 relative">
                    <button
                      type="button"
                      onClick={() => setCountryOpen(!countryOpen)}
                      className="w-full flex items-center justify-between text-left text-sm text-zinc-800 outline-none bg-transparent"
                      disabled={isLoading}
                    >
                      <span className={selectedCountry ? "text-zinc-800 font-medium" : "text-zinc-400"}>
                        {selectedCountry ? selectedCountry.name : "Select your country"}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform ${countryOpen ? "rotate-180" : ""}`} />
                    </button>
                    {countryOpen && (
                      <div className="absolute top-8 left-0 right-0 bg-white border border-zinc-200 rounded-xl shadow-xl z-50 max-h-52 overflow-hidden">
                        <div className="p-2 border-b border-zinc-100">
                          <input
                            type="text"
                            placeholder="Search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full text-sm outline-none px-2 py-1 bg-zinc-50 rounded-lg"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto max-h-40">
                          {filteredCountries.map((c) => (
                            <button
                              key={c.code}
                              type="button"
                              className="w-full text-left px-3.5 py-2.5 text-sm hover:bg-emerald-50 transition flex items-center"
                              onClick={() => {
                                setFormData({ ...formData, country: c.name, dialCode: c.dial });
                                setCountryOpen(false);
                                setCountrySearch("");
                              }}
                            >
                              <span className="flex-1 text-zinc-800 font-medium">{c.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Phone number */}
                <div className="flex items-end gap-0 border-b border-zinc-200 pb-2">
                  <label className="text-sm font-medium text-zinc-700 w-32 shrink-0">Phone:</label>
                  <div className="flex items-center gap-2 flex-1">
                    {formData.dialCode && (
                      <span className="text-sm text-zinc-500 shrink-0">{formData.dialCode}</span>
                    )}
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={isLoading}
                      className="flex-1 bg-transparent outline-none text-sm text-zinc-800 placeholder:text-zinc-300"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="relative">
                  <Input label="Password:" placeholder="" type={showPassword ? "text" : "password"} required variant="underline" inline
                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} disabled={isLoading} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 bottom-3 text-zinc-400 hover:text-zinc-600" disabled={isLoading}>
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading}
                className="w-full h-12 text-base font-semibold rounded-xl bg-primary-dark hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2">
                {isLoading ? (<><Loader2 className="w-4 h-4 animate-spin" />Creating Account...</>) : "Continue to Verification"}
              </Button>

              {/* Mobile social login */}
              <div className="space-y-4 pt-4 lg:hidden">
                <div className="text-center text-[10px] font-normal text-zinc-600">Sign in With</div>
                <div className="flex justify-center items-center">
                  <div className="relative hover:scale-110 transition-transform">
                    <div className="absolute inset-0 opacity-0 cursor-pointer z-10 flex items-center justify-center">
                      <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => {}} type="icon" />
                    </div>
                    <div className="pointer-events-none"><Google className="h-6 w-6" /></div>
                  </div>
                </div>
                <p className="text-center text-primary-dark font-normal text-xs mt-4">
                  Already have an account?{" "}
                  <Link href="/login" className="font-bold text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4">Log in</Link>
                </p>
              </div>

              <div className="hidden lg:block pt-2">
                <p className="text-primary-dark font-bold text-xs">
                  Already have an account?{" "}
                  <Link href="/login" className="font-bold text-primary-light hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4">Log in</Link>
                </p>
              </div>
            </form>
          </>
        ) : (
          /* STEP 2: 6-DIGIT EMAIL VERIFICATION CODE */
          <div className="space-y-6 max-w-md mx-auto pt-2">
            <button
              onClick={() => setStep("form")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Change details / Edit Email
            </button>

            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-2 text-emerald-600 shadow-sm">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Verify Your Email</h2>
              <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                We sent a 6-digit verification code to{" "}
                <span className="font-bold text-slate-800 underline">{formData.email}</span>. Please enter it below to activate your account.
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
              {/* 6 OTP Input Boxes */}
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
                  "Verify & Complete Registration"
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
    </div>
  );
}
