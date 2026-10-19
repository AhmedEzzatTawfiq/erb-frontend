'use client';

import React from 'react';
import { TrendingUp, TrendingDown, CreditCard, ShoppingCart, Users, Package, Wallet, ClipboardList, LucideIcon } from 'lucide-react';
import { DashboardStatsData, StatItem } from './types';

const ICON_MAP: Record<string, LucideIcon> = {
  CreditCard, ShoppingCart, Users,
  Package, Wallet, ClipboardList,
};

interface StatCardProps {
  stat: StatItem;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  const IconComponent = ICON_MAP[stat.iconName] || CreditCard;
  const { label, value, iconBg, iconColor, badge } = stat;

  return (
    <div className="stat-card">
      <div className="flex justify-between">
        <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
          {label}
        </span>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
          <IconComponent className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <span className="text-2xl lg:text-3xl font-bold text-text-main">{value}</span>
        {badge && (
          <div className="flex items-center">
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
          </div>
        )}
      </div>
    </div>
  );
};

const StatCardSkeleton = () => (
  <div className="stat-card animate-pulse">
    <div className="flex items-center justify-between">
      <div className="h-3 w-24 bg-slate-200 rounded" />
      <div className="w-9 h-9 bg-slate-200 rounded-lg" />
    </div>
    <div className="mt-4 flex items-end justify-between">
      <div className="h-8 w-28 bg-slate-200 rounded" />
      <div className="h-4 w-14 bg-slate-200 rounded-full" />
    </div>
  </div>
);

interface DashboardStatsProps {
  stats?: DashboardStatsData;
  isLoading?: boolean;
}

export default function DashboardStats({ stats, isLoading = false }: DashboardStatsProps) {
  if (isLoading || !stats) {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard stat={stats.totalSales} />
        <StatCard stat={stats.totalOrders} />
        <StatCard stat={stats.totalCustomers} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <StatCard stat={stats.totalProducts} />
        <StatCard stat={stats.revenueMTD} />
        <StatCard stat={stats.pendingOrders} />
      </div>
    </div>
  );
}
