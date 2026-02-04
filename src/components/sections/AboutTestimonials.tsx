"use client";

import { Section } from "@/components/ui/Section";
import React from "react";
import Image from "next/image";
import Arrow from "@/components/icons/arrowsmile";
import Flag from "../icons/flag";
import Btc from "../icons/btc";
import Coin from "../icons/coin";
import Coin2 from "../icons/coin2";
import Btcfly from "../icons/btc_fly";

export const AboutTestimonials = () => {
  const testimonials = [
    {
      role: "Crypto to Cash",
      quote:
        "Everything you need to accept payments, grow your money, and manage it from anywhere on the planet.",
      subQuote:
        "I've tried several platforms, but this one is by far the fastest and most reliable. Got my payment in minutes! 🤩",
      author: "David, Lagos",
      avatars: [
        "https://i.pravatar.cc/100?img=11",
        "https://i.pravatar.cc/100?img=5",
        "https://i.pravatar.cc/100?img=3",
        "https://i.pravatar.cc/100?img=8",
      ],
    },
    {
      role: "Gift Card Exchange",
      quote:
        "Everything you need to accept payments, grow your money, and manage it from anywhere on the planet.",
      subQuote:
        "I've tried several platforms, but this one is by far the fastest and most reliable. Got my payment in minutes! 🤩",
      author: "David, Lagos",
      avatars: [
        "https://i.pravatar.cc/100?img=12",
        "https://i.pravatar.cc/100?img=4",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=9",
      ],
    },
  ];

  return (
    <Section
      background="white"
      className="py-2 pt-30 mt-5 pb-20 overflow-hidden relative"
    >
      <div className="container mx-auto px-4 max-w-6xl relative">
        {/* --- MOBILE LAYOUT (Full Width Container, Left-Aligned Content) --- */}
        <div className="lg:hidden flex flex-col items-start text-left w-full mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-[#00B86B] mb-2">
              Testimonials
            </h2>
          </div>

          <div className="mb-4">
            <p className="text-primary-dark text-sm font-medium leading-relaxed">
              Everything you need to accept payments, grow your money, and
              manage it from anywhere on the planet.
            </p>
          </div>

          <div className="mb-6">
            <Flag className="w-10 h-10 text-primary" />
          </div>

          <p className="text-primary-dark text-sm leading-relaxed mb-6 font-medium">
            I've tried several platforms, but this one is by far the fastest and
            most reliable. Got my payment in minutes! 🤩
          </p>

          <div className="font-bold text-primary-dark text-sm mb-8 flex items-center gap-1 justify-start">
            <span className="w-3 h-0.5 bg-primary-text-primary-dark"></span>{" "}
            _David, Lagos
          </div>

          <div className="w-full grid grid-cols-5 gap-3 px-2 items-center">
            {[
              "https://i.pravatar.cc/150?img=11",
              "https://i.pravatar.cc/150?img=5",
              "https://i.pravatar.cc/150?img=3",
              "https://i.pravatar.cc/150?img=8",
            ].map((src, i) => (
              <div
                key={i}
                className="aspect-square rounded-full border-2 border-white shadow-sm overflow-hidden relative"
              >
                <Image src={src} alt="User" fill className="object-cover" />
              </div>
            ))}
            <div className="aspect-square rounded-full border border-emerald-500/30 flex items-center justify-center bg-white text-emerald-500 shadow-sm cursor-pointer hover:bg-emerald-50">
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

        {/* --- DESKTOP LAYOUT (Original Grid) --- */}
        <div className="hidden lg:block ">
          <Arrow className="hidden lg:block -scale-y-100 absolute -top-60 rotate-5 left-100  w-[70%] text-emerald-300 pointer-events-none" />
          <Coin2 className="hidden lg:block absolute top-10 left-220" />
          {/* Green Header Block */}
          <div className="rounded-3xl py-4 px-10 mt-10 inline-block mb-16 shadow-lg w-[52%] relative z-10 bg-linear-to-r from-[#00B86B] to-primary-dark">
            <h2 className="text-5xl font-bold text-white">Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 w-[90%]">
            {testimonials.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-8 relative bg-white">
                <h4 className="text-primary-dark font-bold mb-10 text-sm uppercase tracking-wide">
                  {item.role}
                </h4>

                <p className="text-primary font-bold text-lg leading-relaxed">
                  {item.quote}
                </p>

                <div className="py-2">
                  <Flag />
                </div>

                <p className="text-primary font-bold text-lg leading-relaxed">
                  {item.subQuote}
                </p>

                <div className="flex items-center gap-2 font-bold text-primary-dark text-lg mb-2">
                  {item.author}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <div className="flex -space-x-3">
                    {item.avatars.map((src, i) => (
                      <div
                        key={i}
                        className="w-20 h-20 rounded-full border-2 border-white overflow-hidden relative shadow-sm"
                      >
                        <Image
                          src={src}
                          alt="Avatar"
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="w-20 h-20 rounded-full border border-emerald-400 flex items-center justify-center text-emerald-500 bg-white hover:bg-emerald-50 transition-colors cursor-pointer">
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
            ))}
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
