"use client";

import type { ElementType } from "react";

type Props = {
  label: string;
  Icon: ElementType;
  iconBgClass?: string;
  iconColorClass?: string;
  onClick?: () => void;
};

export default function QuickActionTile({
  label,
  Icon,
  iconBgClass = "bg-[#F1F4F9]",
  iconColorClass = "text-[#3A4A5E]",
  onClick,
}: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full
        h-[132px]
        rounded-2xl
        bg-white
        border border-[#E6EDF4]
        shadow-[0_8px_20px_rgba(0,0,0,0.04)]
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.08)]
        transition-all
        duration-200
        flex flex-col items-center justify-center
        p-4
      "
    >
      {/* Icon bubble */}
      <div
        className={[
          "h-14 w-14 rounded-xl flex items-center justify-center",
          iconBgClass,
        ].join(" ")}
      >
        <Icon className={["h-6 w-6", iconColorClass].join(" ")} />
      </div>

      {/* Label */}
      <p className="mt-3 text-sm font-medium text-[#1A2B3E] text-center">
        {label}
      </p>
    </button>
  );
}
