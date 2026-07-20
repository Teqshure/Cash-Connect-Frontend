import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";

function Item({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between py-2 hover:bg-slate-50 rounded-lg px-2 -mx-2 transition cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-slate-400" />
        <p className="text-[13px] text-slate-700">{title}</p>
      </div>

      <ChevronRight className="h-4 w-4 text-slate-400" />
    </Link>
  );
}

export default function LegalLinks() {
  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm flex flex-col gap-2">
      <Item title="Terms of Service" href="/terms" />
      <Item title="Privacy Policy" href="/privacy" />
    </div>
  );
}
