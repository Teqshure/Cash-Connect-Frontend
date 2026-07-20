"use client";

import { useState, useRef, useEffect } from "react";

import Image from "next/image";
import avartarimg from "../../../public/images/dashboard/avatar.png";
import { Bell, Search, Menu, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";
import { useTransactionStore } from "@/store/Transactionstore";
import { usePathname, useRouter } from "next/navigation";
import { EmailUnverifiedBanner } from "@/components/dashboard/EmailVerificationModal";

function getFirstName(fullname?: string | null) {
  if (!fullname) return "User";
  return fullname.trim().split(" ")[0] || "User";
}

function getGreeting(): string {
  try {
    const lagosTimeStr = new Date().toLocaleString("en-US", {
      timeZone: "Africa/Lagos",
      hour: "numeric",
      hour12: false,
    });
    const hour = parseInt(lagosTimeStr, 10);
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  } catch (e) {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  }
}

function getPageTitle(pathname: string): string {
  if (pathname === "/" || pathname === "/dashboard") return "Dashboard";
  if (pathname.startsWith("/wallet")) return "Wallet";
  if (pathname.startsWith("/history")) return "History";
  if (pathname.startsWith("/settings")) return "Settings";
  if (pathname.startsWith("/profile")) return "Profile";
  if (pathname.startsWith("/exchange")) return "Exchange";
  if (pathname.startsWith("/transactions")) return "Transactions";
  if (pathname.startsWith("/notifications")) return "Notifications";

  const segment = pathname.split("/").filter(Boolean)[0] ?? "Dashboard";
  return segment.charAt(0).toUpperCase() + segment.slice(1);
}

const ProfileMenu = ({ router, withChevron = false }: { router: any, withChevron?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const user = useAuthStore((s: any) => s.user);
  const logout = useAuthStore((s: any) => s.logout);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 cursor-pointer outline-none focus:outline-none hover:opacity-80 transition"
      >
        <div className="relative h-[36px] w-[36px] rounded-full overflow-hidden border border-slate-200 bg-slate-200">
          <Image
            src={user?.profile_image || avartarimg}
            alt="Profile"
            fill
            className="object-cover"
            sizes="36px"
            priority
          />
        </div>
        {withChevron && <ChevronDown className="h-4 w-4 text-slate-600" />}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 py-2 z-50">
          <button
            onClick={() => {
              setIsOpen(false);
              router.push("/profile");
            }}
            className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
          >
            Profile Settings
          </button>
          <button
            onClick={async () => {
              setIsOpen(false);
              await logout();
              router.push("/login");
            }}
            className="w-full text-left px-4 py-2.5 text-[13px] font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer"
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

const NotificationMenu = ({ router, isMobile = false }: { router: any; isMobile?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const transactions = useTransactionStore((s: any) => s.transactions);
  const fetchTransactions = useTransactionStore((s: any) => s.fetchTransactions);
  const [readStatuses, setReadStatuses] = useState<Record<number, string>>({});

  useEffect(() => {
    fetchTransactions();
    try {
      const stored = localStorage.getItem("cc_read_notifications_map");
      if (stored) {
        setReadStatuses(JSON.parse(stored));
      } else {
        const oldStored = localStorage.getItem("cc_read_notifications");
        if (oldStored) {
          const oldIds: number[] = JSON.parse(oldStored);
          const initialMap: Record<number, string> = {};
          oldIds.forEach((id) => {
            initialMap[id] = "read";
          });
          setReadStatuses(initialMap);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [fetchTransactions]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const recentTx = transactions.slice(0, 5);
  
  const isUnread = (tx: any) => {
    if (!(tx.id in readStatuses)) return true;
    return readStatuses[tx.id] !== tx.status;
  };

  const unreadCount = recentTx.filter((tx: any) => isUnread(tx)).length;

  const markAllAsRead = () => {
    const newMap = { ...readStatuses };
    recentTx.forEach((tx: any) => {
      newMap[tx.id] = tx.status;
    });
    setReadStatuses(newMap);
    try {
      localStorage.setItem("cc_read_notifications_map", JSON.stringify(newMap));
    } catch (e) {
      console.error(e);
    }
  };

  const markSingleAsRead = (txId: number, status: string) => {
    const newMap = { ...readStatuses, [txId]: status };
    setReadStatuses(newMap);
    try {
      localStorage.setItem("cc_read_notifications_map", JSON.stringify(newMap));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={toggleOpen}
        className={[
          "relative h-[36px] w-[36px] rounded-full cursor-pointer transition flex items-center justify-center outline-none focus:outline-none",
          isMobile 
            ? "hover:bg-slate-50 text-slate-700" 
            : "border border-slate-200 bg-white hover:bg-slate-50 text-slate-500"
        ].join(" ")}
        aria-label="Notifications"
      >
        <Bell className={isMobile ? "h-5 w-5" : "h-4 w-4"} />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[20px] px-1.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center border border-white animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div 
          className={[
            "absolute mt-2 w-80 bg-white rounded-2xl shadow-[0_4px_25px_rgba(0,0,0,0.1)] border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200",
            isMobile ? "right-[-60px]" : "right-0"
          ].join(" ")}
        >
          <div className="px-4 pb-2 border-b border-slate-50 flex items-center justify-between">
            <span className="text-[14px] font-semibold text-slate-800">Notifications</span>
            {unreadCount > 0 ? (
              <button 
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition cursor-pointer"
              >
                Mark all as read
              </button>
            ) : (
              <span className="text-[11px] text-slate-400">All read</span>
            )}
          </div>

          <div className="max-h-[300px] overflow-y-auto divide-y divide-slate-50 no-scrollbar">
            {recentTx.length === 0 ? (
              <div className="py-8 text-center text-[12px] text-slate-400">
                No recent activity.
              </div>
            ) : (
              recentTx.map((tx: any) => {
                const txUnread = isUnread(tx);
                const isCredit = tx.direction === "credit";
                const amountSign = isCredit ? "+" : "-";
                const amountColor = isCredit ? "text-emerald-600" : "text-slate-800";
                
                let title = "Transaction";
                if (tx.type === "deposit") title = "Deposit Money";
                else if (tx.type === "withdrawal") title = "Withdraw Money";
                else if (tx.type === "crypto") title = "Crypto Trade";
                else if (tx.type === "gift") title = "Giftcard Trade";
                else if (tx.type === "international") title = "Global Payment";

                const dateStr = new Date(tx.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div 
                    key={tx.id} 
                    className={[
                      "p-3.5 flex items-start gap-3 hover:bg-slate-50 transition cursor-pointer relative",
                      txUnread ? "bg-emerald-50/20 hover:bg-emerald-50/40" : ""
                    ].join(" ")}
                    onClick={() => {
                      markSingleAsRead(tx.id, tx.status);
                      setIsOpen(false);
                      router.push(`/history?txId=${tx.id}`);
                    }}
                  >
                    {txUnread && (
                      <span className="absolute left-2.5 top-[18px] h-2 w-2 rounded-full bg-emerald-500" />
                    )}
                    <div className="flex-1 min-w-0 pl-2">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[12px] font-semibold text-slate-800 truncate">{title}</p>
                        <p className={["text-[12px] font-bold shrink-0", amountColor].join(" ")}>
                          {amountSign}{tx.currency}{parseFloat(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 truncate capitalize">
                        Status: <span className={
                          tx.status === "approved" ? "text-emerald-600 font-medium" :
                          tx.status === "rejected" || tx.status === "failed" ? "text-rose-500 font-medium" : "text-amber-500 font-medium"
                        }>{tx.status}</span>
                      </p>
                      <p className="text-[10px] text-slate-400 mt-1">{dateStr}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-4 pt-2.5 border-t border-slate-50 text-center">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/history");
              }}
              className="text-[12px] font-medium text-emerald-600 hover:text-emerald-700 cursor-pointer"
            >
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Topbar({
  onOpenSidebar,
}: {
  onOpenSidebar?: () => void;
}) {
  const router = useRouter();
  const user = useAuthStore((s: any) => s.user);
  const name = getFirstName(user?.fullname);
  const pathname = usePathname();

  const isHistoryPage = pathname === "/history";
  const pageTitle = getPageTitle(pathname);

  // ✅ SEARCH STORE
  const setSearchQuery = useTransactionStore((s: any) => s.setSearchQuery);

  return (
    <>
      {/* MOBILE HEADER */}
      <header className="lg:hidden bg-white border-b border-slate-100 sticky top-0 z-50 shadow-2xs">
        <div className="h-[56px] flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="h-10 w-10 rounded-full grid place-items-center hover:bg-slate-50"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5 text-slate-700" />
            </button>

            <p className="text-[16px] font-semibold text-slate-800">
              {pageTitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <NotificationMenu router={router} isMobile />
            <ProfileMenu router={router} withChevron />
          </div>
        </div>
        <EmailUnverifiedBanner />
      </header>

      {/* DESKTOP TOPBAR */}
      <header
        className="
          hidden lg:block
          w-full
          bg-white
          border-b border-slate-100
          sticky top-0 z-50
          shadow-2xs
        "
      >
        <div className="h-[104px] px-[28px] flex items-center justify-between gap-[13px]">
          {/* LEFT */}
          <div className="min-w-0 w-[390px] h-[91px] flex items-center">
            <p className="text-[20px] leading-[28px] font-medium text-slate-900 whitespace-nowrap">
              {getGreeting()}, {name}! <span className="ml-1">👋</span>
            </p>
          </div>

          {/* RIGHT */}
          <div className="w-[424px] h-[36px] flex items-center justify-end gap-[13px]">
            {!isHistoryPage && (
              <div className="flex-1 h-[36px] rounded-full border border-slate-200 bg-white flex items-center px-3 gap-2">
                <Search className="h-4 w-4 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search transactions..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent outline-none text-[12px] text-slate-700 placeholder:text-slate-400"
                />
              </div>
            )}

            <NotificationMenu router={router} />
            <ProfileMenu router={router} />
          </div>
        </div>
        <EmailUnverifiedBanner />
      </header>
    </>
  );
}
