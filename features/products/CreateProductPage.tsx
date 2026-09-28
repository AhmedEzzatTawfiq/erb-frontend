'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronRight, ChevronDown, Check, Sparkles, Package } from 'lucide-react';

const CATEGORIES = [
  'Networking',
  'Hardware',
  'Storage',
  'Peripherals',
  'Electronics',
] as const;

const STOCK_STATUSES = ['In Stock', 'Low Stock', 'Out of Stock'] as const;

export default function CreateProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    category: 'Networking',
    price: '',
    stock: '',
    stockStatus: 'In Stock',
    manufacturer: '',
    supplierCode: '',
    description: '',
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        router.push('/products');
      }, 1000);
    }, 400);
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
        <span className="text-slate-700 font-semibold">Create Product</span>
      </nav>

      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Create New Product
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Add a new product item to your inventory catalog.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-4">
              Product Image
            </h2>
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-xl bg-[#F0F4FF] border border-indigo-100/80 flex items-center
               justify-center shrink-0 overflow-hidden relative group shadow-2xs">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative flex items-center justify-center w-full h-full text-indigo-400">
                    <Package className="w-9 h-9 text-slate-400" />
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500 absolute top-3.5 right-3.5" />
                  </div>
                )}
              </div>

              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/png, image/jpeg, image/webp"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium
                   px-4 py-2 rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  Upload Product Image
                </button>
                <p className="text-xs text-slate-400 mt-2 font-normal">
                  PNG, JPG or WEBP. Max size of 2MB
                </p>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 2 > Product Information */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              General Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  PRODUCT NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. Industrial Titanium Servo Motor V2"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* SKU */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  SKU CODE *
                </label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="e.g. NET-RT-X900"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  CATEGORY *
                </label>
                <div className="relative">
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 3 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  PRICE ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="299.99"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  STOCK QUANTITY *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  placeholder="100"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Stock Status */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  STOCK STATUS *
                </label>
                <div className="relative">
                  <select
                    value={formData.stockStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, stockStatus: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20  transition-all appearance-none pr-10 cursor-pointer"
                  >
                    {STOCK_STATUSES.map((st) => (
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

          {/* Section 4*/}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Additional Info
            </h2>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    MANUFACTURER
                  </label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) =>
                      setFormData({ ...formData, manufacturer: e.target.value })
                    }
                    placeholder="e.g. Acme Systems"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                     text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    SUPPLIER CODE
                  </label>
                  <input
                    type="text"
                    value={formData.supplierCode}
                    onChange={(e) =>
                      setFormData({ ...formData, supplierCode: e.target.value })
                    }
                    placeholder="e.g. SUP-8821"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                     text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter detailed product description..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push('/products')}
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
                  <span>Created! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <span>Creating...</span>
              ) : (
                <span>Create Product</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
