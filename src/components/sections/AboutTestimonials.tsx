"use client";

import { Section } from "@/components/ui/Section";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Arrow from "@/components/icons/arrowsmile";
import Flag from "../icons/flag";
import Coin2 from "../icons/coin2";

const CRYPTO_TESTIMONIALS = [
  {
    name: "David",
    location: "Lagos",
    quote: "Everything you need to accept payments, grow your money, and manage it from anywhere on the planet.",
    subQuote: "I've tried several platforms, but this one is by far the fastest and most reliable. Got my payment in minutes! 🤩",
    avatar: "/images/testimonials/nigerian_male_1.jpg"
  },
  {
    name: "Blessing",
    location: "Enugu",
    quote: "Excellent crypto wallet support, seamless NGN conversions, and instant cash payouts.",
    subQuote: "Protect your digital assets with advanced security, instant settlement, and premium reliability. Got my transaction approved in seconds!",
    avatar: "/images/testimonials/nigerian_female_2.jpg"
  }
];

const GIFT_TESTIMONIALS = [
  {
    name: "Chioma",
    location: "Abuja",
    quote: "Best rates for gift cards online. Transacting here is fast, smooth, and extremely rewarding.",
    subQuote: "The gift card rates here are absolutely the best in the market. Clean interface and super helpful support team! 💚",
    avatar: "/images/testimonials/nigerian_female_1.jpg"
  },
  {
    name: "Tunde",
    location: "Port Harcourt",
    quote: "Bridge the gap between local banking and global trade. Excellent exchange rates and absolute trust.",
    subQuote: "Cash Connect has simplified my international payouts. I can collect payments from foreign clients with ease.",
    avatar: "/images/testimonials/nigerian_male_2.jpg"
  }
];

