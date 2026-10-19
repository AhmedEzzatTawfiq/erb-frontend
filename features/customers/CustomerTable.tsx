'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { ArrowUpDown, Building2, MoreVertical, Trash2 } from 'lucide-react';

import ActionDropDown from '@/components/shared/ActionDropDown';
import { Customer, CustomerStatus } from './types';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/shared/Avatar';

interface CustomerTableProps {
  customers: Customer[];
  selectedIds: string[];
  isAllSelected: boolean;
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelectAll: (checked: boolean) => void;
  onSelectOne: (id: string) => void;
  onSort: (field: 'companyName') => void;
  onViewCustomer: (customer: Customer) => void;
  onEditCustomer: (customer: Customer) => void;
  onDeleteCustomer: (id: string) => void;
  onDeleteSelected: () => void;
  formatCurrency: (val: number) => string;
}

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-blue-50 w-22 justify-center text-blue-700 border border-blue-200',
  inactive: 'bg-red-50 w-22 justify-center text-red-600 border border-red-200',
};

const CustomerStatusBadge: React.FC<{ status: CustomerStatus }> = ({ status }) => {
  const displayStatus = status === 'active' ? 'Active' : status === 'inactive' ? 'Inactive' : status;
  const style = STATUS_STYLES[status] || STATUS_STYLES[displayStatus] || 'bg-slate-100 text-slate-600 border border-slate-200';

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-semibold ${style}`}>
      {displayStatus}
    </span>
  );
};

export default function CustomerTable({
  customers, selectedIds, isAllSelected,
  activeDropdown, setActiveDropdown, onSelectAll,
  onSelectOne, onSort, onViewCustomer, onEditCustomer,
  onDeleteCustomer, onDeleteSelected, formatCurrency,
}: CustomerTableProps) {
  const router = useRouter();

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
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
                ORDERS
              </th>
              <th className="py-3.5 px-5 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">
                TOTAL SPENT
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
                    className={`hover:bg-slate-50/70 transition-colors ${isSelected ? 'bg-blue-50/30' : ''
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
                      <Link
                        href={`/customers/${customer.id}`}
                        className="flex items-center gap-3.5 group"
                      >
                        <div className="w-10 h-10 rounded-full border border-border overflow-hidden bg-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                          <Avatar
                            avatar={customer.avatar}
                            name={customer.companyName}
                            initials={customer.initials}
                            initialsBg={customer.initialsBg}
                            size="lg"
                          />
                        </div>

                        <div>
                          <div className="text-sm font-bold text-text-main group-hover:text-primary transition-colors">
                            {customer.companyName}
                          </div>

                          <div className="text-xs text-text-secondary mt-0.5 font-medium">
                            {customer.contactName}
                          </div>
                        </div>
                      </Link>
                    </td>


                    <td className="py-4 px-5">
                      <div className="text-sm font-medium text-text-main">
                        {customer.email}
                      </div>
                      <div className="text-xs text-text-secondary mt-0.5">
                        {customer.phone}
                      </div>
                    </td>

                    <td className="py-4 px-5 text-center text-sm font-medium text-text-main">
                      {customer.orders}
                    </td>

                    <td className="py-4 px-5 text-center text-sm font-bold text-text-main">
                      {formatCurrency(customer.totalSpent)}
                    </td>

                    <td className="py-4 px-5 text-center">
                      <CustomerStatusBadge status={customer.status} />
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
                        <>
                          <div
                            className="fixed inset-0 z-10 cursor-default"
                            onClick={() => setActiveDropdown(null)}
                          />
                          <ActionDropDown
                            href={`/customers/${customer.id}`}
                            id={customer.id}
                            editLabel='Edit Customer'
                            deleteLabel='Delete Customer'
                            setActiveDropdown={setActiveDropdown}
                            onDeleteUser={onDeleteCustomer}
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
