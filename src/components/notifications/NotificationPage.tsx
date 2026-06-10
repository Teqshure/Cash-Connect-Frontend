"use client";

import { useState } from "react";
import NotificationTabs from "./NotificationTabs";
import NotificationList from "./NotificationList";
import NotificationSidebar from "./NotificationSidebar";

export default function NotificationPage() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex gap-6">
      {/* LEFT */}
      <div className="flex-1">
        <div className="bg-white rounded-[20px] p-6">
          {/* Banner */}
          {showBanner && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 flex justify-between items-center">
              <p className="text-sm text-slate-700">
                Turn on push notifications to know when your transaction went
                successfully
              </p>
              <button 
                onClick={() => setShowBanner(false)}
                className="text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          <h2 className="text-[20px] font-semibold mb-4">Notifications</h2>

          <NotificationTabs />
          <NotificationList />
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      <div className="hidden xl:block w-[260px]">
        <NotificationSidebar />
      </div>
    </div>
  );
}
