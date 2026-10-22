'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ChevronRight, ArrowLeft, Check,
  Building2, Mail, Phone,
  Globe, Package,
  Calendar, ShieldCheck, Loader2, FolderPlus,
} from 'lucide-react';
import { useSupplier } from './hooks/useSupplier';
import { useUpdateSupplier } from './hooks/useUpdateSupplier';
import { useCategories, useCreateCategory } from '../categories/hooks/useCategories';


export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const supplierId = (params?.id as string) || '';

  const { data: supplier, isLoading, isError } = useSupplier(supplierId);
  const { mutate: updateSupplier } = useUpdateSupplier();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { mutateAsync: createCategoryMutation, isPending: isCreatingCategory } = useCreateCategory();

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
    categoryId: '',
    notes: '',
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryError, setCategoryError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    if (supplier) {
      setFormData({
        companyName: supplier.companyName ?? '',
        contactName: supplier.contactName ?? '',
        email: supplier.email ?? '',
        phone: supplier.phone ?? '',
        address: supplier.address ?? '',
        status: supplier.status ?? 'Active',
        categoryId: supplier.categoryId ?? '',
        notes: '',
      });
    }
  }, [supplier]);

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setCategoryError('');
    if (!newCategoryName.trim()) return;
    try {
      const newCat = await createCategoryMutation(newCategoryName.trim());
      setFormData((prev) => ({ ...prev, categoryId: newCat.id }));
      setNewCategoryName('');
      setShowAddCategory(false);
    } catch (err: any) {
      const msg = err?.response?.data?.message || err?.message || 'Failed to create category';
      setCategoryError(Array.isArray(msg) ? msg.join(', ') : msg);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    updateSupplier(
      {
        id: supplierId,
        data: {
          companyName: formData.companyName,
          contactName: formData.contactName,
          email: formData.email || undefined,
          phone: formData.phone || undefined,
          address: formData.address || undefined,
          status: formData.status,
          categoryId: formData.categoryId || undefined,
        },
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setSuccessMessage(true);
          setTimeout(() => router.push(`/suppliers/${supplierId}`), 1000);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  // Derive initials from company name
  const initials = formData.companyName
    ? formData.companyName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'SU';

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

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-2 text-sm text-slate-500 font-medium">
          <Link href="/suppliers" className="hover:text-slate-800 transition-colors">
            Suppliers
          </Link>
          <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
          <Link href={`/suppliers/${supplierId}`} className="hover:text-slate-800 transition-colors">
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold border-2 border-slate-100 shadow-2xs shrink-0 bg-blue-100 text-blue-700">
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
          {/* Section 1 — Company Information */}
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
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="e.g., Global Tech Industries"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 mb-1.5 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>Address / Region</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. 123 Main St, New York"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 2 — Contact Details */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-blue-600" />
              <span>Primary Contact Details</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Contact Person <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  placeholder="Full Name"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contact@company.com"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
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
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 3 — Category */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Package className="w-4 h-4 text-blue-600" />
              <span>Category</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-600 block">
                  Category of Products Supplied
                </label>
                <button
                  type="button"
                  onClick={() => setShowAddCategory(!showAddCategory)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  {showAddCategory ? 'Cancel' : 'New Category'}
                </button>
              </div>

              {showAddCategory ? (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="Category name..."
                    className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    disabled={isCreatingCategory || !newCategoryName.trim()}
                    className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg disabled:opacity-50 cursor-pointer"
                  >
                    {isCreatingCategory ? 'Saving...' : 'Add'}
                  </button>
                </div>
              ) : (
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer"
                >
                  {categoriesLoading && <option disabled>Loading...</option>}
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
              {categoryError && (
                <p className="text-xs text-red-600 mt-1">{categoryError}</p>
              )}
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 4 — Notes */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Internal Notes & Remarks</span>
            </h2>
            <hr className="border-t border-slate-200/80 mb-5" />

            <textarea
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Enter internal details, contract terms, or special instructions..."
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all resize-y"
            />
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push(`/suppliers/${supplierId}`)}
              className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {successMessage ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Saved! Redirecting...</span>
                </>
              ) : isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
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
