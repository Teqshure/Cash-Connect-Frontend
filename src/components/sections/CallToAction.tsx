import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <Section containerClassName="max-w-[85rem] px-4" className="pb-32">
      <div className="relative overflow-hidden rounded-[3rem] bg-[#007042] px-6 py-12 md:px-16 md:py-20 text-white min-h-[350px] flex items-center shadow-2xl">
        {/* Background Texture */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay">
          <Image
            src="/images/bubbles_extracted.png"
            alt=""
            fill
            className="object-cover opacity-25"
          />
        </div>

        <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          {/* Left: Text Content */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <span className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-3 block">
              Cash Connect
            </span>

            <h2 className="text-4xl md:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1] tracking-tight">
              Ready to trade safely <br className="hidden md:block" />
              and get paid fast?
            </h2>

            <p className="text-emerald-100/70 font-medium mb-0 max-w-lg text-lg mx-auto lg:mx-0">
              Create an account now or start your first trade in seconds.
            </p>
          </div>

          {/* Right: Buttons */}
          <div className="flex flex-row gap-4 relative z-20 shrink-0">
            <Link href="/signup">
            <Button className="bg-[#00D67D] hover:bg-emerald-400 text-white rounded-full px-8 py-6 font-bold text-[15px] shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap h-auto">
              Create Account
            </Button>
            </Link>
            <Button className="bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-full px-8 py-6 font-bold text-[15px] transition-all hover:-translate-y-0.5 whitespace-nowrap h-auto">
              Start Trade
            </Button>
          </div>
        </div>

        {/* Coin Graphic */}
        <div className="absolute -bottom-16 -right-12 w-[250px] h-[250px] md:w-[200px] md:h-[200px] pointer-events-none z-0">
          <Image
            src="/images/btc_large.png"
            alt="Bitcoin"
            className="object-contain drop-shadow-2xl"
            fill
          />
        </div>
      </div>
    </Section>
  );
};
