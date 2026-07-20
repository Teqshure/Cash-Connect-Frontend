"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2, CheckCircle2, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const verifyEmail = useAuthStore((s: any) => s.verifyEmail);
  const refreshUser = useAuthStore((s: any) => s.refreshUser);

  const token = searchParams.get("token") || searchParams.get("code");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!token || !email) {
      setStatus("error");
      setErrorMessage("Invalid verification link. Missing token or email parameter.");
      return;
    }

    let isSubscribed = true;

    const doVerify = async () => {
      try {
        await verifyEmail(email, token);
        if (isSubscribed) {
          setStatus("success");
          if (refreshUser) refreshUser();
          setTimeout(() => {
            router.push("/dashboard?welcome=1");
          }, 1500);
        }
      } catch (err: any) {
        if (isSubscribed) {
          setStatus("error");
          setErrorMessage(err.message || "Failed to verify email address. The link may have expired.");
        }
      }
    };

    doVerify();

    return () => {
      isSubscribed = false;
    };
  }, [token, email, verifyEmail, refreshUser, router]);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-slate-100 text-center space-y-6">
      {status === "verifying" && (
        <div className="space-y-4 py-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Verifying Email...</h2>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Please wait while we confirm your verification link and activate your Cash Connect account.
          </p>
        </div>
      )}

      {status === "success" && (
        <div className="space-y-4 py-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 shadow-md">
            <CheckCircle2 className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Email Verified!</h2>
          <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed font-medium">
            Your email address <span className="font-bold text-slate-800 underline">{email}</span> has been successfully verified! Redirecting to your dashboard...
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard?welcome=1"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow-md"
            >
              Go to Dashboard &rarr;
            </Link>
          </div>
        </div>
      )}

      {status === "error" && (
        <div className="space-y-4 py-4 animate-in fade-in duration-200">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-500">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900">Verification Failed</h2>
          <p className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl max-w-xs mx-auto font-medium">
            {errorMessage}
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition shadow-md"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/login"
              className="text-xs text-slate-500 font-semibold hover:text-slate-700"
            >
              Back to Login
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Suspense fallback={
        <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-emerald-600" />
        </div>
      }>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
