'use client';

import React from 'react';
import { Invoice, InvoiceStatus } from './types';
import {
  FileText,
  User,
  Hash,
  DollarSign,
  Calendar,
  CalendarClock,
  Pencil,
} from 'lucide-react';
import Modal from '@/components/shared/Modal';

interface InvoiceDetailsModalProps {
  invoice: Invoice | null;
  onClose: () => void;
  onEdit: (invoice: Invoice) => void;
  formatCurrency: (val: number) => string;
}

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  Paid:      'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Pending:   'bg-amber-50 text-amber-600 border border-amber-200',
  Overdue:   'bg-red-50 text-red-600 border border-red-200',
  Cancelled: 'bg-slate-100 text-slate-500 border border-slate-200',
  Draft:     'bg-blue-50 text-blue-500 border border-blue-200',
};

export default function InvoiceDetailsModal({
  invoice,
  onClose,
  onEdit,
  formatCurrency,
}: InvoiceDetailsModalProps) {
  if (!invoice) return null;

  return (
    <Modal
      isOpen={!!invoice}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text-main">{invoice.invoiceNumber}</h3>
            <p className="text-xs text-text-secondary">Invoice Details</p>
          </div>
        </div>
      }
      footer={
        <>
          <button
            type="button"
            onClick={() => {
              const current = invoice;
              onClose();
              onEdit(current);
            }}
            className="btn-secondary text-sm font-semibold"
          >
            <Pencil className="w-4 h-4" />
            Edit Invoice
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
        {/* Status */}
        <div className="flex items-center justify-between p-3 bg-app-bg rounded-xl border border-border">
          <span className="text-xs text-text-secondary font-medium">Status</span>
          <span
            className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${STATUS_STYLES[invoice.status]}`}
          >
            {invoice.status}
          </span>
        </div>

        {/* Invoice Info */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Invoice Information
          </h4>
          <div className="space-y-2 text-text-main font-medium">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-text-muted shrink-0" />
              <span>
                Invoice:{' '}
                <span className="text-primary font-bold">{invoice.invoiceNumber}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-text-muted shrink-0" />
              <span>Customer: {invoice.customer}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-text-muted shrink-0" />
              <span>Order: {invoice.orderNumber}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Financial Summary
          </h4>
          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
            <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
              <DollarSign className="w-3.5 h-3.5" /> Invoice Amount
            </span>
            <span className="text-2xl font-bold text-text-main mt-1 block">
              {formatCurrency(invoice.amount)}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-2 pt-2 border-t border-border">
          <h4 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
            Dates
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-app-bg rounded-xl border border-border">
              <span className="text-xs font-semibold text-text-secondary flex items-center gap-1 mb-1">
                <Calendar className="w-3.5 h-3.5" /> Created
              </span>
              <span className="text-sm font-semibold text-text-main">{invoice.createdDate}</span>
            </div>
            <div className={`p-3 rounded-xl border ${invoice.status === 'Overdue' ? 'bg-red-50 border-red-100' : 'bg-app-bg border-border'}`}>
              <span className={`text-xs font-semibold flex items-center gap-1 mb-1 ${invoice.status === 'Overdue' ? 'text-red-600' : 'text-text-secondary'}`}>
                <CalendarClock className="w-3.5 h-3.5" /> Due
              </span>
              <span className={`text-sm font-semibold ${invoice.status === 'Overdue' ? 'text-red-600' : 'text-text-main'}`}>
                {invoice.dueDate}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
