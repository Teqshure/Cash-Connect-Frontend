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
          <Image
            src="/logo.png"
            alt="Cash Connect Logo"
            width={160}
            height={48}
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
}
