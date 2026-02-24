"use client";

import {
  ArrowUpRight,
  ArrowDownLeft,
  Bitcoin,
  Gift,
  MoreHorizontal,
} from "lucide-react";
import QuickActionTile from "./QuickActionTile";

export default function QuickActionsSection() {
  return (
    <section className="w-full max-w-[900px] mx-auto">
      {/* Desktop */}
      <div className="hidden lg:grid grid-cols-5 gap-4">
        <QuickActionTile
          label="Send Payment"
          Icon={ArrowUpRight}
          iconBgClass="bg-[#E8F0FE]"
          iconColorClass="text-[#1A4FCC]"
        />
        <QuickActionTile
          label="Receive Payment"
          Icon={ArrowDownLeft}
          iconBgClass="bg-[#E3F7EC]"
          iconColorClass="text-[#0B7B4A]"
        />
        <QuickActionTile
          label="Sell Crypto"
          Icon={Bitcoin}
          iconBgClass="bg-[#FFF1D6]"
          iconColorClass="text-[#C26D0E]"
        />
        <QuickActionTile
          label="Buy Giftcard"
          Icon={Gift}
          iconBgClass="bg-[#FFE7D6]"
          iconColorClass="text-[#C95A0C]"
        />
        <QuickActionTile
          label="More"
          Icon={MoreHorizontal}
          iconBgClass="bg-[#F1F4F9]"
          iconColorClass="text-[#3A4A5E]"
        />
      </div>

      {/* Mobile */}
      <div className="lg:hidden flex gap-3 overflow-x-auto pb-2 px-4 -mx-4 [&::-webkit-scrollbar]:hidden">
        <div className="min-w-[156px]">
          <QuickActionTile
            label="Send Payment"
            Icon={ArrowUpRight}
            iconBgClass="bg-[#E8F0FE]"
            iconColorClass="text-[#1A4FCC]"
          />
        </div>
        <div className="min-w-[156px]">
          <QuickActionTile
            label="Receive Payment"
            Icon={ArrowDownLeft}
            iconBgClass="bg-[#E3F7EC]"
            iconColorClass="text-[#0B7B4A]"
          />
        </div>
        <div className="min-w-[156px]">
          <QuickActionTile
            label="Sell Crypto"
            Icon={Bitcoin}
            iconBgClass="bg-[#FFF1D6]"
            iconColorClass="text-[#C26D0E]"
          />
        </div>
        <div className="min-w-[156px]">
          <QuickActionTile
            label="Buy Giftcard"
            Icon={Gift}
            iconBgClass="bg-[#FFE7D6]"
            iconColorClass="text-[#C95A0C]"
          />
        </div>
        <div className="min-w-[156px]">
          <QuickActionTile
            label="More"
            Icon={MoreHorizontal}
            iconBgClass="bg-[#F1F4F9]"
            iconColorClass="text-[#3A4A5E]"
          />
        </div>
      </div>
    </section>
  );
}
