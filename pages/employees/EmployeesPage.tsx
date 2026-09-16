'use client';

import React, { useState, useMemo } from 'react';
import { Employee } from './types';
import { INITIAL_EMPLOYEES } from './mockData';
import EmployeeHeader from './EmployeeHeader';
import EmployeeFilters from './EmployeeFilters';
import EmployeeTable from './EmployeeTable';
import EmployeePagination from './EmployeePagination';
import EmployeeFormModal from './EmployeeFormModal';
import EmployeeDetailsModal from './EmployeeDetailsModal';

let empCounter = 9200;

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
  const pageSize = 5;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewEmployee, setViewEmployee] = useState<Employee | null>(null);
  const [editEmployee, setEditEmployee] = useState<Employee | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    department: 'Engineering' as Employee['department'],
    position: '',
    email: '',
    phone: '',
    status: 'Active' as Employee['status'],
    joinedDate: new Date().toISOString().split('T')[0],
  });

  // Filter & Sort
  const filteredEmployees = useMemo(() => {
    return employees
      .filter((emp) => {
        const matchesSearch =
          searchTerm === '' ||
          emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emp.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDepartment =
          departmentFilter === 'All Departments' || emp.department === departmentFilter;

        const matchesStatus =
          statusFilter === 'All Statuses' || emp.status === statusFilter;

        return matchesSearch && matchesDepartment && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField] as string;
        const valB = b[sortField] as string;
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

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedEmployees.map((e) => e.id) : []);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    paginatedEmployees.length > 0 &&
    paginatedEmployees.every((e) => selectedIds.includes(e.id));

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      department: 'Engineering',
      position: '',
      email: '',
      phone: '',
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (employee: Employee) => {
    setEditEmployee(employee);
    setFormData({
      name: employee.name,
      department: employee.department,
      position: employee.position,
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
      joinedDate: employee.joinedDate,
    });
    setActiveDropdown(null);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.position) return;

    if (editEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editEmployee.id
            ? {
                ...emp,
                name: formData.name,
                department: formData.department,
                position: formData.position,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                joinedDate: formData.joinedDate,
              }
            : emp
        )
      );
      setEditEmployee(null);
    } else {
      empCounter += 1;
      const initials = formData.name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      const newEmployee: Employee = {
        id: `emp-${Date.now()}`,
        employeeId: `EMP-${empCounter}`,
        name: formData.name,
        department: formData.department,
        position: formData.position,
        email: formData.email,
        phone: formData.phone || '',
        status: formData.status,
        initials,
        initialsBg: 'bg-indigo-100 text-indigo-700',
        joinedDate: formData.joinedDate,
      };
      setEmployees((prev) => [newEmployee, ...prev]);
      setIsAddModalOpen(false);
    }
  };

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
      <EmployeeHeader onAddEmployee={handleOpenAddModal} />

      <EmployeeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        departmentFilter={departmentFilter}
        setDepartmentFilter={setDepartmentFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onPageReset={() => setCurrentPage(1)}
        onResetFilters={() => {
          setSearchTerm('');
          setDepartmentFilter('All Departments');
          setStatusFilter('All Statuses');
          setCurrentPage(1);
        }}
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
          onViewEmployee={setViewEmployee}
          onEditEmployee={handleOpenEditModal}
          onDeleteEmployee={handleDeleteEmployee}
          onDeleteSelected={handleDeleteSelected}
        />

        <EmployeePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredEmployees.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <EmployeeFormModal
        isOpen={isAddModalOpen}
        editEmployee={editEmployee}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditEmployee(null);
        }}
        onSubmit={handleSaveEmployee}
      />

      <EmployeeDetailsModal
        employee={viewEmployee}
        onClose={() => setViewEmployee(null)}
        onEdit={handleOpenEditModal}
      />
    </main>
  );
};
