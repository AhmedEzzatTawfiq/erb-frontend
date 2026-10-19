'use client';

import React, { useState } from 'react';
import { Filter, Calendar } from 'lucide-react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';
import { CustomerStatus } from './types';

interface CustomerFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: 'All Statuses' | CustomerStatus;
  setStatusFilter: (status: 'All Statuses' | CustomerStatus) => void;
  onResetFilters: () => void;
  onPageReset: () => void;
}


const STATUS_OPTIONS: { label: string; value: 'All Statuses' | CustomerStatus }[] = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
];


export default function CustomerFilters({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  onResetFilters,
  onPageReset,
}: CustomerFiltersProps) {

  const handleStatusChange = (value: string) => {
    if (
      value === 'All Statuses' ||
      value === 'active' ||
      value === 'inactive'
    ) {
      setStatusFilter(value);
      onPageReset();
    }
  };

  return (
    <div className="bg-white border border-border rounded-2xl px-4 py-3 md:px-5 shadow-2xs">
      <div className="flex flex-wrap items-end gap-3">

        <SearchInput
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            onPageReset();
          }}
          placeholder="Name, Email, or Phone..."
          className="w-full flex-1"
        />

        <FilterSelect
          value={statusFilter}
          onChange={handleStatusChange}
          options={STATUS_OPTIONS}
        />

        <div className="flex">
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