export const AboutTestimonials = () => {
  const [cryptoActiveIdx, setCryptoActiveIdx] = useState(0);
  const [giftActiveIdx, setGiftActiveIdx] = useState(0);

  // Auto rotate the selected feedback
  useEffect(() => {
    const timer = setInterval(() => {
      setCryptoActiveIdx((prev) => (prev === 0 ? 1 : 0));
      setGiftActiveIdx((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeCrypto = CRYPTO_TESTIMONIALS[cryptoActiveIdx];
  const activeGift = GIFT_TESTIMONIALS[giftActiveIdx];

  return (
    <Section
      background="white"
      className="py-2 pt-30 mt-5 pb-20 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* --- MOBILE LAYOUT --- */}
        <div className="lg:hidden flex flex-col items-start text-left w-full mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#00B86B] mb-2 font-sans">
              Testimonials
            </h2>
          </div>

          <div className="mb-4">
            <p className="text-primary-dark text-sm font-medium leading-relaxed font-sans">
              {activeCrypto.quote}
            </p>
          </div>

          <div className="mb-6">
            <Flag className="w-10 h-10 text-primary" />
          </div>

          <p className="text-primary-dark text-sm leading-relaxed mb-6 font-medium italic">
            "{activeCrypto.subQuote}"
          </p>

          <div className="font-bold text-primary-dark text-sm mb-8 flex items-center gap-1 justify-start">
            <span className="w-3 h-0.5 bg-primary"></span>
            _{activeCrypto.name}, {activeCrypto.location}
          </div>

          <div className="w-full grid grid-cols-5 gap-3 px-2 items-center">
            {CRYPTO_TESTIMONIALS.map((t, i) => (
              <button
                key={i}
                onClick={() => setCryptoActiveIdx(i)}
                className={`aspect-square rounded-full border-2 overflow-hidden relative shadow-sm cursor-pointer transition ${
                  i === cryptoActiveIdx ? "border-emerald-500 scale-105" : "border-white"
                }`}
              >
                <Image src={t.avatar} alt="User" fill className="object-cover" />
              </button>
            ))}
            <div 
              onClick={() => setCryptoActiveIdx((prev) => (prev === 0 ? 1 : 0))}
              className="aspect-square rounded-full border border-emerald-500/30 flex items-center justify-center bg-white text-emerald-500 shadow-sm cursor-pointer hover:bg-emerald-50"
            >
              <svg
                className="w-1/3 h-1/3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* --- DESKTOP LAYOUT --- */}
        <div className="hidden lg:block ">
          <Arrow className="hidden lg:block -scale-y-100 absolute -top-60 rotate-5 left-100 w-[70%] text-emerald-300 pointer-events-none" />
          <Coin2 className="hidden lg:block absolute top-10 left-220" />
          
          {/* Green Header Block */}
          <div className="rounded-3xl py-4 px-10 mt-10 inline-block mb-16 shadow-lg w-[52%] relative z-10 bg-gradient-to-r from-[#00B86B] to-primary-dark">
            <h2 className="text-5xl font-bold text-white font-sans">Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 w-[90%]">
            {/* Column 1: Crypto to Cash */}
            <div className="flex flex-col gap-8 relative bg-white">
              <h4 className="text-primary-dark font-bold mb-10 text-sm uppercase tracking-wide">
                Crypto to Cash
              </h4>

              <p className="text-primary font-bold text-lg leading-relaxed">
                {activeCrypto.quote}
              </p>

              <div className="py-2">
                <Flag />
              </div>

              <p className="text-primary font-bold text-lg leading-relaxed italic">
                "{activeCrypto.subQuote}"
              </p>

              <div className="flex items-center gap-2 font-bold text-primary-dark text-lg mb-2">
                _{activeCrypto.name}, {activeCrypto.location}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <div className="flex -space-x-3">
                  {CRYPTO_TESTIMONIALS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setCryptoActiveIdx(i)}
                      className={`w-20 h-20 rounded-full border-2 overflow-hidden relative shadow-sm cursor-pointer transition ${
                        i === cryptoActiveIdx ? "border-emerald-500 scale-105 z-10" : "border-white"
                      }`}
                    >
                      <Image
                        src={t.avatar}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div 
                  onClick={() => setCryptoActiveIdx((prev) => (prev === 0 ? 1 : 0))}
                  className="w-20 h-20 rounded-full border border-emerald-400 flex items-center justify-center text-emerald-500 bg-white hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Column 2: Gift Card Exchange */}
            <div className="flex flex-col gap-8 relative bg-white">
              <h4 className="text-primary-dark font-bold mb-10 text-sm uppercase tracking-wide">
                Gift Card Exchange
              </h4>

              <p className="text-primary font-bold text-lg leading-relaxed">
                {activeGift.quote}
              </p>

              <div className="py-2">
                <Flag />
              </div>

              <p className="text-primary font-bold text-lg leading-relaxed italic">
                "{activeGift.subQuote}"
              </p>

              <div className="flex items-center gap-2 font-bold text-primary-dark text-lg mb-2">
                _{activeGift.name}, {activeGift.location}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <div className="flex -space-x-3">
                  {GIFT_TESTIMONIALS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => setGiftActiveIdx(i)}
                      className={`w-20 h-20 rounded-full border-2 overflow-hidden relative shadow-sm cursor-pointer transition ${
                        i === giftActiveIdx ? "border-emerald-500 scale-105 z-10" : "border-white"
                      }`}
                    >
                      <Image
                        src={t.avatar}
                        alt="Avatar"
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
                <div 
                  onClick={() => setGiftActiveIdx((prev) => (prev === 0 ? 1 : 0))}
                  className="w-20 h-20 rounded-full border border-emerald-400 flex items-center justify-center text-emerald-500 bg-white hover:bg-emerald-50 transition-colors cursor-pointer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Coin2
            className="hidden lg:block absolute bottom-0 translate-y-20"
            width={70}
            height={70}
          />
        </div>
      </div>
    </Section>
  );
};
