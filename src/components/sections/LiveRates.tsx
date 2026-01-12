import { Section } from "@/components/ui/Section";
import Image from "next/image";
import React from "react";
import LiveRate from "../icons/liverates";

export const LiveRates = () => {
  return (
    <Section className="py-20 ">
      <div className="bg-[#ccf5e0] rounded-[3rem] p-8 shadow-xl shadow-emerald-100/50 max-w-5xl mx-auto border border-white/50">
        <div className="text-center mb-0">
          <h2 className="text-3xl font-bold text-primary mb-2">Live Rates</h2>
          <p className="text-secondary">BTC, ETH, USDT, Green Dot etc.</p>
        </div>
        <LiveRate className="w-full h-auto" />
      </div>
    </Section>
  );
};
