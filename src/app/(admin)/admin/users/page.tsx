"use client";

import { Search, Filter, MoreVertical, UserPlus, Shield, UserX, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    status: "Active",
    lastActive: "2 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: 2,
    name: "Sarah Miller",
    email: "sarah@example.com",
    role: "User",
    status: "Active",
    lastActive: "1 hour ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Moderator",
    status: "Suspended",
    lastActive: "2 days ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma@example.com",
    role: "User",
    status: "Active",
    lastActive: "Active now",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
  },
  {
    id: 5,
    name: "David Brown",
    email: "david@example.com",
    role: "Admin",
    status: "Active",
    lastActive: "5 mins ago",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-600",
  Suspended: "bg-rose-50 text-rose-600",
  Pending: "bg-amber-50 text-amber-600",
};

export default function UserManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
          <p className="text-slate-500 text-sm font-medium">Manage and monitor all platform users.</p>
        </div>
        <button className="flex items-center gap-2 bg-[#00B86B] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform">
          <UserPlus className="w-4 h-4" />
          Add New User
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-11 pl-12 pr-4 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#00B86B]/20 transition-all font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 h-11 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors text-sm font-bold text-slate-600">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <select className="flex-1 md:flex-none h-11 px-4 rounded-xl border border-slate-100 bg-white text-sm font-bold text-slate-600 focus:outline-none hover:bg-slate-50 transition-colors">
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
            <option>Pending</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">User</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Role</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Last Active</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 overflow-hidden border-2 border-white shadow-sm">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 leading-tight">{user.name}</p>
                        <p className="text-[11px] font-medium text-slate-400 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                       {user.role === 'Admin' ? <Shield className="w-3.5 h-3.5 text-[#00B86B]" /> : null}
                       <span className="text-sm font-bold text-slate-600">{user.role}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${statusStyles[user.status as keyof typeof statusStyles]}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                       <Clock className="w-3.5 h-3.5 text-slate-300" />
                       <span className="text-xs font-medium text-slate-500">{user.lastActive}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
           <p className="text-xs font-bold text-slate-400">Showing 5 of 150 users</p>
           <div className="flex gap-2">
              <button className="px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-bold text-slate-400 hover:bg-white disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-lg border border-slate-100 text-xs font-bold text-slate-600 hover:bg-white">Next</button>
           </div>
        </div>
      </div>
    </div>
  );
}
