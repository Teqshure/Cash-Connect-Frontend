"use client";

import { motion } from "framer-motion";
import { Bitcoin, Gift } from "lucide-react";

type Transaction = {
  id: string;
  code: string;
  type: string;
  icon: "crypto" | "gift";
};

const transactions: Transaction[] = [
  {
    id: "1",
    code: "a3G6hk^7yB",
    type: "Crypto Buy",
    icon: "crypto",
  },
  {
    id: "2",
    code: "a3G6hk^7yB",
    type: "Crypto Buy",
    icon: "crypto",
  },
  {
    id: "3",
    code: "amazon a3G6hk^7yB",
    type: "Gift Card Buy",
    icon: "gift",
  },
];

const getIcon = (type: Transaction["icon"]) => {
  switch (type) {
    case "crypto":
      return { icon: Bitcoin, bg: "bg-[#FFF3CC]", color: "text-[#B45309]" };
    case "gift":
      return { icon: Gift, bg: "bg-[#FFE8CC]", color: "text-[#EA580C]" };
    default:
      return { icon: Bitcoin, bg: "bg-[#FFF3CC]", color: "text-[#B45309]" };
  }
};

export default function MobileRecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="px-4 mt-6 mb-6"
    >
      {/* Header */}
      <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
        Recent Transactions
      </h2>

      {/* Transactions List */}
      <div className="space-y-2">
        {transactions.map((tx, index) => {
          const { icon: Icon, bg, color } = getIcon(tx.icon);

          return (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="flex items-center gap-3 p-3 bg-white rounded-[16px] border border-slate-100 shadow-[0_4px_10px_rgba(0,0,0,0.02)]"
            >
              {/* Icon */}
              <div
                className={`h-10 w-10 rounded-[14px] ${bg} flex items-center justify-center flex-shrink-0`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
              </div>

              {/* Code - Left side */}
              <p className="flex-1 text-[13px] font-medium text-slate-800 font-mono">
                {tx.code}
              </p>

              {/* Type - Right side, bold */}
              <p className="text-[13px] font-bold text-slate-800">{tx.type}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
