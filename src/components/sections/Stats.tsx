import { Section } from "@/components/ui/Section";
import React from "react";
import Souvenir from "../icons/souvenir";
import Giftup from "../icons/giftid_up";
import Btc from "../icons/btc";
import Giftid from "../icons/giftid";

export const Stats = () => {
  return (
    <Section background="white" className="py-12 md:py-20">
      {/* Mobile Layout - 2x2 grid matching Figma design */}
      <div className="md:hidden flex flex-col gap-3 max-w-7xl mx-auto px-4">
        {/* Row 1: Transactions (55%) | 250+ (45%) */}
        <div className="flex gap-3">
          <div className="flex-[55]">
            <div className="bg-primary-dark text-white shadow-xl shadow-emerald-900/10 p-5 rounded-3xl h-full min-h-32 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold tracking-tight mb-1">
                  Transactions
                </h3>
                <p className="text-xs font-medium text-emerald-300/80 whitespace-pre-line leading-snug">
                  Digital Assets{"\n"}traded coin
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <Giftup width={35} height={35} />
              </div>
            </div>
          </div>
          <div className="flex-[45]">
            <div className="bg-white border border-zinc-200 p-5 rounded-3xl h-full min-h-32 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-1 text-primary">
                  250+
                </h3>
                <p className="text-xs font-medium text-zinc-600 whitespace-pre-line leading-snug">
                  Active Gift Card{"\n"}Brands
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <Souvenir width={30} height={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: 12+ (45%) | 1.5M+ (55%) */}
        <div className="flex gap-3">
          <div className="flex-[45]">
            <div className="bg-white border border-zinc-200 p-5 rounded-3xl h-full min-h-32 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-1 text-primary">
                  12+
                </h3>
                <p className="text-xs font-medium text-zinc-600 whitespace-pre-line leading-snug">
                  Digital{"\n"}Products
                </p>
              </div>
              <div className="absolute bottom-4 right-4">
                <Giftid width={30} height={30} />
              </div>
            </div>
          </div>
          <div className="flex-[55]">
            <div className="bg-gradient-to-tr from-[#00B86B] to-[#00D284] text-white shadow-xl shadow-emerald-900/10 p-5 rounded-3xl h-full min-h-32 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Btc width={35} height={35} />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold tracking-tight mb-1">
                  1.5M+
                </h3>
                <p className="text-xs font-medium text-white/80 whitespace-pre-line leading-snug">
                  Digital Assets{"\n"}traded coin
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Original 4 columns */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {[
          {
            mainText: "Transactions",
            subText: "Digital Assets\ntraded coin",
            cardClass:
              "bg-primary-dark text-white shadow-xl shadow-emerald-900/10",
            icon: <Giftup width={50} height={50} />,
            iconPos: "bottom-right",
          },
          {
            mainText: "250+",
            subText: "Active Gift Card\nBrands",
            cardClass: "bg-white border border-primary-dark text-zinc-800",
            textColor: "text-primary",
            icon: <Souvenir width={50} height={50} />,
            iconPos: "bottom-right",
          },
          {
            mainText: "1.5M+",
            subText: "Digital Assets\ntraded coin",
            cardClass:
              "bg-gradient-to-tr from-primary-dark to-primary-light text-white shadow-xl shadow-emerald-900/10",
            icon: <Btc width={50} height={50} />,
            iconPos: "top-right",
          },
          {
            mainText: "12+",
            subText: "Digital\nProducts",
            cardClass: "bg-white border border-primary-dark text-zinc-800",
            textColor: "text-primary",
            icon: <Giftid width={50} height={50} />,
            iconPos: "bottom-right",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className={`p-8 rounded-4xl flex flex-col justify-between relative overflow-hidden py-16 group transition-transform hover:-translate-y-1 duration-300 ${stat.cardClass}`}
          >
            <div className="relative z-10 flex flex-col items-start h-full justify-center gap-2">
              <div>
                <h3
                  className={`font-semibold tracking-tight mb-2 ${
                    i === 0 ? "text-3xl" : "text-5xl"
                  } ${stat.textColor || ""}`}
                >
                  {stat.mainText}
                </h3>
                <p
                  className={`text-lg font-semibold ${
                    i === 2
                      ? "text-white/80"
                      : i === 1 || i === 3
                        ? "text-primary/80  "
                        : "text-emerald-300/80"
                  } whitespace-pre-line leading-snug`}
                >
                  {stat.subText}
                </p>
              </div>
            </div>

            <div
              className={`absolute text-5xl filter drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300 ${
                stat.iconPos === "top-right"
                  ? "top-6 right-6"
                  : "bottom-6 right-6"
              }`}
            >
              {stat.icon}
            </div>

            {i === 2 && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
};
