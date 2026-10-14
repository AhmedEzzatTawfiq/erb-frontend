'use client';

import React from 'react';
import { Download, RefreshCw } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

interface DashboardHeaderProps {
  onExportReport?: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export default function DashboardHeader({
  onExportReport,
  onRefresh,
  isRefreshing = false,
}: DashboardHeaderProps) {
  return (
    <PageHeader
      title="Executive Overview"
      subtitle="Real-time performance metrics and recent activities."
      actions={
        <div className="flex items-center gap-2">
          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="btn-secondary text-xs sm:text-sm shadow-2xs font-semibold p-2.5 sm:px-3 sm:py-2.5"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 text-text-secondary ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          )}
          <button
            type="button"
            onClick={onExportReport}
            className="btn-secondary text-xs sm:text-sm shadow-2xs font-semibold"
          >
            <Download className="w-4 h-4 text-text-secondary" />
            <span>Export Report</span>
          </button>
        </div>
      }
    />
  );
}
