"use client";

import { motion } from "framer-motion";

type Transaction = {
  id: string;
  code: string;
  type: string;
  iconUrl: string;
};

const transactions: Transaction[] = [
  {
    id: "1",
    code: "a3G6hk^7yB",
    type: "Crypto Buy",
    iconUrl: "https://cdn.coinranking.com/B1oPuTyfX/bnb.svg",
  },
  {
    id: "2",
    code: "a3G6hk^7yB",
    type: "Crypto Buy",
    iconUrl: "https://cdn.coinranking.com/rk4RKHOuW/eth.svg",
  },
  {
    id: "3",
    code: "a3G6hk^7yB",
    type: "Gift Card Buy",
    iconUrl: "https://logo.clearbit.com/amazon.com",
  },
];

export default function MobileRecentTransactions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mt-6 mb-6"
    >
      <h2 className="text-[16px] font-semibold text-slate-800 mb-3">
        Recent Transactions
      </h2>

      {/* Single card with dividers — matches Figma */}
      <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`flex items-center gap-4 px-4 py-4 ${
              index < transactions.length - 1 ? "border-b border-slate-100" : ""
            }`}
          >
            {/* Circular coin/brand image */}
            <div className="h-11 w-11 rounded-full overflow-hidden flex-shrink-0 bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={tx.iconUrl}
                alt={tx.type}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Transaction code */}
            <p className="flex-1 text-[13px] font-medium text-slate-700 font-mono">
              {tx.code}
            </p>

            {/* Transaction type */}
            <p className="text-[13px] font-bold text-slate-900">{tx.type}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
