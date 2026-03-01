"use client";

import {
  ArrowUpRight,
  ArrowDownLeft,
  Bitcoin,
  Gift,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import QuickActionTile from "./QuickActionTile";

export default function QuickActionsSection() {
  const router = useRouter();

  const actions = [
    {
      label: "Send Payment",
      Icon: ArrowUpRight,
      iconBgClass: "bg-[#E8F0FE]",
      iconColorClass: "text-[#1A4FCC]",
      href: "/send-payment",
    },
    {
      label: "Receive Payment",
      Icon: ArrowDownLeft,
      iconBgClass: "bg-[#E3F7EC]",
      iconColorClass: "text-[#0B7B4A]",
      href: "/receive-payment",
    },
    {
      label: "Sell Crypto",
      Icon: Bitcoin,
      iconBgClass: "bg-[#FFF1D6]",
      iconColorClass: "text-[#C26D0E]",
      href: "/sell-crypto",
    },
    {
      label: "Buy Giftcard",
      Icon: Gift,
      iconBgClass: "bg-[#FFE7D6]",
      iconColorClass: "text-[#C95A0C]",
      href: "/buy-giftcard",
    },
    {
      label: "More",
      Icon: MoreHorizontal,
      iconBgClass: "bg-[#F1F4F9]",
      iconColorClass: "text-[#3A4A5E]",
      href: "/more",
    },
  ];

  return (
    <section className="w-full max-w-[900px] mx-auto">
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-5 gap-4">
        {actions.map(({ label, Icon, iconBgClass, iconColorClass, href }) => (
          <QuickActionTile
            key={label}
            label={label}
            Icon={Icon}
            iconBgClass={iconBgClass}
            iconColorClass={iconColorClass}
            onClick={() => router.push(href)}
          />
        ))}
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 px-4 -mx-4 [&::-webkit-scrollbar]:hidden">
        {actions.map(({ label, Icon, iconBgClass, iconColorClass, href }) => (
          <div key={label} className="min-w-[156px]">
            <QuickActionTile
              label={label}
              Icon={Icon}
              iconBgClass={iconBgClass}
              iconColorClass={iconColorClass}
              onClick={() => router.push(href)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
