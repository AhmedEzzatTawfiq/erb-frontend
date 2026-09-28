'use client';

import React, { useState, useMemo } from 'react';
import { Customer } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_CUSTOMERS } from './mockData';
import CustomerHeader from './CustomerHeader';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import Pagination from '@/components/shared/Pagination';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [dateRange, setDateRange] = useState<string>('Last 30 Days');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'companyName' | 'orders' | 'totalSpent'>('companyName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Filter & Sort
  const filteredCustomers = useMemo(() => {
    return customers
      .filter((cust) => {
        const matchesSearch =
          searchTerm === '' ||
          cust.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cust.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cust.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cust.phone.includes(searchTerm);

        const matchesStatus =
          statusFilter === 'All Statuses' || cust.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];

        if (typeof valA === 'string' && typeof valB === 'string') {
          return sortOrder === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortOrder === 'asc'
          ? (valA as number) - (valB as number)
          : (valB as number) - (valA as number);
      });
  }, [customers, searchTerm, statusFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCustomers.slice(start, start + pageSize);
  }, [filteredCustomers, currentPage, pageSize]);

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedCustomers.map((c) => c.id));
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
    paginatedCustomers.length > 0 &&
    paginatedCustomers.every((c) => selectedIds.includes(c.id));

  const handleDeleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((c) => c.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setCustomers((prev) => prev.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  const handleSort = (field: 'companyName' | 'orders' | 'totalSpent') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <CustomerHeader />

      <CustomerFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
        onResetFilters={() => {
          setSearchTerm('');
          setStatusFilter('All Statuses');
          setDateRange('Last 30 Days');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <CustomerTable
          customers={paginatedCustomers}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewCustomer={() => {}}
          onEditCustomer={() => {}}
          onDeleteCustomer={handleDeleteCustomer}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredCustomers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          entityLabel="customers"
        />
      </div>
    </main>
  );
}
