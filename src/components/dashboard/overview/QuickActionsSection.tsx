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
    <section className="w-full">
      {/* Always 1 row, 5 columns. Tiles shrink to fit. */}
      <div className="w-full max-w-[837px] grid grid-cols-5 gap-6">
        <QuickActionTile
          label="Send Payment"
          href="/dashboard/send"
          icon={<ArrowUpRight className="h-5 w-5 text-blue-600" />}
          iconBgClassName="bg-blue-50"
        />

        <QuickActionTile
          label="Receive Payment"
          href="/dashboard/receive"
          icon={<ArrowDownLeft className="h-5 w-5 text-emerald-600" />}
          iconBgClassName="bg-emerald-50"
        />

        <QuickActionTile
          label="Sell Crypto"
          href="/dashboard/sell-crypto"
          icon={<Bitcoin className="h-5 w-5 text-amber-600" />}
          iconBgClassName="bg-amber-50"
        />

        <QuickActionTile
          label="Buy Giftcard"
          href="/dashboard/buy-giftcard"
          icon={<Gift className="h-5 w-5 text-rose-600" />}
          iconBgClassName="bg-rose-50"
        />

        <QuickActionTile
          label="More"
          href="/dashboard/more"
          icon={<MoreHorizontal className="h-5 w-5 text-slate-600" />}
          iconBgClassName="bg-slate-100"
        />
      </div>
    </section>
  );
}
