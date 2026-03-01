"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CallToAction } from "@/components/sections/CallToAction";
import { Hero } from "@/components/sections/Hero";
import { LiveRates } from "@/components/sections/LiveRates";
import { Process } from "@/components/sections/Process";
import { LandingServices } from "@/components/sections/LandingServices";
import { Stats } from "@/components/sections/Stats";
import { Testimonials } from "@/components/sections/Testimonials";
import { Team } from "@/components/sections/Team";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated && isHydrated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, isHydrated, router]);

  if (!isHydrated || isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-zinc-900">
      <Navbar />

      {/* pt-14 clears the fixed mobile navbar (~56px). lg:pt-0 resets on desktop */}
      <main className="grow  lg:pt-0">
        <Hero />
        <Stats />
        <LandingServices />
        <LiveRates />
        <Process />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}
