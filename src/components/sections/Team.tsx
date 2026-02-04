import { Section } from "@/components/ui/Section";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Linkedin from "../icons/linkedin";
import XTwitter from "../icons/x-twitter";
import Globe from "../icons/globe";

// Mock data for the two groups
const topTeamMembers = [
  {
    name: "Promise Adesina",
    role: "Founder",
    image: "/images/image-1.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adesina",
    role: "Founder",
    image: "/images/image-2.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
];

const bottomTeamMembers = [
  {
    name: "Promise Adesina",
    role: "Founder",
    image: "/images/image-3.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adesina",
    role: "Founder",
    image: "/images/image-4.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adesina",
    role: "Founder",
    image: "/images/image-5.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adesina",
    role: "Founder",
    image: "/images/image-6.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
];

const TeamCard = ({ member }: { member: any }) => (
  <div className="rounded-3xl overflow-hidden group md:h-107 h-full max-w-[282px] mx-auto w-full flex flex-col border border-white bg-[#007A48] shadow-sm">
    {/* First Div: Image Container with rounded bottom right */}
    <div className="relative w-full md:h-56 h-48 bg-white rounded-br-[1rem] overflow-hidden shrink-0">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-top"
      />
    </div>

    {/* Second Div: Text Content Container */}
    <div className="text-white p-4 md:p-6 grow flex flex-col">
      <div className="flex justify-between items-start mb-3 md:mb-4">
        <div className="pr-2">
          <h3 className="text-[14px] md:text-[15px] font-medium mb-0.5 leading-tight">
            {member.name}
          </h3>
          <span className="text-[12px] md:text-[14px] text-white/80 font-medium block">
            {member.role}
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex gap-1 md:gap-2 shrink-0 mt-0.5">
          <div className="w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-all cursor-pointer">
            <Linkedin className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center transition-opacity cursor-pointer">
            <XTwitter className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
        </div>
      </div>

      <div className="mb-2 lg:mb-4">
        <p className="text-[11px] text-white font-normal line-clamp-3 md:line-clamp-none">
          {member.description}
        </p>
      </div>

      <div className="">
        <button className="text-[10px] md:text-[11px] font-medium tracking-tight text-[#00E096] hover:text-white transition-colors">
          Teamconnect
        </button>
      </div>
    </div>
  </div>
);

export const Team = () => {
  return (
    <Section
      background="white"
      className="py-10 lg:py-40 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Background Decorations - Anchored to Container */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[120px] pointer-events-none -z-10" />
        {/* Top Section: Header (Left) + 2 Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8 md:mb-12">
          {/* Header Content - Spans ~5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-0 md:pr-8 mb-8 lg:mb-0">
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-2 md:mb-4 block">
              Cash Connect
            </span>
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#007042] tracking-tight leading-tight mb-4 md:mb-6">
                Welcome <br />
                Our Talented team
              </h2>
              <Image
                src="/images/dollar-image.png"
                alt="Dollar Icon"
                width={60}
                height={40}
                className="absolute lg:block hidden -top-10 -right-6 md:-top-14 md:-right-10 w-10 md:w-auto object-contain"
                priority
              />
            </div>
            <p className="text-sm md:text-lg text-zinc-500 font-medium max-w-md mb-6 md:mb-8">
              These individuals are the heart and soul of our product.
            </p>
            {/* <Link href="/careers"> */}
            <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-8 py-3 md:px-10 md:py-4 text-sm md:text-base shadow-lg shadow-emerald-200 w-fit">
              Join Us
            </Button>
            {/* </Link> */}
            <Globe className=" lg:hidden absolute right-[10%] top-[15%] block w-23 h-13" />

            {/* Decorative floating coin/icon placeholder near header */}
            <div className="mt-12 hidden lg:block">
              {/* Placeholder for decoration */}
            </div>
          </div>

          {/* Top Cards - Spans 6 cols, shifted to the right */}

          <div className="lg:col-start-7 lg:col-span-6 grid  grid-cols-2 gap-3 md:gap-6 items-end">
            {topTeamMembers.map((member, index) => (
              <div key={index} className="h-full">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>

        <Globe className=" lg:block mx-auto hidden absolute top-[40%] left-[40%] " />
        {/* Bottom Section: 4 Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {bottomTeamMembers.map((member, index) => (
            <div key={index} className="h-full">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};
