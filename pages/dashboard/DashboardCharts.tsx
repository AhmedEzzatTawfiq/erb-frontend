'use client';

import React from 'react';

interface BarChartProps {
  title: string;
  bars: { height: string; color: string; label?: string }[];
}

const BarChart: React.FC<BarChartProps> = ({ title, bars }) => (
  <div className="bg-white border border-border rounded-xl p-5 shadow-xs">
    <h3 className="text-base font-bold text-text-main mb-6">{title}</h3>
    <div className="h-48 flex items-end justify-between gap-3 px-2">
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`w-full rounded-t-md transition-all ${bar.color}`}
          style={{ height: bar.height }}
          title={bar.label}
        />
      ))}
    </div>
  </div>
);

// Will Edit all of this 
const SALES_BARS = [
  { height: '40%', color: 'bg-primary-light', label: 'Jan' },
  { height: '60%', color: 'bg-[#93C5FD]',    label: 'Feb' },
  { height: '75%', color: 'bg-[#60A5FA]',    label: 'Mar' },
  { height: '88%', color: 'bg-accent-blue-text', label: 'Apr' },
  { height: '100%', color: 'bg-primary',      label: 'May' },
];

const ORDERS_BARS = [
  { height: '30%', color: 'bg-warning-bg',  label: 'Jan' },
  { height: '55%', color: 'bg-[#FED7AA]',  label: 'Feb' },
  { height: '45%', color: 'bg-[#FDBA74]',  label: 'Mar' },
  { height: '75%', color: 'bg-[#FB923C]',  label: 'Apr' },
  { height: '60%', color: 'bg-warning-text', label: 'May' },
];

export default function DashboardCharts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BarChart title="Sales Overview" bars={SALES_BARS} />
      <BarChart title="Orders Overview" bars={ORDERS_BARS} />
    </div>
  );
}
