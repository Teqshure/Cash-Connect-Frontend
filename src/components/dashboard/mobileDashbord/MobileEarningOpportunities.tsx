"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

type EarningItem = {
  id: string;
  label: string;
  value: string;
};

const earnings: EarningItem[] = [
  {
    id: "1",
    label: "Complete KYC and profile verification",
    value: "$50",
  },
  {
    id: "2",
    label: "Complete KYC and profile verification",
    value: "$50",
  },
  {
    id: "3",
    label: "Complete KYC and profile verification",
    value: "$50",
  },
  {
    id: "4",
    label: "Complete KYC and profile verification",
    value: "$50",
  },
];

export default function MobileEarningOpportunities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="px-4 mt-6 mb-6"
    >
      {/* Header with View All */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Earning Opportunities
        </h2>
        <button className="text-[12px] font-medium text-emerald-600 flex items-center gap-1">
          View All <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Earnings List */}
      <div className="bg-white rounded-[18px] border border-slate-100 divide-y divide-slate-100">
        {earnings.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center justify-between p-4"
          >
            <p className="text-[13px] text-slate-700">{item.label}</p>
            <p className="text-[13px] font-bold text-slate-800">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
