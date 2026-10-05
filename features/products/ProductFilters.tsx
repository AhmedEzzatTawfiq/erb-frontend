'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';
import { useCategories } from '../categories/hooks/useCategories';

interface ProductFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryId: string;
  setCategoryId: (id: string) => void;
  lowStock: boolean;
  setLowStock: (val: boolean) => void;
  showMoreFilters: boolean;
  setShowMoreFilters: (show: boolean) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}

export default function ProductFilters({
  searchTerm,
  setSearchTerm,
  categoryId,
  setCategoryId,
  lowStock,
  setLowStock,
  showMoreFilters,
  setShowMoreFilters,
  onResetFilters,
  onPageReset,
}: ProductFiltersProps) {
  const { data: categories = [] } = useCategories();

  const categoryOptions = [
    { label: 'All Categories', value: '' },
    ...categories.map((c) => ({ label: c.name, value: c.id })),
  ];

  return (
    <div className="bg-[#F8FAFC]/60 border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">

        <SearchInput
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            onPageReset();
          }}
          placeholder="Search products, SKUs..."
          className="w-full md:max-w-md"
        />

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <FilterSelect
            value={categoryId}
            onChange={(val) => {
              setCategoryId(val);
              onPageReset();
            }}
            options={categoryOptions}
            className="min-w-37.5 flex-1 sm:flex-initial"
          />

          {/* More Filters toggle */}
          <button
            type="button"
            onClick={() => setShowMoreFilters(!showMoreFilters)}
            className={`py-2.5 px-4 bg-white border rounded-xl text-sm font-semibold flex items-center
               justify-center gap-2 transition-all shadow-2xs ${
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
          {/* Low Stock toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <div
                role="checkbox"
                aria-checked={lowStock}
                onClick={() => {
                  setLowStock(!lowStock);
                  onPageReset();
                }}
                className={`w-9 h-5 rounded-full transition-colors cursor-pointer ${
                  lowStock ? 'bg-primary' : 'bg-slate-200'
                } relative`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    lowStock ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </div>
              <span className="text-xs font-semibold text-text-secondary">Low Stock Only</span>
            </label>
          </div>

          <div className="flex items-end sm:col-start-3">
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
}
