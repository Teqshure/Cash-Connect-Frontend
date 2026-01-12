import { Section } from "@/components/ui/Section";
import React from "react";
import Howitworks from "../icons/how-it-works";
import { Button } from "../ui/Button";
import Arrowright from "../icons/arrowright";
import Image from "next/image";
import Coin from "../icons/coin";
import Giftid from "../icons/giftid";
import Link from "next/link";

export const Process = () => {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Sign up in seconds with your email or phone number. No stress, just smooth onboarding.",
      className: "top-[68%] left-[18%]",
      textAlign: "text-left",
    },
    {
      title: "Select What to Exchange",
      description:
        "Choose crypto (like BTC or USDT) or gift cards (iTunes, Steam, etc.). We support multiple options.",
      className: "top-[48%] left-[54%]",
      textAlign: "text-left",
    },
    {
      title: "Complete Your Trade",
      description:
        "Enter the amount, upload your gift card or send crypto, and receive instant payment or wallet credit.",
      className: "top-[15%] left-[84%]",
      textAlign: "text-left",
    },
  ];

  return (
    <Section background="white" className="py-2 relative ">
      {/* Background Decoratives */}

      <div className="relative max-w-7xl mx-auto flex items-center justify-center py-10">
        {/* Background Decoratives - Locked to container */}
        <div className="absolute top-1/2 right-1/4 translate-x-1/2 w-150 h-150 bg-emerald-300 opacity-40 rounded-full blur-[260px] pointer-events-none z-0" />

        <div className="absolute -top-[10%] left-1/4 pointer-events-none z-0">
          <img
            src="/images/lines_extracted.png"
            alt=""
            className="w-[800px]  opacity-25 h-auto"
          />
        </div>

        <div className="absolute top-[10%] -left-[10%] pointer-events-none z-0 rotate-6">
          <img
            src="/images/lines_extracted.png"
            alt=""
            className="w-[800px] opacity-5 h-auto"
          />
        </div>

        <div className="absolute -top-[5%] left-[32%] pointer-events-none z-0 scale-200">
          <img
            src="/images/blur_extracted.png"
            alt=""
            className="w-40 h-auto blur-sm opacity-50"
          />
        </div>

        {/* Text Header */}
        <div className="absolute top-0 left-0 -translate-y-[80%] text-left z-20">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 leading-tight">
            We have the <br /> best process
          </h2>
          <p className="font-medium text-2xl text-gray-600">
            Digital Assets traded coin
          </p>
          <Link href="/signup">
          <Button className="mt-8">Get Started</Button>
          </Link>
        </div>

        <div className="relative w-[95%] max-w-[1122px] aspect-[1122/660]">
          <Howitworks className="w-full h-full" />

          <div className="absolute inset-0 top-[20%] z-20 pointer-events-none">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`absolute -translate-x-1/2 -translate-y-1/2 max-w-80 flex flex-col gap-1.5 ${step.className} ${step.textAlign}`}
              >
                <h3 className="text-2xl font-extrabold text-primary leading-none mb-1">
                  {step.title}
                </h3>
                <p className="text-[15px] text-gray-400 font-medium leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" flex flex-row  flex-end gap-x-2           items-center      justify-end ">
        <Giftid />{" "}
        <p className="font-medium text-1xl text-gray-400"> Sell Gift Card </p>
      </div>
    </Section>
  );
};
