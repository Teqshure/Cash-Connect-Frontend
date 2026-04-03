"use client";

import { useState } from "react";
import OrdersHeader from "./OrdersHeader";
import OrdersTable from "./OrdersTable";
import OrdersFilterBar from "./OrdersFilterBar";

export default function OrdersSection() {
  const [search, setSearch] = useState("");

  return (
    <div className="w-full max-w-[830px] mx-auto space-y-4">
      {/* ONLY SEARCH BAR */}
      <OrdersFilterBar onSearch={setSearch} />

      <div className="bg-white rounded-[20px] border border-slate-100 p-5">
        <OrdersHeader />
        <OrdersTable search={search} />
      </div>
    </div>
  );
}
