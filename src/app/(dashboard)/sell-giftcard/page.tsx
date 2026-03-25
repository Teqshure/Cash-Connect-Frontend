"use client";

import { useRouter } from "next/navigation";
import SellGiftCardFlow from "../../../components/dashboard/giftcard/sell/SellGiftCardFlow";

export default function SellGiftCardPage() {
  const router = useRouter();

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <SellGiftCardFlow onBack={() => router.back()} />
    </div>
  );
}
