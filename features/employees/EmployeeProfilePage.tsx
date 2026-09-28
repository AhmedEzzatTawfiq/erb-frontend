'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronRight, Pencil, MapPin, Phone,
  BadgeCheck, Briefcase, Calendar,
  Star, Users, MessageSquare, Award,
} from 'lucide-react';

export default function EmployeeProfilePage() {
  const router = useRouter();

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/employees"
          className="hover:text-slate-800 transition-colors"
        >
          Employees
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
          href="/employees/emp-1/edit"
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Employee</span>
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
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
              jane.cooper@company.com
            </p>

            <div className="flex items-center gap-2 justify-center flex-wrap mb-5">
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                Senior Operations Manager
              </span>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                Active
              </span>
            </div>

            <button
              type="button"
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Employee</span>
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
                  Operations & Logistics
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Location</span>
                </div>
                <span className="font-semibold text-slate-800">
                  New York HQ
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

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <BadgeCheck className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Employee ID</span>
                </div>
                <span className="font-semibold text-slate-800">
                  EMP-2023-040
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Employment Type</span>
                </div>
                <span className="font-semibold text-slate-800">Full Time</span>
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
                Oct 12, 2027
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Performance Score
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-slate-900">
                  4.9 / 5.0
                </span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Direct Reports
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-slate-900">
                  8 Members
                </span>
              </div>
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

          {/* Employment Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Employment Details
            </h3>
            <hr className="border-t border-slate-200/80 mb-4" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Job Title
                </span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  Senior Operations Manager
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Pay Grade / Level
                </span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  Grade L6 (Executive)
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Work Schedule
                </span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  Full-Time (40 hrs/wk)
                </span>
              </div>

              <div className="p-3.5 bg-slate-50/70 border border-slate-100 rounded-lg">
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  Direct Manager
                </span>
                <span className="font-bold text-slate-900 text-sm mt-0.5 block">
                  Robert Fox (VP Operations)
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">
              Recent Milestones & Activity
            </h3>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Promoted to Senior Operations Manager
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Jan 15, 2024
                </p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Completed Annual Performance Review (Exceeds Expectations)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Dec 10, 2023
                </p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Led Q4 ERP Migration Initiative
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Nov 02, 2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
