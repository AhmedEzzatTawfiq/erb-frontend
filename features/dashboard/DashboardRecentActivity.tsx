'use client';

import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';
import { RecentActivityOrder, ActivityStatus } from './types';

interface DashboardRecentActivityProps {
  activities?: RecentActivityOrder[];
  isLoading?: boolean;
}

export default function DashboardRecentActivity({
  activities = [],
  isLoading = false,
}: DashboardRecentActivityProps) {
  const getStatusBadge = (status: ActivityStatus) => {
    switch (status) {
      case 'Completed':
      case 'Delivered':
        return 'bg-emerald-50 text-center text-emerald-700 border-emerald-200/60';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Pending':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'Shipped':
        return ' bg-indigo-50 text-indigo-700 text-center border-indigo-200/60';
      case 'Cancelled':
        return 'bg-slate-100 text-slate-700 border-slate-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="bg-white border border-border rounded-xl shadow-xs overflow-hidden">
      {/* Card Header */}
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="text-base font-bold text-text-main">Recent Activity</h3>
        <Link
          href="/orders"
          className="text-xs font-semibold text-primary hover:text-primary-hover hover:underline transition-colors"
        >
          View All Orders
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/70 border-b border-border text-[11px] font-bold tracking-wider text-text-muted uppercase">
              <th className="py-3 px-5">ORDER ID</th>
              <th className="py-3 px-5">CUSTOMER</th>
              <th className="py-3 px-5">AMOUNT</th>
              <th className="py-3 px-5">STATUS</th>
              <th className="py-3 px-5">DATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="py-3.5 px-5"><div className="h-4 w-20 bg-slate-200 rounded" /></td>
                  <td className="py-3.5 px-5"><div className="h-4 w-28 bg-slate-200 rounded" /></td>
                  <td className="py-3.5 px-5"><div className="h-4 w-16 bg-slate-200 rounded" /></td>
                  <td className="py-3.5 px-5"><div className="h-5 w-20 bg-slate-200 rounded-md" /></td>
                  <td className="py-3.5 px-5"><div className="h-4 w-24 bg-slate-200 rounded" /></td>
                </tr>
              ))
            ) : activities.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-text-muted text-sm font-medium">
                  No recent activities found.
                </td>
              </tr>
            ) : (
              activities.slice(0, 5).map((activity) => (
                <tr
                  key={activity.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 px-5 font-semibold text-text-main">
                    <Link href={`/orders`} className="hover:text-primary transition-colors">
                      {activity.orderNumber}
                    </Link>
                  </td>
                  <td className="py-3.5 px-5 font-medium text-text-main">
                    {activity.customer}
                  </td>
                  <td className="py-3.5 px-5 text-text-main font-medium">
                    {formatCurrency(activity.amount)}
                  </td>
                  <td className="py-3.5 px-5">
                    <span
                      className={`inline-flex w-22 justify-center py-0.5 rounded-md text-xs font-semibold border ${getStatusBadge(
                        activity.status
                      )}`}
                    >
                      {activity.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-text-secondary text-sm">
                    {activity.date}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
