'use client';

import React from 'react';
import Link from 'next/link';
import { OrderApi, OrderStatus } from './types';
import { ArrowUpDown, ShoppingCart, MoreVertical, Trash2 } from 'lucide-react';
import ActionDropDown from '@/components/shared/ActionDropDown';
import { useRouter } from 'next/navigation';

interface OrderTableProps {
  orders: OrderApi[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: string) => void;
  onViewOrder: (order: OrderApi) => void;
  onEditOrder: (order: OrderApi) => void;
  onDeleteOrder: (id: string) => void;
  onDeleteSelected: () => void;
  formatCurrency: (val: number) => string;
}

const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  confirmed: 'bg-amber-50 text-amber-700 border border-amber-200',
  shipped: 'bg-blue-50 text-blue-700 border border-blue-200',
  delivered: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending: 'bg-slate-100 text-slate-600 border border-slate-200',
};

const FALLBACK_STATUS_STYLE = 'bg-red-50 text-red-600 border border-red-200';

const OrderStatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`inline-flex min-w-24 justify-center items-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${ORDER_STATUS_STYLES[status as OrderStatus] ?? FALLBACK_STATUS_STYLE}`}>
    {status}
  </span>
);

export default function OrderTable({
  orders,
  selectedIds,
  isAllSelected,
  activeDropdown,
  setActiveDropdown,
  onSelectAll,
  onSelectOne,
  onSort,
  onViewOrder,
  onEditOrder,
  onDeleteOrder,
  onDeleteSelected,
  formatCurrency,
}: OrderTableProps) {
  const router = useRouter();
  return (
    <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} order{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onDeleteSelected}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-225">
          <thead>
            <tr className="bg-app-bg border-b border-border">
              <th className="py-3.5 px-5 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                />
              </th>
              <th
                onClick={() => onSort('id')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ORDER ID</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('orderDate')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>DATE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                CUSTOMER
              </th>
              <th
                onClick={() => onSort('totalAmount')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>TOTAL</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                PAYMENT
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
                STATUS
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                ACTIONS
              </th> 
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-text-secondary">
                  <ShoppingCart className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No orders found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search or filter keywords.
                  </p>
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const isSelected = selectedIds.includes(order.id);
                const shortId = order.id.slice(0, 8).toUpperCase();
                const customerName = order.customer?.companyName ?? '—';
                const customerInitials = order.customer?.companyName
                  ? order.customer.companyName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
                  : '?';

                return (
                  <tr
                    key={order.id}
                    onClick={() => router.push(`/orders/${order.id}`)}
                    className={`hover:bg-slate-50/70 transition-colors cursor-pointer ${isSelected ? 'bg-blue-50/30' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(order.id)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                      />
                    </td>

                    <td className="py-4 px-5">
                      <Link
                        href={`/orders/${order.id}`}
                        className="text-sm font-bold text-primary hover:underline cursor-pointer block"
                      >
                        #{shortId}
                      </Link>
                    </td>

                    <td className="py-4 px-5 text-sm text-text-secondary font-medium whitespace-nowrap">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '—'}
                    </td>

                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-blue-100 text-blue-700">
                          {customerInitials}
                        </div>
                        <span className="text-sm font-medium text-text-main whitespace-nowrap">
                          {customerName}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-5 text-sm font-bold text-text-main">
                      {formatCurrency(Number(order.totalAmount))}
                    </td>

                    <td className="py-4 px-5 text-sm font-medium text-text-secondary">
                      {order.paymentMethod ?? '—'}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    <td className="py-4 px-5 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === order.id ? null : order.id
                          )
                        }
                        className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {activeDropdown === order.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <ActionDropDown
                            href={`/orders/${order.id}`}
                            id={order.id}
                            editLabel="Edit Order"
                            deleteLabel="Delete Order"
                            setActiveDropdown={setActiveDropdown}
                            onDeleteUser={onDeleteOrder}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
