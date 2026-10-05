'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Plus, Trash2, Loader2 } from 'lucide-react';
import { useCreateOrder } from '../orders/hooks/useCreateOrder';
import { useCustomers } from '../customers/hooks/useCustomers';
import { useProducts } from '../products/hooks/useProducts';
import { formatCurrency } from '@/lib/utils';

interface InvoiceLineItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
}

export default function CreateInvoicePage() {
  const router = useRouter();

  const { data: customersData } = useCustomers({ page: 1, limit: 100 });
  const customers = customersData?.data ?? [];

  const { data: productsData } = useProducts({ page: 1, limit: 100 });
  const products = productsData?.data ?? [];

  const { mutate: createOrder, isPending, isError, error } = useCreateOrder();

  const [customerId, setCustomerId] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [shippingAddress, setShippingAddress] = useState('');

  const [lines, setLines] = useState<InvoiceLineItem[]>([
    { productId: '', quantity: 1, unitPrice: 0, discount: 0 },
  ]);

  const handleAddLine = () => {
    setLines([...lines, { productId: '', quantity: 1, unitPrice: 0, discount: 0 }]);
  };

  const handleRemoveLine = (index: number) => {
    if (lines.length > 1) {
      setLines(lines.filter((_, i) => i !== index));
    }
  };

  const handleProductChange = (index: number, pId: string) => {
    const selectedProd = products.find((p) => p.id === pId);
    const updated = [...lines];
    updated[index].productId = pId;
    updated[index].unitPrice = selectedProd ? Number(selectedProd.unitPrice) : 0;
    setLines(updated);
  };

  const handleLineChange = (index: number, field: keyof InvoiceLineItem, val: number) => {
    const updated = [...lines];
    updated[index] = { ...updated[index], [field]: val };
    setLines(updated);
  };

  const totalAmount = lines.reduce((acc, line) => {
    const subtotal = line.quantity * line.unitPrice;
    return acc + Math.max(0, subtotal - (line.discount || 0));
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerId) return;
    const validLines = lines.filter((l) => l.productId && l.quantity > 0);
    if (validLines.length === 0) return;

    createOrder(
      {
        customerId,
        orderDate: invoiceDate,
        paymentMethod,
        shippingAddress,
        lines: validLines.map((l) => ({
          productId: l.productId,
          quantity: Number(l.quantity),
          unitPrice: Number(l.unitPrice),
          discount: Number(l.discount || 0),
        })),
      },
      {
        onSuccess: () => {
          router.push('/invoices');
        },
      }
    );
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/invoices" className="hover:text-slate-800 transition-colors">
          Invoices
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Create Invoice</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Create New Invoice
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Generate a billing invoice for client orders and track payment due dates.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Client & Dates */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Client & Billing Configuration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  CUSTOMER *
                </label>
                <div className="relative">
                  <select
                    required
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="" disabled hidden>
                      Select Customer
                    </option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.companyName || c.contactName} ({c.email || c.phone || 'No Contact'})
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  INVOICE / ORDER DATE *
                </label>
                <input
                  type="date"
                  required
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  PAYMENT METHOD
                </label>
                <input
                  type="text"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  placeholder="e.g. Credit Card, Wire Transfer"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  SHIPPING / BILLING ADDRESS
                </label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="100 Enterprise Way, Suite 400"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Line Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">
                Invoice Line Items
              </h2>
              <button
                type="button"
                onClick={handleAddLine}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            </div>

            <div className="space-y-3">
              {lines.map((line, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 gap-3 items-center bg-slate-50 p-3.5 rounded-lg border border-slate-200/80"
                >
                  <div className="col-span-12 sm:col-span-5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      PRODUCT *
                    </label>
                    <select
                      required
                      value={line.productId}
                      onChange={(e) => handleProductChange(idx, e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="" disabled hidden>
                        Select Product
                      </option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name} (${Number(p.unitPrice).toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      QTY *
                    </label>
                    <input
                      type="number"
                      min="1"
                      required
                      value={line.quantity}
                      onChange={(e) =>
                        handleLineChange(idx, 'quantity', parseInt(e.target.value) || 1)
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      DISCOUNT ($)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.discount}
                      onChange={(e) =>
                        handleLineChange(idx, 'discount', parseFloat(e.target.value) || 0)
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  <div className="col-span-3 sm:col-span-2 text-right">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      SUBTOTAL
                    </label>
                    <span className="text-sm font-bold text-slate-900 block py-2">
                      {formatCurrency(Math.max(0, line.quantity * line.unitPrice - (line.discount || 0)))}
                    </span>
                  </div>

                  <div className="col-span-1 text-right flex items-center justify-end">
                    {lines.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveLine(idx)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
              <div className="text-right">
                <span className="text-xs text-slate-500 font-medium">Calculated Invoice Total</span>
                <p className="text-xl font-bold text-blue-600">{formatCurrency(totalAmount)}</p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/invoices')}
              className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Creating Invoice...</span>
                </>
              ) : (
                <span>Create Invoice</span>
              )}
            </button>
            {isError && (
              <p className="text-sm text-red-600 ml-4">
                {error instanceof Error ? error.message : 'Failed to create invoice'}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
