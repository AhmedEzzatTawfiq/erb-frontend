'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ChevronRight, Pencil, Mail, Phone, Globe, Calendar, Package, Star } from 'lucide-react';
import { INITIAL_SUPPLIERS } from './mockData';

export default function SupplierProfilePage() {
  const params = useParams();
  const supplierId = (params?.id as string) || 'sup-1';

  const supplier = INITIAL_SUPPLIERS.find((s) => s.id === supplierId) || {
    id: supplierId,
    companyName: 'Acme Corp',
    contactName: 'Jane Doe',
    email: 'jane.doe@acme.com',
    phone: '+1 (555) 123-4567',
    productsSupplied: ['Electronics', 'Hardware', 'Networking'],
    status: 'Active' as const,
    initials: 'AC',
    initialsBg: 'bg-blue-100 text-blue-700',
    joinedDate: '2022-03-15',
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/suppliers"
          className="hover:text-slate-800 transition-colors"
        >
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
            Supplier Performance Profile & Contract History
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
            <div className={`w-20 h-20 rounded-full mb-4 flex items-center justify-center text-xl font-bold border-2 border-slate-100 shadow-2xs ${supplier.initialsBg}`}>
              {supplier.initials}
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
                {supplier.status}
              </span>
            </div>

            <a href={`mailto:${supplier.email}`}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5 rounded-lg
               shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
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
                <span className="font-semibold text-slate-800">{supplier.email}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Phone</span>
                </div>
                <span className="font-semibold text-slate-800">{supplier.phone}</span>
              </div>

              <div className="flex items-center justify-between py-1 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Globe className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Region</span>
                </div>
                <span className="font-semibold text-slate-800">North America</span>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Vendor Since</span>
                </div>
                <span className="font-semibold text-slate-800">{supplier.joinedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Quality Rating
              </span>
              <div className="flex items-center gap-1 mt-1">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-slate-900">4.8 / 5.0</span>
              </div>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                On-Time Delivery
              </span>
              <span className="text-sm font-bold text-emerald-600 mt-1 block">
                98.4%
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Active Contracts
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                4 Active
              </span>
            </div>

            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                Payment Terms
              </span>
              <span className="text-sm font-bold text-blue-600 mt-1 block">
                Net 45
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Product Categories Supplied</h3>

            <div className="flex flex-wrap gap-2 pt-1">
              {supplier.productsSupplied.map((prod) => (
                <span
                  key={prod}
                  className="bg-blue-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3
                   py-1.5 rounded-lg flex items-center gap-1.5"
                >
                  <Package className="w-3.5 h-3.5 text-blue-500" />
                  {prod}
                </span>
              ))}
            </div>
          </div>

          {/* Recent Shipments History */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Procurement & Shipment Logs</h3>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-4 pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>BATCH #</span>
                <span>CATEGORY</span>
                <span>STATUS</span>
                <span className="text-right">RECEIVED DATE</span>
              </div>

              <div className="grid grid-cols-4 py-3 items-center">
                <span className="font-bold text-slate-900">#BATCH-9021</span>
                <span className="text-slate-600 font-medium">Electronics</span>
                <div>
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Passed Quality Inspection
                  </span>
                </div>
                <span className="text-slate-500 text-right">Oct 20, 2024</span>
              </div>

              <div className="grid grid-cols-4 py-3 items-center">
                <span className="font-bold text-slate-900">#BATCH-8814</span>
                <span className="text-slate-600 font-medium">Networking</span>
                <div>
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Passed Quality Inspection
                  </span>
                </div>
                <span className="text-slate-500 text-right">Sep 15, 2024</span>
              </div>

              <div className="grid grid-cols-4 py-3 items-center">
                <span className="font-bold text-slate-900">#BATCH-7620</span>
                <span className="text-slate-600 font-medium">Hardware</span>
                <div>
                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-2 py-0.5 rounded">
                    Passed Quality Inspection
                  </span>
                </div>
                <span className="text-slate-500 text-right">Aug 28, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
