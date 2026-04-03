"use client";

import ProfileCard from "@/components/profile/ProfileCard";
import AccountDetails from "@/components/profile/AccountDetails";
import LogoutButton from "@/components/profile/LogoutButton";

export default function ProfilePage() {
  return (
    <div className="w-full flex justify-center">
      <div
        className="
          w-full max-w-[1100px]
          grid grid-cols-1 lg:grid-cols-2
          gap-6
        "
      >
        {/* LEFT */}
        <div className="flex flex-col gap-4">
          <ProfileCard />
          <LogoutButton />
        </div>

        {/* RIGHT */}
        <AccountDetails />
      </div>
    </div>
  );
}
