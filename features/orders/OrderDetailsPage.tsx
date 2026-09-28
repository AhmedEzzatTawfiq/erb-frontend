'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Pencil, ShoppingCart,
  User, CreditCard, FileText, Printer,
} from 'lucide-react';
import { INITIAL_ORDERS } from './mockData';
import { formatCurrency } from '@/lib/utils';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = (params?.id as string) || 'ord-1';

  const order = INITIAL_ORDERS.find((o) => o.id === orderId) || {
    id: orderId,
    orderNumber: '#ORD-7829',
    customer: {
      name: 'TechCorp Solutions',
      initials: 'TC',
      initialsBg: 'bg-[#F0F4FF] text-blue-700',
    },
    date: 'Oct 24, 2024',
    items: 3,
    total: 1249.99,
    paymentStatus: 'Paid' as const,
    status: 'Processing' as const,
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/orders"
          className="hover:text-slate-800 transition-colors"
        >
          Orders
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{order.orderNumber}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Order {order.orderNumber}
            </h1>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {order.status}
            </span>
          </div>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Placed on {order.date} by {order.customer.name}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm
             font-semibold px-3.5 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Print Invoice</span>
          </button>
          <Link
            href={`/orders/${order.id}/edit`}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-4 py-2.5
             rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2"
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
            <h2 className="text-base font-bold text-slate-900">Order Line Items ({order.items})</h2>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-12 pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span className="col-span-6">ITEM DESCRIPTION</span>
                <span className="col-span-2 text-center">QTY</span>
                <span className="col-span-2 text-right">UNIT PRICE</span>
                <span className="col-span-2 text-right">SUBTOTAL</span>
              </div>

              <div className="grid grid-cols-12 py-3.5 items-center">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex
                   items-center justify-center shrink-0">
                    <ShoppingCart className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Industrial Titanium Servo Motor V2</h4>
                    <span className="text-[11px] text-slate-400">SKU: NET-RT-X900</span>
                  </div>
                </div>
                <span className="col-span-2 text-center font-bold text-slate-900">2</span>
                <span className="col-span-2 text-right font-semibold text-slate-600">$450.00</span>
                <span className="col-span-2 text-right font-bold text-slate-900">$900.00</span>
              </div>

              <div className="grid grid-cols-12 py-3.5 items-center">
                <div className="col-span-6 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center
                   justify-center shrink-0">
                    <ShoppingCart className="w-4 h-4 text-slate-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Ergonomic Keyboard V2</h4>
                    <span className="text-[11px] text-slate-400">SKU: PER-KB-ERGO2</span>
                  </div>
                </div>
                <span className="col-span-2 text-center font-bold text-slate-900">1</span>
                <span className="col-span-2 text-right font-semibold text-slate-600">$349.99</span>
                <span className="col-span-2 text-right font-bold text-slate-900">$349.99</span>
              </div>
            </div>

            {/* Calculations */}
            <div className="pt-4 border-t border-slate-100 max-w-xs ml-auto space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">$1,249.99</span>
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
                <span className="text-blue-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>

          {/* status */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Fulfillment Status</h2>

            <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Order Confirmed & Payment Verified</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Oct 24, 2024 - 10:32 AM</p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Processing in Distribution Hub (Aisle 4)</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Oct 24, 2024 - 11:45 AM</p>
              </div>

              <div className="relative opacity-50">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">Handed to Logistics Carrier (FedEx Express)</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Pending</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Customer Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Customer Details</h3>

            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${order.customer.initialsBg}`}>
                {order.customer.initials}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">{order.customer.name}</h4>
                <span className="text-xs text-slate-500 font-medium">Corporate Account</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Contact: TechCorp Procurement</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Email: billing@techcorp.com</span>
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Payment & Delivery</h3>

            <div className="space-y-3 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  PAYMENT METHOD
                </span>
                <span className="font-bold text-slate-800 text-sm mt-0.5 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  Credit Card (•••• 8829)
                </span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  PAYMENT STATUS
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold
                 bg-emerald-100 text-emerald-700 mt-1">
                  {order.paymentStatus}
                </span>
              </div>

              <hr className="border-t border-slate-100 my-2" />

              <div>
                <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
                  SHIPPING ADDRESS
                </span>
                <div className="mt-1 text-slate-700 font-medium leading-relaxed">
                  <p>450 Technology Way, Ste 200</p>
                  <p>San Francisco, CA 94107</p>
                  <p>United States</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
