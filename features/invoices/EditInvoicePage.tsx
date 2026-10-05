'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useInvoice } from './hooks/useInvoice';
import { useUpdateInvoiceStatus } from './hooks/useUpdateInvoiceStatus';
import { InvoiceStatus } from './types';

const INVOICE_STATUSES: InvoiceStatus[] = ['pending', 'paid', 'overdue'];

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = (params?.id as string) || '';

  const { data: invoice, isLoading, isError } = useInvoice(invoiceId);
  const { mutate: updateStatus } = useUpdateInvoiceStatus();

  const [status, setStatus] = useState<InvoiceStatus>('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (invoice) {
      setStatus(invoice.status);
    }
  }, [invoice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    updateStatus(
      { id: invoiceId, data: { status } },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setSuccessMessage(true);
          setTimeout(() => router.push(`/invoices/${invoiceId}`), 1000);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

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

  const shortId = invoice.id.slice(0, 8).toUpperCase();
  const customerName = invoice.customer?.companyName ?? '—';
  const orderId = invoice.orderId ? invoice.orderId.slice(0, 8).toUpperCase() : '—';

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/invoices" className="hover:text-slate-800 transition-colors">
          Invoices
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Edit Invoice</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Edit Invoice: #{shortId}
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Update billing status and due dates.
        </p>
      </div>

      {/* Read-only Info Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Invoice ID</span>
          <span className="font-bold text-slate-900">#{shortId}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Customer</span>
          <span className="font-bold text-slate-900">{customerName}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Order Ref</span>
          <span className="font-bold text-slate-900">#{orderId}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Total Amount</span>
          <span className="font-bold text-slate-900">${Number(invoice.totalAmount).toFixed(2)}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Issue Date</span>
          <span className="font-bold text-slate-900">
            {invoice.invoiceDate ? new Date(invoice.invoiceDate).toLocaleDateString() : '—'}
          </span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Due Date</span>
          <span className="font-bold text-slate-900">
            {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '—'}
          </span>
        </div>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Update Invoice Status
            </h2>

            <div className="max-w-xs">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                STATUS *
              </label>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as InvoiceStatus)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer capitalize"
                >
                  {INVOICE_STATUSES.map((st) => (
                    <option key={st} value={st} className="capitalize">
                      {st.charAt(0).toUpperCase() + st.slice(1)}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
              <p className="text-[11px] text-slate-400 mt-2">
                Note: The backend only supports updating invoice status (paid / pending / overdue). Other invoice fields are read-only as they are derived from the associated order.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(`/invoices/${invoiceId}`)}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || successMessage}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {successMessage ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <span>Save Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
