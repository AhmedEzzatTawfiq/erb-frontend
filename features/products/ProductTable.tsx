'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from './types';
import {
  ArrowUpDown,
  Package,
  Pencil,
  MoreVertical,
  Eye,
  Trash2
} from 'lucide-react';
import ActionDropDown from '@/components/shared/ActionDropDown';

interface ProductTableProps {
  products: Product[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'name' | 'category' | 'price' | 'stock') => void;
  onViewProduct: (product: Product) => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onDeleteSelected: () => void;
  formatCurrency: (val: number) => string;
}

export default function ProductTable({
  products,
  selectedIds,
  isAllSelected,
  activeDropdown,
  setActiveDropdown,
  onSelectAll,
  onSelectOne,
  onSort,
  onDeleteProduct,
  onDeleteSelected,
  formatCurrency,
}: ProductTableProps) {
  return (
    <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} product{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onDeleteSelected}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1
               bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-212.5">
          <thead>
            <tr className="bg-app-bg border-b border-border">
              <th className="py-3.5 px-5 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={(e) => onSelectAll(e.target.checked)}
                  className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-3 text-xs font-semibold text-text-secondary uppercase tracking-wider w-16">
                PRODUCT
              </th>
              <th
                onClick={() => onSort('name')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider
                 cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>NAME & SKU</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('category')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider 
                cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>CATEGORY</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('price')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider
                 text-right cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>PRICE</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('stock')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider
                 cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>STOCK LEVEL</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-text-secondary">
                  <Package className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No products found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search query or status filter.
                  </p>
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const isSelected = selectedIds.includes(product.id);
                return (
                  <tr
                    key={product.id}
                    className={`hover:bg-slate-50/70 transition-colors ${isSelected ? 'bg-blue-50/30' : ''
                      }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(product.id)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                      />
                    </td>

                    <td className="py-4 px-3">
                      <div className="w-12 h-12 rounded-xl border border-border overflow-hidden bg-slate-50 flex items-center justify-center shrink-0 shadow-2xs">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Package className="w-6 h-6 text-text-muted" />
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-5">
                      <Link
                        href={`/products/${product.id}`}
                        className="text-sm font-bold text-text-main hover:text-primary transition-colors cursor-pointer block"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs text-text-secondary mt-0.5 font-medium">
                        SKU: {product.sku}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-sm font-medium text-text-main">
                      {product.category}
                    </td>
                    <td className="py-4 px-5 text-right text-sm font-bold text-text-main">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="py-4 px-5">
                      {product.stockStatus === 'In Stock' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-success-bg text-success-text">
                          <span className="w-2 h-2 rounded-full bg-success-text" />
                          {product.stock} In Stock
                        </span>
                      )}
                      {product.stockStatus === 'Low Stock' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-[#FEF3C7] text-[#B45309]">
                          <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                          {product.stock} Low Stock
                        </span>
                      )}
                      {product.stockStatus === 'Out of Stock' && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-danger-bg text-danger-text">
                          <span className="w-2 h-2 rounded-full bg-danger-text" />
                          0 Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-5 text-right relative">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/products/${product.id}/edit`}
                          className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            setActiveDropdown(
                              activeDropdown === product.id ? null : product.id
                            )
                          }
                          className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                          aria-label="Actions"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Dropdown Menu */}
                      {activeDropdown === product.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <ActionDropDown
                            href={`/customers/${product.id}`}
                            id={product.id}
                            editLabel='Edit Employee'
                            deleteLabel='Delete Employee'
                            setActiveDropdown={setActiveDropdown}
                            onDeleteUser={onDeleteProduct}
                          />
                        </>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
