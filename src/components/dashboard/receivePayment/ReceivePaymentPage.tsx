// src/app/(dashboard)/receive-payment/page.tsx

"use client";

import { useRouter } from "next/navigation";
import ReceivePaymentFlow from "@/components/dashboard/receivePayment/ReceivePaymentFlow";

export default function ReceivePaymentPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <ReceivePaymentFlow onBack={handleBack} />
    </div>
  );
}
