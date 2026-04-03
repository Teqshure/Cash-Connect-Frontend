"use client";

export default function HelpContact() {
  return (
    <div className="space-y-4">
      <p className="text-[13px] text-slate-500 max-w-[420px]">
        Contact us via Email or WhatsApp for any issues about your transactions
      </p>

      <div className="flex flex-col md:flex-row gap-4">
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-slate-400">Our E-mail Address</p>
          <div className="h-[42px] px-4 rounded-[12px] border border-slate-200 bg-white flex items-center text-[13px] text-slate-600">
            support@cashconnect.com.ng
          </div>
        </div>

        {/* WHATSAPP */}
        <div className="flex flex-col gap-1">
          <p className="text-[12px] text-slate-400">Our WhatsApp Number</p>
          <div className="h-[42px] px-4 rounded-[12px] border border-slate-200 bg-white flex items-center text-[13px] text-slate-600">
            +23478987534
          </div>
        </div>
      </div>
    </div>
  );
}
