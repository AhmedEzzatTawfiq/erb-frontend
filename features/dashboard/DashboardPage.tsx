'use client';

import React, { useState } from 'react';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import DashboardCharts from './DashboardCharts';
import DashboardQuickActions from './DashboardQuickActions';
import DashboardRecentActivity from './DashboardRecentActivity';
import { useDashboardOverview } from './hooks/useDashboard';
import { CheckCircle2, X, AlertTriangle, RefreshCw } from 'lucide-react';
import DashboardSkeleton from '@/components/ui/DashboardSkeleton';

export default function DashboardPage() {
  const { data: dashboardData, isLoading, isError, error, refetch, isFetching } = useDashboardOverview();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleExportReport = () => {
    showToast('Dashboard summary report exported successfully!');
  };

  const handleRefresh = () => {
    refetch();
    showToast('Dashboard data refreshed.');
  };

  if (isLoading && !dashboardData) {
    return (
      <main className="mx-auto max-w-7xl pb-10">
        <DashboardSkeleton />
      </main>
    );
  }

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

      {/* Header */}
      <DashboardHeader
        onExportReport={handleExportReport}
        onRefresh={handleRefresh}
        isRefreshing={isFetching}
      />

      {/* Error State Banner */}
      {isError && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-center justify-between text-rose-800">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <p className="text-sm font-semibold">Failed to load live dashboard statistics</p>
              <p className="text-xs text-rose-600">
                {error instanceof Error ? error.message : 'An unexpected error occurred while fetching live backend metrics.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => refetch()}
            className="px-3 py-1.5 bg-rose-600 text-white rounded-lg text-xs font-semibold hover:bg-rose-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry</span>
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <DashboardStats
        stats={dashboardData?.stats}
        isLoading={isLoading}
      />

      {/* Grid: Charts & Activity vs Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2 items-start">
        {/* Left 2 Columns: Charts & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* <DashboardCharts
            charts={dashboardData?.charts}
            isLoading={isLoading}
          /> */}
          <DashboardRecentActivity
            activities={dashboardData?.recentActivities}
            isLoading={isLoading}
          />
        </div>

        {/* Right 1 Column: Quick Actions */}
        <DashboardQuickActions
          onAddUser={() => showToast('Navigating to Add User...')}
          onCreateOrder={() => showToast('Navigating to Create Order...')}
        />
      </div>
    </main>
  );
}
