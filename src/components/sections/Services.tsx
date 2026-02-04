import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Btc from "../icons/btc";
import Arrowlight from "../icons/arrowlight";
import Arrowdark from "../icons/arrowright";
import GiftExchange from "../icons/giftexchange";
import Arrowsmile from "../icons/arrowsmile";
import Image from "next/image";
import Btcfly from "../icons/btc_fly";
import Coin from "../icons/coin";
import Coin2 from "../icons/coin2";

interface ServicesProps {
  hideHeader?: boolean;
  showProductsHeader?: boolean;
  isTeamPage?: boolean;
}

export const Services = ({
  hideHeader = false,
  showProductsHeader = false,
  isTeamPage = false,
}: ServicesProps) => {
  return (
    <Section
      background="white"
      className="py-12 lg:py-20 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Mobile Header - Default Home Page */}
        {!hideHeader && !showProductsHeader && !isTeamPage && (
          <div className="items-center justify-center text-center mb-8">
            <div className="flex items-center justify-center gap-2">
              <Btc className="w-12 h-12" />
              <h2 className="sm:text-2xl lg:text-4xl font-bold text-primary mb-1">
                What we do
              </h2>
            </div>

            <p className="sm:text-sm lg:text-base text-zinc-500 flex items-center justify-center gap-1">
              at Cash Connect
            </p>
            <Arrowsmile
              className=" text-primary relative mx-auto left-5 lg:left-9 bottom-14 "
              width={400}
              height={150}
            />
          </div>
        )}

        {/* Team Page Header - Matches specific user request */}
        {isTeamPage && (
          <div className="mb-8 lg:mb-16 relative">
            <div className="absolute lg:block hidden -top-12 lg:top-1  lg:right-[25%]">
              <Coin2 className=" w-12 h-12 lg:w-16 lg:h-16" />
            </div>
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs lg:text-sm mb-2 block">
              Our Services
            </span>
            <h2 className="text-2xl lg:text-4xl lg:text-2xl font-normal text-[#5c5c5c] tracking-tight leading-tight max-w-2xl">
              Check out some of our Products
            </h2>
          </div>
        )}

        {/* Desktop Header - "Our Services" - or Products page header */}
        {!hideHeader && showProductsHeader && !isTeamPage && (
          <div className="mb-16 relative flex items-center justify-between">
            <div className="relative">
              <div className="absolute lg:block hidden -top-12 lg:-top-16 right-[-20%] ">
                <Coin2 className="w-12 h-12 lg:w-16 lg:h-16" />
              </div>
              <span className="text-emerald-500 font-bold tracking-widest uppercase text-sm mb-2 block">
                Our Services
              </span>
              <h2 className="text-2xl lg:text-4xl lg:text-2xl font-normal text-[#5c5c5c] tracking-tight leading-tight max-w-2xl">
                Check out some of our Products
              </h2>
            </div>
            <Image
              src="/images/cards.png"
              alt="Dollar Icon"
              width={200}
              height={200}
              className="object-contain hidden lg:block"
              priority
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Card 1: Crypto to Cash (Dark Green) */}
          <div className="bg-primary-dark rounded-4xl lg:rounded-[2.5rem] p-6 lg:p-8 text-white relative overflow-hidden group min-h-80 lg:min-h-120 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
                Cash Connect
              </span>
              <div className="rounded-full border border-white/20 w-12 h-12 flex items-center justify-center text-white/80">
                <Arrowlight width={50} height={50} />
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3 lg:mb-4 text-white">
              Crypto to <br /> Cash
            </h3>
            <p className="text-white text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
              Instantly convert your Bitcoin and other cryptocurrencies to Naira
              at competitive rates.
            </p>

            <div className="mt-auto -translate-y-[10%] lg:-translate-y-20">
              <Button className="rounded-full bg-primary hover:bg-emerald-500 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 right-4 hidden lg:block">
              <Image
                src="/images/money-1.png"
                alt="BTC Decoration"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Card 2: Gift Card Exchange (Bright Green) */}
          <div className="bg-primary-light rounded-4xl lg:rounded-[2.5rem] p-6 lg:p-8 text-white relative overflow-hidden group min-h-80 lg:min-h-120 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold text-emerald-900/40 uppercase tracking-widest">
                Cash Connect
              </span>
              <div className="rounded-full border border-emerald-900/10 w-12 h-12 flex items-center justify-center text-emerald-900/40">
                <Arrowdark width={50} height={50} />
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold leading-tight mb-3 lg:mb-4 text-white">
              Gift Card <br /> Exchange
            </h3>
            <p className="text-white/90 text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
              Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for
              cash.
            </p>

            <div className="mt-auto -translate-y-[10%] lg:-translate-y-20">
              <Button className="rounded-full bg-primary-dark hover:bg-emerald-800 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 right-4 hidden lg:block">
              <Image
                src="/images/money-2.png"
                alt="BTC Decoration"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>

          {/* Card 3: Global Payouts (Light Green) */}
          <div className="bg-[#D1FADF] rounded-4xl lg:rounded-[2.5rem] p-6 lg:p-8 relative overflow-hidden group min-h-80 lg:min-h-120 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-bold text-emerald-800/60 uppercase tracking-widest">
                Cash Connect
              </span>
              <div className="rounded-full border border-emerald-800/10 w-12 h-12 flex items-center justify-center text-emerald-800/40">
                <Arrowdark width={50} height={50} />
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-[#007042] leading-tight mb-3 lg:mb-4">
              Global <br /> Payouts
            </h3>
            <p className="text-emerald-800/70 font-medium text-sm lg:text-base mb-6 lg:mb-8 leading-relaxed">
              Send and receive money across borders with ease. Enjoy fast and
              reliable payouts
            </p>

            <div className="mt-auto -translate-y-[10%] lg:-translate-y-20">
              <Button className="rounded-full bg-primary hover:bg-emerald-500 text-white font-bold px-8 py-3 text-xs w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration */}
            <div className="absolute bottom-4 right-4 hidden lg:block">
              <Image
                src="/images/money-1.png"
                alt="BTC Decoration"
                width={60}
                height={60}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
