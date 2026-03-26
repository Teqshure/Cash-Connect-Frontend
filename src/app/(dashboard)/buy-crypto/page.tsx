"use client";

import { useRouter } from "next/navigation";
import BuyCryptoFlow from "@/components/dashboard/buyCrypto/BuyCryptoFlow";

export default function BuyCryptoPage() {
  const router = useRouter();

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <BuyCryptoFlow onBack={() => router.push("/dashboard")} />
    </div>
  );
}
