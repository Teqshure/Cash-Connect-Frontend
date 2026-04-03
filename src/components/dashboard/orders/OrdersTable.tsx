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

type Props = {
  search: string;
};

export default function OrdersTable({ search }: Props) {
  const filteredOrders = orders.filter((order) => {
    const value = search.toLowerCase();

    return (
      order.id.toLowerCase().includes(value) ||
      order.type.toLowerCase().includes(value) ||
      order.card.toLowerCase().includes(value) ||
      order.date.toLowerCase().includes(value) ||
      order.amount.toLowerCase().includes(value)
    );
  });

  return (
    <div className="w-full">
      <div className="w-full overflow-x-auto">
        <div className="min-w-[700px] mx-auto">
          {/* HEADER */}
          <div className="grid grid-cols-[130px_1.6fr_110px_140px_110px_110px] text-[11px] text-emerald-600 font-medium pb-3 border-b border-slate-100">
            <p>Transaction ID</p>
            <p>Trade Type</p>
            <p>Card</p>
            <p>Date</p>
            <p>Amount</p>
            <p>Receipt</p>
          </div>

          {/* ROWS */}
          <div className="mt-2 flex flex-col gap-[6px]">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderRow key={index} order={order} />
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm py-6">
                No transactions found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
