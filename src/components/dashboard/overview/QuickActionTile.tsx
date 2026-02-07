"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  label: string;
  href: string;
  icon: ReactNode;
  iconBgClassName?: string;
};

export default function QuickActionTile({
  label,
  href,
  icon,
  iconBgClassName = "bg-slate-100",
}: Props) {
  return (
    <Link
      href={href}
      className="
        w-full h-[120px]
        rounded-[18px] bg-white border border-slate-100
        shadow-[0_8px_20px_rgba(0,0,0,0.06)]
        flex flex-col items-center justify-center gap-3
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.10)]
        transition
        min-w-0
      "
    >
      {/* Icon box stays stable */}
      <div
        className={[
          "h-10 w-10 rounded-[12px] grid place-items-center shrink-0",
          iconBgClassName,
        ].join(" ")}
      >
        {icon}
      </div>

      {/* Label shrinks gracefully */}
      <p className="text-[11px] font-medium text-slate-700 text-center leading-tight px-2 w-full">
        {label}
      </p>
    </Link>
  );
}
