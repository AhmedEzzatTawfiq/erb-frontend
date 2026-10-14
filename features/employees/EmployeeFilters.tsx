'use client';

import React from 'react';
import FilterSelect from '@/components/shared/FilterSelect';
import SearchInput from '@/components/shared/SearchInput';
import { useDepartments } from '../departments/hooks/useDepartments';

interface EmployeeFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  departmentId: string;
  setDepartmentId: (id: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  onPageReset: () => void;
  onResetFilters: () => void;
}


const STATUS_OPTIONS = [
  { label: 'All Statuses', value: 'All Statuses' },
  { label: 'Active', value: 'Active' },
  { label: 'On Leave', value: 'On Leave' },
  { label: 'Terminated', value: 'Terminated' },
];

export default function EmployeeFilters({
  searchTerm,
  setSearchTerm,
  departmentId,
  setDepartmentId,
  statusFilter,
  setStatusFilter,
  onPageReset,
  onResetFilters,
}: EmployeeFiltersProps) {

  const { data: departments } = useDepartments();

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
          value={departmentId}
          onChange={(val) => {
            setDepartmentId(val);
            onPageReset();
          }}
          options={[
            { label: 'All Departments', value: '' },
            ...(departments?.map((d) => ({ label: d.name, value: d.id })) ?? []),
          ]}
        />

        <FilterSelect
          value={statusFilter}
          onChange={(val) => {
            setStatusFilter(val);
            onPageReset();
          }}
          options={STATUS_OPTIONS}
          // label="Status"
        />

        {/* Reset */}
        {(searchTerm || departmentId || statusFilter !== 'All Statuses') && (
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
