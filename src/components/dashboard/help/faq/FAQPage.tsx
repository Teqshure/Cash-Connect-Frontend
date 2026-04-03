"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FAQItem from "./FAQItem";

type Props = {
  title: string;
  data: {
    question: string;
    answer: string;
  }[];
};

export default function FAQPage({ title, data }: Props) {
  const router = useRouter();

  return (
    <div className="w-full px-4 lg:px-6 py-6">
      {/* HEADER */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="h-[36px] w-[36px] rounded-full border flex items-center justify-center"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        <h1 className="text-[20px] font-semibold text-emerald-600">{title}</h1>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-6">
        {data.map((item, i) => (
          <FAQItem key={i} index={i + 1} {...item} />
        ))}
      </div>
    </div>
  );
}
