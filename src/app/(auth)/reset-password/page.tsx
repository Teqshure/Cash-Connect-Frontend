"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { resetPassword, isLoading, error, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });

  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);

    if (formData.password !== formData.password_confirmation) {
      // Small local validation
      return;
    }

    try {
      const message = await resetPassword(
        token,
        email,
        formData.password,
        formData.password_confirmation,
      );
      setSuccessMessage(message);
      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  if (!token || !email) {
    return (
      <div className="space-y-6 text-center">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-zinc-800">Invalid Link</h2>
        <p className="text-zinc-500 text-sm">
          The reset link is invalid or has expired. Please request a new one.
        </p>
        <Link href="/forgot-password">
          <Button className="mt-4 bg-primary-dark hover:bg-primary-hover text-white rounded-xl px-8">
            Request New Link
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Set New Password
        </h1>
        <p className="text-primary/80 font-medium text-sm leading-relaxed">
          Please enter your new password below.
        </p>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm flex items-start gap-3 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">{successMessage}</p>
            <p className="text-xs mt-1">Redirecting to login shortly...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="New Password:"
              placeholder=""
              type={showPassword ? "text" : "password"}
              required
              variant="underline"
              inline
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading || !!successMessage}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-3 text-zinc-400 hover:text-zinc-600"
              disabled={isLoading}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <Input
            label="Confirm Password:"
            placeholder=""
            type="password"
            required
            variant="underline"
            inline
            value={formData.password_confirmation}
            onChange={(e) =>
              setFormData({
                ...formData,
                password_confirmation: e.target.value,
              })
            }
            disabled={isLoading || !!successMessage}
            error={
              formData.password &&
              formData.password_confirmation &&
              formData.password !== formData.password_confirmation
                ? "Passwords do not match"
                : undefined
            }
          />
        </div>

        <Button
          className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          disabled={
            isLoading ||
            !!successMessage ||
            (!!formData.password &&
              formData.password !== formData.password_confirmation)
          }
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="px-4 sm:px-0">
      <div className="flex justify-end mb-4">
        <Link href="">
          <button className="flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            English (UK) <span className="ml-1">▼</span>
          </button>
        </Link>
      </div>

      <Suspense
        fallback={
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <p className="mt-4 text-zinc-500 font-medium">
              Loading reset form...
            </p>
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
