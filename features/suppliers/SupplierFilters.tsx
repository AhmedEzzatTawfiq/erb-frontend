'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';

interface SupplierFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
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

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'All Categories' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Hardware', value: 'Hardware' },
  { label: 'Software', value: 'Software' },
  { label: 'Raw Materials', value: 'Raw Materials' },
  { label: 'Packaging', value: 'Packaging' },
  { label: 'Networking', value: 'Networking' },
  { label: 'Storage', value: 'Storage' },
  { label: 'Peripherals', value: 'Peripherals' },
  { label: 'Shipping', value: 'Shipping' },
  { label: 'Chemicals', value: 'Chemicals' },
];

export default function SupplierFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categoryFilter,
  setCategoryFilter,
  showMoreFilters,
  setShowMoreFilters,
  onResetFilters,
  onPageReset,
}: SupplierFiltersProps) {
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
          placeholder="Company, Contact, or Email..."
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

        {/* Category Select */}
        <FilterSelect
          value={categoryFilter}
          onChange={(val) => {
            setCategoryFilter(val);
            onPageReset();
          }}
          options={CATEGORY_OPTIONS}
          label="Category"
        />

        {/* More Filters */}
        <div>
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`w-full py-2.5 px-4 bg-white border rounded-xl text-sm font-semibold
               flex items-center justify-center gap-2 transition-all shadow-2xs ${showMoreFilters
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
              Joined Before
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none
               focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Min. Products Supplied
            </label>
            <input
              type="number"
              placeholder="e.g. 2"
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none
               focus:ring-2 focus:ring-primary/20"
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
