type Props = {
  activity: string;
  earnings: string;
  date: string;
  expiry: string;
  status: string;
};

export default function EarningsHistoryRow({
  activity,
  earnings,
  date,
  expiry,
  status,
}: Props) {
  return (
    <div
      className="
        grid
        grid-cols-[1.5fr_1fr_1fr_1.4fr_0.8fr]
        items-center
        bg-white
        rounded-[14px]
        px-3 py-3
        text-[12px] lg:text-[13px]
        text-slate-600
        whitespace-nowrap
      "
    >
      <p className="truncate">{activity}</p>
      <p>{earnings}</p>
      <p>{date}</p>
      <p>{expiry}</p>
      <p className="text-emerald-600 font-medium">{status}</p>
    </div>
  );
}
