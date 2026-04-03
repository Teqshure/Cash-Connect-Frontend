"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function FAQItem({
  index,
  question,
  answer,
}: {
  index: number;
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(index === 1);

  return (
    <div className="border-b pb-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <p className="text-slate-400 font-semibold">
            {String(index).padStart(2, "0")}
          </p>

          <div>
            <p className="text-[14px] font-medium text-slate-800">{question}</p>

            {open && (
              <p className="text-[13px] text-slate-500 mt-2 max-w-[500px]">
                {answer}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="h-[30px] w-[30px] rounded-full bg-slate-100 flex items-center justify-center"
        >
          {open ? (
            <X className="h-4 w-4 text-emerald-600" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
