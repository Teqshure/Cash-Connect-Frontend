"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useSupportStore } from "@/store/useSupportStore";
import type { TicketMessage } from "@/store/useSupportStore";
import Link from "next/link";
import {
  ArrowLeft,
  Paperclip,
  Send,
  Loader2,
  AlertCircle,
  CheckCheck,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Circle,
  Shield,
} from "lucide-react";

const priorityBadge: Record<string, string> = {
  Urgent: "bg-red-50 text-red-500",
  High:   "bg-amber-50 text-amber-500",
  Medium: "bg-blue-50 text-blue-500",
  Low:    "bg-slate-100 text-slate-500",
};

const statusBadge: Record<string, string> = {
  Open:          "bg-amber-50 text-amber-600",
  "In Progress": "bg-blue-50 text-blue-500",
  Resolved:      "bg-emerald-500 text-white",
  Closed:        "bg-slate-100 text-slate-400",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

function groupByDate(messages: TicketMessage[]) {
  const groups: { date: string; items: TicketMessage[] }[] = [];
  for (const msg of messages) {
    const date = new Date(msg.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
    const existing = groups.find((g) => g.date === date);
    if (existing) existing.items.push(msg);
    else groups.push({ date, items: [msg] });
  }
  return groups;
}

export default function TicketChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { currentTicket, fetchTicketById, sendMessage, isLoading, isSending, error } = useSupportStore();
  const [reply, setReply] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) fetchTicketById(Number(id));
  }, [id, fetchTicketById]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentTicket?.messages?.length]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if ((!reply.trim() && !attachment) || !id) return;
    try {
      await sendMessage(Number(id), reply.trim(), attachment ?? undefined);
      setReply("");
      setAttachment(null);
    } catch (err: any) {
      alert(err.message || "Failed to send message");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
        <p className="text-slate-500 text-sm animate-pulse">Loading conversation…</p>
      </div>
    );
  }

  if (error || !currentTicket) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <AlertCircle className="w-10 h-10 text-rose-400" />
        <p className="text-slate-700 font-semibold">Ticket not found</p>
        <p className="text-slate-400 text-sm">{error ?? "This ticket does not exist or you do not have access."}</p>
        <Link href="/help" className="text-[#00B86B] font-bold text-sm">← Back to Help</Link>
      </div>
    );
  }

  const isClosed = currentTicket.status === "Closed" || currentTicket.status === "Resolved";
  const groups = groupByDate(currentTicket.messages ?? []);

  return (
    <div className="w-full px-4 lg:px-6 py-6 max-w-4xl mx-auto">
      {/* Back */}
      <Link
        href="/help"
        className="inline-flex items-center gap-2 text-[14px] text-slate-500 hover:text-slate-800 transition-colors font-medium mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Help & Tickets
      </Link>

      {/* Chat Container */}
      <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.04)] border border-slate-100/50 overflow-hidden flex flex-col" style={{ minHeight: "600px" }}>
        {/* Header */}
        <div className="px-5 pt-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-white">
          <div className="min-w-0">
            <h2 className="text-[16px] font-bold text-slate-800 truncate">{currentTicket.topic}</h2>
            <p className="text-[12px] text-slate-400 mt-0.5 font-medium">{currentTicket.ticket_number}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${priorityBadge[currentTicket.priority] ?? "bg-slate-100 text-slate-500"}`}>
              {currentTicket.priority}
            </span>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${statusBadge[currentTicket.status] ?? "bg-slate-100 text-slate-500"}`}>
              {currentTicket.status}
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4 bg-slate-50/30">
          {(currentTicket.messages ?? []).length === 0 && (
            <div className="flex flex-col items-center gap-2 py-10 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-[14px] font-semibold text-slate-700">Ticket submitted</p>
              <p className="text-[12px] text-slate-400">Our team has been notified and will reply shortly.</p>
            </div>
          )}

          {groups.map((group) => (
            <div key={group.date} className="space-y-3">
              {/* Date separator */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-100" />
                <span className="text-[11px] font-medium text-slate-400 shrink-0">{group.date}</span>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {group.items.map((msg) => {
                const isUser = msg.sender === "user";

                // Attachment
                if (!msg.message && msg.attachment_url) {
                  return (
                    <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                      <a
                        href={msg.attachment_url}
                        target="_blank"
                        rel="noreferrer"
                        className="border border-slate-200 bg-white rounded-2xl p-3.5 shadow-sm max-w-[70%] hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-emerald-600" />
                          </div>
                          <div>
                            <p className="text-[12px] font-semibold text-slate-700">Attachment</p>
                            <p className="text-[10px] text-slate-400">Click to download</p>
                          </div>
                        </div>
                        <p className="text-[11px] text-slate-400 text-right mt-1.5">{formatTime(msg.created_at)}</p>
                      </a>
                    </div>
                  );
                }

                if (isUser) {
                  return (
                    <div key={msg.id} className="flex justify-end">
                      <div className="bg-[#00B86B] text-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[78%] shadow-sm">
                        {msg.attachment_url && (
                          <a href={msg.attachment_url} target="_blank" rel="noreferrer" className="text-white/80 text-[12px] underline block mb-1.5">
                            📎 Attachment
                          </a>
                        )}
                        <p className="text-[13px] leading-relaxed">{msg.message}</p>
                        <div className="flex items-center gap-1 justify-end mt-1.5 text-white/60">
                          <span className="text-[11px]">{formatTime(msg.created_at)}</span>
                          <CheckCheck className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={msg.id} className="flex justify-start gap-2.5">
                    {/* Admin avatar */}
                    <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 mt-1">
                      <Shield className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div className="bg-white border border-slate-100 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[78%] shadow-sm">
                      <p className="text-[10px] font-bold text-emerald-600 mb-1">Support Team</p>
                      {msg.attachment_url && (
                        <a href={msg.attachment_url} target="_blank" rel="noreferrer" className="text-emerald-600 text-[12px] underline block mb-1.5">
                          📎 Attachment
                        </a>
                      )}
                      <p className="text-[13px] leading-relaxed">{msg.message}</p>
                      <p className="text-[11px] text-slate-400 text-right mt-1.5">{formatTime(msg.created_at)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Reply Box */}
        {isClosed ? (
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50 flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[13px]">
              This ticket is <strong className="text-slate-600">{currentTicket.status}</strong>. If you need further help, please create a new ticket.
            </p>
          </div>
        ) : (
          <div className="px-4 pb-4 border-t border-slate-100 pt-3 bg-white">
            {/* Attachment preview */}
            {attachment && (
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 text-[12px] text-slate-600">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  {attachment.name}
                  <button onClick={() => setAttachment(null)} className="text-slate-400 hover:text-rose-500 ml-1">×</button>
                </div>
              </div>
            )}

            <form onSubmit={handleSend}>
              <div className="border border-slate-200 rounded-2xl bg-white shadow-sm">
                <div className="flex items-center gap-3 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="shrink-0 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    ref={fileRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => setAttachment(e.target.files?.[0] ?? null)}
                  />
                  <input
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Type your message…"
                    className="flex-1 bg-transparent border-0 text-[14px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 px-4 pb-3">
                  <button
                    type="submit"
                    disabled={isSending || (!reply.trim() && !attachment)}
                    className="flex items-center gap-2 px-5 py-2 bg-[#00B86B] hover:bg-[#009b5a] text-white rounded-full text-[13px] font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  >
                    {isSending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5 fill-white" />}
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
