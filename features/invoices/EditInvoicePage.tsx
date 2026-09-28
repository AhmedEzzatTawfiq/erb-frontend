'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Check } from 'lucide-react';
import { INITIAL_INVOICES } from './mockData';

const INVOICE_STATUSES = ['Paid', 'Pending', 'Overdue', 'Cancelled', 'Draft'] as const;

export default function EditInvoicePage() {
  const router = useRouter();
  const params = useParams();
  const invoiceId = (params?.id as string) || 'inv-1';

  const [formData, setFormData] = useState({
    invoiceNumber: 'INV-2024-001',
    customer: 'Acme Corp',
    orderNumber: 'ORD-7829',
    amount: '3450.00',
    createdDate: '2024-10-01',
    dueDate: '2024-10-31',
    status: 'Paid',
    notes: 'Payment received via electronic bank transfer on Oct 15.',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    const existing = INITIAL_INVOICES.find((i) => i.id === invoiceId);
    if (existing) {
      setFormData((prev) => ({
        ...prev,
        invoiceNumber: existing.invoiceNumber,
        customer: existing.customer,
        orderNumber: existing.orderNumber,
        amount: existing.amount.toString(),
        createdDate: existing.createdDate,
        dueDate: existing.dueDate,
        status: existing.status,
      }));
    }
  }, [invoiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        router.push('/invoices');
      }, 1000);
    }, 400);
  };

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
        <span className="text-slate-700 font-semibold">Edit Invoice</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Edit Invoice: {formData.invoiceNumber}
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Update billing totals, payment status, and due dates.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Client & Reference
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  CUSTOMER NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.customer}
                  onChange={(e) =>
                    setFormData({ ...formData, customer: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ORDER NUMBER / REF
                </label>
                <input
                  type="text"
                  value={formData.orderNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, orderNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 2 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Invoice Amount & Terms
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  INVOICE NUMBER
                </label>
                <input
                  type="text"
                  required
                  value={formData.invoiceNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceNumber: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  AMOUNT ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ISSUE DATE *
                </label>
                <input
                  type="date"
                  required
                  value={formData.createdDate}
                  onChange={(e) =>
                    setFormData({ ...formData, createdDate: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  DUE DATE *
                </label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  STATUS *
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    {INVOICE_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 3: Notes */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Additional Notes & Payment Terms
            </h2>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                PAYMENT INSTRUCTIONS / NOTES
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/invoices')}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900
               hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium
               rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {successMessage ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <span>Saving...</span>
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
