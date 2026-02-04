import { Section } from "@/components/ui/Section";
import Image from "next/image";
import React from "react";
import LiveRate from "../icons/liverates";

export const LiveRates = () => {
  return (
    <Section className="pb-6 md:pb-10 mt-5 justify-center items-center lg:mb-10  ">
      <div className="bg-[#ccf5e0] rounded-[2rem] md:rounded-[3rem] p-5 items-center justify-center shadow-xl shadow-emerald-100/50 container mx-auto border border-white/50">
        <div className="text-center mb-0 ">
          <h2 className="text-4xl lg:text-[40px] font-bold text-[28px] text-primary-dark mb-2 mt-4">
            Live Rates
          </h2>
          <p className="text-primary-dark lg:text-[22px] text-[15px] ">
            BTC, ETH, USDT, Green Dot etc.
          </p>
        </div>
        {/* Mobile: Show PNG */}
        <div className="md:hidden w-full items-center justify-center  p-2">
          <Image
            src="/images/live-small.png"
            alt="Live Rates"
            width={800}
            height={400}
            className="w-full h-auto"
          />
        </div>
        {/* Desktop: Show SVG */}
        <LiveRate className="hidden md:block w-full h-auto " />
      </div>
    </Section>
  );
};
