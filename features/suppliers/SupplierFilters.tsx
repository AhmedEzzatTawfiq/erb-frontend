'use client';

import React from 'react';
import { Filter } from 'lucide-react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';
import { useCategories } from '../categories/hooks/useCategories';

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

  const { data: categories = [] } = useCategories();
  const CATEGORY_OPTIONS = [
    { label: 'All Categories', value: 'All Categories' },
    ...categories.map((cat) => ({ label: cat.name, value: cat.name })),
  ];

  return (
    <div className="bg-white border border-border rounded-2xl p-4 md:p-5 shadow-2xs space-y-4">
      <div className="flex flex-wrap gap-3 items-end">

        {/* Search */}
        <div className="flex-1 min-w-50">
          <SearchInput
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              onPageReset();
            }}
            placeholder="Company, Contact, or Email..."
            className="w-full flex-1"
          />
        </div>

        {/* Status Select */}
        <FilterSelect
          value={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            onPageReset();
          }}
          options={STATUS_OPTIONS}
        // label="Status"
        />

        {/* Category Select */}
        <FilterSelect
          value={categoryFilter}
          onChange={(val) => {
            setCategoryFilter(val);
            onPageReset();
          }}
          options={CATEGORY_OPTIONS}
        // label="Category"
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
    </div>
  );
};
