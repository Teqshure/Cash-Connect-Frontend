import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export const CallToAction = () => {
  return (
    <Section containerClassName="max-w-7xl mx-auto px-4" className=" md:pb-4">
      <div className="relative overflow-hidden rounded-4xl md:rounded-[3rem] bg-primary-dark px-4 py-10 md:px-16 md:py-20 text-white min-h-fit md:min-h-87.5 flex items-center ">
        {/* Background Texture */}
        <div className="absolute inset-0 -translate-x-40 lg:-translate-x-180 pointer-events-none opacity-40 mix-blend-overlay">
          <Image
            src="/images/bubbles_extracted.png"
            alt=""
            fill
            className="object-cover opacity-25"
          />
        </div>

        <div className="relative z-10 w-full flex flex-col items-start lg:flex-row lg:items-center justify-between gap-6 md:gap-10 lg:gap-20">
          {/* Text Content */}
          <div className="w-full flex-1 max-w-2xl text-left">
            <span className="text-xs font-normal text-white uppercase  mb-2 md:mb-3 block">
              Cash Connect
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-[1.1] tracking-tight">
              Ready to trade safely <br className="hidden md:block" />
              and get paid fast?
            </h2>

            <p className="text-primary-light font-medium mb-0 max-w-lg text-sm md:text-lg">
              Create an account now or start your first <br /> trade in seconds.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-row lg:gap-4 gap-1 mr-45 relative z-20 shrink-0">
            <Link href="/signup">
              <Button className="bg-primary-light hover:bg-emerald-400 text-white rounded-full px-0 lg:px-6 py-4  font-semibold text-[8px] lg:text-[20px] shadow-lg hover:shadow-emerald-500/20 transition-all hover:-translate-y-0.5 whitespace-nowrap h-auto">
                Create Account
              </Button>
            </Link>
            <Button className="bg-transparent border border-primary hover:bg-white/10 text-white rounded-full px-0 lg:px-6 py-4  font-semibold text-[8px] lg:text-[20px] transition-all hover:-translate-y-0.5 whitespace-nowrap h-auto">
              Start Trade
            </Button>
          </div>
        </div>

        {/* Coin Graphic */}
        <div className="absolute -bottom-10 -right-8 w-30 h-30  lg:-bottom-20 lg:w-60 lg:h-60 pointer-events-none z-0">
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
