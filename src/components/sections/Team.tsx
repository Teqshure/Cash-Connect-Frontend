import { Section } from "@/components/ui/Section";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// Mock data for the two groups
const topTeamMembers = [
  {
    name: "Promise Adeime",
    role: "Founder",
    image: "/images/image-1.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adeime",
    role: "Founder",
    image: "/images/image-2.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
];

const bottomTeamMembers = [
  {
    name: "Promise Adeime",
    role: "Founder",
    image: "/images/image-3.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adeime",
    role: "Founder",
    image: "/images/image-4.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adeime",
    role: "Founder",
    image: "/images/image-5.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
  {
    name: "Promise Adeime",
    role: "Founder",
    image: "/images/image-6.png",
    description:
      "Trade your unused gift cards (Amazon, Steam, iTunes, etc.) for cash.",
  },
];

const TeamCard = ({ member }: { member: any }) => (
  <div className="rounded-[2.5rem] overflow-hidden group transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
    {/* Image Section - Takes distinct height */}
    <div className="relative w-full h-48 sm:h-56 bg-zinc-100">
      <Image
        src={member.image}
        alt={member.name}
        fill
        className="object-cover object-top"
      />
    </div>

    {/* Content Section - Green Bottom */}
    <div className="bg-[#007042] text-white p-6 grow flex flex-col justify-between relative">
      {/* Decorative top-right icon inside card */}
      <div className="absolute top-4 right-4 text-white/40">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </div>

      <div>
        <h3 className="text-lg font-bold mb-0 leading-tight">{member.name}</h3>
        <span className="text-xs text-emerald-200/80 font-medium uppercase tracking-wide block mb-3">
          {member.role}
        </span>
        <p className="text-sm text-emerald-50/70 font-medium leading-relaxed mb-4">
          {member.description}
        </p>
      </div>

      <button className="text-[10px] font-bold uppercase tracking-widest text-[#00D67D] hover:text-white transition-colors text-left">
        View Content
      </button>
    </div>
  </div>
);

export const Team = () => {
  return (
    <Section background="white" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Gradient glow top left similar to design */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-emerald-100/40 rounded-full blur-[120px]" />
        {/* Constellation/Nodes simple implementation */}
        {/* <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, #007042 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Top Section: Header (Left) + 2 Cards (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Header Content - Spans ~5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-center pr-8">
            <span className="text-emerald-500 font-bold tracking-widest uppercase text-xs mb-4 block">
              Cash Connect
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-[#007042] tracking-tight leading-tight mb-6">
              Welcome <br />
              Our Talented team
            </h2>
            <p className="text-lg text-zinc-500 font-medium max-w-md mb-8">
              These individuals are the heart and soul of our product.
            </p>
            <Link href="/careers">
              <Button className="rounded-full bg-[#00D67D] hover:bg-emerald-500 text-white font-bold px-10 py-4 shadow-lg shadow-emerald-200 w-fit">
                Join Us
              </Button>
            </Link>

            {/* Decorative floating coin/icon placeholder near header */}
            <div className="mt-12 hidden lg:block">
              {/* Placeholder for decoration */}
            </div>
          </div>

          {/* Top Cards - Spans ~7 cols */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            {topTeamMembers.map((member, index) => (
              <div key={index} className="h-full">
                <TeamCard member={member} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
