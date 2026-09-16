'use client';

import React from 'react';
import { Order, OrderStatus, PaymentStatus } from './types';
import { ArrowUpDown, ShoppingCart, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

interface OrderTableProps {
  orders: Order[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'orderNumber' | 'date' | 'total' | 'items') => void;
  onViewOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onDeleteOrder: (id: string) => void;
  onDeleteSelected: () => void;
  formatCurrency: (val: number) => string;
}

const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  Processing: 'bg-amber-50 text-amber-700 border border-amber-200',
  Shipped:    'bg-blue-50 text-blue-700 border border-blue-200',
  Delivered:  'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Pending:    'bg-slate-100 text-slate-600 border border-slate-200',
  Cancelled:  'bg-red-50 text-red-600 border border-red-200',
};

const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  Paid:     'bg-emerald-50 text-emerald-700',
  Pending:  'bg-amber-50 text-amber-600',
  Failed:   'bg-red-50 text-red-600',
  Refunded: 'bg-slate-100 text-slate-600',
};

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${ORDER_STATUS_STYLES[status]}`}>
    {status}
  </span>
);

const PaymentStatusBadge: React.FC<{ status: PaymentStatus }> = ({ status }) => (
  <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${PAYMENT_STATUS_STYLES[status]}`}>
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
                onClick={() => onSort('orderNumber')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ORDER ID</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('date')}
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
                onClick={() => onSort('items')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>ITEMS</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('total')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>TOTAL</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
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
                <td colSpan={9} className="py-12 text-center text-text-secondary">
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
                return (
                  <tr
                    key={order.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
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

                    {/* Order ID */}
                    <td className="py-4 px-5">
                      <span
                        onClick={() => onViewOrder(order)}
                        className="text-sm font-bold text-primary hover:underline cursor-pointer"
                      >
                        {order.orderNumber}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-5 text-sm text-text-secondary font-medium whitespace-nowrap">
                      {order.date}
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${order.customer.initialsBg}`}
                        >
                          {order.customer.initials}
                        </div>
                        <span className="text-sm font-medium text-text-main whitespace-nowrap">
                          {order.customer.name}
                        </span>
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-4 px-5 text-center text-sm font-medium text-text-main">
                      {order.items}
                    </td>

                    {/* Total */}
                    <td className="py-4 px-5 text-right text-sm font-bold text-text-main">
                      {formatCurrency(order.total)}
                    </td>

                    {/* Payment */}
                    <td className="py-4 px-5 text-center">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 text-center">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    {/* Actions */}
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

                      {/* Dropdown Menu */}
                      {activeDropdown === order.id && (
                        <div className="absolute right-5 top-12 z-20 w-44 bg-white border border-border rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => {
                              onViewOrder(order);
                              setActiveDropdown(null);
                            }}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                            View Details
                          </button>
                          <button
                            onClick={() => onEditOrder(order)}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5 text-text-secondary" />
                            Edit Order
                          </button>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={() => onDeleteOrder(order.id)}
                            className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            Delete Order
                          </button>
                        </div>
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
};
