"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Google from "@/components/icons/google";
import Facebook from "@/components/icons/facebook";
import Apple from "@/components/icons/apple";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-8 px-4 sm:px-0">
      <div className="space-y-1">
        <h2 className="text-lg text-zinc-400 font-medium">Welcome back !!!</h2>
        <h1 className="text-4xl font-black tracking-tight text-primary pb-8">
          Log In
        </h1>
      </div>

      <form className="space-y-6">
        <div className="space-y-4">
          <Input
            label="Email:"
            placeholder=""
            type="email"
            required
            variant="underline"
          />
          <div className="relative">
            <Input
              label="Password:"
              placeholder=""
              type={showPassword ? "text" : "password"}
              required
              variant="underline"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bottom-3 text-zinc-400 hover:text-zinc-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary-hover font-semibold text-xs"
            >
              Forgot Password ?
            </Link>
          </div>
        </div>

        <Button className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover shadow-lg shadow-emerald-100">
          Log In
        </Button>

        <div className="space-y-4 pt-4">
          <div className="text-center text-sm font-semibold text-zinc-600">
            Continue with
          </div>
          <div className="flex justify-center items-center gap-6">
            <button className="hover:scale-110 transition-transform">
              <Facebook className="h-6 w-6" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <Google className="h-6 w-6" />
            </button>
            <button className="hover:scale-110 transition-transform">
              <Apple className="h-6 w-6 text-black" />
            </button>
          </div>
          <p className="text-center text-zinc-600 font-bold text-xs mt-4">
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
