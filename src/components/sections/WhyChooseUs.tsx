import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Link from "next/link";

import Coin from "../icons/coin";

export const WhyChooseUs = () => {
  return (
    <Section background="white" className="py-0  md:py-0 px-4">
      <div className="max-w-7xl mx-auto bg-primary-dark rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 lg:p-20 relative overflow-hidden mb-6 md:mb-12">
        {/* Background Decoratives */}
        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none scale-150 opacity-40">
          <img
            src="/images/bubbles_extracted.png"
            alt=""
            className="w-[400px] h-auto opacity-20"
          />
        </div>

        {/* Blurred Coin - Right side on mobile, centered on desktop
        <div className="absolute top-[15%] right-4 md:top-[60%] md:left-[35%] md:-translate-x-1/2 md:-translate-y-1/2 w-24 h-24 md:w-64 md:h-64 pointer-events-none z-10 md:z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-[30px] md:blur-[60px] opacity-40 animate-pulse"></div>
            <Coin className="w-full h-full opacity-80 md:opacity-60" />
          </div>
        </div> */}

        <div className="flex flex-col relative z-10">
          {/* Header */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-4 tracking-tight leading-tight">
              Why <br />
              Choose Us?
            </h2>
            <p className="text-primary-light font-medium text-base md:text-lg">
              Digital Assets traded coin
            </p>
          </div>

          {/* Feature List - shown for both mobile and desktop */}
          <div className="space-y-4 md:space-y-8 my-8 md:my-0 md:absolute md:right-0 md:top-0 md:w-1/2">
            {[
              {
                title: "Fast Payouts:",
                desc: "Get paid instantly after verification.",
              },
              {
                title: "Secure Transactions:",
                desc: "Your data and trades are encrypted end-to-end.",
              },
              {
                title: "24/7 Support:",
                desc: "Reach out anytime — we're here to help.",
              },
              {
                title: "Best Rates in the Market:",
                desc: "We offer competitive and dynamic pricing.",
              },
              {
                title: "Trusted by Hundreds of Users:",
                desc: "Real users. Real reviews.",
              },
            ].map((item, i) => (
              <div key={i} className="flex  gap-x-6 group items-start">
                <div
                  className={`shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                    i % 2 === 0 ? "bg-primary-light" : "bg-white"
                  }`}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary-dark"
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <div className="text-white pt-0.5">
                  <h4 className="font-bold text-base md:text-lg mb-0.5 leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-white-100/70 text-sm leading-relaxed max-w-sm font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Button at bottom */}
          <div className="mt-4 ">
            <Link href="/signup">
              <Button className="w-fit rounded-full bg-primary hover:bg-emerald-500 text-white font-bold px-8 py-3 shadow-lg shadow-emerald-900/20 text-base transition-transform hover:scale-105">
                Get Started
              </Button>
            </Link>
          </div>

          <p className="text-primary-light mt-20 text-lg leading-relaxed  font-medium">
            cash connect
          </p>
        </div>
      </div>
    </Section>
  );
};
