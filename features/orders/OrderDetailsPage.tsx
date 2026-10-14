'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Pencil, ShoppingCart,
  User, CreditCard, FileText, Printer, Loader2,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { useOrder } from './hooks/useOrder';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = params?.id as string;

  const { data: order, isLoading, isError } = useOrder(orderId);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </main>
    );
  }

  if (isError || !order) {
    return (
      <main className="max-w-3xl mx-auto py-16 px-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">Order Not Found</h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              The order you are looking for does not exist, was deleted, or failed to load.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/orders"
              className="inline-flex items-center justify-center px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Back to Orders List
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const shortId = order.id.slice(0, 8).toUpperCase();
  const customerName = order.customer?.companyName ?? '—';
  const customerInitials = customerName !== '—'
    ? customerName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';
  const statusLabel = order.status.charAt(0).toUpperCase() + order.status.slice(1);

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/orders" className="hover:text-slate-800 transition-colors">
          Orders
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">#{shortId}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Order #{shortId}
            </h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {statusLabel}
            </span>
          </div>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Placed on {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '—'} by {customerName}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-3.5 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Invoice</span>
          </button>
          <Link
            href={`/orders/${order.id}/edit`}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2"
          >
            <Pencil className="w-4 h-4" />
            <span>Edit Order</span>
          </Link>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">
              Order Line Items ({order.lines?.length ?? 0})
            </h2>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-12 pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="col-span-6">ITEM DESCRIPTION</span>
                <span className="col-span-2 text-center">QTY</span>
                <span className="col-span-2 text-right">UNIT PRICE</span>
                <span className="col-span-2 text-right">SUBTOTAL</span>
              </div>

              {order.lines && order.lines.length > 0 ? (
                order.lines.map((line) => (
                  <div key={line.id} className="grid grid-cols-12 py-3.5 items-center">
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                        <ShoppingCart className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">Product #{line.productId.slice(0, 6).toUpperCase()}</h4>
                        <span className="text-[11px] text-slate-400">ID: {line.productId.slice(0, 8)}</span>
                      </div>
                    </div>
                    <span className="col-span-2 text-center font-bold text-slate-900">{line.quantity}</span>
                    <span className="col-span-2 text-right font-semibold text-slate-600">{formatCurrency(line.unitPrice)}</span>
                    <span className="col-span-2 text-right font-bold text-slate-900">
                      {formatCurrency(line.unitPrice * line.quantity)}
                    </span>
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-slate-400 text-xs">
                  No line items available.
                </div>
              )}
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-slate-100 max-w-xs ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">{formatCurrency(Number(order.totalAmount))}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping Fee</span>
                <span className="font-semibold text-emerald-600">FREE</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Estimated Tax</span>
                <span className="font-semibold text-slate-900">$0.00</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                <span>Grand Total</span>
                <span className="text-blue-600">{formatCurrency(Number(order.totalAmount))}</span>
              </div>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Fulfillment Status</h2>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Order Created</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '—'}
                </p>
              </div>

              {(order.status === 'confirmed' || order.status === 'shipped' || order.status === 'delivered') && (
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute -left-5.75 top-1 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-slate-900">Order Confirmed</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Processing in fulfillment</p>
                </div>
              )}

              {(order.status === 'shipped' || order.status === 'delivered') && (
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 absolute -left-5.75 top-1 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-slate-900">Shipped</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Handed to shipping company</p>
                </div>
              )}

              {order.status === 'delivered' && (
                <div className="relative">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 absolute -left-5.75 top-1 border-2 border-white" />
                  <h4 className="text-xs font-semibold text-slate-900">Delivered</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Received by customer</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Customer Details</h3>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs bg-blue-100 text-blue-700">
                {customerInitials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{customerName}</h4>
                <span className="text-xs text-slate-500 font-medium">Corporate Account</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{order.customer?.contactName ?? '—'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{order.customer?.email ?? '—'}</span>
              </div>
            </div>
          </div>

          {/* Payment & Delivery */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Payment & Delivery</h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  PAYMENT METHOD
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  {order.paymentMethod ?? '—'}
                </span>
              </div>

              <hr className="border-t border-slate-100 my-2" />

              <div>
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  SHIPPING ADDRESS
                </span>
                <div className="mt-1 text-slate-700 font-medium leading-relaxed">
                  <p>{order.shippingAddress ?? '—'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
