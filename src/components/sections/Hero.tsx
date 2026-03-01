"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React, { useState } from "react";
import Image from "next/image";
import Giftid from "../icons/giftid";
import Cart from "../icons/cart";
import curvedLine from "../../../public/images/arc.png";
import Link from "next/link";

export const Hero = () => {
  const [amount, setAmount] = useState("450.00");

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, "");
    setAmount(value);
  };

  return (
    <Section
      background="mesh"
      // pt-16 on mobile = 64px, safely clears the fixed navbar (~56px)
      // lg:pt-32 keeps the desktop layout unchanged
      className="relative pt-16 pb-12 lg:pt-32 lg:pb-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative px-4 md:px-6 h-full gap-y-12 md:gap-y-20 flex flex-col justify-center min-h-100 md:min-h-125">
        {/* Background Decorations */}
        <div className="rounded-full w-125 h-125 bg-primary blur-2xl opacity-15 absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 -z-10" />
        <div className="rounded-full w-125 h-125 bg-primary blur-2xl opacity-15 absolute top-1/4 left-0 -translate-x-1/2 -translate-y-1/2 -z-10" />

        {/* Left Floating Card — desktop only */}
        <div className="absolute top-1/2 -translate-y-[120%] lg:-translate-y-1/2 left-0 hidden lg:block z-20">
          <div className="bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 min-w-45 animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden relative">
              <Image
                src="/images/avata.png"
                alt="User"
                width={40}
                height={40}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm font-bold text-black leading-tight">
                Great Job!
              </p>
              <p className="text-[10px] font-medium text-zinc-500">
                Reliable partner
              </p>
            </div>
          </div>
        </div>

        {/* Right Floating Card — desktop only */}
        <div className="absolute top-1/2 -translate-y-[120%] lg:-translate-y-1/2 right-0 hidden lg:block z-20">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-w-40 animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
            <div className="flex justify-between items-start mb-1">
              <p className="text-[10px] font-medium text-zinc-400">
                Total Income
              </p>
            </div>
            <div className="flex items-end justify-between">
              <p className="text-xl font-bold text-black">$245.00</p>
              <div className="flex items-end gap-0.5 h-4 mb-1">
                <div className="w-1 h-2 bg-emerald-400 rounded-t-sm"></div>
                <div className="w-1 h-3 bg-emerald-400 rounded-t-sm"></div>
                <div className="w-1 h-4 bg-emerald-400 rounded-t-sm"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-6 md:gap-10">
          {/* Mobile Amount Input */}
          <div className="flex md:hidden items-center justify-center border-b pb-2 border-b-gray-200 gap-4 mb-2">
            <div className="flex flex-col items-start">
              <span className="text-xs text-zinc-400 font-medium">
                Enter amount
              </span>
              <div className="flex items-center">
                <span className="text-lg font-bold text-black">$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-lg font-bold text-black bg-transparent border-none outline-none w-24"
                  placeholder="0.00"
                />
              </div>
            </div>
            <button className="bg-primary text-white text-sm font-bold px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors cursor-pointer">
              Send
            </button>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-3 md:gap-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-black leading-[1.1]">
              Trade Crypto & Gift <br />
              <span className="text-[#007A4D]">Cards</span> Seamlessly
            </h1>

            <div className="relative inline-block mx-auto mt-2 md:mt-4 px-4">
              <Image
                src={curvedLine}
                alt="Curved Line"
                width={400}
                height={100}
                className="mx-auto w-64 md:w-[400px]"
              />
              <p className="text-xs md:text-sm font-medium text-black max-w-md mx-auto relative z-10 mt-3 md:mt-4">
                Fast payouts. Trusted rates. Global payments
                <br />
                (Zelle, PayPal, bank, etc.)
              </p>
            </div>
          </div>

          {/* CTA Row */}
          <div className="grid grid-cols-3 gap-2 w-full items-center justify-between md:justify-center mt-4">
            <Link href="/signup" className="w-full">
              <Button
                size="lg"
                className="w-full rounded-full bg-surface-green hover:bg-emerald-600 shadow-lg shadow-emerald-200 text-xs px-8 md:text-base h-auto whitespace-nowrap"
              >
                Get Started
              </Button>
            </Link>
            <div className="flex flex-row w-full items-center justify-center gap-x-2 text-xs md:text-lg font-medium text-black cursor-pointer hover:text-primary transition-colors text-center whitespace-nowrap">
              <Giftid className="w-6 h-6 md:w-auto md:h-auto" />
              <span>Sell Gift Card</span>
            </div>
            <div className="flex flex-row w-full items-center justify-center gap-x-2 text-xs md:text-lg font-medium text-black cursor-pointer hover:text-primary transition-colors text-center whitespace-nowrap">
              <Cart className="w-6 h-6 md:w-auto md:h-auto" />
              <span>Sell Crypto</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
