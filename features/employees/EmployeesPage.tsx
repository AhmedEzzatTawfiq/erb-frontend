'use client';

import React, { useState } from 'react';
import EmployeeHeader from './EmployeeHeader';
import EmployeeFilters from './EmployeeFilters';
import EmployeeTable from './EmployeeTable';
import Pagination from '@/components/shared/Pagination';
import { useEmployees } from './hooks/useEmployees';
import { useDeleteEmployee } from './hooks/useDeleteEmployee';

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentId, setDepartmentId] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'department' | 'position' | 'hireDate' | 'salary'>('hireDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const {
    data,
    isLoading,
    isError,
    error,
  } = useEmployees({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    departmentId: departmentId || undefined,
    status: statusFilter !== 'All Statuses' ? statusFilter : undefined,
    sortField: sortField,
    sortOrder: sortOrder,
  });

  const employees = data?.data ?? [];
  const totalCount = data?.meta?.totalCount ?? data?.meta?.total ?? 0;
  const totalPages = data?.meta?.totalPages ?? 1;

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(employees.map((e) => e.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    employees.length > 0 &&
    employees.every((e) => selectedIds.includes(e.id));

  const { mutate: deleteEmployee } = useDeleteEmployee();

  const handleDeleteEmployee = (id: string) => {
    deleteEmployee(id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setActiveDropdown(null);
      },
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteEmployee(id, {
        onSuccess: () => {
          setSelectedIds((prev) => prev.filter((item) => item !== id));
          setActiveDropdown(null);
        },
      });
    });
  };

  const handleSort = (field: 'name' | 'employeeId' | 'department' | 'position') => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(sortField);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <EmployeeHeader />

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onResetFilters={() => {
          setSearchTerm('');
          setDepartmentId('');
          setStatusFilter('All Statuses');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <EmployeeTable
          employees={employees}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewEmployee={() => { }}
          onEditEmployee={() => { }}
          onDeleteEmployee={handleDeleteEmployee}
          onDeleteSelected={handleDeleteSelected}
        />

        <Pagination
          currentPage={data?.meta?.page ?? currentPage}
          totalPages={totalPages}
          totalFilteredCount={totalCount}
          pageSize={data?.meta?.limit ?? pageSize}
          onPageChange={setCurrentPage}
          entityLabel="employees"
        />
      </div>
    </main>
  );
}

