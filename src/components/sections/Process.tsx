import { Section } from "@/components/ui/Section";
import React from "react";
import Howitworks from "../icons/how-it-works";
import { Button } from "../ui/Button";
import Arrowright from "../icons/arrowright";
import Image from "next/image";
import Coin from "../icons/coin";
import Giftid from "../icons/giftid";
import Link from "next/link";
import ArcDash from "../icons/arc-dash";

export const Process = () => {
  const steps = [
    {
      title: "Create an Account",
      description:
        "Sign up in seconds with your email or phone number. No stress, just smooth onboarding.",
      className: "top-[74%] left-[18%]",
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
    <Section background="white" className=" lg:pt-20 relative overflow-hidden">
      {/* Background Decoratives */}

      <div className="container mx-auto px-4 relative">
        <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-center">
          {/* Background Decoratives - Locked to container */}
          <div className="absolute top-1/2 right-0 lg:right-1/4 translate-x-1/2 w-64 lg:w-150 h-64 lg:h-150 bg-emerald-300 opacity-40 rounded-full blur-[120px] lg:blur-[260px] pointer-events-none z-0" />

          <div className="absolute hidden lg:block -top-[10%] left-1/4  pointer-events-none z-0 ">
            <img
              src="/images/lines_extracted.png"
              alt=""
              className="w-[800px] opacity-10 h-auto"
            />
          </div>

          <div className="absolute top-[15%] left-[75%] lg:top-[0%] lg:left-[35%]  pointer-events-none z-0 scale-200  lg:block">
            <img
              src="/images/blur_extracted.png"
              alt=""
              className="w-10 lg:w-30 h-auto blur-[3px] lg:blur-[5px] opacity-40"
            />
          </div>

          {/* Text Header - Mobile visible, Desktop absolute */}
          <div className="relative lg:absolute lg:left-0 lg:-translate-y-[70%] text-left z-20 mb-8 lg:mb-0">
            <div className="flex flex-col">
              {/* Cash Connect label */}
              <p className="text-xl text-zinc-500 mt-20 mb-2">Cash Connect</p>

              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-3xl lg:text-4xl lg:text-5xl font-black text-primary-dark mb-3 lg:mb-4 leading-tight">
                    We have the <br /> best process
                  </h2>
                  <p className="font-medium text-lg lg:text-2xl text-gray-600">
                    Digital Assets traded coin
                  </p>
                  <Link href="/signup">
                    <Button className="mt-8">Get Started</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden lg:block relative w-[95%] max-w-[1122px] aspect-[1122/660]">
            <Howitworks className="w-full h-full" />

            <div className="absolute inset-0 top-[20%] z-20 pointer-events-none">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 max-w-80 flex flex-col gap-1.5 ${step.className} ${step.textAlign}`}
                >
                  <h3 className="text-2xl font-bold text-primary leading-none mb-1">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-gray-400 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Pattern from Figma */}
          <div className="lg:hidden flex flex-col mt-20 gap-2 w-full">
            {steps.map((step, index) => {
              const isMiddleStep = index === 1;
              return (
                <React.Fragment key={index}>
                  {/* Arc connector on LEFT - BEFORE step (except first) */}
                  {index > 0 && (
                    <div className="flex justify-start pl-2 relative bottom-40 right-10">
                      <ArcDash className="w-28 h-12 text-emerald-500" />
                    </div>
                  )}

                  {/* Step content - Step 2 container indented right, others left */}
                  <div
                    className={`flex items-start  gap-2 ${isMiddleStep ? "ml-28 " : "ml-0"}`}
                    style={{ maxWidth: isMiddleStep ? "85%" : "75%" }}
                  >
                    <div className="flex-1 text-left">
                      <h3 className="text-base font-extrabold text-primary leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium leading-relaxed mt-1">
                        {step.description}
                      </p>
                    </div>
                    {/* Large step number - always RIGHT of text */}
                    <span className="text-8xl relative lg:right-20 right-5 bottom-15 font-black text-zinc-200/50 leading-none">
                      {index + 1}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex flex-row flex-end gap-x-2 items-center mb-20 justify-end px-4 mt-4 lg:mt-0">
        <Giftid />{" "}
        <p className="font-medium text-1xl text-gray-400"> Sell Gift Card </p>
      </div>
    </Section>
  );
};
