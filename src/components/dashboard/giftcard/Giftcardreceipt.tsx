"use client";

import { useEffect, useState } from "react";
import { Loader2, Eye, EyeOff, TrendingUp } from "lucide-react";
import { GiftCard, GiftCardProduct } from "@/store/giftCardStore";
import { useAuthStore, User } from "@/store/useAuthStore";
import { useRateStore } from "@/store/rateStore";
import { useRouter } from "next/navigation";

type Props = {
  mode: "buy" | "sell";
  card: GiftCard;
  product: GiftCardProduct;
  qty: number;
  isSubmitting?: boolean;
  onBack: () => void;
  onConfirm: () => void;
};

export default function GiftCardReceipt({
  mode,
  card,
  product,
  qty,
  isSubmitting = false,
  onBack,
  onConfirm,
}: Props) {
  const router = useRouter();
  const user = useAuthStore((s: { user: User | null }) => s.user);
  const {
    fetchRateByTypeAndId,
    getGiftCardBuyRate,
    getGiftCardSellRate,
    isLoading: ratesLoading,
  } = useRateStore();
  const [showBalance, setShowBalance] = useState(true);

  // ✅ Fetch the specific gift card rate on mount using the dedicated endpoint
  useEffect(() => {
    if (card?.id) {
      fetchRateByTypeAndId("gift_card", card.id);
    }
  }, [card?.id]);

  const wallet = user?.wallet;
  const balance = Number(wallet?.balance ?? 0);
  const transactionLimit = Number(wallet?.transaction_limit ?? 0);
  const growth = 5.2;

  const amount = Number(product.amount);
  const orderUSD = amount * qty;

  // ✅ FIXED: Using the correct typed getters — no hardcoded fallbacks
  const buyRate = getGiftCardBuyRate(card.id);
  const sellRate = getGiftCardSellRate(card.id);

  const orderNGN = orderUSD * buyRate;
  const sellNGN = orderUSD * sellRate;

  const isSell = mode === "sell";
  const displayAmount = isSell
    ? `₦${sellNGN.toLocaleString()}`
    : `₦${orderNGN.toLocaleString()}`;

  // Show loading if rates not yet fetched
  const rateReady = isSell ? sellRate > 0 : buyRate > 0;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Back */}
      <button
        onClick={onBack}
        disabled={isSubmitting}
        className="text-[13px] text-slate-500 mb-4 cursor-pointer disabled:cursor-not-allowed flex items-center gap-1 hover:text-slate-800 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-[20px] shadow-sm overflow-hidden">
        {/* HEADER — wallet card */}
        <div className="relative bg-emerald-600 px-5 py-5 text-white">
          {/* Growth badge */}
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full text-[11px] font-medium">
            <TrendingUp className="w-3 h-3" />
            {growth > 0 ? `+${growth}%` : `${growth}%`}
          </div>

          <p className="text-[12px] text-white/70">Total Balance</p>

          {/* Balance with show/hide */}
          <div className="flex items-center gap-2 mt-1">
            <p
              className={`text-[30px] font-semibold tracking-tight transition-all duration-300 ${showBalance ? "blur-0 opacity-100" : "blur-sm opacity-40"}`}
            >
              ₦{balance.toLocaleString()}
            </p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="opacity-80 hover:opacity-100 transition cursor-pointer"
            >
              {showBalance ? (
                <Eye className="w-5 h-5" />
              ) : (
                <EyeOff className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Transaction limit */}
          <div className="flex items-center justify-between mt-2 text-[12px] text-white/60">
            <span>Transaction Limit</span>
            <span className="text-white/80">
              ₦{transactionLimit.toLocaleString()}
            </span>
          </div>

          {/* Wallet actions */}
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => router.push("/wallet?tab=fund")}
              className="flex-1 h-[44px] rounded-[12px] bg-white text-emerald-700 text-[13px] font-semibold cursor-pointer hover:bg-white/90 transition"
            >
              + Fund Wallet
            </button>
            <button
              onClick={() => router.push("/wallet?tab=withdraw")}
              className="flex-1 h-[44px] rounded-[12px] bg-white/20 text-white text-[13px] font-semibold cursor-pointer hover:bg-white/30 transition"
            >
              ↓ Withdraw
            </button>
          </div>
        </div>

        {/* DETAILS */}
        <div className="px-5 py-5">
          <h3 className="text-[16px] font-semibold mb-4">{card.name}</h3>

          {ratesLoading || !rateReady ? (
            <div className="flex justify-center py-6">
              <Loader2 className="h-5 w-5 animate-spin text-emerald-500" />
            </div>
          ) : (
            <div className="space-y-3 text-[13px]">
              <DetailRow
                label="Date"
                value={new Date().toLocaleString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              />
              <DetailRow label="Name" value={card.name} />
              <DetailRow
                label="Value (qty)"
                value={`${product.currency} ${amount.toLocaleString()} (x${qty})`}
              />
              <DetailRow
                label="Rate"
                value={`₦${(isSell ? sellRate : buyRate).toLocaleString()}/$`}
              />
              <DetailRow label="Deliver to" value="—" />
              <DetailRow label="Order Amount" value={displayAmount} highlight />
              <DetailRow label="Transaction fee" value="₦0" highlight />

              {/* Total */}
              <div className="flex justify-between pt-2 border-t">
                <span className="font-bold text-emerald-700">Total Amount</span>
                <span className="font-bold text-emerald-700 text-[16px]">
                  {displayAmount}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* ACTION BUTTON */}
        <div className="p-4">
          <button
            onClick={onConfirm}
            disabled={isSubmitting || ratesLoading || !rateReady}
            className={[
              "w-full h-[52px] rounded-[12px] text-white font-semibold flex items-center justify-center gap-2 transition",
              isSubmitting || ratesLoading || !rateReady
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:brightness-110 cursor-pointer",
            ].join(" ")}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSubmitting ? "Processing..." : isSell ? "Sell Now" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex justify-between">
      <span
        className={
          highlight ? "text-emerald-600 font-medium" : "text-slate-500"
        }
      >
        {label}:
      </span>
      <span className={highlight ? "font-semibold" : ""}>{value}</span>
    </div>
  );
}
