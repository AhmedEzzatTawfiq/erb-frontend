'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
  ChevronRight, Pencil, Mail, Phone, Globe,
  Calendar, Package, Star, Loader2,
} from 'lucide-react';
import { useSupplier } from './hooks/useSupplier';

export default function SupplierProfilePage() {
  const params = useParams();
  const supplierId = (params?.id as string) || '';

  const { data: supplier, isLoading, isError } = useSupplier(supplierId);

  if (isLoading) {
    return (
      <main className="flex items-center justify-center py-32">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400" />
      </main>
    );
  }

  if (isError || !supplier) {
    return (
      <main className="max-w-7xl mx-auto pb-10">
        <p className="text-red-500 text-sm py-12 text-center">
          Supplier not found or failed to load.
        </p>
      </main>
    );
  }

  // Derive display values
  const initials = supplier.companyName
    ? supplier.companyName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SU';

  const statusLabel = supplier.status ?? 'Active';
  const productsSupplied: string[] = supplier.productsSupplied ?? [];
  const joinedDate = supplier.joinedDate
    ? new Date(supplier.joinedDate).toLocaleDateString()
    : '—';
  const paymentTerms = supplier.paymentTerms ?? '—';

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/suppliers" className="hover:text-slate-800 transition-colors">
          Suppliers
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{supplier.companyName}</span>
      </nav>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {supplier.companyName}
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Supplier Performance Profile &amp; Contract History
          </p>
        </div>
        <Link
          href={`/suppliers/${supplier.id}/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold
           px-4 py-2.5 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Supplier</span>
        </Link>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs text-center flex flex-col items-center">
            <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-xl font-bold border-2 border-slate-100 shadow-2xs bg-blue-100 text-blue-700">
              {initials}
            </div>

            <h2 className="text-lg font-bold text-slate-900">{supplier.companyName}</h2>
            <p className="text-xs text-slate-500 font-medium mb-3">
              Account Manager: <span className="text-slate-800 font-semibold">{supplier.contactName}</span>
            </p>

            <div className="flex items-center gap-2 justify-center mb-5 flex-wrap">
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-200">
                Verified Vendor
              </span>
              <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                {statusLabel}
              </span>
            </div>

            <a
              href={`mailto:${supplier.email}`}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>Contact Vendor</span>
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Supplier Details</h3>

            <div className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Email</span>
                </div>
                <span className="font-semibold text-slate-800">{supplier.email ?? '—'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Phone</span>
                </div>
                <span className="font-semibold text-slate-800">{supplier.phone ?? '—'}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Address</span>
                </div>
                <span className="font-semibold text-slate-800 text-right max-w-[60%] truncate">
                  {supplier.address ?? '—'}
                </span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Vendor Since</span>
                </div>
                <span className="font-semibold text-slate-800">{joinedDate}</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Star className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Payment Terms</span>
                </div>
                <span className="font-semibold text-blue-600">{paymentTerms}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Categories Supplied
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                {productsSupplied.length} Active
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Status
              </span>
              <span
                className={`text-sm font-bold mt-1 block ${
                  statusLabel === 'Active' ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                {statusLabel}
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Payment Terms
              </span>
              <span className="text-sm font-bold text-blue-600 mt-1 block">
                {paymentTerms}
              </span>
            </div>
          </div>

          {/* Product Categories */}
          {productsSupplied.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
              <h3 className="text-base font-bold text-slate-900">Product Categories Supplied</h3>

              <div className="flex flex-wrap gap-2 pt-1">
                {productsSupplied.map((prod) => (
                  <span
                    key={prod}
                    className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                  >
                    <Package className="w-3.5 h-3.5 text-blue-500" />
                    {prod}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Contact Details */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Full Contact Information</h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Company</span>
                <span className="col-span-2 font-bold text-slate-900">{supplier.companyName}</span>
              </div>
              <div className="grid grid-cols-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Contact</span>
                <span className="col-span-2 font-bold text-slate-900">{supplier.contactName}</span>
              </div>
              <div className="grid grid-cols-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Email</span>
                <a
                  href={`mailto:${supplier.email}`}
                  className="col-span-2 font-bold text-blue-600 hover:underline"
                >
                  {supplier.email ?? '—'}
                </a>
              </div>
              <div className="grid grid-cols-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Phone</span>
                <span className="col-span-2 font-bold text-slate-900">{supplier.phone ?? '—'}</span>
              </div>
              <div className="grid grid-cols-3 py-3 items-center">
                <span className="font-semibold text-slate-500">Address</span>
                <span className="col-span-2 font-bold text-slate-900">{supplier.address ?? '—'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
