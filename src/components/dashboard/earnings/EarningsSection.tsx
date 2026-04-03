"use client";

import { useState } from "react";
import EarningsTabs from "./EarningsTabs";
import EarningsSpots from "./EarningsSpots";
import EarningsHistory from "./EarningsHistory";

export default function EarningsSection() {
  const [active, setActive] = useState<"spots" | "history">("spots");

  return (
    <section className="w-full max-w-[830px] mx-auto">
      <EarningsTabs active={active} setActive={setActive} />

      {active === "spots" ? <EarningsSpots /> : <EarningsHistory />}
    </section>
  );
}
