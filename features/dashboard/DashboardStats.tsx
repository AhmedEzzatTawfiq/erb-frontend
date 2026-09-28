'use client';

import React from 'react';
import {
  TrendingUp, TrendingDown, CreditCard,
  ShoppingCart, Users, Package, Wallet,
  ClipboardList, LucideIcon,
} from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  badge?: {
    type: 'success' | 'danger' | 'neutral';
    text: string;
    trend?: 'up' | 'down';
  };
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon: Icon, iconBg, iconColor, badge }) => (
  <div className="stat-card">
    <div className="flex items-center justify-between">
      <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
        {label}
      </span>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
    </div>
    <div className="mt-4 flex items-end justify-between">
      <span className="text-2xl lg:text-3xl font-bold text-text-main">{value}</span>
      {badge && (
        <>
          {badge.type === 'success' && (
            <span className="badge-success">
              {badge.trend === 'up' && <TrendingUp className="w-3 h-3" />}
              {badge.trend === 'down' && <TrendingDown className="w-3 h-3" />}
              {badge.text}
            </span>
          )}
          {badge.type === 'danger' && (
            <span className="badge-danger">{badge.text}</span>
          )}
          {badge.type === 'neutral' && (
            <span className="text-xs font-medium text-[#64748B]">{badge.text}</span>
          )}
        </>
      )}
    </div>
  </div>
);

export default function DashboardStats() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          label="Total Sales"
          value="$124,500"
          icon={CreditCard}
          iconBg="bg-accent-blue-bg"
          iconColor="text-accent-blue-text"
          badge={{ type: 'success', trend: 'up', text: '+12%' }}
        />
        <StatCard
          label="Total Orders"
          value="1,240"
          icon={ShoppingCart}
          iconBg="bg-warning-bg"
          iconColor="text-warning-text"
          badge={{ type: 'success', trend: 'up', text: '+5%' }}
        />
        <StatCard
          label="Total Customers"
          value="850"
          icon={Users}
          iconBg="bg-border-subtle"
          iconColor="text-[#64748B]"
          badge={{ type: 'success', trend: 'up', text: '+2%' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard
          label="Total Products"
          value="430"
          icon={Package}
          iconBg="bg-border-subtle"
          iconColor="text-[#64748B]"
          badge={{ type: 'neutral', text: 'Active SKUs' }}
        />
        <StatCard
          label="Revenue (MTD)"
          value="$98,200"
          icon={Wallet}
          iconBg="bg-accent-blue-bg"
          iconColor="text-accent-blue-text"
          badge={{ type: 'neutral', text: 'Expected: $105k' }}
        />
        <StatCard
          label="Pending Orders"
          value="45"
          icon={ClipboardList}
          iconBg="bg-warning-bg"
          iconColor="text-warning-text"
          badge={{ type: 'danger', text: 'Requires Attention' }}
        />
      </div>
    </div>
  );
};
