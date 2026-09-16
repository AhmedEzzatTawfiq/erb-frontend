'use client';

import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';

interface CustomerFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRange: string;
  setDateRange: (range: string) => void;
  showMoreFilters: boolean;
  setShowMoreFilters: (show: boolean) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

const DATE_RANGE_OPTIONS = [
  { label: 'Last 30 Days', value: 'Last 30 Days' },
  { label: 'Last 7 Days', value: 'Last 7 Days' },
  { label: 'Last 90 Days', value: 'Last 90 Days' },
  { label: 'This Year', value: 'This Year' },
  { label: 'All Time', value: 'All Time' },
];

export default function CustomerFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateRange,
  setDateRange,
  showMoreFilters,
  setShowMoreFilters,
  onResetFilters,
  onPageReset,
}: CustomerFiltersProps) {
  return (
    <div className="bg-[#F8FAFC]/60 border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

        {/* Search */}
        <SearchInput
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            onPageReset();
          }}
          placeholder="Name, Email, or Phone..."
          className="w-full"
        />

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
          leadingIcon={<Calendar className="w-4 h-4" />}
        />

        {/* More Filters */}
        <div>
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`w-full py-2.5 px-4 bg-white border rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs ${
              showMoreFilters
                ? 'border-primary text-primary bg-blue-50/50'
                : 'border-border text-text-secondary hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4 text-text-secondary" />
            <span>More Filters</span>
          </button>
        </div>

      </div>

      {showMoreFilters && (
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Minimum Orders
            </label>
            <input
              type="number"
              placeholder="e.g. 10"
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Minimum Spent ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 5000"
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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
