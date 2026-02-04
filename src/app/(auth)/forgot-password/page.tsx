"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const { forgotPassword, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(null);
    try {
      const message = await forgotPassword(email);
      setSuccessMessage(message);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-0 w-full">
      <div className="flex justify-end mb-4">
        <Link href="/select-country">
          <button className="flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            English (UK) <span className="ml-1">▼</span>
          </button>
        </Link>
      </div>

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Forgot Password
        </h1>
        <p className="text-primary/80 font-medium text-sm leading-relaxed">
          Please enter your email address. You will receive link to create a new
          password via email.
        </p>
      </div>

      {successMessage && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl text-sm flex items-start gap-3 border border-emerald-100">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{successMessage}</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-start gap-3 border border-red-100">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email:"
          placeholder=""
          type="email"
          required
          variant="underline"
          inline
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading || !!successMessage}
        />

        <Button
          className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
          disabled={isLoading || !!successMessage}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending Link...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>

        <div className="text-sm">
          <p className="text-primary font-bold">
            New User?{" "}
            <Link
              href="/signup"
              className="font-bold text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4"
            >
              Sign Up Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
