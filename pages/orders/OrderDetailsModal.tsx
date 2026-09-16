'use client';

import React from 'react';
import { Order, OrderStatus, PaymentStatus } from './types';
import {
  Hash,
  Calendar,
  User,
  Package,
  DollarSign,
  CreditCard,
  Truck,
  Pencil,
} from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onEdit: (order: Order) => void;
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
  Paid:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Pending:  'bg-amber-50 text-amber-600 border border-amber-200',
  Failed:   'bg-red-50 text-red-600 border border-red-200',
  Refunded: 'bg-slate-100 text-slate-600 border border-slate-200',
};

export default function OrderDetailsModal({
  order,
  onClose,
  onEdit,
  formatCurrency,
}: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Modal
      isOpen={!!order}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Package className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">{order.orderNumber}</h3>
            <p className="text-xs text-text-secondary">Order Details</p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              const current = order;
              onClose();
              onEdit(current);
            }}
            className="btn-secondary text-sm font-semibold"
          >
            <Pencil className="w-4 h-4" />
            Edit Order
          </button>
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-sm font-semibold"
          >
            Close
          </button>
        </>
      }
    >
      <div className="space-y-4 text-sm">
        {/* Status row */}
        <div className="grid grid-cols-2 gap-3 p-3 bg-app-bg rounded-xl border border-border">
          <div>
            <span className="text-xs text-text-secondary block font-medium mb-1">
              Order Status
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${ORDER_STATUS_STYLES[order.status]}`}
            >
              {order.status}
            </span>
          </div>
          <div>
            <span className="text-xs text-text-secondary block font-medium mb-1">
              Payment Status
            </span>
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${PAYMENT_STATUS_STYLES[order.paymentStatus]}`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>

        {/* Order info */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Order Information
          </h4>
          <div className="space-y-2 text-text-main font-medium">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-text-muted shrink-0" />
              <span>Order ID: <span className="text-primary font-bold">{order.orderNumber}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-text-muted shrink-0" />
              <span>Date: {order.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-text-muted shrink-0" />
              <span>Customer: {order.customer.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-text-muted shrink-0" />
              <span>Items: {order.items}</span>
            </div>
          </div>
        </div>

        {/* Financials */}
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Financial Summary
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-100">
              <span className="text-xs font-semibold text-blue-700 flex items-center gap-1">
                <Package className="w-3.5 h-3.5" /> Total Items
              </span>
              <span className="text-xl font-bold text-text-main mt-1 block">
                {order.items}
              </span>
            </div>
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5" /> Order Total
              </span>
              <span className="text-xl font-bold text-text-main mt-1 block">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment info */}
        <div className="p-3 bg-app-bg rounded-xl border border-border flex items-center gap-3">
          <CreditCard className="w-5 h-5 text-text-muted shrink-0" />
          <div>
            <span className="text-xs text-text-secondary block font-medium">Payment</span>
            <span className="font-semibold text-text-main">{order.paymentStatus}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
};
