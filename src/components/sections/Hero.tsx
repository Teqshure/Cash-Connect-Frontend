import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Image from "next/image";
import Giftid from "../icons/giftid";
import Cart from "../icons/cart";
import curvedLine from "../../../public/images/arc.png";
import Link from "next/link";
export const Hero = () => {
  return (
    <Section background="mesh" className="relative pt-32 pb-20 overflow-hidden">
      {/* Floating Decorative Elements */}
      {/* Floating Decorative Elements */}
      <div className="max-w-7xl mx-auto relative px-6 h-full gap-y-20 flex flex-col justify-center min-h-125">
        {/* Left Floating Card - Great Job */}
        <div className="absolute top-1/2 -translate-y-[120%] lg:-translate-y-1/2 left-0 hidden lg:block z-20">
          <div className="bg-white p-4 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-4 min-w-[180px] animate-in fade-in slide-in-from-left-4 duration-700">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden relative">
              <div className="absolute inset-0 bg-zinc-300"></div>
              {/* Avatar image would go here */}
              <Image
                src="https://ui-avatars.com/api/?name=Jane+Doe&background=0D8ABC&color=fff"
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

        {/* Right Floating Card - Total Income */}
        <div className="absolute top-1/2 -translate-y-[120%] lg:-translate-y-1/2 right-0 hidden lg:block z-20">
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-w-[160px] animate-in fade-in slide-in-from-right-4 duration-700 delay-100">
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
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center gap-10">
          <div className="flex flex-col gap-4">
            <h1 className="text-5xl  font-bold tracking-tight text-black sm:text-7xl leading-[1.1]">
              Trade Crypto & Gift <br />
              <span className="text-primary">Cards</span> Seamlessly
            </h1>

            <div className="relative inline-block mx-auto mt-4 px-4">
              <Image
                src={curvedLine}
                alt="Curved Line"
                width={400}
                height={100}
                className="mx-auto"
              />
              <p className="text-sm font-medium text-black max-w-md mx-auto relative z-10 mt-4">
                Fast payouts. Trusted rates. Global payments
                <br />
                (Zelle, PayPal, bank, etc.)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-10">
            <Link href="/signup">
            <Button
              size="lg"
              className="rounded-full bg-surface-green hover:bg-emerald-600 shadow-lg shadow-emerald-200"
            >
              Get Started
            </Button>
            </Link>
            <div className="flex items-center gap-2 text-lg font-semibold text-black cursor-pointer hover:text-primary transition-colors">
              <Giftid /> Sell Gift Card
            </div>
            <div className="flex items-center gap-2 text-lg font-semibold text-black cursor-pointer hover:text-primary transition-colors">
              <Cart /> Sell Crypto
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
