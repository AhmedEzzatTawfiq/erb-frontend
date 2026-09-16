'use client';

import React from 'react';
import Link from 'next/link';
import { formatCurrency } from '@/lib/utils';

export interface RecentActivityOrder {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  status: 'Completed' | 'Processing' | 'Pending' | 'Shipped' | 'Cancelled' | 'Delivered';
  date: string;
}

export const DEFAULT_RECENT_ACTIVITIES: RecentActivityOrder[] = [
  {
    id: 'act-1',
    orderNumber: '#ORD-0921',
    customer: 'Acme Corp',
    amount: 4500.00,
    status: 'Completed',
    date: 'Oct 24, 2023',
  },
  {
    id: 'act-2',
    orderNumber: '#ORD-0922',
    customer: 'Globex Inc',
    amount: 1250.50,
    status: 'Processing',
    date: 'Oct 24, 2023',
  },
  {
    id: 'act-3',
    orderNumber: '#ORD-0923',
    customer: 'Soylent Corp',
    amount: 8900.00,
    status: 'Pending',
    date: 'Oct 23, 2023',
  },
  {
    id: 'act-4',
    orderNumber: '#ORD-0924',
    customer: 'Initech',
    amount: 340.00,
    status: 'Completed',
    date: 'Oct 23, 2023',
  },
  {
    id: 'act-5',
    orderNumber: '#ORD-0925',
    customer: 'Umbrella Corp',
    amount: 12400.00,
    status: 'Shipped',
    date: 'Oct 22, 2023',
  },
];

interface DashboardRecentActivityProps {
  activities?: RecentActivityOrder[];
}

export default function DashboardRecentActivity({
  activities = DEFAULT_RECENT_ACTIVITIES,
}: DashboardRecentActivityProps) {
  const getStatusBadge = (status: RecentActivityOrder['status']) => {
    switch (status) {
      case 'Completed':
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
      case 'Processing':
        return 'bg-amber-50 text-amber-700 border-amber-200/60';
      case 'Pending':
        return 'bg-rose-50 text-rose-700 border-rose-200/60';
      case 'Shipped':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/60';
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
            {activities.slice(0, 5).map((activity) => (
              <tr
                key={activity.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="py-3.5 px-5 font-semibold text-text-main">
                  {activity.orderNumber}
                </td>
                <td className="py-3.5 px-5 font-medium text-text-main">
                  {activity.customer}
                </td>
                <td className="py-3.5 px-5 text-text-main font-medium">
                  {formatCurrency(activity.amount)}
                </td>
                <td className="py-3.5 px-5">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold border ${getStatusBadge(
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
