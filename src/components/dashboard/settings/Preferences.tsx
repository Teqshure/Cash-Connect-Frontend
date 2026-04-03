"use client";

import { useState } from "react";
import { Bell, Languages, ChevronRight } from "lucide-react";

export default function Preferences() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="bg-white rounded-[20px] p-5 border border-slate-100 shadow-sm">
      <p className="text-[15px] font-semibold text-slate-800 mb-4">
        Preferences
      </p>

      <div className="flex flex-col gap-4">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-slate-400" />
            <p className="text-[13px] text-slate-700">Push Notifications</p>
          </div>

          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-10 h-5 cursor-pointer rounded-full transition ${
              notifications ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`h-5 w-5 bg-white rounded-full shadow transition ${
                notifications ? "translate-x-5" : ""
              }`}
            />
          </button>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-3">
            <Languages className="h-5 w-5 text-slate-400" />
            <div>
              <p className="text-[13px] text-slate-700">Language</p>
              <p className="text-[12px] text-slate-500">English (US)</p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-slate-400" />
        </div>
      </div>
    </div>
  );
}
