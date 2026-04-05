"use client";

import { useRouter } from "next/navigation";
import { Gift, Bitcoin, ArrowDownLeft, Sparkles, Users } from "lucide-react";

type Service = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  sparkleColor: string;
  comingSoon?: boolean;
};

const SERVICES: Service[] = [
  {
    id: "buy-giftcard",
    label: "Buy Gift Card",
    description: "Get 20% discount on all gift card purchases this week",
    href: "/buy-giftcard",
    icon: Gift,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkleColor: "text-orange-200",
  },
  {
    id: "buy-crypto",
    label: "Buy Crypto",
    description: "Get 20% discount on all gift card purchases this week",
    href: "/buy-crypto",
    icon: Bitcoin,
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    sparkleColor: "text-yellow-200",
  },

  {
    id: "receive-payment",
    label: "Receive Payment",
    description: "Get 20% discount on all gift card purchases this week",
    href: "/receive-payment",
    icon: ArrowDownLeft,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    sparkleColor: "text-emerald-200",
  },
  {
    id: "sell-giftcard",
    label: "Sell Gift Card",
    description: "Get 20% discount on all gift card purchases this week",
    href: "/sell-giftcard",
    icon: Gift,
    iconBg: "bg-teal-50",
    iconColor: "text-teal-500",
    sparkleColor: "text-teal-200",
  },
  {
    id: "sell-crypto",
    label: "Sell Crypto",
    description: "Get 20% discount on all gift card purchases this week",
    href: "/sell-crypto",
    icon: Bitcoin,
    iconBg: "bg-pink-50",
    iconColor: "text-pink-500",
    sparkleColor: "text-orange-200",
  },
  {
    id: "p2p",
    label: "P2P Transfer",
    description: "Coming Soon",
    href: "#",
    icon: Users,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    sparkleColor: "text-orange-200",
    comingSoon: true,
  },
];

export default function ProductsPage() {
  const router = useRouter();

  const handleClick = (service: Service) => {
    if (service.comingSoon) return;
    router.push(service.href);
  };

  return (
    <div className="w-full pb-8">
      {/* ── Back header pill — mobile only ───────────────────────────── */}
      <div className="lg:hidden flex items-center gap-3 mt-4 mb-6 mx-4 bg-white rounded-full px-4 py-3 shadow-sm border border-slate-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="h-9 w-9 rounded-full border-2 border-emerald-500 flex items-center justify-center cursor-pointer hover:bg-emerald-50 transition flex-shrink-0"
        >
          <ArrowDownLeft className="h-4 w-4 text-emerald-600 rotate-45" />
        </button>
        <h1 className="text-[18px] font-semibold text-emerald-600 flex-1 text-center pr-9">
          Our Services
        </h1>
      </div>

      {/* ── Desktop title only ────────────────────────────────────────── */}
      <h1 className="hidden lg:block text-[22px] font-semibold text-slate-900 mb-6">
        Our Services
      </h1>

      {/* ── Desktop: 3-col grid ────────────────────────────────────────── */}
      <div className="hidden lg:grid grid-cols-3 gap-4">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} onClick={() => handleClick(s)} />
        ))}
      </div>

      {/* ── Mobile: stacked full-width cards ──────────────────────────── */}
      <div className="lg:hidden flex flex-col gap-3 px-4">
        {SERVICES.map((s) => (
          <ServiceCard key={s.id} service={s} onClick={() => handleClick(s)} />
        ))}

        {/* Special Offer banner — mobile only */}
        <div className="mt-2 mx-0 rounded-[20px] bg-gradient-to-br from-purple-500 to-pink-500 p-6 text-white">
          <Sparkles className="h-7 w-7 mb-3 text-white/90" />
          <p className="text-[18px] font-bold mb-1">Special Offer!</p>
          <p className="text-[13px] text-white/80 leading-5 mb-4">
            Get 20% discount on all gift card purchases this week
          </p>
          <button
            type="button"
            onClick={() => router.push("/buy-giftcard")}
            className="w-full h-[48px] rounded-[14px] bg-white text-purple-600 font-semibold text-[15px] hover:bg-white/90 transition cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Shared card ────────────────────────────────────────────────────────────

type CardProps = {
  service: Service;
  onClick: () => void;
};

function ServiceCard({ service, onClick }: CardProps) {
  const {
    label,
    description,
    icon: Icon,
    iconBg,
    iconColor,
    sparkleColor,
    comingSoon,
  } = service;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={comingSoon}
      className={[
        "relative w-full h-[236px] text-left bg-white rounded-[18px] border border-slate-100 shadow-sm transition-all duration-200 overflow-hidden",
        comingSoon
          ? "opacity-70 cursor-not-allowed"
          : "hover:border-emerald-300 hover:shadow-md cursor-pointer",
      ].join(" ")}
    >
      {/* Decorative Sparkle - Top Right */}
      <div className={`absolute top-8 right-8 ${sparkleColor} opacity-40`}>
        <Sparkles className="h-5 w-5" />
      </div>

      {/* Icon - Exact Figma positioning */}
      <div
        className={`absolute top-[33px] left-[29px] w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center`}
      >
        <Icon className={`h-6 w-6 ${iconColor}`} />
      </div>

      {/* Text Content - Exact Figma positioning */}
      <div className="absolute top-[104px] left-[29px] w-[179px] flex flex-col gap-[9px]">
        <h3 className="text-base font-semibold text-slate-900">{label}</h3>
        <p className="text-sm text-slate-500 leading-snug">{description}</p>
      </div>

      {/* Coming Soon Overlay */}
      {comingSoon && (
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
          <span className="px-4 py-2 bg-slate-100 text-slate-600 text-sm font-medium rounded-full">
            Coming Soon
          </span>
        </div>
      )}
    </button>
  );
}
