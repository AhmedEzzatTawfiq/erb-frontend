'use client';

import React from 'react';
import FilterSelect from '@/components/shared/FilterSelect';
import SearchInput from '@/components/shared/SearchInput';

interface EmployeeFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentFilter: string;
  setDepartmentFilter: (dept: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onPageReset: () => void;
  onResetFilters: () => void;
}

const DEPARTMENT_OPTIONS = [
  { label: 'All Departments', value: 'All Departments' },
  { label: 'Engineering', value: 'Engineering' },
  { label: 'Sales', value: 'Sales' },
  { label: 'Finance', value: 'Finance' },
  { label: 'Human Resources', value: 'Human Resources' },
  { label: 'Marketing', value: 'Marketing' },
  { label: 'Operations', value: 'Operations' },
  { label: 'Design', value: 'Design' },
  { label: 'Legal', value: 'Legal' },
];

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Active', value: 'Active' },
  { label: 'On Leave', value: 'On Leave' },
  { label: 'Terminated', value: 'Terminated' },
];

export default function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  onPageReset,
  onResetFilters,
}: EmployeeFiltersProps) {
  return (
    <div className="bg-white border border-border rounded-2xl px-4 py-3 md:px-5 shadow-2xs">
      <div className="flex flex-wrap items-center gap-3">
        {/* Search  */}
        <div className="flex-1 min-w-50">
          <SearchInput
            value={searchTerm}
            onChange={(val) => {
              setSearchTerm(val);
              onPageReset();
            }}
            placeholder="Search employees by name..."
            className="w-full"
          />
        </div>

        <FilterSelect
          value={departmentFilter}
          onChange={(val) => {
            setDepartmentFilter(val);
            onPageReset();
          }}
          options={DEPARTMENT_OPTIONS}
          label="Department"
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

        {/* Reset */}
        {(searchTerm || departmentFilter !== 'All Departments' || statusFilter !== 'All Statuses') && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-primary font-semibold hover:underline whitespace-nowrap"
          >
            Reset filters
          </button>
        )}
      </div>
    </div>
  );
};
