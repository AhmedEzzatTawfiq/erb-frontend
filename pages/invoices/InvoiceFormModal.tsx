'use client';

import React from 'react';
import { Invoice } from './types';
import Modal from '@/components/shared/Modal';

const INVOICE_STATUSES = ['Paid', 'Pending', 'Overdue', 'Cancelled', 'Draft'] as const;

interface InvoiceFormModalProps {
  isOpen: boolean;
  editInvoice: Invoice | null;
  formData: {
    customer: string;
    orderNumber: string;
    amount: number;
    dueDate: string;
    createdDate: string;
    status: Invoice['status'];
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{
      customer: string;
      orderNumber: string;
      amount: number;
      dueDate: string;
      createdDate: string;
      status: Invoice['status'];
    }>
  >;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function InvoiceFormModal({
  isOpen,
  editInvoice,
  formData,
  setFormData,
  onClose,
  onSubmit,
}: InvoiceFormModalProps) {
  return (
    <Modal
      isOpen={isOpen || !!editInvoice}
      onClose={onClose}
      title={
        <h3 className="text-lg font-bold text-text-main">
          {editInvoice
            ? `Edit ${editInvoice.invoiceNumber}`
            : 'Create New Invoice'}
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
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            placeholder="e.g. Acme Corp"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-text-secondary block mb-1">
            Order Number
          </label>
          <input
            type="text"
            value={formData.orderNumber}
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
            placeholder="e.g. ORD-1234"
            className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Amount ($) *
            </label>
            <input
              type="number"
              required
              min={0}
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as Invoice['status'] })
              }
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {INVOICE_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Created Date *
            </label>
            <input
              type="date"
              required
              value={formData.createdDate}
              onChange={(e) => setFormData({ ...formData, createdDate: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Due Date *
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3.5 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
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
            {editInvoice ? 'Save Changes' : 'Create Invoice'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
