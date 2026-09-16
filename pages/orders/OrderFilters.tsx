'use client';

import React from 'react';
import { Filter, Download } from 'lucide-react';
import FilterSelect from '@/components/shared/FilterSelect';
import SearchInput from '@/components/shared/SearchInput';

interface OrderFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  paymentFilter: string;
  setPaymentFilter: (payment: string) => void;
  showMoreFilters: boolean;
  setShowMoreFilters: (show: boolean) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Processing', value: 'Processing' },
  { label: 'Shipped', value: 'Shipped' },
  { label: 'Delivered', value: 'Delivered' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' },
];

const DATE_RANGE_OPTIONS = [
  { label: 'Last 30 Days', value: 'Last 30 Days' },
  { label: 'Last 7 Days', value: 'Last 7 Days' },
  { label: 'Last 90 Days', value: 'Last 90 Days' },
  { label: 'This Year', value: 'This Year' },
  { label: 'All Time', value: 'All Time' },
];

const PAYMENT_OPTIONS = [
  { label: 'All Payments', value: 'All Payments' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Failed', value: 'Failed' },
  { label: 'Refunded', value: 'Refunded' },
];

export default function OrderFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  paymentFilter,
  setPaymentFilter,
  showMoreFilters,
  setShowMoreFilters,
  onResetFilters,
  onPageReset,
}: OrderFiltersProps) {
  return (
    <div className="bg-[#F8FAFC]/60 border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-center gap-3">

        {/* Status Select */}
        <FilterSelect
          value={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            onPageReset();
          }}
          options={STATUS_OPTIONS}
          label="Status"
        />

        {/* Date Range Select */}
        <FilterSelect
          value={dateRange}
          onChange={setDateRange}
          options={DATE_RANGE_OPTIONS}
          label="Date Range"
        />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Export Button */}
        <button
          type="button"
          className="py-2 px-4 bg-white border border-border rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-2xs text-text-secondary hover:bg-slate-50"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>

        {/* More Filters */}
        <button
          type="button"
          onClick={() => setShowMoreFilters(!showMoreFilters)}
          className={`py-2 px-4 bg-white border rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-2xs ${
            showMoreFilters
              ? 'border-primary text-primary bg-blue-50/50'
              : 'border-border text-text-secondary hover:bg-slate-50'
          }`}
        >
          <Filter className="w-4 h-4" />
          <span>More Filters</span>
        </button>
      </div>

      {showMoreFilters && (
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {/* Search */}
          <SearchInput
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              onPageReset();
            }}
            placeholder="Order ID or customer name..."
            className="w-full"
          />

          {/* Payment Status */}
          <FilterSelect
            value={paymentFilter}
            onChange={(val) => {
              setPaymentFilter(val);
              onPageReset();
            }}
            options={PAYMENT_OPTIONS}
            label="Payment"
          />

          <div className="flex items-end">
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-primary font-semibold hover:underline pb-2"
            >
              Reset all filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
