"use client";

import OrderRow from "./OrderRow";
import { Order } from "./orders.types";

const orders: Order[] = [
  {
    id: "ORD-2025-000",
    type: "Sell USDT → Bank Transfer",
    card: "1234 ****",
    date: "28/01, 12.30 AM",
    amount: "-$2,500",
  },
  {
    id: "ORD-2025-001",
    type: "Sell BTC → Wallet",
    card: "5678 ****",
    date: "28/01, 02.10 PM",
    amount: "-$1,200",
  },
];

export default function OrdersTable() {
  return (
    <div className="w-full">
      {/* HEADER */}
      <div
        className="
          grid
          grid-cols-[140px_1.8fr_120px_150px_120px_120px]
          text-[11px]
          text-emerald-600
          font-medium
          pb-2
          border-b border-slate-100
        "
      >
        <p>Transaction ID</p>
        <p>Trade Type</p>
        <p>Card</p>
        <p>Date</p>
        <p>Amount</p>
        <p>Receipt</p>
      </div>

      {/* ROWS */}
      <div className="mt-2 flex flex-col gap-1">
        {orders.map((order, index) => (
          <OrderRow key={index} order={order} />
        ))}
      </div>
    </div>
  );
}
