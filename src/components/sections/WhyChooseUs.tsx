import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import React from "react";
import Link from "next/link";

import Coin from "../icons/coin";

export const WhyChooseUs = () => {
  return (
    <Section background="white" className="py-20 px-4">
      <div className="max-w-7xl mx-auto bg-[#007042] rounded-[3rem] p-8 md:p-16 lg:p-20 relative overflow-hidden my-12">
        {/* Background Decoratives */}
        <div className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none scale-150 opacity-40">
          <img
            src="/images/bubbles_extracted.png"
            alt=""
            className="w-[400px] h-auto opacity-10"
          />
        </div>

        {/* Blurred Coin - Centered/Floating */}
        <div className="absolute top-[60%] left-[35%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none z-0">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full bg-yellow-400 blur-[60px] opacity-40 animate-pulse"></div>
            <Coin className="w-full h-full opacity-60" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
          {/* Left Column */}
          <div className="flex flex-col justify-center relative">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight leading-tight">
              Why <br />
              Choose Us?
            </h2>
            <p className="text-emerald-200/80 font-medium text-lg mb-10">
              Digital Assets traded coin
            </p>
            <Link href="/signup">
            <Button className="w-fit rounded-full bg-[#00A859] hover:bg-emerald-500 text-white font-bold px-8 py-3 shadow-lg shadow-emerald-900/20 text-base transition-transform hover:scale-105">
              Get Started
            </Button>
            </Link>

            <div className="mt-20 lg:mt-32">
              <span className="text-white/30 font-bold text-xs uppercase tracking-widest">
                Cash Connect
              </span>
            </div>
          </div>

          {/* Right Column - Feature List */}
          <div className="space-y-8">
            {[
              {
                title: "Secure Transactions:",
                desc: "Your data and trades are encrypted end-to-end.",
                iconBg: "bg-[#00D67D]",
                iconColor: "text-white",
                arrowColor: "text-[#005c36]",
              },
              {
                title: "Fast Payouts:",
                desc: "Get paid instantly after verification.",
                iconBg: "bg-white",
                iconColor: "text-[#007042]",
                arrowColor: "text-[#007042]",
              },
              {
                title: "Best Rates in the Market:",
                desc: "We offer competitive and dynamic pricing.",
                iconBg: "bg-[#00D67D]",
                iconColor: "text-white",
                arrowColor: "text-[#005c36]",
              },
              {
                title: "24/7 Support:",
                desc: "Reach out anytime — we're here to help.",
                iconBg: "bg-white",
                iconColor: "text-[#007042]",
                arrowColor: "text-[#007042]",
              },
              {
                title: "Trusted by Hundreds of Users:",
                desc: "Real users. Real reviews.",
                iconBg: "bg-[#00D67D]",
                iconColor: "text-white",
                arrowColor: "text-[#005c36]",
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 group items-start">
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full ${item.iconBg} flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`${item.arrowColor}`}
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <div className="text-white pt-1">
                  <h4 className="font-bold text-lg mb-1 leading-none">
                    {item.title}
                  </h4>
                  <p className="text-emerald-100/70 text-sm leading-relaxed max-w-sm font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};
