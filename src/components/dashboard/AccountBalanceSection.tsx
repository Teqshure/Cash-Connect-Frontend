"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  balance: number;
  currency?: string;
};

// image locations
const balanceIconSrc = "/images/dashboard/dollar-bag.png";
const fundIconSrc = "/images/dashboard/wallet.png";
const withdrawIconSrc = "/images/dashboard/withdraw.png";

function formatMoney(amount: number, currency = "$") {
  const safe = Number(amount || 0);
  return `${currency}${safe.toLocaleString("en-US")}`;
}

export default function AccountBalanceSection({
  balance,
  currency = "$",
}: Props) {
  const router = useRouter();

  return (
    <section className="flex flex-wrap gap-[15px]">
      {/* Account Balance */}
      <div className="w-full sm:w-[302px] h-[120px] rounded-2xl bg-white border border-slate-100 px-6 flex items-center shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <div className="flex items-center gap-4">
          <div className="h-[70px] w-[70px] rounded-full bg-emerald-50 grid place-items-center overflow-hidden">
            <Image
              src={balanceIconSrc}
              alt="Account balance"
              width={70}
              height={70}
              className="object-contain"
              priority
            />
          </div>

          <div>
            <p className="text-sm text-slate-400 font-medium">
              Account Balance
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {formatMoney(balance, currency)}
            </p>
          </div>
        </div>
      </div>

      {/* Fund Account */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/fund-account")}
        className="w-full sm:w-[302px] h-[120px] rounded-2xl bg-white border border-slate-100 px-6 flex items-center gap-4 text-left
                   shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                   hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition"
      >
        <div className="h-[70px] w-[70px] rounded-full bg-emerald-50 grid place-items-center overflow-hidden">
          <Image
            src={fundIconSrc}
            alt="Fund account"
            width={70}
            height={70}
            className="object-contain"
            priority
          />
        </div>
        <p className="text-base font-semibold text-emerald-700">Fund Account</p>
      </button>

      {/* Withdraw */}
      <button
        type="button"
        onClick={() => router.push("/dashboard/withdraw")}
        className="w-full sm:w-[302px] h-[120px] rounded-2xl bg-white border border-slate-100 px-6 flex items-center gap-4 text-left
                   shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                   hover:shadow-[0_14px_40px_rgba(15,23,42,0.10)] transition"
      >
        <div className="h-[70px] w-[70px] rounded-full bg-sky-50 grid place-items-center overflow-hidden">
          <Image
            src={withdrawIconSrc}
            alt="Withdraw"
            width={70}
            height={70}
            className="object-contain"
            priority
          />
        </div>
        <p className="text-base font-semibold text-sky-700">Withdraw</p>
      </button>
    </section>
  );
}
