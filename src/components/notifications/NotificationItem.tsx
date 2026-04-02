export default function NotificationItem() {
  return (
    <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition cursor-pointer">
      {/* Avatar */}
      <div className="h-10 w-10 rounded-full bg-slate-200" />

      {/* Content */}
      <div className="flex-1">
        <p className="text-[13px] font-medium text-slate-800">
          Gold Coins In The Bag!
        </p>

        <p className="text-[12px] text-slate-500">
          You have earned 100 gold coins from your Complete Profile & KYC
          Verification transaction.
        </p>

        <p className="text-[11px] text-slate-400 mt-1">5 days ago</p>
      </div>
    </div>
  );
}
