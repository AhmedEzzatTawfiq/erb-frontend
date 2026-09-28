'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Pencil, MapPin, Phone, BadgeCheck, CheckCircle2, Briefcase, MessageSquare } from 'lucide-react';

export default function UserProfilePage() {
  const router = useRouter();

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/users"
          className="hover:text-slate-800 transition-colors"
        >
          Users
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Jane Cooper</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Jane Cooper
        </h1>
        <Link
          href={`/users/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold
           px-4 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit User</span>
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-center flex flex-col items-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-slate-100 shadow-xs relative group">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=240"
                alt="Jane Cooper"
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-lg font-bold text-slate-900">Jane Cooper</h2>
            <p className="text-xs text-slate-500 font-medium mb-3">
              jane.cooper@erpcore.com
            </p>

            <div className="flex items-center gap-2 justify-center mb-5">
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                Senior Manager
              </span>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Active
              </span>
            </div>

            <button
              type="button"
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5
               rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Message</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Information</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Briefcase className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Department</span>
                </div>
                <span className="font-semibold text-slate-800">
                  Operations
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Location</span>
                </div>
                <span className="font-semibold text-slate-800">
                  New York Office
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Phone</span>
                </div>
                <span className="font-semibold text-slate-800">
                  +1 (555) 123-4567
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BadgeCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Employee ID</span>
                </div>
                <span className="font-semibold text-slate-800">
                  EMP-2023-040
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Joined Date
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                Oct 12, 2021
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Last Login
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                2 hours ago
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Projects
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                14 Active
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Reports To
              </span>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                  RF
                </div>
                <span className="text-sm font-bold text-slate-900">
                  R. Fox
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                System Permissions
              </h3>
              <button
                type="button"
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
              >
                Manage
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Financial Records
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                    View and approve
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    User Management
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                    Create and edit users
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Inventory Control
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                    Full access
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    System Settings
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-normal">
                    Global config
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Recent Activity
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2
             before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Approved Invoice #INV-2023-892
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Today, 10:42 AM
                </p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Updated project status for Q4 Marketing Launch
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Yesterday, 2:15 PM
                </p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Logged in from new device Mac OS
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Oct 24, 09:00 AM
                </p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Completed mandatory compliance training
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Oct 20, 11:30 AM
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] transition-colors cursor-pointer"
              >
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
