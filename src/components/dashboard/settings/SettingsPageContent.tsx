"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import AccountDetails from "@/components/profile/AccountDetails";
import PaymentMethods from "./PaymentMethods";
import Preferences from "./Preferences";
import LegalLinks from "./LegalLinks";
import LogoutButton from "@/components/profile/LogoutButton";

export default function SettingsPageContent() {
  return (
    <div className="bg-slate-50 min-h-screen px-4 py-6 lg:px-8">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <ProfileCard />
          <AccountDetails />
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-6">
          <PaymentMethods />
          <Preferences />
          <LegalLinks />

          {/* Desktop logout */}
          <div className="hidden lg:block">
            <LogoutButton />
          </div>
        </div>

        {/* Mobile logout */}
        <div className="lg:hidden">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
