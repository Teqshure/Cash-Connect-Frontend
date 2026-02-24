"use client";

import SpecialOfferCard from "./SpecialOfferCard";
import CryptoMarketWidget from "./CryptoMarketWidget";
import EarnRewardsCard from "./EarnRewardsCard";
import AccountStatsWidget from "./AccountStatsWidget";

export default function RightSidebarSection() {
  return (
    <aside className="w-[227px] flex flex-col gap-4">
      <SpecialOfferCard />
      <CryptoMarketWidget />
      <EarnRewardsCard />
      <AccountStatsWidget />
    </aside>
  );
}
