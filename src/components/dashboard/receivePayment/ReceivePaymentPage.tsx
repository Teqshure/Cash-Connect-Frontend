"use client";

import { useRouter } from "next/navigation";
import ReceivePaymentFlow from "@/components/dashboard/receivePayment/ReceivePaymentFlow";

function ReceivePaymentPage() {
  const router = useRouter();

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <ReceivePaymentFlow onBack={() => router.push("/dashboard")} />
    </div>
  );
}

export default ReceivePaymentPage;
