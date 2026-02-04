"use client";

import { Section } from "@/components/ui/Section";
import React from "react";

export const AboutStats = () => {
  return (
    <Section background="white" className="mt-20">
      <div className="container mx-auto px-2 max-w-6xl">
        <div className="grid grid-cols-4 gap-2 md:gap-8 text-center md:text-left">
          {[
            { value: "150+", label: "Transactions\nPer Hour" },
            { value: "1021+", label: "Liquidity Score" },
            { value: "128+", label: "Global\nTransaction" },
            { value: "1301+", label: "Active\nAccounts" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1 md:gap-2 text-center">
              <span
                className={`text-2xl md:text-6xl font-semibold tracking-tight ${
                  i % 2 === 0 ? "text-emerald-500" : "text-primary"
                }`}
              >
                {stat.value}
              </span>
              <span
                className={`text-[10px] md:text-sm font-semibold text-emerald-500/80 leading-tight whitespace-pre-line`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
