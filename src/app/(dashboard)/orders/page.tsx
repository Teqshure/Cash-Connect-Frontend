"use client";

import OrdersSection from "@/components/dashboard/orders/OrdersSection";

export default function OrdersPage() {
  return (
    <div className="w-full max-w-[830px] mx-auto space-y-4">
      {/* ✅ CARD */}
      <OrdersSection />
    </div>
  );
}
