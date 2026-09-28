'use client';

import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';
import DashboardQuickActions from './DashboardQuickActions';
import DashboardRecentActivity, { DEFAULT_RECENT_ACTIVITIES, RecentActivityOrder } from './DashboardRecentActivity';
import { CheckCircle2, X } from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const [recentActivities] = useState<RecentActivityOrder[]>(DEFAULT_RECENT_ACTIVITIES);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-900 text-white px-4 py-3 rounded-xl shadow-xl animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button
            type="button"
            onClick={() => setToastMessage(null)}
            className="ml-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <DashboardHeader />
      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 items-start">
        {/* Charts & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <DashboardCharts />
          <DashboardRecentActivity activities={recentActivities} />
        </div>

        {/* Quick Actions */}
        <DashboardQuickActions />
      </div>
    </main>
  );
}
