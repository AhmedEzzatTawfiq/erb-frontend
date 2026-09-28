'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronRight, ArrowLeft, Check,
  Building2, Mail, Phone,
  Globe, Package, Plus,
  X, Calendar, ShieldCheck, Star,
} from 'lucide-react';
import { INITIAL_SUPPLIERS } from './mockData';
import { Supplier } from './types';

const ALL_CATEGORIES = [
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
  'Storage',
  'Cloud',
  'Metals',
  'Lab Supplies',
];

const PAYMENT_TERMS = [
  'Immediate',
  'Net 15',
  'Net 30',
  'Net 45',
  'Net 60',
  'Due on Receipt',
];

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const supplierId = (params?.id as string) || 'sup-1';

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    status: 'Active' as Supplier['status'],
    productsSupplied: [] as string[],
    region: 'North America',
    paymentTerms: 'Net 45',
    joinedDate: '',
    qualityRating: '4.8',
    notes: '',
  });

  const [newCategoryInput, setNewCategoryInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [initials, setInitials] = useState('AC');
  const [initialsBg, setInitialsBg] = useState('bg-blue-100 text-blue-700');

  useEffect(() => {
    const existing = INITIAL_SUPPLIERS.find((s) => s.id === supplierId);
    if (existing) {
      setFormData({
        companyName: existing.companyName,
        contactName: existing.contactName,
        email: existing.email,
        phone: existing.phone,
        status: existing.status,
        productsSupplied: existing.productsSupplied || [],
        region: 'North America',
        paymentTerms: 'Net 45',
        joinedDate: existing.joinedDate || '2022-03-15',
        qualityRating: '4.8',
        notes: 'Preferred vendor for hardware and component procurement.',
      });
      setInitials(existing.initials || 'SUP');
      setInitialsBg(existing.initialsBg || 'bg-blue-100 text-blue-700');
    } else {
      // Fallback default supplier
      setFormData({
        companyName: 'Acme Corp',
        contactName: 'Jane Doe',
        email: 'jane.doe@acme.com',
        phone: '+1 (555) 123-4567',
        status: 'Active',
        productsSupplied: ['Electronics', 'Hardware', 'Networking'],
        region: 'North America',
        paymentTerms: 'Net 45',
        joinedDate: '2022-03-15',
        qualityRating: '4.8',
        notes: 'Preferred vendor for hardware and component procurement.',
      });
      setInitials('AC');
      setInitialsBg('bg-blue-100 text-blue-700');
    }
  }, [supplierId]);

  const handleToggleCategory = (cat: string) => {
    setFormData((prev) => {
      const exists = prev.productsSupplied.includes(cat);
      if (exists) {
        return {
          ...prev,
          productsSupplied: prev.productsSupplied.filter((c) => c !== cat),
        };
      } else {
        return {
          ...prev,
          productsSupplied: [...prev.productsSupplied, cat],
        };
      }
    });
  };

  const handleAddCustomCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCategoryInput.trim();
    if (trimmed && !formData.productsSupplied.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        productsSupplied: [...prev.productsSupplied, trimmed],
      }));
      setNewCategoryInput('');
    }
  };

  const handleRemoveCategory = (cat: string) => {
    setFormData((prev) => ({
      ...prev,
      productsSupplied: prev.productsSupplied.filter((c) => c !== cat),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      setTimeout(() => {
        router.push(`/suppliers/${supplierId}`);
      }, 1000);
    }, 400);
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Link
            href="/suppliers"
            className="hover:text-slate-800 transition-colors"
          >
            Suppliers
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          <Link
            href={`/suppliers/${supplierId}`}
            className="hover:text-slate-800 transition-colors"
          >
            {formData.companyName || 'Supplier Profile'}
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="text-slate-700 font-semibold">Edit Supplier</span>
        </nav>

        <Link
          href={`/suppliers/${supplierId}`}
          className="text-sm font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </Link>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white
       border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2
           border-slate-100 shadow-2xs shrink-0 ${initialsBg}`}
          >
            {initials}
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Edit {formData.companyName || 'Supplier'}
              </h1>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${formData.status === 'Active'
                  ? 'bg-emerald-100 text-emerald-700'
                  : formData.status === 'Pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-700'
                  }`}
              >
                {formData.status}
              </span>
            </div>
            <p className="text-sm text-slate-500 font-normal mt-0.5">
              Update company profile details, contact information, and supplied product categories.
            </p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              <span>Company Information</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
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

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Supplier['status'],
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Vendor Since / Joined Date</span>
                </label>
                <input
                  type="date"
                  value={formData.joinedDate}
                  onChange={(e) =>
                    setFormData({ ...formData, joinedDate: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Operating Region</span>
                </label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) =>
                    setFormData({ ...formData, region: e.target.value })
                  }
                  placeholder="e.g. North America, Europe"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 2 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Primary Contact Details</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Account Manager / Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) =>
                    setFormData({ ...formData, contactName: e.target.value })
                  }
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Email Address <span className="text-red-500">*</span></span>
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
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>Phone Number</span>
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

          <hr className="border-t border-slate-200/80" />

          {/* Section 3 */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Product Categories Supplied</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="mb-4">
              <label className="text-xs font-semibold text-slate-600 block mb-2">
                Active Selected Categories ({formData.productsSupplied.length})
              </label>
              {formData.productsSupplied.length === 0 ? (
                <p className="text-xs text-slate-400 italic">No categories selected yet.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.productsSupplied.map((cat) => (
                    <span
                      key={cat}
                      className="bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold px-3 py-1.5
                       rounded-lg flex items-center gap-2 shadow-2xs animate-in fade-in duration-150"
                    >
                      <span>{cat}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCategory(cat)}
                        className="text-blue-500 hover:text-blue-800 transition-colors p-0.5 rounded-full
                         hover:bg-blue-100 cursor-pointer"
                        aria-label={`Remove ${cat}`}
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label className="text-xs font-semibold text-slate-600 block mb-2">
                Quick Toggle Standard Categories
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ALL_CATEGORIES.map((cat) => {
                  const isSelected = formData.productsSupplied.includes(cat);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => handleToggleCategory(cat)}
                      className={`text-xs font-medium px-2.5 py-1 rounded-md border transition-all cursor-pointer ${isSelected
                        ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                    >
                      {cat} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add Custom Category Form */}
            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                value={newCategoryInput}
                onChange={(e) => setNewCategoryInput(e.target.value)}
                placeholder="Add custom category..."
                className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm
                 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
              <button
                type="button"
                onClick={handleAddCustomCategory}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold
                 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 4  */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Financial Terms & Notes</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 mb-5">
              {/* Payment Terms */}
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Payment Terms
                </label>
                <select
                  value={formData.paymentTerms}
                  onChange={(e) =>
                    setFormData({ ...formData, paymentTerms: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  {PAYMENT_TERMS.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quality Rating */}
              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Quality Score (Rating out of 5.0)</span>
                </label>
                <input
                  type="text"
                  value={formData.qualityRating}
                  onChange={(e) =>
                    setFormData({ ...formData, qualityRating: e.target.value })
                  }
                  placeholder="e.g. 4.8"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>

            {/* Internal Notes */}
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                Internal Notes & Remarks
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Enter internal details, contract terms, or special instructions..."
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(`/suppliers/${supplierId}`)}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200
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
                <span>Save Supplier Changes</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
