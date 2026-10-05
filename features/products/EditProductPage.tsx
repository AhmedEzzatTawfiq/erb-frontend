'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { ChevronRight, ChevronDown, FolderPlus } from 'lucide-react';
import { useProduct } from './hooks/useProduct';
import { useUpdateProduct } from './hooks/useUpdateProduct';
import { useCategories, useCreateCategory } from '../categories/hooks/useCategories';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id as string;

  const { data: productData, isLoading: isProductLoading } = useProduct(productId);
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const { mutateAsync: createCategoryMutation, isPending: isCreatingCategory } = useCreateCategory();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    categoryId: '',
    unitPrice: '',
    costPrice: '',
    reorderLevel: '',
  });

  const [newCategoryName, setNewCategoryName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    if (!productData) return;

    const catId = productData.categoryId || (typeof productData.category === 'object' ? productData.category?.id : '');

    setFormData({
      name: productData.name || '',
      sku: productData.sku || '',
      categoryId: catId || '',
      unitPrice: (productData.unitPrice ?? productData.price ?? 0).toString(),
      costPrice: (productData.costPrice ?? 0).toString(),
      reorderLevel: (productData.reorderLevel ?? 0).toString(),
    });
  }, [productData]);

  const {
    mutate: updateProduct,
    isPending,
    isError,
    error,
  } = useUpdateProduct();

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

    updateProduct(
      {
        id: productId,
        data: {
          name: formData.name.trim(),
          sku: formData.sku.trim(),
          categoryId: formData.categoryId || undefined,
          unitPrice: Number(formData.unitPrice) || 0,
          costPrice: Number(formData.costPrice) || 0,
          reorderLevel: Math.max(0, parseInt(formData.reorderLevel, 10) || 0),
        },
      },
      {
        onSuccess: () => {
          router.push('/products');
        },
      }
    );
  };

  const getErrorMessage = () => {
    if (!isError || !error) return null;
    const axiosData = (error as any)?.response?.data;
    if (axiosData?.message) {
      if (Array.isArray(axiosData.message)) {
        return axiosData.message.join(' | ');
      }
      return axiosData.message;
    }
    return error instanceof Error ? error.message : 'Failed to update product';
  };

  if (isProductLoading) {
    return (
      <main className="space-y-6 max-w-7xl mx-auto pb-10">
        <p className="text-slate-500 text-sm">Loading product details...</p>
      </main>
    );
  }

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
        <span className="text-slate-700 font-semibold">Edit Product</span>
      </nav>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
          Edit Product: {formData.name}
        </h1>
        <p className="text-sm text-slate-500 font-normal mt-1">
          Update product specifications, reorder level, and pricing.
        </p>
      </div>

      {/* Card Form */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-2xs p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Section 1: General Details */}
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    CATEGORY *
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
                      value={formData.categoryId}
                      onChange={(e) =>
                        setFormData({ ...formData, categoryId: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none pr-10 cursor-pointer"
                    >
                      {isCategoriesLoading && <option value="">Loading categories...</option>}
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
            </div>
          </div>

          <hr className="border-t border-slate-200/80" />

          {/* Section 2: Pricing & Inventory */}
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-5">
              Pricing & Inventory
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
              {/* Unit Price */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  UNIT PRICE ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0"
                  value={formData.unitPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, unitPrice: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Cost Price */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  COST PRICE ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0"
                  value={formData.costPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, costPrice: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              {/* Reorder Level */}
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                  REORDER LEVEL *
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={formData.reorderLevel}
                  onChange={(e) =>
                    setFormData({ ...formData, reorderLevel: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm
                   text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col items-end gap-3">
            {isError && (
              <div className="w-full p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 font-medium">
                {getErrorMessage()}
              </div>
            )}
            <div className="flex items-center gap-3">
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
                disabled={isPending}
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-medium
                 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer flex items-center gap-2 disabled:opacity-75"
              >
                {isPending ? (
                  <span>Saving...</span>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
