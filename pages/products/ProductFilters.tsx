'use client';

import React from 'react';
import { Filter, Calendar } from 'lucide-react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  stockFilter: string;
  setStockFilter: (stock: string) => void;
  showMoreFilters: boolean;
  setShowMoreFilters: (show: boolean) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'All Categories' },
  { label: 'Networking', value: 'Networking' },
  { label: 'Hardware', value: 'Hardware' },
  { label: 'Storage', value: 'Storage' },
  { label: 'Peripherals', value: 'Peripherals' },
];

const STOCK_OPTIONS = [
  { label: 'Stock Status', value: 'Stock Status' },
  { label: 'In Stock', value: 'In Stock' },
  { label: 'Low Stock', value: 'Low Stock' },
  { label: 'Out of Stock', value: 'Out of Stock' },
];

export default function ProductFilters({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  stockFilter,
  setStockFilter,
  showMoreFilters,
  setShowMoreFilters,
  onResetFilters,
  onPageReset,
}: ProductFiltersProps) {
  return (
    <div className="bg-[#F8FAFC]/60 border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Search Input */}
        <SearchInput
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            onPageReset();
          }}
          placeholder="Search products, SKUs..."
          className="w-full md:max-w-md"
        />

        {/* Right Selects & Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Select */}
          <FilterSelect
            value={categoryFilter}
            onChange={(val) => {
              setCategoryFilter(val);
              onPageReset();
            }}
            options={CATEGORY_OPTIONS}
            className="min-w-37.5 flex-1 sm:flex-initial"
          />

          {/* Stock Status Select */}
          <FilterSelect
            value={stockFilter}
            onChange={(val) => {
              setStockFilter(val);
              onPageReset();
            }}
            options={STOCK_OPTIONS}
            className="min-w-37.5 flex-1 sm:flex-initial"
          />

          {/* More Filters */}
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`py-2.5 px-4 bg-white border rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-2xs ${
              showMoreFilters
                ? 'border-primary text-primary bg-blue-50/50'
                : 'border-border text-text-secondary hover:bg-slate-50'
            }`}
          >
            <Filter className="w-4 h-4 text-text-secondary" />
            <span>More</span>
          </button>
        </div>

      </div>

      {showMoreFilters && (
        <div className="pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in duration-200">
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Min Price ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 100"
              className="w-full px-3 py-2 text-sm bg-white border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-text-secondary block mb-1">
              Max Price ($)
            </label>
            <input
              type="number"
              placeholder="e.g. 2000"
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
