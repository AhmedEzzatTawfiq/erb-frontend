'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InvoiceApi, InvoiceStatus } from './types';
import { ArrowUpDown, FileText, MoreVertical, Trash2 } from 'lucide-react';


interface InvoiceTableProps {
  invoices: InvoiceApi[];
  selectedIds?: string[];
  isAllSelected?: boolean;
  activeDropdown?: string | null;
  setActiveDropdown?: (id: string | null) => void;
  onSelectAll?: (checked: boolean) => void;
  onSelectOne?: (id: string) => void;
  onSort: (field: string) => void;
  onViewInvoice?: (invoice: InvoiceApi) => void;
  onEditInvoice?: (invoice: InvoiceApi) => void;
  onDeleteInvoice?: (id: string) => void;
  onDeleteSelected?: () => void;
  formatCurrency: (val: number) => string;
}

const STATUS_STYLES: Record<InvoiceStatus, string> = {
  paid: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending: 'bg-amber-50 text-amber-600 border border-amber-200',
  overdue: 'bg-red-50 text-red-600 border border-red-200',
};

const FALLBACK_STATUS_STYLE = 'bg-slate-100 text-slate-500 border border-slate-200';

const InvoiceStatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span
    className={`inline-flex min-w-24 items-center justify-center px-2.5 py-1 rounded-lg text-xs font-semibold capitalize ${
      STATUS_STYLES[status as InvoiceStatus] ?? FALLBACK_STATUS_STYLE
    }`}
  >
    {status}
  </span>
);

export default function InvoiceTable({
  invoices,
  selectedIds = [],
  isAllSelected = false,
  onSelectAll,
  onSelectOne,
  onSort,
  onDeleteSelected,
  formatCurrency,
}: InvoiceTableProps) {
  const router = useRouter();

  return (
    <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && onDeleteSelected && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} invoice{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <button
            onClick={onDeleteSelected}
            className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Selected
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-225">
          <thead>
            <tr className="bg-app-bg border-b border-border">
              {onSelectAll && (
                <th className="py-3.5 px-5 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    onChange={(e) => onSelectAll(e.target.checked)}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                  />
                </th>
              )}

              <th
                onClick={() => onSort('id')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>INVOICE ID</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('customer')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>CUSTOMER</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                ORDER ID
              </th>
              <th
                onClick={() => onSort('totalAmount')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>AMOUNT</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('dueDate')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>DUE DATE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider ">
                STATUS
              </th>
              <th
                onClick={() => onSort('invoiceDate')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>ISSUE DATE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>

            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-text-secondary">
                  <FileText className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No invoices found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search or filter keywords.
                  </p>
                </td>
              </tr>
            ) : (
              invoices.map((invoice) => {
                const isSelected = selectedIds.includes(invoice.id);
                const isOverdue = invoice.status === 'overdue';
                const shortId = invoice.id.slice(0, 8).toUpperCase();
                const customerName = invoice.customer?.companyName ?? '—';
                const orderId = invoice.orderId ? invoice.orderId.slice(0, 8).toUpperCase() : '—';

                return (
                  <tr
                    key={invoice.id}
                    onClick={() => router.push(`/invoices/${invoice.id}`)}
                    className={`hover:bg-slate-50/70 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {onSelectOne && (
                      <td className="py-4 px-5 text-center" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => onSelectOne(invoice.id)}
                          className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                        />
                      </td>
                    )}

                    <td className="py-4 px-5">
                      <span className="text-sm font-bold text-primary hover:underline block">
                        #{shortId}
                      </span>
                    </td>

                    <td className="py-4 px-5 text-sm font-medium text-text-main">
                      {customerName}
                    </td>

                    <td className="py-4 px-5 text-sm text-text-secondary font-medium">
                      #{orderId}
                    </td>

                    <td className="py-4 px-5 text-sm font-bold text-text-main">
                      {formatCurrency(Number(invoice.totalAmount))}
                    </td>

                    <td
                      className={`py-4 px-5 text-sm font-medium whitespace-nowrap ${
                        isOverdue ? 'text-red-600 font-semibold' : 'text-text-main'
                      }`}
                    >
                      {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '—'}
                    </td>

                    <td className="py-4 px-5">
                      <InvoiceStatusBadge status={invoice.status} />
                    </td>

                    <td className="py-4 px-5 text-sm text-text-secondary font-medium whitespace-nowrap">
                      {invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '—'}
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

