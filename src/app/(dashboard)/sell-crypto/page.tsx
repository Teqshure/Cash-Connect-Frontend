"use client";

import { useRouter } from "next/navigation";
import SellCryptoFlow from "@/components/dashboard/sellCrypto/SellCryptoFlow";

export default function Page() {
  const router = useRouter();

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <SellCryptoFlow onBack={() => router.push("/dashboard")} />
    </div>
  );
}
