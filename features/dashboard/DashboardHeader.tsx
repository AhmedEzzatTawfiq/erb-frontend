'use client';

import React from 'react';
import { Download } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';

export default function DashboardHeader() {
  return (
    <PageHeader
      title="Executive Overview"
      subtitle="Real-time performance metrics and recent activities."
      actions={
        <button
          type="button"
          className="btn-secondary text-xs sm:text-sm shadow-2xs font-semibold"
        >
          <Download className="w-4 h-4 text-text-secondary" />
          <span>Export Report</span>
        </button>
      }
    />
  );
};
