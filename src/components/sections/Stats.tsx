import { Section } from "@/components/ui/Section";
import React from "react";
import Souvenir from "../icons/souvenir";
import Giftup from "../icons/giftid_up";
import Btc from "../icons/btc";
import Giftid from "../icons/giftid";

export const Stats = () => {
  return (
    <Section background="white" className="py-20">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4">
        {[
          {
            mainText: "Transactions",
            subText: "Digital Assets\ntraded coin",
            cardClass:
              "bg-stats-card-solid text-white shadow-xl shadow-emerald-900/10",
            icon: <Giftup width={50} height={50} />,
            iconPos: "bottom-right",
            badge: true,
          },
          {
            mainText: "250+",
            subText: "Active Gift Card\nBrands",
            cardClass:
              "bg-stats-card-bg border border-stats-border text-stats-text-dark",
            icon: <Souvenir width={50} height={50} />,
            iconPos: "bottom-right",
            badge: false,
          },
          {
            mainText: "1.5M+",
            subText: "Digital Assets\ntraded coin",
            // Gradient green background
            cardClass:
              "bg-gradient-to-tr from-stats-gradient-start to-stats-gradient-end text-white shadow-xl shadow-emerald-900/10",
            icon: <Btc width={50} height={50} />,
            iconPos: "top-right", // Requested top-right position
            badge: false,
            // Custom render for the coin icon with arrows if possible, for now emoji with top-right class
          },
          {
            mainText: "12+",
            subText: "Digital\nProducts",
            cardClass:
              "bg-stats-card-bg border border-stats-border text-stats-text-dark",
            icon: <Giftid width={50} height={50} />,
            iconPos: "bottom-right",
            badge: true,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`
              p-8 rounded-4xl flex flex-col justify-between relative overflow-hidden py-16 group transition-transform hover:-translate-y-1 duration-300
              ${stat.cardClass}
            `}
          >
            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-start h-full justify-center gap-2">
              {/* Main text centered vertically in its block */}
              <div>
                <h3
                  className={`font-semibold tracking-tight mb-2 ${
                    i === 0 ? "text-3xl" : "text-5xl"
                  }`}
                >
                  {stat.mainText}
                </h3>
                <p
                  className={`text-lg font-semibold  ${
                    i === 2
                      ? "text-white"
                      : i === 1 || i === 3
                      ? "text-primary"
                      : "text-emerald-300"
                  } opacity-80 whitespace-pre-line leading-snug`}
                >
                  {stat.subText}
                </p>
              </div>
            </div>

            {/* Icon positioning */}
            <div
              className={`absolute text-5xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300
                  ${
                    stat.iconPos === "top-right"
                      ? "top-6 right-6"
                      : "bottom-6 right-6"
                  }
               `}
            >
              {stat.icon}
            </div>

            {/* Decorative Overlay for gradient card */}
            {i === 2 && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};
