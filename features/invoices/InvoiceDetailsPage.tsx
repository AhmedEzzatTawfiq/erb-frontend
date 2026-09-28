'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Pencil, Download } from 'lucide-react';
import { INITIAL_INVOICES } from './mockData';
import { formatCurrency } from '@/lib/utils';

export default function InvoiceDetailsPage() {
  const params = useParams();
  const invoiceId = (params?.id as string) || 'inv-1';

  const invoice = INITIAL_INVOICES.find((i) => i.id === invoiceId) || {
    id: invoiceId,
    invoiceNumber: '#INV-2024-001',
    customer: 'Acme Corp',
    orderNumber: 'ORD-7829',
    amount: 3450.0,
    dueDate: '2024-10-31',
    createdDate: '2024-10-01',
    status: 'Paid' as const,
  };

  const isOverdue = invoice.status === 'Overdue';

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/invoices"
          className="hover:text-slate-800 transition-colors"
        >
          Invoices
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{invoice.invoiceNumber}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Invoice {invoice.invoiceNumber}
            </h1>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                invoice.status === 'Paid'
                  ? 'bg-emerald-100 text-emerald-700'
                  : invoice.status === 'Overdue'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              {invoice.status}
            </span>
          </div>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Issued on {invoice.createdDate} for {invoice.customer}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm
             font-semibold px-3.5 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download PDF</span>
          </button>
          <Link
            href={`/invoices/${invoice.id}/edit`}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-4 py-2.5
             rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Invoice</span>
          </Link>
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
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  100 Enterprise Way, Suite 400<br />
                  New York, NY 10001<br />
                  billing@erpcore.com
                </p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  BILLED TO
                </span>
                <h3 className="text-sm font-bold text-slate-900">{invoice.customer}</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  450 Business Plaza, Ste 12<br />
                  Chicago, IL 60601<br />
                  finance@{invoice.customer.toLowerCase().replace(/\s+/g, '')}.com
                </p>
              </div>
            </div>

            {/* Summary Table */}
            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Line Items Summary</h3>
              <div className="divide-y divide-slate-100 text-xs">
                <div className="grid grid-cols-12 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <span className="col-span-7">DESCRIPTION</span>
                  <span className="col-span-2 text-center">QTY</span>
                  <span className="col-span-3 text-right">AMOUNT</span>
                </div>

                <div className="grid grid-cols-12 py-3 items-center">
                  <div className="col-span-7 font-medium text-slate-900">
                    Industrial Hardware & Networking Equipment Supply
                    <span className="block text-[11px] text-slate-400 font-normal mt-0.5">Ref Order #{invoice.orderNumber}</span>
                  </div>
                  <span className="col-span-2 text-center font-semibold text-slate-700">1</span>
                  <span className="col-span-3 text-right font-bold text-slate-900">{formatCurrency(invoice.amount * 0.9)}</span>
                </div>

                <div className="grid grid-cols-12 py-3 items-center">
                  <div className="col-span-7 font-medium text-slate-900">
                    Standard Installation & Warranty Coverage
                    <span className="block text-[11px] text-slate-400 font-normal mt-0.5">1-Year Hardware Protection Plan</span>
                  </div>
                  <span className="col-span-2 text-center font-semibold text-slate-700">1</span>
                  <span className="col-span-3 text-right font-bold text-slate-900">{formatCurrency(invoice.amount * 0.1)}</span>
                </div>
              </div>

              {/* Totals Box */}
              <div className="pt-4 border-t border-slate-100 max-w-xs ml-auto space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">{formatCurrency(invoice.amount)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (0%)</span>
                  <span className="font-semibold text-slate-900">$0.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount Due</span>
                  <span className="text-blue-600">{formatCurrency(invoice.amount)}</span>
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
                <span className="text-slate-500 font-medium">Invoice Number</span>
                <span className="font-bold text-slate-900">{invoice.invoiceNumber}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Order Reference</span>
                <Link href={`/orders/${invoice.orderNumber}`} className="font-bold text-blue-600 hover:underline">
                  #{invoice.orderNumber}
                </Link>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Issue Date</span>
                <span className="font-semibold text-slate-800">{invoice.createdDate}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 font-medium">Due Date</span>
                <span className={`font-semibold ${isOverdue ? 'text-red-600 font-bold' : 'text-slate-800'}`}>
                  {invoice.dueDate}
                </span>
              </div>

              <div className="flex items-center justify-between py-1">
                <span className="text-slate-500 font-medium">Status</span>
                <span className="font-bold text-slate-900">{invoice.status}</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Payment Audit Trail</h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Payment Received in Full</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Wire Transfer Ref #TX-9021</p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Invoice Sent to Client Finance Dept</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Issued on {invoice.createdDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
