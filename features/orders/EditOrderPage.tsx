'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, Check, Loader2 } from 'lucide-react';
import { useOrder } from './hooks/useOrder';
import { useUpdateOrder } from './hooks/useUpdateOrder';
import { useUpdateOrderStatus } from './hooks/useUpdateOrderStatus';
import { OrderStatus } from './types';

const ORDER_STATUSES: { value: OrderStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];

const PAYMENT_METHODS = [
  'Credit Card',
  'Bank Transfer',
  'Cash',
  'PayPal',
  'Wire Transfer',
  'Cheque',
];

export default function EditOrderPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = (params?.id as string) || '';

  const { data: order, isLoading, isError } = useOrder(orderId);
  const { mutate: updateOrder } = useUpdateOrder();
  const { mutate: updateStatus } = useUpdateOrderStatus();

  const [formData, setFormData] = useState({
    orderDate: '',
    paymentMethod: '',
    shippingAddress: '',
    status: 'pending' as OrderStatus,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  // Populate form when order data loads
  useEffect(() => {
    if (order) {
      setFormData({
        orderDate: order.orderDate ? order.orderDate.split('T')[0] : '',
        paymentMethod: order.paymentMethod ?? '',
        shippingAddress: order.shippingAddress ?? '',
        status: order.status,
      });
    }
  }, [order]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Update order fields
    updateOrder(
      {
        id: orderId,
        data: {
          orderDate: formData.orderDate,
          paymentMethod: formData.paymentMethod,
          shippingAddress: formData.shippingAddress,
        },
      },
      {
        onSuccess: () => {
          // Also update status if it changed
          if (order && formData.status !== order.status) {
            updateStatus(
              { id: orderId, data: { status: formData.status } },
              {
                onSuccess: () => {
                  setIsSubmitting(false);
                  setSuccessMessage(true);
                  setTimeout(() => router.push(`/orders/${orderId}`), 1000);
                },
                onError: () => setIsSubmitting(false),
              }
            );
          } else {
            setIsSubmitting(false);
            setSuccessMessage(true);
            setTimeout(() => router.push(`/orders/${orderId}`), 1000);
          }
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

  if (isError || !order) {
    return (
      <main className="max-w-7xl mx-auto pb-10">
        <p className="text-red-500 text-sm py-12 text-center">
          Order not found or failed to load.
        </p>
      </main>
    );
  }

  const shortId = order.id.slice(0, 8).toUpperCase();
  const customerName = order.customer?.companyName ?? '—';

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/orders" className="hover:text-slate-800 transition-colors">
          Orders
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">Edit Order</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Edit Order: #{shortId}
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Modify fulfillment details, status, and payment configuration.
        </p>
      </div>

      {/* Read-only Info Strip */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-2xs grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Order ID</span>
          <span className="font-bold text-slate-900">#{shortId}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Customer</span>
          <span className="font-bold text-slate-900">{customerName}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Total Amount</span>
          <span className="font-bold text-slate-900">${Number(order.totalAmount).toFixed(2)}</span>
        </div>
        <div>
          <span className="text-slate-400 font-semibold uppercase tracking-wider block text-[10px] mb-0.5">Line Items</span>
          <span className="font-bold text-slate-900">{order.lines?.length ?? 0}</span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* Section 1 — Order Details */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">Order Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ORDER DATE *
                </label>
                <input
                  type="date"
                  required
                  value={formData.orderDate}
                  onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  ORDER STATUS *
                </label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as OrderStatus })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    {ORDER_STATUSES.map((st) => (
                      <option key={st.value} value={st.value}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  PAYMENT METHOD *
                </label>
                <div className="relative">
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="">Select payment method</option>
                    {PAYMENT_METHODS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 2 — Shipping */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">Shipping & Fulfillment</h2>

            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                SHIPPING ADDRESS
              </label>
              <input
                type="text"
                value={formData.shippingAddress}
                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                placeholder="100 Logistics Blvd, New York, NY 10001"
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(`/orders/${orderId}`)}
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
