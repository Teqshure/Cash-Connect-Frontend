"use client";

import { useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { useSupportStore } from "@/store/useSupportStore";
import { useRouter } from "next/navigation";

const PRIORITY_OPTIONS = [
  { value: "Low",    label: "🟢 Low",    desc: "General questions or non-urgent issues" },
  { value: "Medium", label: "🔵 Medium", desc: "Moderate impact on account" },
  { value: "High",   label: "🟠 High",   desc: "Significant issue affecting transactions" },
  { value: "Urgent", label: "🔴 Urgent", desc: "Account blocked or funds at risk" },
];

interface Props {
  onClose: () => void;
}

export default function CreateTicketModal({ onClose }: Props) {
  const router = useRouter();
  const { createTicket } = useSupportStore();

  const [topic, setTopic] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !message.trim()) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const ticket = await createTicket({ topic: topic.trim(), priority, message: message.trim() });
      onClose();
      router.push(`/help/ticket?id=${ticket.id}`);
    } catch (err: any) {
      setError(err.message || "Failed to create ticket. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative bg-white w-full sm:max-w-lg sm:rounded-3xl rounded-t-3xl shadow-2xl z-10 overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-[18px] font-bold text-slate-800">Create Support Ticket</h2>
            <p className="text-[12px] text-slate-400 mt-0.5">We typically respond within 2 hours</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-slate-600" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {error && (
            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3 flex items-center gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <p className="text-[13px] text-rose-600">{error}</p>
            </div>
          )}

          {/* Topic */}
          <div>
            <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
              Topic / Issue Title *
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Withdrawal delay, Gift card trade issue..."
              maxLength={200}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl text-[14px] text-slate-700 placeholder:text-slate-400 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/25"
            />
          </div>

          {/* Priority */}
          <div>
            <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
              Priority *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRIORITY_OPTIONS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPriority(p.value)}
                  className={`text-left p-3 rounded-xl border-2 transition-all ${
                    priority === p.value
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-100 bg-slate-50 hover:border-slate-200"
                  }`}
                >
                  <p className="text-[12px] font-bold text-slate-700">{p.label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="text-[12px] font-semibold text-slate-500 uppercase tracking-wide block mb-2">
              Describe Your Issue *
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide as much detail as possible — transaction IDs, dates, amounts, and what you expected to happen..."
              rows={5}
              maxLength={2000}
              className="w-full px-4 py-3 bg-slate-50 rounded-xl text-[14px] text-slate-700 placeholder:text-slate-400 border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 resize-none"
            />
            <p className="text-[11px] text-slate-400 text-right mt-1">{message.length}/2000</p>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 pb-6 pt-4 border-t border-slate-100">
          <button
            onClick={handleSubmit}
            disabled={loading || !topic.trim() || !message.trim()}
            className="w-full py-4 rounded-xl bg-[#00B86B] hover:bg-[#009b5a] text-white font-bold text-[14px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Submitting…
              </>
            ) : (
              "Submit Ticket"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
