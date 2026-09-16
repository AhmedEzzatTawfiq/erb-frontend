'use client';

import React from 'react';
import { Supplier } from './types';
import { ArrowUpDown, Building2, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

interface SupplierTableProps {
  suppliers: Supplier[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'companyName' | 'contactName') => void;
  onViewSupplier: (supplier: Supplier) => void;
  onEditSupplier: (supplier: Supplier) => void;
  onDeleteSupplier: (id: string) => void;
  onDeleteSelected: () => void;
}

const MAX_TAGS_SHOWN = 2;

const StatusBadge: React.FC<{ status: Supplier['status'] }> = ({ status }) => {
  if (status === 'Active') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue-bg text-[#4338CA]">
        Active
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700">
        Pending
      </span>
    );
  }
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-border-subtle text-text-secondary">
      Inactive
    </span>
  );
};

export default function SupplierTable({
  suppliers,
  selectedIds,
  isAllSelected,
  activeDropdown,
  setActiveDropdown,
  onSelectAll,
  onSelectOne,
  onSort,
  onViewSupplier,
  onEditSupplier,
  onDeleteSupplier,
  onDeleteSelected,
}: SupplierTableProps) {
  return (
    <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} supplier{selectedIds.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onDeleteSelected}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-red-200 shadow-2xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
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
              <th
                onClick={() => onSort('companyName')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>COMPANY NAME</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th
                onClick={() => onSort('contactName')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>CONTACT PERSON</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                CONTACT INFO
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                PRODUCTS SUPPLIED
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
                STATUS
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {suppliers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-text-secondary">
                  <Building2 className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No suppliers found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search or filter keywords.
                  </p>
                </td>
              </tr>
            ) : (
              suppliers.map((supplier) => {
                const isSelected = selectedIds.includes(supplier.id);
                const visibleTags = supplier.productsSupplied.slice(0, MAX_TAGS_SHOWN);
                const extraCount = supplier.productsSupplied.length - MAX_TAGS_SHOWN;

                return (
                  <tr
                    key={supplier.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(supplier.id)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                      />
                    </td>

                    {/* Company Name */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                          {supplier.avatar ? (
                            <img
                              src={supplier.avatar}
                              alt={supplier.companyName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span
                              className={`text-xs font-bold w-full h-full flex items-center justify-center ${
                                supplier.initialsBg || 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {supplier.initials}
                            </span>
                          )}
                        </div>
                        <div
                          className="text-sm font-bold text-text-main hover:text-primary transition-colors cursor-pointer"
                          onClick={() => onViewSupplier(supplier)}
                        >
                          {supplier.companyName}
                        </div>
                      </div>
                    </td>

                    {/* Contact Person */}
                    <td className="py-4 px-5 text-sm font-medium text-text-main">
                      {supplier.contactName}
                    </td>

                    {/* Contact Info */}
                    <td className="py-4 px-5">
                      <div className="text-sm font-medium text-text-main">{supplier.email}</div>
                      <div className="text-xs text-text-secondary mt-0.5">{supplier.phone}</div>
                    </td>

                    {/* Products Supplied */}
                    <td className="py-4 px-5">
                      <div className="flex flex-wrap gap-1.5 items-center">
                        {visibleTags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-text-secondary border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                        {extraCount > 0 && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                            +{extraCount}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 text-center">
                      <StatusBadge status={supplier.status} />
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === supplier.id ? null : supplier.id
                          )
                        }
                        className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === supplier.id && (
                        <div className="absolute right-5 top-12 z-20 w-44 bg-white border border-border rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => {
                              onViewSupplier(supplier);
                              setActiveDropdown(null);
                            }}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                            View Details
                          </button>
                          <button
                            onClick={() => onEditSupplier(supplier)}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5 text-text-secondary" />
                            Edit Supplier
                          </button>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={() => onDeleteSupplier(supplier.id)}
                            className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            Delete Supplier
                          </button>
                        </div>
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
