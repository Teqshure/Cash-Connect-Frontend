"use client";

import type { TransactionIcon } from "./TransactionsTable";
import {
  Bitcoin,
  Gift,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  RefreshCcw,
  Send,
} from "lucide-react";

type Props = {
  kind: TransactionIcon;
};

const cfg: Record<
  TransactionIcon,
  { Icon: React.ElementType; wrap: string; icon: string }
> = {
  crypto: {
    Icon: Bitcoin,
    wrap: "bg-emerald-100",
    icon: "text-emerald-700",
  },
  gift: {
    Icon: Gift,
    wrap: "bg-amber-100",
    icon: "text-amber-700",
  },
  fund: {
    Icon: ArrowDownLeft,
    wrap: "bg-emerald-100",
    icon: "text-emerald-700",
  },
  card: {
    Icon: CreditCard,
    wrap: "bg-rose-100",
    icon: "text-rose-700",
  },
  exchange: {
    Icon: RefreshCcw,
    wrap: "bg-emerald-100",
    icon: "text-emerald-700",
  },
  send: {
    Icon: Send,
    wrap: "bg-amber-100",
    icon: "text-amber-700",
  },
};

export default function TransactionTypeIcon({ kind }: Props) {
  const config = cfg[kind] ?? cfg.fund;
  const { Icon, wrap, icon } = config;

  return (
    <div
      className={[
        "h-9 w-9 rounded-[12px] grid place-items-center flex-shrink-0",
        wrap,
      ].join(" ")}
    >
      <Icon className={["h-4 w-4", icon].join(" ")} />
    </div>
  );
}
