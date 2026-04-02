"use client";

import { useState } from "react";

const tabs = ["Overview", "Shared with me", "Comments"];

export default function NotificationTabs() {
  const [active, setActive] = useState("Overview");

  return (
    <div className="flex gap-6 border-b border-slate-100 mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`pb-2 text-sm ${
            active === tab
              ? "text-green-600 border-b-2 border-green-600"
              : "text-slate-400"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
