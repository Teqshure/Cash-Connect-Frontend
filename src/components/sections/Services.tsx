import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Btc from "../icons/btc";
import Arrowlight from "../icons/arrowlight";
import Arrowdark from "../icons/arrowright";
import GiftExchange from "../icons/giftexchange";

export const Services = () => {
  return (
    <Section background="white" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <span className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-2 block">
            Our Services
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#5c5c5c] tracking-tight leading-tight">
            Check out some of out Products
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Crypto to Cash (Dark Green) */}
          <div className="bg-[#007042] rounded-[2.5rem] p-8 text-white relative overflow-hidden group min-h-[480px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                Cash Connect
              </span>
              <div className="rounded-full border border-white/20 w-12 h-12 flex items-center justify-center text-white/80">
                <Arrowlight width={24} height={24} />
              </div>
            </div>

            <h3 className="text-4xl font-bold leading-tight mb-4">
              Crypto to <br /> Cash
            </h3>
            <p className="text-emerald-100/80 font-medium mb-8 leading-relaxed">
              Instantly convert your Bitcoin and other cryptocurrencies to Naira
              at competitive rates.
            </p>

            <div className="mt-auto">
              <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 right-4">
              <Btc width={60} height={60} />
            </div>
          </div>

          {/* Card 2: Gift Card Exchange (Bright Green) */}
          <div className="bg-[#00D67D] rounded-[2.5rem] p-8 text-white relative overflow-hidden group min-h-[480px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">
                Cash Connect
              </span>
              <div className="rounded-full border border-emerald-900/10 w-12 h-12 flex items-center justify-center text-emerald-900/40">
                <Arrowdark width={24} height={24} />
              </div>
            </div>

            <h3 className="text-4xl font-bold leading-tight mb-4 text-white">
              Gift Card <br /> Exchange
            </h3>
            <p className="text-white/90 font-medium mb-8 leading-relaxed">
              Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for
              cash.
            </p>

            <div className="mt-auto">
              <Button className="rounded-full bg-[#007042] hover:bg-emerald-800 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 right-4">
              <GiftExchange width={60} height={60} />
            </div>
          </div>

          {/* Card 3: Global Payouts (Light Green) */}
          <div className="bg-[#D1FADF] rounded-[2.5rem] p-8 relative overflow-hidden group min-h-[480px] flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest">
                Cash Connect
              </span>
              <div className="rounded-full border border-emerald-800/10 w-12 h-12 flex items-center justify-center text-emerald-800/40">
                <Arrowdark width={24} height={24} />
              </div>
            </div>

            <h3 className="text-4xl font-bold text-[#007042] leading-tight mb-4">
              Global <br /> Payouts
            </h3>
            <p className="text-emerald-800/70 font-medium mb-8 leading-relaxed">
              Send and receive money across borders with ease. Enjoy fast and
              reliable payouts
            </p>

            <div className="mt-auto">
              <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 right-4">
              <Btc width={60} height={60} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
