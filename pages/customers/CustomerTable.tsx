'use client';

import React from 'react';
import { Customer } from './types';
import { ArrowUpDown, Building2, MoreVertical, Eye, Pencil, Trash2 } from 'lucide-react';

interface CustomerTableProps {
  customers: Customer[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'companyName' | 'orders' | 'totalSpent') => void;
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onDeleteSelected: () => void;
  formatCurrency: (val: number) => string;
}

export default function CustomerTable({
  customers,
  selectedIds,
  isAllSelected,
  activeDropdown,
  setActiveDropdown,
  onSelectAll,
  onSelectOne,
  onSort,
  onViewCustomer,
  onEditCustomer,
  onDeleteCustomer,
  onDeleteSelected,
  formatCurrency,
}: CustomerTableProps) {
  return (
    <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
      {/* Selected Action Bar */}
      {selectedIds.length > 0 && (
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">
            {selectedIds.length} customer{selectedIds.length > 1 ? 's' : ''} selected
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
                  <span>CUSTOMER</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                CONTACT
              </th>
              <th 
                onClick={() => onSort('orders')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span>ORDERS</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
              </th>
              <th 
                onClick={() => onSort('totalSpent')}
                className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right cursor-pointer select-none hover:text-text-main transition-colors"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>TOTAL SPENT</span>
                  <ArrowUpDown className="w-3 h-3 text-text-muted" />
                </div>
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
            {customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-text-secondary">
                  <Building2 className="w-10 h-10 mx-auto text-[#CBD5E1] mb-2" />
                  <p className="font-semibold text-base">No customers found</p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Try adjusting your search or filter keywords.
                  </p>
                </td>
              </tr>
            ) : (
              customers.map((customer) => {
                const isSelected = selectedIds.includes(customer.id);
                return (
                  <tr
                    key={customer.id}
                    className={`hover:bg-slate-50/70 transition-colors ${
                      isSelected ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-5 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectOne(customer.id)}
                        className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary cursor-pointer"
                      />
                    </td>

                    {/* Customer */}
                    <td className="py-4 px-5">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                          {customer.avatar ? (
                            <img
                              src={customer.avatar}
                              alt={customer.companyName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span
                              className={`text-xs font-bold w-full h-full flex items-center justify-center ${
                                customer.initialsBg || 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {customer.initials}
                            </span>
                          )}
                        </div>
                        <div>
                          <div 
                            className="text-sm font-bold text-text-main hover:text-primary transition-colors cursor-pointer"
                            onClick={() => onViewCustomer(customer)}
                          >
                            {customer.companyName}
                          </div>
                          <div className="text-xs text-text-secondary mt-0.5 font-medium">
                            {customer.contactName}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="py-4 px-5">
                      <div className="text-sm font-medium text-text-main">
                        {customer.email}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        {customer.phone}
                      </div>
                    </td>

                    {/* Orders */}
                    <td className="py-4 px-5 text-center text-sm font-medium text-text-main">
                      {customer.orders}
                    </td>

                    {/* Total Spent */}
                    <td className="py-4 px-5 text-right text-sm font-bold text-text-main">
                      {formatCurrency(customer.totalSpent)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-5 text-center">
                      {customer.status === 'Active' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-accent-blue-bg text-[#4338CA]">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-border-subtle text-text-secondary">
                          Inactive
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-5 text-right relative">
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === customer.id ? null : customer.id
                          )
                        }
                        className="p-1.5 rounded-lg text-text-muted hover:text-text-main hover:bg-slate-100 transition-colors"
                        aria-label="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {/* Dropdown Menu */}
                      {activeDropdown === customer.id && (
                        <div className="absolute right-5 top-12 z-20 w-44 bg-white border border-border rounded-xl shadow-lg py-1 animate-in fade-in zoom-in-95 duration-150">
                          <button
                            onClick={() => {
                              onViewCustomer(customer);
                              setActiveDropdown(null);
                            }}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Eye className="w-3.5 h-3.5 text-text-secondary" />
                            View Details
                          </button>
                          <button
                            onClick={() => onEditCustomer(customer)}
                            className="w-full px-4 py-2 text-xs font-semibold text-text-main hover:bg-slate-50 flex items-center gap-2"
                          >
                            <Pencil className="w-3.5 h-3.5 text-text-secondary" />
                            Edit Customer
                          </button>
                          <div className="border-t border-border my-1" />
                          <button
                            onClick={() => onDeleteCustomer(customer.id)}
                            className="w-full px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600" />
                            Delete Customer
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
