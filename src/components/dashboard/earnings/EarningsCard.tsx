type Props = {
  title: string;
  amount: string;
};

export default function EarningsCard({ title, amount }: Props) {
  return (
    <div className="flex justify-between items-center bg-white rounded-[14px] px-4 py-3">
      <p className="text-[13px] text-slate-700">{title}</p>
      <p className="text-[13px] font-semibold text-emerald-600">{amount}</p>
    </div>
  );
}
