"use client";

import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";

export default function OrdersSection() {
  return (
    <div
      className="
        w-full max-w-[788px]
        bg-white
        rounded-[16px]
        border border-slate-100
        shadow-sm

        px-[18px]
        py-[15px]

        flex flex-col gap-[12px]
      "
    >
      <OrdersHeader />
      <OrdersTable />
    </div>
  );
}
