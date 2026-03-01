"use client";

/**
 * SendPaymentPage — Desktop
 * Renders the send payment flow inline in the dashboard content area.
 */

import { useRouter } from "next/navigation";
import SendPaymentFlow from "@/components/dashboard/sendPayment/SendPaymentFlow";

export default function SendPaymentPage() {
  const router = useRouter();

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <SendPaymentFlow onBack={() => router.push("/dashboard")} />
    </div>
  );
}
