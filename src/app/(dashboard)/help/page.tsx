"use client";

import { useEffect, useState } from "react";
import HelpCards from "@/components/dashboard/help/HelpCards";
import HelpContact from "@/components/dashboard/help/HelpContact";
import HelpWhatsApp from "@/components/dashboard/help/HelpWhatsApp";
import CreateTicketModal from "@/components/dashboard/help/CreateTicketModal";
import { useSupportStore } from "@/store/useSupportStore";
import { useRouter } from "next/navigation";
import {
  Plus,
  Loader2,
  TicketIcon,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Circle,
} from "lucide-react";

const priorityBadge: Record<string, string> = {
  Urgent: "bg-red-50 text-red-500",
  High:   "bg-amber-50 text-amber-500",
  Medium: "bg-blue-50 text-blue-500",
  Low:    "bg-slate-100 text-slate-500",
};

const statusIcon: Record<string, any> = {
  Open:        { Icon: Circle,        color: "text-amber-400" },
  "In Progress":{ Icon: Clock,         color: "text-blue-500" },
  Resolved:    { Icon: CheckCircle2,  color: "text-emerald-500" },
  Closed:      { Icon: XCircle,       color: "text-slate-400" },
};

export default function HelpPage() {
  const router = useRouter();
  const { tickets, fetchTickets, isLoading } = useSupportStore();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="w-full px-4 lg:px-6 py-6 space-y-8">
      <HelpCards />
      <HelpContact />
      <HelpWhatsApp />

      {/* ─── Support Tickets ─────────────────────────────────────── */}
      <div className="space-y-4">
        {/* Section header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-slate-800">My Support Tickets</h2>
            <p className="text-[13px] text-slate-400 mt-0.5">
              Track your open issues or start a new conversation
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#00B86B] hover:bg-[#009b5a] text-white rounded-xl font-bold text-[13px] transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>

        {/* Ticket list */}
        <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100/50 overflow-hidden">
          {isLoading ? (
            <div className="py-16 flex flex-col items-center gap-3">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
              <p className="text-[13px] text-slate-400">Loading your tickets…</p>
            </div>
          ) : tickets.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-center px-6">
              <div className="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center">
                <TicketIcon className="w-7 h-7 text-slate-300" />
              </div>
              <p className="text-[15px] font-semibold text-slate-700">No tickets yet</p>
              <p className="text-[13px] text-slate-400 max-w-[260px]">
                Need help? Create a ticket and our support team will respond shortly.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B86B] hover:bg-[#009b5a] text-white rounded-xl font-bold text-[13px] transition-all"
              >
                <Plus className="w-4 h-4" />
                Create Your First Ticket
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {tickets.map((ticket) => {
                const { Icon, color } = statusIcon[ticket.status] ?? { Icon: Circle, color: "text-slate-400" };
                return (
                  <div
                    key={ticket.id}
                    onClick={() => router.push(`/help/ticket?id=${ticket.id}`)}
                    className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/60 cursor-pointer transition-colors"
                  >
                    {/* Status icon */}
                    <div className={`shrink-0 ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[13px] font-bold text-slate-800 truncate">{ticket.topic}</p>
                        <span className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${priorityBadge[ticket.priority] ?? "bg-slate-100 text-slate-500"}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-[11px] text-slate-400 font-medium">{ticket.ticket_number}</p>
                        <span className="text-slate-200">·</span>
                        <p className="text-[11px] text-slate-400">
                          {ticket.messages_count ?? 0} message{(ticket.messages_count ?? 0) !== 1 ? "s" : ""}
                        </p>
                        <span className="text-slate-200">·</span>
                        <p className="text-[11px] text-slate-400">
                          {new Date(ticket.updated_at).toLocaleDateString("en-NG", { day: "numeric", month: "short" })}
                        </p>
                      </div>
                    </div>

                    {/* Status badge */}
                    <span
                      className={`shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
                        ticket.status === "Resolved"
                          ? "bg-emerald-500 text-white"
                          : ticket.status === "Open"
                          ? "bg-amber-50 text-amber-600"
                          : ticket.status === "In Progress"
                          ? "bg-blue-50 text-blue-500"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {ticket.status}
                    </span>

                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {showModal && <CreateTicketModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
