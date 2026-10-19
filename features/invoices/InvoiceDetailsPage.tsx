'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Download, Loader2, ChevronDown, Check } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useInvoice } from './hooks/useInvoice';
import { useUpdateInvoiceStatus } from './hooks/useUpdateInvoiceStatus';
import type { InvoiceStatus } from './types';

const STATUS_OPTIONS: { value: InvoiceStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'paid',    label: 'Paid' },
  // { value: 'overdue', label: 'Overdue' },
];

const statusStyles: Record<InvoiceStatus, string> = {
  paid:    'bg-emerald-100 text-emerald-700 ring-emerald-200',
  overdue: 'bg-red-100 text-red-700 ring-red-200',
  pending: 'bg-amber-100 text-amber-700 ring-amber-200',
};

export default function InvoiceDetailsPage() {
  const params = useParams();
  const invoiceId = (params?.id as string) || '';

  const { data: invoice, isLoading, isError } = useInvoice(invoiceId);
  const updateStatus = useUpdateInvoiceStatus();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleStatusChange(newStatus: InvoiceStatus) {
    if (newStatus === invoice?.status) { setDropdownOpen(false); return; }
    updateStatus.mutate(
      { id: invoiceId, data: { status: newStatus } },
      { onSettled: () => setDropdownOpen(false) },
    );
  }

  if (isLoading) {
    return (
      <main className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </main>
    );
  }

  if (isError || !invoice) {
    return (
      <main className="max-w-7xl mx-auto pb-10">
        <p className="text-red-500 text-sm py-12 text-center">
          Invoice not found or failed to load.
        </p>
      </main>
    );
  }

  const isOverdue = invoice.status === 'overdue';
  const statusLabel = invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1);
  const shortId = invoice.id.slice(0, 8).toUpperCase();
  const customerName = invoice.customer?.companyName ?? '—';
  const orderId = invoice.orderId ? `#${invoice.orderId.slice(0, 8).toUpperCase()}` : '—';

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/invoices" className="hover:text-slate-800 transition-colors">
          Invoices
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">#{shortId}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Invoice #{shortId}
            </h1>
            {/* Status badge / dropdown trigger */}
            <div className="relative" ref={dropdownRef}>
              <button
                id="invoice-status-trigger"
                type="button"
                disabled={updateStatus.isPending}
                onClick={() => setDropdownOpen(prev => !prev)}
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ring-1 transition-opacity cursor-pointer disabled:opacity-60 ${statusStyles[invoice.status]}`}
              >
                {updateStatus.isPending
                  ? <Loader2 className="w-3 h-3 animate-spin" />
                  : statusLabel
                }
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 z-50 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden min-w-32.5">
                  {STATUS_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      id={`status-option-${opt.value}`}
                      type="button"
                      onClick={() => handleStatusChange(opt.value)}
                      className="w-full flex items-center justify-between gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <span className={`w-2 h-2 rounded-full ${ opt.value === 'paid' ? 'bg-emerald-500' : opt.value === 'overdue' ? 'bg-red-500' : 'bg-amber-400' }`} />
                      {opt.label}
                      {invoice.status === opt.value && <Check className="w-3.5 h-3.5 text-slate-400 ml-auto" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Issued on {invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '—'} for {customerName}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-3.5 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-2xs space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  BILLED FROM
                </span>
                <h3 className="text-sm font-bold text-slate-900">ERP Core Systems Inc.</h3>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  BILLED TO
                </span>
                <h3 className="text-sm font-bold text-slate-900">{customerName}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {invoice.customer?.email ?? '—'}
                </p>
              </div>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Line Items</h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-12 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span className="col-span-7">DESCRIPTION</span>
                  <span className="col-span-2 text-center">QTY</span>
                  <span className="col-span-3 text-right">AMOUNT</span>
                </div>

                {invoice.lines && invoice.lines.length > 0 ? (
                  invoice.lines.map((line) => (
                    <div key={line.id} className="grid grid-cols-12 py-3 items-center">
                      <div className="col-span-7 font-medium text-slate-900">
                        {line.description}
                      </div>
                      <span className="col-span-2 text-center font-semibold text-slate-700">
                        {line.quantity}
                      </span>
                      <span className="col-span-3 text-right font-bold text-slate-900">
                        {formatCurrency(line.unitPrice * line.quantity)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="py-4 text-center text-slate-400 col-span-12">
                    No line items available.
                  </div>
                )}
              </div>

              {/* Totals Box */}
              <div className="pt-4 border-t border-slate-100 max-w-xs ml-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(Number(invoice.totalAmount))}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span className="font-semibold text-slate-900">$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount Due</span>
                  <span className="text-blue-600">{formatCurrency(Number(invoice.totalAmount))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Metadata Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Invoice Information</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Invoice ID</span>
                <span className="font-bold text-slate-900">#{shortId}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Order Reference</span>
                <Link href={`/orders/${invoice.orderId}`} className="font-bold text-blue-600 hover:underline">
                  {orderId}
                </Link>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Issue Date</span>
                <span className="font-semibold text-slate-800">
                  {invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Due Date</span>
                <span className={`font-semibold ${isOverdue ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
                  {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Status</span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ring-1 ${statusStyles[invoice.status]}`}>
                  {updateStatus.isPending ? '…' : statusLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Audit Trail */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Payment Audit Trail</h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Invoice Issued</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '—'}
                </p>
              </div>

              {invoice.paidAt ? (
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-5.75 top-1 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-slate-900">Payment Received in Full</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Paid on {new Date(invoice.paidAt).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="relative opacity-60">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-5.75 top-1 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-slate-900">Payment Pending</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Not yet received</p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
