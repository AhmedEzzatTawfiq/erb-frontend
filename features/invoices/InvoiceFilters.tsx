'use client';

import React from 'react';
import { Filter, Download } from 'lucide-react';
import FilterSelect from '@/components/shared/FilterSelect';
import SearchInput from '@/components/shared/SearchInput';

interface InvoiceFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Paid', value: 'Paid' },
];

export default function InvoiceFilters({
  statusFilter,
  setStatusFilter,
  dateFrom,
  setDateFrom,
  searchTerm,
  setSearchTerm,
  onResetFilters,
  onPageReset,
}: InvoiceFiltersProps) {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="flex flex-wrap gap-3 items-end">

        <div className="flex-1 min-w-50">
          <SearchInput
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              onPageReset();
            }}
            placeholder="Search invoices by number or customer..."
            className="w-full"
          />
        </div>

        <div className="min-w-35">
          {/* <label className="text-xs font-semibold text-text-secondary block mb-1">Status</label> */}
          <FilterSelect
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              onPageReset();
            }}
            options={STATUS_OPTIONS}
          />
        </div>

        <div className="min-w-40">
          {/* <label className="text-xs font-semibold text-text-secondary block mb-1">Date Range</label> */}
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              onPageReset();
            }}
            placeholder="mm/dd/yyyy"
            className="w-full px-3 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none
             focus:ring-2 focus:ring-primary/20 text-text-main"
          />
        </div>

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

    </div>
  );
};
