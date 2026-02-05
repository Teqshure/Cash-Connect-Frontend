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

export default function LoginPage() {
  const router = useRouter();
  const { login, loginWithGoogle, isLoading, error } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
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
    console.error("Google login failed");
  };

  return (
    <div className="space-y-4 w-full overflow-hidden">
      <div className="space-y-1">
        <p className="text-gray-500 lg:hidden block text-[8px]">
          Welcome back!!!
        </p>
        <h1 className="text-lg lg:text-4xl font-semibold lg:text-center text-primary-dark lg:mb-4">
          Log In
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
        <div className="hidden lg:block space-y-6">
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
                  <span className="text-sm">Log In with Google</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors font-semibold text-zinc-600 cursor-pointer"
            >
              <Apple className="h-5 w-5 text-black" />
              <span className="text-sm">Log In with Apple</span>
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

        <div className="space-y-4">
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
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary-hover lg:hidden block font-normal text-xs"
            >
              Forgot Password ?
            </Link>
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
              Logging In...
            </>
          ) : (
            "Log In"
          )}
        </Button>

        {/* Mobile: Social Login at Bottom */}
        <div className="space-y-4 pt-4 lg:hidden">
          <div className="text-center text-[10px] font-normal text-zinc-600">
            Continue with
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
                <Google className="h-5 w-5" />
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
            New User?{" "}
            <Link
              href="/signup"
              className="font-bold text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4"
            >
              Sign Up Here
            </Link>
          </p>
        </div>

        {/* Desktop: New User Link */}
        <div className="hidden lg:flex pt-3 justify-between items-centermt-6">
          <p className="text-primary-dark font-bold text-[12px]">
            New User?{" "}
            <Link
              href="/select-country"
              className="text-primary hover:text-primary-hover underline decoration-2 decoration-primary/30 underline-offset-4"
            >
              Sign Up Here
            </Link>
          </p>
          <p className="text-primary-dark font-bold text-[10px]">
            <Link
              href="/forgot-password"
              className="text-primary hover:text-primary-hover decoration-2 decoration-primary/30 underline-offset-4"
            >
              Forget password?
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
