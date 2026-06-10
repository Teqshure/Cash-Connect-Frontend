"use client";

import { useRouter } from "next/navigation";

export default function NotificationSidebar() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      {/* Card */}
      <div className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white p-4 rounded-xl">
        <p className="text-sm">Special Offer!</p>
        <p className="text-[13px] mt-2">
          Get 20% discount on all gift card purchases this week
        </p>

        <button 
          onClick={() => router.push("/giftcard")}
          className="mt-3 bg-white text-purple-600 px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-slate-50 transition"
        >
          Shop Now
        </button>
      </div>

      {/* Crypto */}
      <div className="bg-white p-4 rounded-xl">
        <p className="text-sm font-semibold mb-2">Crypto Market</p>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Bitcoin</span>
            <span>₦42,850,000</span>
          </div>

          <div className="flex justify-between">
            <span>Ethereum</span>
            <span>₦2,845,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
