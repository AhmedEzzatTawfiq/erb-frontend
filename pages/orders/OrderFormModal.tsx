'use client';

import React from 'react';
import { Order } from './types';
import Modal from '@/components/shared/Modal';

const ORDER_STATUSES = ['Processing', 'Shipped', 'Delivered', 'Pending', 'Cancelled'] as const;
const PAYMENT_STATUSES = ['Paid', 'Pending', 'Failed', 'Refunded'] as const;

interface OrderFormModalProps {
  isOpen: boolean;
  editOrder: Order | null;
  formData: {
    customerName: string;
    items: number;
    total: number;
    status: Order['status'];
    paymentStatus: Order['paymentStatus'];
    date: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      customerName: string;
      items: number;
      total: number;
      status: Order['status'];
      paymentStatus: Order['paymentStatus'];
      date: string;
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function OrderFormModal({
  isOpen,
  editOrder,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: OrderFormModalProps) {
  return (
    <Modal
      isOpen={isOpen || !!editOrder}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editOrder ? `Edit Order ${editOrder.orderNumber}` : 'Create New Order'}
        </h3>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Customer Name *
          </label>
          <input
            type="text"
            required
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            placeholder="e.g. Acme Corp"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Order Date *
          </label>
          <input
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Number of Items
            </label>
            <input
              type="number"
              min={1}
              value={formData.items}
              onChange={(e) => setFormData({ ...formData, items: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Order Total ($)
            </label>
            <input
              type="number"
              min={0}
              step="0.01"
              value={formData.total}
              onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Order Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as Order['status'] })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {ORDER_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Payment Status
            </label>
            <select
              value={formData.paymentStatus}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  paymentStatus: e.target.value as Order['paymentStatus'],
                })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {PAYMENT_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-text-secondary hover:bg-slate-100 rounded-xl"
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary text-sm font-semibold">
            {editOrder ? 'Save Changes' : 'Create Order'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
