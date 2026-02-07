"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Giftid from "../icons/giftid";
import ArrowSmile from "../icons/arrowsmile";

export const AboutHero = () => {
  return (
    <Section background="white" className="pt-32 pb-20 relative">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-150 h-150 bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Hero Top Section */}
        <div className="mb-24 relative">
          <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">
            About Us
          </span>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
            {/* Left: Heading and CTA */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#007042] tracking-tight leading-tight mb-8">
                Simplifying digital exchange for everyone, everywhere, anytime.
              </h1>
              <Link href="/signup">
                <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-8 py-3 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 shrink-0">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Right: Description Text */}
            <div className="max-w-md lg:pt-4">
              <p className="text-zinc-500 font-medium leading-relaxed text-lg">
                Whether you're a crypto trader or a gift card holder, our
                mission is to make exchanging as simple and rewarding as
                possible — no confusion, no delays.
              </p>
            </div>
          </div>

          {/* Decorative Arrow and Floating Element */}
          {/* Positioned relative to the main container area to float on the right side */}
          <div className="absolute top-[80%] right-[5%] hidden lg:block pointer-events-none z-0">
            <div className="relative w-75 h-37.5">
              <ArrowSmile className="w-full h-full text-[#00D67D]" />

              {/* Sell Gift Card Floating Badge at the end of arrow */}
              <div className="absolute -top-10 -right-4 bg-white flex items-center gap-2 px-4 py-2 rounded-full shadow-xl shadow-emerald-100/50 animate-in fade-in zoom-in duration-700 delay-300 border border-emerald-50">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Giftid width={18} height={18} />
                </div>
                <span className="text-sm font-bold text-zinc-600 whitespace-nowrap">
                  Sell Gift Card
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch transform translate-y-8">
          {/* Our Story Image Card */}
          <div className="relative rounded-[2.5rem] overflow-hidden min-h-100 lg:min-h-125 group">
            <div className="absolute inset-0 bg-zinc-900" />
            <Image
              src="/images/our_story.png"
              alt="Team Meeting"
              fill
              className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Right Column: Vision & Mission Cards */}
          <div className="flex flex-col gap-6">
            {/* Our Vision - Light Green */}
            <div className="bg-[#D1FADF] rounded-[2.5rem] p-10 flex-1 flex flex-col justify-center transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-2xl font-bold text-[#007042] mb-4">
                Our Vision
              </h3>
              <p className="text-emerald-800/80 font-medium leading-relaxed text-lg">
                To lead digital exchange with trust, speed, innovation, and
                inclusivity everywhere.
              </p>
            </div>

            {/* Our Mission - Dark Green */}
            <div className="bg-[#00D67D] rounded-[2.5rem] p-10 flex-1 flex flex-col justify-center text-white shadow-xl shadow-emerald-500/20 transition-transform hover:-translate-y-1 duration-300">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-emerald-50 font-medium leading-relaxed text-lg">
                Delivering fast, trusted, and user-first exchange experiences
                daily.
              </p>
            </div>
          </div>
        </div>

        {/* Lower Services Section with Arrow */}
        <div className="mt-32 relative">
          <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">
            Our Services
          </span>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-12 relative z-10">
            {/* Heading */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#5c5c5c] tracking-tight leading-tight max-w-lg">
              Simplifying digital exchange for everyone, everywhere, anytime.
            </h2>
          </div>

          {/* Decorative Arrow and Floating Element - Lower Section */}
          <div className="absolute top-[40%] right-[15%] hidden lg:block pointer-events-none z-0">
            <div className="relative w-80 h-30">
              <ArrowSmile className="w-full h-full text-[#00D67D]" />

              {/* Sell Gift Card Floating Badge */}
              <div className="absolute top-0 right-0 bg-white flex items-center gap-2 px-4 py-2 rounded-full shadow-xl shadow-emerald-100/50 animate-in fade-in zoom-in duration-700 delay-300 border border-emerald-50">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <Giftid width={18} height={18} />
                </div>
                <span className="text-sm font-bold text-zinc-600 whitespace-nowrap">
                  Sell Gift Card
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
