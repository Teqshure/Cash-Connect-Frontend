"use client";

import OrdersSection from "@/components/dashboard/orders/OrdersSection";
import OrdersFilterBar from "@/components/dashboard/orders/OrdersFilterBar";

export default function OrdersPage() {
  return (
    <div className="w-full max-w-[830px] mx-auto space-y-4">
      {/* ✅ OUTSIDE CARD  */}
      <OrdersFilterBar />

      {/* ✅ CARD */}
      <OrdersSection />
    </div>
  );
}
