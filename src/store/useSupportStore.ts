"use client";

import { create } from "zustand";

const getApiUrl = () => {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.includes("localhost") || host.includes("127.0.0.1")) {
      return "http://localhost:8000/api/v1";
    }
  }
  return "https://api.cashconnectworld.com/api/v1";
};
const BASE_URL = getApiUrl();

const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("auth-storage");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.state?.token ?? null;
  } catch {
    return null;
  }
};

/* ─────────────────────────────────────────────── */
/* TYPES                                           */
/* ─────────────────────────────────────────────── */

export interface TicketMessage {
  id: number;
  ticket_id: number;
  sender: "user" | "admin";
  message: string;
  attachment_url: string | null;
  created_at: string;
}

export interface Ticket {
  id: number;
  ticket_number: string;
  topic: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  assigned_agent: string | null;
  admin_note: string | null;
  messages_count?: number;
  created_at: string;
  updated_at: string;
  user?: { id: number; name: string; email: string };
  messages?: TicketMessage[];
}

interface SupportState {
  tickets: Ticket[];
  currentTicket: Ticket | null;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  fetchTickets: () => Promise<void>;
  fetchTicketById: (id: number) => Promise<void>;
  createTicket: (data: { topic: string; priority: string; message: string }) => Promise<Ticket>;
  sendMessage: (ticketId: number, message: string, attachment?: File) => Promise<TicketMessage>;
  clearCurrentTicket: () => void;
}

/* ─────────────────────────────────────────────── */
/* STORE                                           */
/* ─────────────────────────────────────────────── */

export const useSupportStore = create<SupportState>((set, get) => ({
  tickets: [],
  currentTicket: null,
  isLoading: false,
  isSending: false,
  error: null,

  fetchTickets: async () => {
    set({ isLoading: true, error: null });
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        set({ tickets: data.data });
      } else {
        set({ error: data.message || "Failed to fetch tickets" });
      }
    } catch (err: any) {
      set({ error: err.message || "Network error" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTicketById: async (id: number) => {
    set({ isLoading: true, error: null });
    try {
      const token = getToken();
      const res = await fetch(`${BASE_URL}/tickets/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (data.success) {
        set({ currentTicket: data.data });
      } else {
        set({ error: data.message || "Failed to fetch ticket" });
      }
    } catch (err: any) {
      set({ error: err.message || "Network error" });
    } finally {
      set({ isLoading: false });
    }
  },

  createTicket: async (payload) => {
    const token = getToken();
    const res = await fetch(`${BASE_URL}/tickets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) {
      throw new Error(data.message || "Failed to create ticket");
    }
    // Prepend to list
    set((s) => ({ tickets: [data.data, ...s.tickets] }));
    return data.data as Ticket;
  },

  sendMessage: async (ticketId, message, attachment?) => {
    set({ isSending: true });
    try {
      const token = getToken();
      const formData = new FormData();
      formData.append("message", message);
      if (attachment) formData.append("attachment", attachment);

      const res = await fetch(`${BASE_URL}/tickets/${ticketId}/messages`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // Don't set Content-Type here; browser sets it with boundary for FormData
        },
        body: formData,
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Failed to send message");

      const newMsg = data.data as TicketMessage;
      // Append message to current ticket
      set((s) => {
        if (!s.currentTicket) return {};
        return {
          currentTicket: {
            ...s.currentTicket,
            messages: [...(s.currentTicket.messages ?? []), newMsg],
          },
        };
      });
      return newMsg;
    } finally {
      set({ isSending: false });
    }
  },

  clearCurrentTicket: () => set({ currentTicket: null }),
}));
