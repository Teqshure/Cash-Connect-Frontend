import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Btc from "../icons/btc";
import Arrowlight from "../icons/arrowlight";
import Arrowdark from "../icons/arrowright";
import GiftExchange from "../icons/giftexchange";
import Image from "next/image";
import Coin from "../icons/coin";
import Arrowsmile from "../icons/arrowsmile";

export const LandingServices = () => {
  return (
    <Section background="white" className=" md:py-12 relative overflow-hidden">
      <div className="container mx-auto ">
        {/* Header */}

        <div className="items-center justify-center text-center mb-8 pb-20">
          <Btc className="w-12 h-12 absolute top-7 left-1/2 -translate-x-[380%] hidden lg:block" />
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-4xl font-bold text-primary mb-1">What we do</h2>
          </div>

          <p className="text-base text-primary-dark flex items-center justify-center gap-1">
            at Cash Connect
          </p>
          <Arrowsmile className=" text-primary absolute mx-auto left-1/2 -translate-x-[40%] md:top-15 sm:top-2 top-4 w-[200px] h-[200px] lg:w-[600px] lg:h-[250px]  lg:top-2 " />
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          {/* Card 1: Crypto to Cash (White) */}
            <div className="bg-white rounded-[2rem] mx-auto p-6 justify-center md:p-10 border border-primary-dark shadow-sm relative overflow-hidden min-h-[300px] flex flex-col group">
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-4">
              Cash Connect
            </span>
            <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-primary">
              <Arrowdark width={60} height={60} className="text-primary" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-primary-dark mb-2">
              Crypto to <br /> Cash
            </h3>
            <p className="text-primary-dark text-sm md:text-base mb-6 max-w-[80%] leading-relaxed">
              Instantly convert your Bitcoin and other cryptocurrencies to Naira
              at competitive rates.
            </p>

            <div className="mt-auto relative z-10">
              <Button className="rounded-full bg-primary-light hover:bg-primary-dark text-white font-medium px-6 py-2 text-sm w-fit">
              Convert Now
              </Button>
            </div>

            {/* Decoration Image */}
            <div className="absolute bottom-4 right-4 z-0">
              <Image
              src="/images/xchange.png"
              alt="Crypto Cash"
              width={100}
              height={100}
              className="object-contain"
              />
            </div>
            </div>

          {/* Card 2: Global Payouts (Dark Green) */}
          <div className="bg-primary-dark rounded-[2rem] mx-auto p-6 md:p-10 relative overflow-hidden min-h-[300px] flex flex-col group">
            {/* <div className="flex justify-between items-start mb-4"> */}
              <span className="text-[10px] font-bold text-primary-light uppercase tracking-widest block mb-4">
              Cash Connect
            </span>
            <div className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-primary">
              <Arrowdark width={60} height={60} className="text-primary" />
            </div>
            {/* </div> */}

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Global <br /> Payouts
            </h3>
            <p className="text-primary-light text-sm md:text-base mb-6 max-w-[80%] leading-relaxed">
              Send and receive money across borders with ease. Enjoy fast and
              reliable payouts.
            </p>

            <div className="mt-auto relative z-10">
              <Button className="rounded-full bg-primary-light hover:bg-primary-dark text-white font-medium px-6 py-2 text-sm w-fit border-none">
                Exchange
              </Button>
            </div>

            {/* Decoration Image */}
            <div className="absolute bottom-4 right-4 z-0">
              <Btc width={100} height={100} />
            </div>
          </div>

          {/* Card 3: Gift Card Exchange (Full Width on Desktop) */}
          <div className="md:col-span-2 bg-primary-dark rounded-[2rem] p-6 md:p-10 relative overflow-hidden min-h-[300px] md:min-h-[350px] flex flex-col md:flex-row items-center md:items-start group">
            {/* Background Bubbles */}
            <div className="absolute top-0 left-0 -translate-x-1/2  inset-0 z-0 opacity-10 pointer-events-none">
              <Image
                src="/images/bubbles_extracted.png"
                alt="Background Bubbles"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col h-full w-full md:w-1/2 relative z-10">
              {/* Mobile floating label style for consistency or just text */}
              <div className="flex justify-between w-full md:w-auto items-center mb-4 md:mb-6">
                <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                  Gift Card <br /> Exchange
                </h3>
              </div>

              <p className="text-white/80 text-sm md:text-lg mb-8 leading-relaxed max-w-md">
                Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for
                cash.
              </p>

              <div className="mt-4">
                <Button className="rounded-full bg-primary-light hover:bg-primary-dark text-white font-medium px-8 py-3 text-sm md:text-base w-fit border-none">
                  Exchange
                </Button>
              </div>
            </div>

            {/* Right side decoration / text for Desktop if needed, or just the image */}
            <div className="w-full md:w-1/2 h-full flex items-center justify-center md:justify-end mt-8 md:mt-0 relative">
              {/* Large Graphich */}
              <div className="relative hidden md:block w-full max-w-[350px] md:max-w-[350px] aspect-square z-10">
                <GiftExchange className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
