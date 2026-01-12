"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const ProductHero = () => {
  return (
    <Section
      background="white"
      className="pt-32 pb-20 relative overflow-hidden"
    >
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-50/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">
                Our Products
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-primary tracking-tight leading-tight mb-6">
                Sell Your Gift Cards Instantly and Securely
              </h1>
              <p className="text-lg text-zinc-600 leading-relaxed font-medium max-w-xl">
                Get instant value for your unused gift cards. Fast payout, best
                rates, and 24/7 support.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-10 py-4 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                  Get Now
                </Button>
              </Link>
              <Link href="/contact">
                <button className="rounded-full bg-[#007042] px-10 py-4 text-[15px] font-bold text-white hover:bg-[#005a35] transition-all">
                  Check Rate
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10">
              {/* Decorative Icons */}
              <div className="absolute -top-10 left-10 text-4xl animate-bounce">
                💰
              </div>
              <div className="absolute top-20 -right-10 text-3xl animate-pulse">
                💳
              </div>
              <div className="absolute -bottom-10 right-20 text-4xl">📱</div>

              {/* Main Hero Visual - Using phone mockup with gift cards */}
              <div className="relative w-full max-w-lg mx-auto">
                {/* You can replace this with actual image asset */}
                <div className="relative aspect-square">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/20 to-emerald-400/20 rounded-[4rem] blur-2xl" />
                  <div className="relative bg-white rounded-[3rem] p-8 shadow-2xl flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="text-8xl">📱</div>
                      <div className="flex justify-center gap-3">
                        <div className="w-16 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg transform -rotate-12" />
                        <div className="w-16 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-lg transform rotate-6 z-10" />
                        <div className="w-16 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg transform -rotate-6" />
                      </div>
                      <p className="text-xs text-zinc-500 font-semibold">
                        Amazon • iTunes • Steam <br />
                        Google Play • Sephora
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
