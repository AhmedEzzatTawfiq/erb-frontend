'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Pencil, RotateCw, Building2, Store, Package } from 'lucide-react';

export default function ProductDetailsPage() {
  const router = useRouter();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshInventory = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link
          href="/products"
          className="hover:text-slate-800 transition-colors"
        >
          Products
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">SKU-1234</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          Industrial Titanium Servo Motor V2
        </h1>
        <Link
          href="/products/prod-1/edit"
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold
           px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Product</span>
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col md:flex-row">
            <div className="w-full md:w-64 bg-slate-50/80 p-6 flex items-center justify-center shrink-0 border-b
             md:border-b-0 md:border-r border-slate-200/80 min-h-55">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400"
                alt="Industrial Titanium Servo Motor V2"
                className="w-full h-44 object-contain transition-transform hover:scale-105 duration-200"
                onError={(e) => {
                  // Fallback image if unsplash fails
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <Package className="w-16 h-16 text-slate-300 hidden" />
            </div>

            {/* Product Details*/}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">
                    ACTIVE
                  </span>
                  <span className="text-xs font-medium text-slate-500">
                    Category: Robotics Components
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1">
                    Description
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    High-torque titanium servo motor designed for precise
                    industrial automation. Features integrated thermal
                    management, absolute encoding, and EtherCAT support. Built
                    for continuous operation in harsh manufacturing
                    environments.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    MANUFACTURER
                  </span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                    Acme Automation Systems
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    SUPPLIER CODE
                  </span>
                  <span className="text-xs font-bold text-slate-800 mt-0.5 block">
                    AAS-SRV-T2
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <h2 className="text-base font-bold text-slate-900 mb-3">
              Technical Specifications
            </h2>
            <hr className="border-t border-slate-200/80 mb-4" />

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="flex justify-between items-center pr-4 border-r border-slate-100">
                  <span className="text-slate-500 font-normal">
                    Torque (Continuous)
                  </span>
                  <span className="font-bold text-slate-900">45 Nm</span>
                </div>
                <div className="flex justify-between items-center pl-2">
                  <span className="text-slate-500 font-normal">Max Speed</span>
                  <span className="font-bold text-slate-900">6,000 RPM</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="flex justify-between items-center pr-4 border-r border-slate-100">
                  <span className="text-slate-500 font-normal">
                    Voltage Rating
                  </span>
                  <span className="font-bold text-slate-900">
                    400-480 VAC
                  </span>
                </div>
                <div className="flex justify-between items-center pl-2">
                  <span className="text-slate-500 font-normal">
                    Encoder Resolution
                  </span>
                  <span className="font-bold text-slate-900">
                    24-bit Absolute
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-3">
                <div className="flex justify-between items-center pr-4 border-r border-slate-100">
                  <span className="text-slate-500 font-normal">IP Rating</span>
                  <span className="font-bold text-slate-900">IP67</span>
                </div>
                <div className="flex justify-between items-center pl-2">
                  <span className="text-slate-500 font-normal">Weight</span>
                  <span className="font-bold text-slate-900">12.5 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="space-y-6">
          {/* Pricing Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Pricing</h2>

            <div>
              <div className="flex items-baseline">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  $1,245.00
                </span>
                <span className="text-xs text-slate-400 font-medium ml-2">
                  / unit (Base)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center text-slate-600">
                <span>Tier 1 (10-49 units)</span>
                <span className="font-semibold text-slate-900">$1,150.00</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Tier 2 (50+ units)</span>
                <span className="font-semibold text-slate-900">$1,025.00</span>
              </div>
            </div>

            <hr className="border-t border-slate-100" />

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-normal">Standard Cost</span>
              <span className="font-semibold text-slate-800">$850.00</span>
            </div>

            <button
              type="button"
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5
               rounded-lg shadow-xs hover:shadow transition-all text-center cursor-pointer"
            >
              Update Pricing
            </button>
          </div>

          {/* Inventory Levels Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                Inventory Levels
              </h2>
              <button
                type="button"
                onClick={handleRefreshInventory}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Refresh inventory"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${
                    isRefreshing ? 'animate-spin text-blue-600' : ''
                  }`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#F0F4FF] rounded-lg p-3.5 border border-indigo-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  AVAILABLE
                </span>
                <span className="text-2xl font-bold text-blue-600 mt-1 block">
                  142
                </span>
              </div>

              <div className="bg-[#FAF5FF] rounded-lg p-3.5 border border-purple-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  RESERVED
                </span>
                <span className="text-2xl font-bold text-purple-600 mt-1 block">
                  38
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-3 mt-1">
                LOCATIONS
              </span>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Main Hub (Aisle 4)</span>
                  </div>
                  <span className="font-bold text-slate-900">120</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Store className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>Retail Annex</span>
                  </div>
                  <span className="font-bold text-slate-900">22</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 mb-1">
              Recent Transactions
            </h2>

            <div className="divide-y divide-slate-100 text-xs">
              <div className="grid grid-cols-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <span>DATE</span>
                <span>TYPE</span>
                <span className="text-right">QTY</span>
              </div>

              <div className="grid grid-cols-3 py-2.5 items-center">
                <span className="text-slate-500 font-normal">Oct 24</span>
                <span className="font-medium text-rose-600">Sales Order</span>
                <span className="font-bold text-slate-900 text-right">-15</span>
              </div>

              <div className="grid grid-cols-3 py-2.5 items-center">
                <span className="text-slate-500 font-normal">Oct 21</span>
                <span className="font-medium text-blue-600">Receipt</span>
                <span className="font-bold text-slate-900 text-right">+50</span>
              </div>

              <div className="grid grid-cols-3 py-2.5 items-center">
                <span className="text-slate-500 font-normal">Oct 18</span>
                <span className="font-medium text-rose-600">Sales Order</span>
                <span className="font-bold text-slate-900 text-right">-5</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 w-full text-center
                 py-1 transition-colors cursor-pointer"
              >
                View Full History
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
