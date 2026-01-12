"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8 px-4 sm:px-0">
      <div className="space-y-2 text-center">
        <div className="flex justify-end mb-4">
          <Link href="/select-country">
          <button className="flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            English (UK) <span className="ml-1">▼</span>
          </button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          Forgot Password
        </h1>
        <p className="text-zinc-600 font-medium">
          Please enter your email address. You will receive a link to create a
          new password via email.
        </p>
      </div>

      <form className="space-y-6">
        <Input
          label="Email:"
          placeholder=""
          type="email"
          required
          variant="underline"
        />

        <Button className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover shadow-lg shadow-emerald-100">
          Reset Password
        </Button>

        <div className="text-center text-sm">
          <p className="text-zinc-600 font-bold">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
