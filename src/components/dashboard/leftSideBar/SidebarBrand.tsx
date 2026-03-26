import Link from "next/link";
import Image from "next/image";

export default function SidebarBrand() {
  return (
    <div
      className="
        w-[287.33px] h-[96.67px]
        px-4 pt-6 pb-[0.67px]
        border-b-[0.67px] border-slate-200
      "
    >
      <Link href="/dashboard" className="block">
        <div className="w-[239.33px] flex items-start gap-[8px]">
          {/* Logo */}
          <Image
            src="/images/dashboard/dashboardnav/waletlogo.png"
            alt="Wallet"
            width={64}
            height={64}
            className="object-contain -mt-1"
            priority
          />

          {/* Text */}
          <div className="flex flex-col justify-center leading-none">
            <p
              className="font-medium text-[20px] leading-[28px]"
              style={{
                fontFamily: "Quicksand, sans-serif",
                background: "linear-gradient(180deg, #00B86B 0%, #00E096 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              CashConnect
            </p>

            <p
              className="font-medium text-[12px] leading-[16px]"
              style={{
                fontFamily: "Quicksand, sans-serif",
                color: "#6B7280",
              }}
            >
              Financial Freedom
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
