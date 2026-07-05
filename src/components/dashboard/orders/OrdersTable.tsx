"use client";

import { useEffect, useState } from "react";
import OrderRow from "./OrderRow";
import { Order } from "./orders.types";
import { useGiftCardStore } from "@/store/giftCardStore";
import { Loader2 } from "lucide-react";
import OrderDetailModal from "./OrderDetailModal";

type Props = {
  search: string;
};

export default function OrdersTable({ search }: Props) {
  const orders = useGiftCardStore((s: any) => s.orders);
  const fetchUserOrders = useGiftCardStore((s: any) => s.fetchUserOrders);
  const isLoading = useGiftCardStore((s: any) => s.isLoading);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchUserOrders();
  }, [fetchUserOrders]);

  const mappedOrders: Order[] = orders.map((o: any) => {
    const d = new Date(o.created_at || Date.now());
    const formattedDate = d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
    }) + ", " + d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      id: `ORD-${String(o.id).padStart(5, "0")}`,
      type: o.product?.gift_card?.name ? `Buy ${o.product.gift_card.name}` : "Buy Giftcard",
      card: o.product ? `${o.product.currency} ${parseFloat(o.product.amount).toLocaleString()}` : "N/A",
      date: formattedDate,
      amount: `₦${parseFloat(o.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      cardCode: o.product?.card_code,
      cardPin: o.product?.card_pin,
      quantity: o.quantity,
      status: o.status,
      brandImage: o.product?.gift_card?.image || null,
      createdAt: o.created_at || "",
    };
  });

  // Sort descending by createdAt (latest order at the top)
  const sortedOrders = [...mappedOrders].sort((a, b) => {
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });

  const filteredOrders = sortedOrders.filter((order) => {
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
            {isLoading ? (
              <div className="py-12 flex justify-center items-center gap-2 text-slate-400">
                <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
                <span className="text-sm">Loading orders...</span>
              </div>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <OrderRow key={index} order={order} onSelect={setSelectedOrder} />
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm py-8">
                No orders found
              </p>
            )}
          </div>
        </div>
      </div>

      <OrderDetailModal
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
        order={selectedOrder}
      />
    </div>
  );
}
