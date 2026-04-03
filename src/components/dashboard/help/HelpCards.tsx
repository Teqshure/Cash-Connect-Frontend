"use client";

import { useRouter } from "next/navigation";
import { HelpCircle, Gift, Bitcoin } from "lucide-react";

export default function HelpCards() {
  const router = useRouter();

  const cards = [
    {
      title: "General Support",
      subtitle: "General FAQ",
      icon: HelpCircle,
      bg: "bg-[#CCF5E0]",
      titleColor: "text-[#232323]",
      subtitleColor: "text-[#00B86B]",
      route: "/dashboard/help/general",
    },
    {
      title: "Gift Card Support",
      subtitle: "FAQ on Gift Card",
      icon: Gift,
      bg: "bg-[#FE5C7317]",
      titleColor: "text-[#FE5C73]",
      subtitleColor: "text-[#B1B1B1]",
      route: "/dashboard/help/giftcard",
    },
    {
      title: "Crypto Support",
      subtitle: "Crypto Exchange FAQ",
      icon: Bitcoin,
      bg: "bg-[#F7931A1A]",
      titleColor: "text-[#F7931A]",
      subtitleColor: "text-[#A5ACB8]",
      route: "/dashboard/help/crypto",
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1052px] flex flex-col lg:flex-row gap-5">
        {cards.map((card, i) => {
          const Icon = card.icon;

          return (
            <div
              key={i}
              onClick={() => router.push(card.route)}
              className={`
                ${card.bg}
                w-full lg:w-[331px]
                h-[196px]
                rounded-[36px]
                px-[39px] py-[24px]
                flex items-center
                gap-[15px]
                cursor-pointer
                transition
                hover:scale-[1.02]
              `}
            >
              {/* ICON WRAPPER */}
              <div className="h-[50px] w-[50px] rounded-full bg-white flex items-center justify-center shrink-0">
                <Icon className="h-[24px] w-[24px] text-slate-700" />
              </div>

              {/* TEXT */}
              <div className="flex flex-col gap-[8px]">
                <p
                  className={`text-[20px] font-semibold leading-[100%] ${card.titleColor}`}
                  style={{ fontFamily: "Poppins" }}
                >
                  {card.title}
                </p>

                <p
                  className={`text-[16px] font-normal leading-[100%] ${card.subtitleColor}`}
                  style={{ fontFamily: "Poppins" }}
                >
                  {card.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
