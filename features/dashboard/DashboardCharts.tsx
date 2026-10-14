'use client';

import React from 'react';
import { DashboardChartsData, ChartBarItem } from './types';

interface BarChartProps {
  title: string;
  bars: ChartBarItem[];
  isLoading?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ title, bars, isLoading = false }) => (
  <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-base font-bold text-text-main">{title}</h3>
      <span className="text-xs font-semibold text-text-muted bg-slate-100 px-2 py-1 rounded">2026 MTD</span>
    </div>
    {isLoading ? (
      <div className="h-48 flex items-end justify-between gap-3 px-2 animate-pulse">
        {[40, 65, 80, 60, 90].map((h, i) => (
          <div key={i} className="w-full bg-slate-200 rounded-t-md" style={{ height: `${h}%` }} />
        ))}
      </div>
    ) : (
      <div className="h-48 flex items-end justify-between gap-3 px-2">
        {bars.map((bar, i) => (
          <div key={i} className="w-full flex flex-col items-center gap-1 group relative">
            {/* Tooltip on hover */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-900 text-white text-[11px] font-semibold py-1 px-2 rounded shadow-md whitespace-nowrap z-10 pointer-events-none">
              {bar.formattedValue || bar.value}
            </div>
            <div
              className={`w-full rounded-t-md transition-all duration-300 hover:brightness-110 ${bar.color}`}
              style={{ height: bar.height }}
            />
            <span className="text-xs font-medium text-text-muted mt-2">{bar.label}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

interface DashboardChartsProps {
  charts?: DashboardChartsData;
  isLoading?: boolean;
}

export default function DashboardCharts({ charts, isLoading = false }: DashboardChartsProps) {
  const salesBars = charts?.salesBars || EMPTY_SALES_BARS;
  const ordersBars = charts?.ordersBars || EMPTY_ORDERS_BARS;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BarChart title="Sales Overview" bars={salesBars} isLoading={isLoading} />
      <BarChart title="Orders Overview" bars={ordersBars} isLoading={isLoading} />
    </div>
  );
}

const EMPTY_SALES_BARS: ChartBarItem[] = [
  { label: 'Jan', height: '15%', color: 'bg-primary-light', value: 0, formattedValue: '$0.00' },
  { label: 'Feb', height: '15%', color: 'bg-[#93C5FD]', value: 0, formattedValue: '$0.00' },
  { label: 'Mar', height: '15%', color: 'bg-[#60A5FA]', value: 0, formattedValue: '$0.00' },
  { label: 'Apr', height: '15%', color: 'bg-accent-blue-text', value: 0, formattedValue: '$0.00' },
  { label: 'May', height: '15%', color: 'bg-primary', value: 0, formattedValue: '$0.00' },
];

const EMPTY_ORDERS_BARS: ChartBarItem[] = [
  { label: 'Jan', height: '15%', color: 'bg-warning-bg', value: 0, formattedValue: '0 Orders' },
  { label: 'Feb', height: '15%', color: 'bg-[#FED7AA]', value: 0, formattedValue: '0 Orders' },
  { label: 'Mar', height: '15%', color: 'bg-[#FDBA74]', value: 0, formattedValue: '0 Orders' },
  { label: 'Apr', height: '15%', color: 'bg-[#FB923C]', value: 0, formattedValue: '0 Orders' },
  { label: 'May', height: '15%', color: 'bg-[#F97316]', value: 0, formattedValue: '0 Orders' },
];
