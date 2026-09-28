'use client';

import React, { useState, useMemo } from 'react';
import { Employee } from './types';
import { INITIAL_EMPLOYEES } from './mockData';
import EmployeeHeader from './EmployeeHeader';
import EmployeeFilters from './EmployeeFilters';
import EmployeeTable from './EmployeeTable';
import Pagination from '@/components/shared/Pagination';

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'name' | 'employeeId' | 'department' | 'position'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Filter & Sort
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchesSearch =
        searchTerm === '' ||
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.position.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDept = departmentFilter === 'All Departments' || emp.department === departmentFilter;

      const matchesStatus = statusFilter === 'All Statuses' || emp.status === statusFilter;

      return matchesSearch && matchesDept && matchesStatus;
    })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [employees, searchTerm, departmentFilter, statusFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredEmployees.slice(start, start + pageSize);
  }, [filteredEmployees, currentPage, pageSize]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedEmployees.map((e) => e.id));
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
    paginatedEmployees.length > 0 &&
    paginatedEmployees.every((e) => selectedIds.includes(e.id));

  const handleDeleteEmployee = (id: string) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setEmployees((prev) => prev.filter((e) => !selectedIds.includes(e.id)));
    setSelectedIds([]);
  };

  const handleSort = (field: 'name' | 'employeeId' | 'department' | 'position') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <EmployeeHeader />

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onResetFilters={() => {
          setSearchTerm('');
          setDepartmentFilter('All Departments');
          setStatusFilter('All Statuses');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <EmployeeTable
          employees={paginatedEmployees}
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
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredEmployees.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          entityLabel="employees"
        />
      </div>
    </main>
  );
}
