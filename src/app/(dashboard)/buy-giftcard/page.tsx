"use client";

import { useRouter } from "next/navigation";
import BuyGiftCardFlow from "@/components/dashboard/giftcard/Buygiftcardflow";

export default function Page() {
  const router = useRouter();
  return (
    <div className="max-w-[680px] mx-auto py-6 px-4">
      <BuyGiftCardFlow onBack={() => router.push("/dashboard")} />
    </div>
  );
}
