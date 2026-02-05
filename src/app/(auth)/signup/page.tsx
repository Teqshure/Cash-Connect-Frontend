"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Google from "@/components/icons/google";
import Apple from "@/components/icons/apple";
import Facebook from "@/components/icons/facebook";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { GoogleLogin } from "@react-oauth/google";
import Image from "next/image";

export default function SignupPage() {
  const router = useRouter();
  const { register, loginWithGoogle, isLoading, error } = useAuthStore();
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

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      // credentialResponse.credential is the id_token (JWT)
      console.log(credentialResponse.credential);
      await loginWithGoogle(credentialResponse.credential);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleError = () => {
    console.error("Google signup failed");
  };

  return (
    <div className="space-y-4 w-full relative overflow-x-hidden overflow-y-visible">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-10 z-0 transform translate-x-1/4 -translate-y-1/4">
        <Image
          src="/images/lines_extracted.png"
          alt=""
          width={400}
          height={400}
          className="h-auto w-auto"
        />
      </div>

      <div className="relative z-10 space-y-4 lg:space-y-6">
        <div className="space-y-1">
          <h1 className="text-lg lg:text-4xl font-black mt-4 lg:text-center text-primary-dark lg:mb-4 ">
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
          <div className="hidden lg:block  space-y-6">
            <div className="flex gap-6">
              {/* Custom wrapper to maintain your button style */}
              <div className="flex-1">
                <div className="relative">
                  {/* Hidden GoogleLogin component */}
                  <div className="absolute inset-0 opacity-0 cursor-pointer z-10">
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={handleGoogleError}
                      width="100%"
                    />
                  </div>
                  {/* Your custom styled button */}
                  <div className="flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600 pointer-events-none">
                    <Google className="h-5 w-5" />
                    <span className="text-sm">Sign Up with Google</span>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600 cursor-pointer"
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
                <span className="bg-white px-2 text-zinc-400 font-bold">
                  Or
                </span>
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
            className="w-full h-12 text-base font-semibold rounded-xl bg-primary-dark hover:bg-primary-hover shadow-lg shadow-emerald-100 flex items-center justify-center gap-2"
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
          <div className="space-y-4 pt-4 lg:hidden">
            <div className="text-center text-[10px] font-normal text-zinc-600">
              Sign in With
            </div>
            <div className="flex justify-center items-center gap-6">
              <button
                type="button"
                className="hover:scale-110 transition-transform cursor-pointer"
              >
                <Facebook className="h-6 w-6" />
              </button>
              {/* Custom wrapper for mobile Google icon */}
              <div className="relative hover:scale-110 transition-transform">
                {/* Hidden GoogleLogin component */}
                <div className="absolute inset-0 opacity-0 cursor-pointer z-10 flex items-center justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    type="icon"
                  />
                </div>
                {/* Your custom Google icon */}
                <div className="pointer-events-none">
                  <Google className="h-6 w-6" />
                </div>
              </div>
              <button
                type="button"
                className="hover:scale-110 transition-transform cursor-pointer"
              >
                <Apple className="h-6 w-6 text-black" />
              </button>
            </div>
            <p className="text-center text-primary-dark font-normal text-xs mt-4">
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
          <div className="hidden lg:block pt-2">
            <p className=" text-primary-dark font-bold text-xs">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-primary-light hover:text-primary-hover underline lg:underline-none decoration-2 decoration-primary/30 underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
