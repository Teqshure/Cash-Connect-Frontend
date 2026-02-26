"use client";

import { motion } from "framer-motion";

type EarningItem = {
  id: string;
  label: string;
  points: number;
};

const earnings: EarningItem[] = [
  { id: "1", label: "Complete KYC and profile verification", points: 50 },
  { id: "2", label: "Complete KYC and profile verification", points: 50 },
  { id: "3", label: "Complete KYC and profile verification", points: 50 },
  { id: "4", label: "Complete KYC and profile verification", points: 50 },
  { id: "5", label: "Complete KYC and profile verification", points: 50 },
];

export default function MobileEarningOpportunities() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="mt-6 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[16px] font-semibold text-slate-800">
          Earning Opportunities
        </h2>
        <button className="text-[13px] font-semibold text-slate-800">
          View All
        </button>
      </div>

      {/* List — each item is its own card like Figma */}
      <div className="space-y-2">
        {earnings.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * index }}
            className="flex items-center gap-4 px-4 py-4 bg-white rounded-[16px] border border-slate-100 shadow-[0_2px_8px_rgba(0,0,0,0.03)]"
          >
            {/* Grey circle placeholder */}
            <div className="h-10 w-10 rounded-full bg-slate-200 flex-shrink-0" />

            {/* Label */}
            <p className="flex-1 text-[13px] text-slate-700 leading-snug">
              {item.label}
            </p>

            {/* Points with money bag emoji */}
            <p className="text-[13px] font-bold text-slate-800 whitespace-nowrap">
              💰{item.points}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
