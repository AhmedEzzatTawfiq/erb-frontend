'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, Pencil, RotateCw, Package, Tag, TrendingDown, Archive } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useProduct } from './hooks/useProduct';
import { formatCurrency } from '@/lib/utils';

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const { data: product, isLoading, isError } = useProduct(id);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshInventory = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  if (isLoading) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="py-24 flex flex-col items-center gap-3 text-text-secondary">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-medium">Loading product…</span>
        </div>
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <div className="py-24 text-center text-sm text-red-500 font-medium">
          Product not found or failed to load.
        </div>
      </main>
    );
  }

  const categoryName =
    typeof product.category === 'object'
      ? product.category?.name
      : product.category ?? 'General';

  const unitPrice = Number(product.unitPrice ?? product.price ?? 0);
  const costPrice = Number(product.costPrice ?? 0);
  const stockQty = Number(product.stockQuantity ?? product.stock ?? 0);
  const reorderLevel = Number(product.reorderLevel ?? 0);

  const stockStatus =
    stockQty <= 0
      ? 'Out of Stock'
      : reorderLevel > 0 && stockQty <= reorderLevel
      ? 'Low Stock'
      : 'In Stock';

  const stockStatusConfig = {
    'In Stock': { bg: 'bg-success-bg', text: 'text-success-text', dot: 'bg-success-text' },
    'Low Stock': { bg: 'bg-[#FEF3C7]', text: 'text-[#B45309]', dot: 'bg-[#D97706]' },
    'Out of Stock': { bg: 'bg-danger-bg', text: 'text-danger-text', dot: 'bg-danger-text' },
  }[stockStatus] ?? { bg: 'bg-slate-100', text: 'text-slate-500', dot: 'bg-slate-400' };

  const margin = unitPrice > 0 ? (((unitPrice - costPrice) / unitPrice) * 100).toFixed(1) : '—';

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
        <Link href="/products" className="hover:text-slate-800 transition-colors">
          Products
        </Link>
        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
        <span className="text-slate-700 font-semibold">{product.sku}</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
          {product.name}
        </h1>
        <Link
          href={`/products/${id}/edit`}
          className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold
           px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer flex items-center gap-2 self-start sm:self-auto"
        >
          <Pencil className="w-4 h-4 text-slate-500" />
          <span>Edit Product</span>
        </Link>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left — product image + details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl shadow-2xs overflow-hidden flex flex-col md:flex-row">
            {/* Image */}
            <div className="w-full md:w-64 bg-slate-50/80 p-6 flex items-center justify-center shrink-0 border-b md:border-b-0 md:border-r border-slate-200/80 min-h-55">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-44 object-contain transition-transform hover:scale-105 duration-200"
                />
              ) : (
                <Package className="w-20 h-20 text-slate-200" />
              )}
            </div>

            {/* Core Details */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${stockStatusConfig.bg} ${stockStatusConfig.text}`}
                  >
                    {stockStatus}
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    {categoryName}
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">SKU</p>
                  <p className="text-sm font-mono font-semibold text-slate-800">{product.sku}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Created
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-0.5 block">
                    {product.createdAt
                      ? new Date(product.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })
                      : '—'}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Category
                  </span>
                  <span className="text-xs font-semibold text-slate-800 mt-0.5 block">
                    {categoryName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Stock Summary */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Inventory Overview</h2>
              <button
                type="button"
                onClick={handleRefreshInventory}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Refresh inventory"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`}
                />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-[#F0F4FF] rounded-lg p-4 border border-indigo-50/50">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Stock Qty
                </span>
                <span className={`text-2xl font-bold mt-1 block ${stockStatusConfig.text}`}>
                  {stockQty}
                </span>
              </div>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Reorder At
                </span>
                <span className="text-2xl font-bold text-slate-700 mt-1 block">
                  {reorderLevel}
                </span>
              </div>
              <div className={`rounded-lg p-4 border ${stockStatusConfig.bg} border-transparent`}>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Status
                </span>
                <span className={`text-sm font-bold mt-2 block ${stockStatusConfig.text}`}>
                  {stockStatus}
                </span>
              </div>
            </div>

            {reorderLevel > 0 && stockQty <= reorderLevel && (
              <div className="mt-4 flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <TrendingDown className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700 font-medium">
                  Stock is at or below the reorder level ({reorderLevel} units). Consider restocking soon.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right — Pricing */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Pricing</h2>

            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                  {formatCurrency(unitPrice)}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-1">/ unit</span>
              </div>
            </div>

            <div className="space-y-2 text-xs border-t border-slate-100 pt-3">
              <div className="flex justify-between items-center text-slate-600">
                <span>Cost Price</span>
                <span className="font-semibold text-slate-900">{formatCurrency(costPrice)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600">
                <span>Gross Margin</span>
                <span className="font-semibold text-green-700">{margin}%</span>
              </div>
            </div>

            <hr className="border-t border-slate-100" />

            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-normal">Profit per unit</span>
              <span className="font-semibold text-slate-800">
                {formatCurrency(unitPrice - costPrice)}
              </span>
            </div>

            <Link
              href={`/products/${id}/edit`}
              className="w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium py-2.5
               rounded-lg shadow-xs hover:shadow transition-all cursor-pointer block text-center"
            >
              Update Pricing
            </Link>
          </div>

          {/* Quick Info */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-3">
            <h2 className="text-base font-bold text-slate-900 mb-1">Quick Info</h2>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Product ID</span>
                <span className="font-mono font-semibold text-slate-700 text-right max-w-32 truncate" title={product.id}>
                  {product.id.slice(0, 8)}…
                </span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">SKU</span>
                <span className="font-mono font-semibold text-slate-700">{product.sku}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Category</span>
                <span className="font-semibold text-slate-700">{categoryName}</span>
              </div>
              <div className="flex justify-between py-2.5">
                <span className="text-slate-500">Created</span>
                <span className="font-semibold text-slate-700">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
