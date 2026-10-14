export type ActivityStatus = 'Completed' | 'Processing' | 'Pending' | 'Shipped' | 'Cancelled' | 'Delivered';

export interface RecentActivityOrder {
  id: string;
  orderNumber: string;
  customer: string;
  amount: number;
  status: ActivityStatus;
  date: string;
}

export interface StatCardBadge {
  type: 'success' | 'danger' | 'neutral';
  text: string;
  trend?: 'up' | 'down';
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  numericValue?: number;
  iconName: 'CreditCard' | 'ShoppingCart' | 'Users' | 'Package' | 'Wallet' | 'ClipboardList';
  iconBg: string;
  iconColor: string;
  badge?: StatCardBadge;
}

export interface DashboardStatsData {
  totalSales: StatItem;
  totalOrders: StatItem;
  totalCustomers: StatItem;
  totalProducts: StatItem;
  revenueMTD: StatItem;
  pendingOrders: StatItem;
}

export interface ChartBarItem {
  label: string;
  height: string;
  color: string;
  value: number;
  formattedValue?: string;
}

export interface DashboardChartsData {
  salesBars: ChartBarItem[];
  ordersBars: ChartBarItem[];
}

export interface DashboardOverviewData {
  stats: DashboardStatsData;
  charts: DashboardChartsData;
  recentActivities: RecentActivityOrder[];
}
