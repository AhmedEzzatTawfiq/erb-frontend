'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils';
import CustomerHeader from './CustomerHeader';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import Pagination from '@/components/shared/Pagination';
import { useCustomers } from './hooks/useCustomers';
import { useDeleteCustomer } from './hooks/useDeleteCustomer';

export default function CustomersPage() {
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

  const {
    data,
    isLoading,
    isError,
    error,
  } = useCustomers({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    sortField: sortField,
    sortOrder: sortOrder,
  });

  const customers = data?.data ?? [];


  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(customers.map((c) => c.id));
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
    customers.length > 0 &&
    customers.every((c) => selectedIds.includes(c.id));

  const {
    mutate: deleteCustomer,
    isPending: isDeleting
  } = useDeleteCustomer();

  const handleDeleteCustomer = (id: string) => {
    deleteCustomer(id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setActiveDropdown(null)
      }
    })
  };


  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteCustomer(id, {
        onSuccess: () => {
          setSelectedIds((prev) => prev.filter((item) => item !== id));
          setActiveDropdown(null)
        }
      })
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };


  const handleSort = (field: 'companyName' | 'orders' | 'totalSpent') => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === 'asc' ? 'desc' : 'asc'
      );
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
          customers={customers}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewCustomer={() => { }}
          onEditCustomer={() => { }}
          onDeleteCustomer={handleDeleteCustomer}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <Pagination
          currentPage={data?.meta.page ?? 1}
          totalPages={data?.meta.totalPages ?? 1}
          totalFilteredCount={data?.meta.totalCount ?? 0}
          pageSize={data?.meta.limit ?? pageSize}
          onPageChange={setCurrentPage}
          entityLabel="customers"
        />
      </div>
    </main>
  );
}
