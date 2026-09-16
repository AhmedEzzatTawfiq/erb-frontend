'use client';

import React from 'react';
import { Filter, Download } from 'lucide-react';
import FilterSelect from '@/components/shared/FilterSelect';

interface InvoiceFiltersProps {
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  showMoreFilters: boolean;
  setShowMoreFilters: (show: boolean) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Paid', value: 'Paid' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Overdue', value: 'Overdue' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Draft', value: 'Draft' },
];

export default function InvoiceFilters({
  statusFilter,
  setStatusFilter,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  searchTerm,
  setSearchTerm,
  showMoreFilters,
  setShowMoreFilters,
  onResetFilters,
  onPageReset,
}: InvoiceFiltersProps) {
  return (
    <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="flex flex-wrap items-end gap-3">

        {/* Status */}
        <div className="min-w-35">
          <label className="text-xs font-semibold text-text-secondary block mb-1">Status</label>
          <FilterSelect
            value={statusFilter}
            onChange={(val) => {
              setStatusFilter(val);
              onPageReset();
            }}
            options={STATUS_OPTIONS}
            label="Status"
          />
        </div>

        {/* Date Range */}
        <div className="min-w-40">
          <label className="text-xs font-semibold text-text-secondary block mb-1">Date Range</label>
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              onPageReset();
            }}
            placeholder="mm/dd/yyyy"
            className="w-full px-3 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-main"
          />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Filter Button */}
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
          <span>Filter</span>
        </button>

        {/* Export Button */}
        <button
          type="button"
          className="py-2 px-4 bg-white border border-border rounded-xl text-sm font-semibold flex items-center gap-2 transition-all shadow-2xs text-text-secondary hover:bg-slate-50"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {showMoreFilters && (
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          {/* Search */}
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Search
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                onPageReset();
              }}
              placeholder="Invoice #, customer, or order..."
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* Date To */}
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Date To
            </label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                onPageReset();
              }}
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
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
      )}
    </div>
  );
};
