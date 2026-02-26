import Link from "next/link";
import Image from "next/image";

export default function SidebarBrand() {
  return (
    <div
      className="
        w-[287.33px] h-[96.67px]
        px-6 pt-6 pb-[0.67px]
        border-b-[0.67px] border-slate-200
      "
    >
      <Link href="/dashboard" className="block">
        <div className="w-[239.33px] h-[48px] flex items-center gap-[12px]">
          {/* Logo: 48×48, r=16, gradient + exact shadows */}
          <div
            className="w-12 h-12 flex items-center justify-center"
            style={{
              borderRadius: "16px",
              background: "linear-gradient(180deg, #00B86B 0%, #00E096 100%)",
              boxShadow:
                "0px 4px 6px -4px rgba(0, 0, 0, 0.10), 0px 10px 15px -3px rgba(0, 0, 0, 0.10)",
            }}
          >
            <Image
              src="/images/dashboard/dashboardnav/walletlogo.png"
              alt="Wallet"
              width={28}
              height={28}
              className="object-contain"
              priority
            />
          </div>

          {/* Text */}
          <div className="leading-tight">
            <p
              className="font-medium text-[20px] leading-[28px] relative"
              style={{
                fontFamily: "Quicksand, sans-serif",
                width: "124px",
                height: "28px",
                top: "-2.33px",
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
                width: "104px",
                height: "16px",
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
