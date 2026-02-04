"use client";

import Link from "next/link";
import { useRouter } from "next/navigation"; // Added router
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Google from "@/components/icons/google";
import Apple from "@/components/icons/apple";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react"; // Added icons
import { useAuthStore } from "@/store/useAuthStore"; // Added store

export default function SignupPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData.fullname, formData.email, formData.password);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 w-full">
      <div className="flex justify-end mb-4">
        <Link href="/select-country">
          <button className="flex items-center text-sm font-bold text-primary hover:text-primary-hover transition-colors">
            English (UK) <span className="ml-1">▼</span>
          </button>
        </Link>
      </div>
      <div className="space-y-1">
        <h1 className="text-4xl font-black text-center tracking-tight text-primary pb-8">
          Create Account
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* Desktop: Social Login at Top */}
        <div className="hidden md:block space-y-4">
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600"
            >
              <Google className="h-5 w-5" />
              <span className="text-sm">Sign Up with Google</span>
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600"
            >
              <Apple className="h-5 w-5 text-black" />
              <span className="text-sm">Sign Up with Apple</span>
            </button>
          </div>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-zinc-400 font-bold">Or</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Input
            label="Full Name:"
            placeholder=""
            type="text"
            required
            variant="underline"
            inline
            value={formData.fullname}
            onChange={(e) =>
              setFormData({ ...formData, fullname: e.target.value })
            }
            disabled={isLoading}
          />
          <Input
            label="Email:"
            placeholder=""
            type="email"
            required
            variant="underline"
            inline
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
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
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              disabled={isLoading}
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
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 text-base font-semibold rounded-xl bg-primary hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Mobile: Social Login at Bottom */}
        <div className="space-y-4 pt-4 md:hidden">
          <div className="text-center text-sm font-semibold text-zinc-600">
            Sign in With
          </div>
          <div className="flex justify-center items-center gap-6">
            <button
              type="button"
              className="hover:scale-110 transition-transform"
            >
              <Google className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="hover:scale-110 transition-transform"
            >
              <Apple className="h-6 w-6 text-black" />
            </button>
          </div>
          <p className="text-center text-zinc-600 font-bold text-xs mt-4">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>

        {/* Desktop: Already have Account Link */}
        <div className="hidden md:block text-center pt-2">
          <p className="text-center text-zinc-600 font-bold text-xs">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4"
            >
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
