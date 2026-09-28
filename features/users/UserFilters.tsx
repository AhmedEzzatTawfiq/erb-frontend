'use client';

import React from 'react';
import SearchInput from '@/components/shared/SearchInput';
import FilterSelect from '@/components/shared/FilterSelect';

interface UserFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  roleFilter: string;
  setRoleFilter: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  onPageReset: () => void;
  onResetFilters: () => void;
}

const ROLE_OPTIONS = [
  { label: 'All Roles', value: 'All Roles' },
  { label: 'Admin', value: 'Admin' },
  { label: 'Manager', value: 'Manager' },
  { label: 'Employee', value: 'Employee' },
];

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Active', value: 'Active' },
  { label: 'Inactive', value: 'Inactive' },
];

export default function UserFilters({
  searchTerm,
  setSearchTerm,
  roleFilter,
  setRoleFilter,
  statusFilter,
  setStatusFilter,
  onPageReset,
  onResetFilters,
}: UserFiltersProps) {
  const hasActiveFilter =
    searchTerm !== '' ||
    roleFilter !== 'All Roles' ||
    statusFilter !== 'All Statuses';

  return (
    <div className="p-4 md:p-5 flex flex-wrap items-center gap-3 border-b border-border">

      <div className="flex-1 min-w-50">
        <SearchInput
          value={searchTerm}
          onChange={(val) => {
            setSearchTerm(val);
            onPageReset();
          }}
          placeholder="Search users..."
          className="w-full"
        />
      </div>

      <FilterSelect
        value={roleFilter}
        onChange={(val) => {
          setRoleFilter(val);
          onPageReset();
        }}
        options={ROLE_OPTIONS}
        label="Role"
      />

      <FilterSelect
        value={statusFilter}
        onChange={(val) => {
          setStatusFilter(val);
          onPageReset();
        }}
        options={STATUS_OPTIONS}
        label="Status"
      />

      {hasActiveFilter && (
        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs text-primary font-semibold hover:underline whitespace-nowrap"
        >
          Reset filters
        </button>
      )}
    </div>
  );
};
