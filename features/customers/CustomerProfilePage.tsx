'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Pencil, Mail, Building2, MapPin, Phone, Globe,
  Calendar, ShoppingBag, DollarSign, Clock, MessageSquare,
  ArrowUpRight, CreditCard, CheckCircle2,
} from 'lucide-react';
import { INITIAL_CUSTOMERS } from './mockData';
import { formatCurrency } from '@/lib/utils';

export default function CustomerProfilePage() {
  const params = useParams();
  const customerId = (params?.id as string) || 'cust-1';

  const customer = INITIAL_CUSTOMERS.find((c) => c.id === customerId) || {
    id: customerId,
    companyName: 'Acme Corporation',
    contactName: 'Jane Doe',
    email: 'jane.doe@acmecorp.com',
    phone: '+1 (555) 019-2834',
    orders: 18,
    totalSpent: 42850.0,
    status: 'Active' as const,
    initials: 'AC',
    initialsBg: 'bg-indigo-100 text-indigo-700',
    joinedDate: '2023-04-12',
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/customers"
          className="hover:text-slate-800 transition-colors"
        >
          Customers
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{customer.companyName}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {customer.companyName}
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Customer Profile & Account History
          </p>
        </div>
        <Link
          href={`/customers/${customer.id}/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold px-4 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Customer</span>
        </Link>
      </div>

      {/* Main page */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-center flex flex-col items-center">
            <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-xl font-bold border-2 border-slate-100 shadow-2xs ${customer.initialsBg}`}>
              {customer.initials}
            </div>

            <h2 className="text-lg font-bold text-slate-900">{customer.companyName}</h2>
            <p className="text-xs text-slate-500 font-medium mb-3">
              Primary Contact: <span className="text-slate-800 font-semibold">{customer.contactName}</span>
            </p>

            <div className="flex items-center gap-2 justify-center mb-5">
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                Enterprise Account
              </span>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {customer.status}
              </span>
            </div>

            <a
              href={`mailto:${customer.email}`}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
          </div>

          {/* Quick Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Account Information</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Email</span>
                </div>
                <span className="font-semibold text-slate-800">{customer.email}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Phone</span>
                </div>
                <span className="font-semibold text-slate-800">{customer.phone}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Address</span>
                </div>
                <span className="font-semibold text-slate-800">100 Corporate Blvd, NY</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Country</span>
                </div>
                <span className="font-semibold text-slate-800">United States</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Joined Date</span>
                </div>
                <span className="font-semibold text-slate-800">{customer.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Revenue
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {formatCurrency(customer.totalSpent)}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Orders
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {customer.orders} Orders
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Avg Order Value
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 mt-1 block">
                {formatCurrency(customer.totalSpent / (customer.orders || 1))}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Payment Terms
              </span>
              <span className="text-base sm:text-lg font-bold text-blue-600 mt-1 block">
                Net 30
              </span>
            </div>
          </div>

          {/* Customer Recent Orders */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Recent Customer Orders</h3>
              <Link
                href="/orders"
                className="text-xs font-semibold text-[#2563EB] hover:underline flex items-center gap-1"
              >
                <span>View All Orders</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-4 pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>ORDER REF</span>
                <span>DATE</span>
                <span>STATUS</span>
                <span className="text-right">TOTAL</span>
              </div>

              <div className="grid grid-cols-4 py-3 items-center">
                <Link href="/orders/ord-1" className="font-bold text-blue-600 hover:underline">
                  #ORD-7829
                </Link>
                <span className="text-slate-500">Oct 24, 2024</span>
                <div>
                  <span className="bg-blue-50 text-blue-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Processing
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-right">{formatCurrency(1249.99)}</span>
              </div>

              <div className="grid grid-cols-4 py-3 items-center">
                <Link href="/orders/ord-2" className="font-bold text-blue-600 hover:underline">
                  #ORD-7828
                </Link>
                <span className="text-slate-500">Oct 18, 2024</span>
                <div>
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Delivered
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-right">{formatCurrency(3450.00)}</span>
              </div>

              <div className="grid grid-cols-4 py-3 items-center">
                <Link href="/orders/ord-3" className="font-bold text-blue-600 hover:underline">
                  #ORD-7825
                </Link>
                <span className="text-slate-500">Sep 30, 2024</span>
                <div>
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Delivered
                  </span>
                </div>
                <span className="font-bold text-slate-900 text-right">{formatCurrency(890.50)}</span>
              </div>
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Activity Log</h3>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  New Order #ORD-7829 placed
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Oct 24, 2024 at 10:30 AM</p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Payment for Invoice #INV-2024-001 completed
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Oct 15, 2024 at 02:15 PM</p>
              </div>

              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 absolute -left-5.75 top-1 border-2 border-white" />
                <h4 className="text-xs font-semibold text-slate-900">
                  Account details updated by Support Team
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Sep 12, 2024 at 11:00 AM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
