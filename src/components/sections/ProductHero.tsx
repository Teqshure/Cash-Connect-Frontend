"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Coin from "@/components/icons/coin";
import Btc from "@/components/icons/btc";
import Giftid from "@/components/icons/giftid";
import Globe from "../icons/globe";

export const ProductHero = () => {
  return (
    <Section
      background="white"
      className="pt-15 lg:pt-45 pb-12 lg:pb-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Background Decorations - Anchored to Container */}
        <div className="absolute top-[-20%] left-0 -translate-x-1/2 lg:w-110 lg:h-110 w-60 h-60 bg-primary opacity-15 rounded-full blur-[70px] pointer-events-none -z-10" />
        {/* <div className="absolute bottom-[-10%] left-0 -translate-x-1/3 w-125 h-125 bg-primary opacity-20 rounded-full blur-[100px] pointer-events-none -z-10" /> */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left: Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">
                Cash Connect
              </span>
              <h1 className="text-lg  lg:text-4xl font-semibold lg:font-bold text-primary-dark tracking-tight leading-tight mb-6">
                Sell Your Gift Cards Instantly and Securely
              </h1>
              <p className="lg:text-lg text-[10px] text-primary leading-relaxed font-medium max-w-xl">
                Get instant value for your unused gift cards. Fast payout, best
                rates, and 24/7 support.
              </p>
            </div>

            <div className="flex flex-row items-center gap-4">
              <Link href="/signup">
                <button className="rounded-full bg-primary hover:bg-emerald-500 text-white text-[8px] lg:text-[15px] font-bold lg:px-10 lg:py-4 px-6 py-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 whitespace-nowrap">
                  Sell Now
                </button>
              </Link>
              <Link href="/contact">
                <button className="rounded-full bg-primary-dark lg:px-10 lg:py-4 text-[8px] lg:text-[15px] px-6  py-2 font-bold text-white hover:bg-[#005a35] transition-all cursor-pointer whitespace-nowrap">
                  Check Rate
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="hidden lg:block w-full lg:w-1/2 relative">
            <div className="relative z-10">
              {/* Main Hero Visual - Using phone mockup with gift cards */}
              <div className="relative w-full max-w-lg mx-auto">
                <div className="relative ">
                  <div className="absolute inset-0 " />
                  <Image
                    src="/images/p1.png"
                    alt="Hero Visual"
                    width={500}
                    height={500}
                    className="relative rounded-[3rem] object-cover"
                  />
                </div>
              </div>
              {/* Decorative Icons */}
              {/* Decorative Icons */}
              <div className="absolute -top-10 left-10 delay-700">
                <Coin className="w-16 h-16 drop-shadow-xl" />
              </div>
              {/* <div className="absolute top-20 -right-4 delay-1000">
                <Giftid className="w-14 h-14 drop-shadow-xl rotate-12" />
              </div> */}
              {/* <div className="absolute -bottom-10 right-20 delay-500">
                <Btc className="w-20 h-20 drop-shadow-2xl -rotate-12" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Globe className="absolute bottom-[8%] left-1/2 -translate-x-1/2 lg:block hidden  pointer-events-none" />
    </Section>
  );
};
