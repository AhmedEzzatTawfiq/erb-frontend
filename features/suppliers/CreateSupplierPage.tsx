'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ChevronDown, Check, FolderPlus } from 'lucide-react';

import { useCreateSupplier } from './hooks/useCreateSupplier';
import { useCategories, useCreateCategory } from '../categories/hooks/useCategories';



export default function CreateSupplierPage() {
  const router = useRouter();

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { mutateAsync: createCategoryMutation, isPending: isCreatingCategory } = useCreateCategory();

  const [formData, setFormData] = useState({
    companyName: '',
    categoryId: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    status: 'Active',
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryError, setCategoryError] = useState('');

  // Auto-select first category if available and no category selected
  useEffect(() => {
    if (categories.length > 0 && !formData.categoryId) {
      setFormData((prev) => ({ ...prev, categoryId: categories[0].id }));
    }
  }, [categories, formData.categoryId]);

  const {
    mutate: createSupplier,
    isPending,
    isError,
    error,
  } = useCreateSupplier();

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

    if (!formData.categoryId) {
      alert('Please select or create a category first.');
      return;
    }

    createSupplier(
      {
        companyName: formData.companyName,
        contactName: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        status: formData.status,
        productsSupplied: formData.categoryId ? [formData.categoryId] : [],
      },
      {
        onSuccess: () => {
          router.push('/suppliers');
        },
      }
    );
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

              {/* Category Dropdown & Quick Create */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Category of Products Supplied *
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
                  <div className="relative">
                    <select
                      required
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                                     focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                    >
                      {categoriesLoading && <option value="">Loading categories...</option>}
                      {!categoriesLoading && categories.length === 0 && (
                        <option value="">No categories found. Click 'New Category' above.</option>
                      )}
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                )}
                {categoryError && (
                  <p className="text-xs text-red-600 mt-1">{categoryError}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  placeholder="e.g. 123 Industrial Park, Cairo"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
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
              disabled={isPending}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium rounded-lg
               shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
            >
              {isPending ? (
                <span>Saving...</span>
              ) : (
                <span>Save Supplier</span>
              )}
            </button>
            {isError && (
              <p className="text-sm text-red-600">
                {error instanceof Error
                  ? error.message
                  : 'Failed to create supplier'}
              </p>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
