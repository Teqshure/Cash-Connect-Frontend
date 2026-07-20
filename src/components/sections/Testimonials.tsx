"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React, { useState, useEffect } from "react";
import Flag from "../icons/flag";

const TESTIMONIALS_DATA = [
  {
    name: "David",
    location: "Lagos",
    service: "Crypto to Cash",
    avatar: "/images/testimonials/nigerian_male_1.jpg",
    quote: "I've tried several platforms, but this one is by far the fastest and most reliable. Got my payment in minutes! 🤩",
    subQuote: "Everything you need to accept payments, grow your money, and manage it from anywhere on the planet."
  },
  {
    name: "Chioma",
    location: "Abuja",
    service: "Gift Card Trade",
    avatar: "/images/testimonials/nigerian_female_1.jpg",
    quote: "The gift card rates here are absolutely the best in the market. Clean interface and super helpful support team! 💚",
    subQuote: "Secure, reliable, and designed to help you exchange gift cards for instant cash without stress."
  },
  {
    name: "Tunde",
    location: "Port Harcourt",
    service: "Global Payouts",
    avatar: "/images/testimonials/nigerian_male_2.jpg",
    quote: "Cash Connect has simplified my international transactions. I can collect payments from foreign clients with ease.",
    subQuote: "Bridge the gap between local banking and global trade. Excellent exchange rates and absolute trust."
  },
  {
    name: "Blessing",
    location: "Enugu",
    service: "Crypto Wallet",
    avatar: "/images/testimonials/nigerian_female_2.jpg",
    quote: "Fast deposits, smooth interface, and extremely secure. Highly recommended to anyone looking to trade crypto safely.",
    subQuote: "Protect your digital assets with advanced security, instant settlement, and premium reliability."
  }
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = TESTIMONIALS_DATA[activeIndex];

  return (
    <Section background="white" className="py-12 md:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center max-w-6xl mx-auto px-4 md:px-6">
        {/* Left: Mockup Card (Contact Form Style) - Hidden on mobile */}
        <div className="relative order-2 lg:order-1">
          <div className="bg-white rounded-[2rem] md:rounded-[3rem] border border-primary-light text-primary-light/30 p-6 md:p-8 lg:p-12 relative overflow-hidden">
            {/* Green blur effect */}
            <div className="absolute top-24 -left-16 w-50 h-50 bg-[#b5d794] blur-[60px] rounded-full pointer-events-none"></div>

            <div className="flex justify-between items-start mb-8">
              <span className="text-zinc-500 font-medium"></span>
              <div className="w-12 h-12 rounded-full border border-primary-light text-primary-light flex items-center justify-center bg-white shadow-sm">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7" />
                  <path d="M7 7h10v10" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col gap-y-6 relative z-10">
              <div>
                <label className="block text-primary-dark font-semibold mb-3 text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="w-full bg-[#efefef] text-black rounded-xl px-5 py-4 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-200 placeholder:text-primary-dark font-medium"
                />
              </div>
              <div>
                <label className="block text-primary-dark font-semibold mb-3 text-sm">
                  Message
                </label>
                <textarea
                  placeholder="Ask us anything..."
                  className="w-full bg-[#efefef] text-black rounded-xl px-5 py-3 text-sm border-none outline-none focus:ring-1 focus:ring-emerald-200 resize-none h-20 placeholder:text-primary-dark font-medium"
                ></textarea>
              </div>

              <Button className="w-full bg-primary hover:bg-emerald-600 text-white rounded-xl py-4 font-bold shadow-lg shadow-emerald-200/50 text-[15px]">
                Send Message
              </Button>
            </div>
            <div className="text-right bottom-1 pt-0 mb-6">
              <span className="text-[11px] font-semibold text-primary-light tracking-wide cursor-pointer hover:text-emerald-700 transition-colors">
                <span className="text-primary-dark">or </span> Start Free Trial
              </span>
            </div>

            <div className="absolute bottom-5 mt-5 left-12">
              <span className="text-[11px] font-semibold text-primary-light uppercase tracking-widest">
                Cash Connect
              </span>
            </div>
          </div>
        </div>

        {/* Right: Text Content */}
        <div className="order-1 lg:order-2 pl-0 md:pl-4">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-4 md:mb-8">
            Testimonials
          </h2>
          <p className="text-green-700 mb-6 md:mb-10 max-w-md leading-relaxed font-medium text-sm md:text-base">
            {current.subQuote}
          </p>

          <div className="mb-8">
            <Flag />
          </div>

          <div className="min-h-[140px] md:min-h-[160px] flex flex-col justify-between transition-all duration-300">
            <p className="text-base md:text-lg lg:text-xl font-medium text-green-700 mb-6 md:mb-8 leading-relaxed max-w-lg italic">
              "{current.quote}"
            </p>

            <p className="font-extrabold text-primary mb-8 md:mb-12 flex items-center text-sm md:text-base gap-2">
              <span className="w-4 h-0.5 bg-emerald-500 inline-block"></span>
              _{current.name}, {current.location} <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">{current.service}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex space-x-3 items-center">
              {TESTIMONIALS_DATA.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-10 h-10 rounded-full border-[3px] overflow-hidden relative shadow-sm transition-all cursor-pointer ${
                    i === activeIndex 
                      ? "border-emerald-500 scale-110 shadow-emerald-100 ring-2 ring-emerald-400/20" 
                      : "border-white hover:border-slate-200"
                  }`}
                  title={`${t.name} from ${t.location}`}
                >
                  <img
                    src={t.avatar}
                    alt={`${t.name} Avatar`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
                className="w-10 h-10 rounded-full border border-emerald-500/20 flex items-center justify-center text-emerald-600 bg-white cursor-pointer hover:bg-emerald-50 hover:scale-105 transition-all shadow-sm"
                title="Next testimonial"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="ml-0.5"
                >
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
