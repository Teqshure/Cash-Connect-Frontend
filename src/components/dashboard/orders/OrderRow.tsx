"use client";

import { Order } from "./orders.types";

export default function OrderRow({ order }: { order: Order }) {
  return (
    <div
      className="
        grid
        grid-cols-[130px_1.6fr_110px_140px_110px_110px]
        items-center
        text-[12px]
        text-slate-700
        h-[36px]
        px-1
        rounded-[10px]
        hover:bg-slate-50
        transition
        whitespace-nowrap
      "
    >
      {/* ID */}
      <p className="text-slate-600">{order.id}</p>

      {/* TYPE */}
      <p className="leading-[16px] truncate">{order.type}</p>

      {/* CARD */}
      <p className="text-slate-600">{order.card}</p>

      {/* DATE */}
      <p className="text-slate-500">{order.date}</p>

      {/* AMOUNT */}
      <p className="text-rose-500 font-semibold">{order.amount}</p>

      {/* RECEIPT */}
      <button
        className="
          h-[28px]
          px-3
          rounded-full
          border border-emerald-500
          text-emerald-600
          text-[11px]
          font-medium
          hover:bg-emerald-50
          transition
        "
      >
        Download
      </button>
    </div>
  );
}
