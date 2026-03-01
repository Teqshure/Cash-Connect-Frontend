"use client";

import { useRouter } from "next/navigation";

// Import each component directly — add one at a time to find the broken one
import SendPaymentFlow from "@/components/dashboard/sendPayment/SendPaymentFlow";

export default function Page() {
  const router = useRouter();

  return (
    <div className="max-w-[640px] mx-auto py-6 px-4">
      <SendPaymentFlow onBack={() => router.push("/dashboard")} />
    </div>
  );
}
