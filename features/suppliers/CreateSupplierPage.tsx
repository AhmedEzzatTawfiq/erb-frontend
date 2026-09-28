'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, Check } from 'lucide-react';

const CATEGORIES = [
  'Electronics',
  'Hardware',
  'Software',
  'Raw Materials',
  'Packaging',
  'Networking',
  'Peripherals',
  'Shipping & Logistics',
  'Office Supplies',
  'Chemicals & Metals',
];

export default function CreateSupplierPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    companyName: '',
    category: '',
    contactPerson: '',
    email: '',
    phone: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate creation delay & success redirect
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        router.push('/suppliers');
      }, 1000);
    }, 400);
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Add Supplier
          </h1>
          <p className="text-sm text-slate-500 font-normal mt-1">
            Enter details to register a new supplier in the system.
          </p>
        </div>
        <Link
          href="/suppliers"
          className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors pt-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to List</span>
        </Link>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Company Details
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  placeholder="e.g., Global Tech Industries"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Category of Products Supplied <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
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

          {/* Section 2 */}
          <div className="pt-2">
            <h2 className="text-base font-bold text-slate-900 mb-2">
              Primary Contact
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) =>
                    setFormData({ ...formData, contactPerson: e.target.value })
                  }
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="contact@company.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                     text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                     text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80 pt-2" />

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push('/suppliers')}
              className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200
               hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg
               shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {successMessage ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <span>Saving...</span>
              ) : (
                <span>Save Supplier</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
