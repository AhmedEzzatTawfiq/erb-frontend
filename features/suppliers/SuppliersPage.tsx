'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SupplierHeader from './SupplierHeader';
import SupplierFilters from './SupplierFilters';
import SupplierTable from './SupplierTable';
import Pagination from '@/components/shared/Pagination';
import { useSuppliers } from './hooks/useSuppliers';
import { useDeleteSupplier } from './hooks/useDeleteSupplier';

export default function SuppliersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All Statuses');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Categories');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'companyName' | 'contactName'>('companyName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useSuppliers({
    page: currentPage,
    limit: pageSize,
    search: searchTerm,
    status: statusFilter !== 'All Statuses' ? statusFilter : undefined,
    sortField,
    sortOrder,
  });

  const suppliers = Array.isArray(data) ? data : (data?.data ?? []);
  const totalCount = Array.isArray(data) ? data.length : (data?.meta?.totalCount ?? data?.meta?.total ?? suppliers.length);
  const totalPages = Array.isArray(data) ? 1 : (data?.meta?.totalPages ?? 1);
  console.log('suppliers', data); 

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(suppliers.map((s) => s.id));
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
    suppliers.length > 0 &&
    suppliers.every((s) => selectedIds.includes(s.id));

  const { mutate: deleteSupplier } = useDeleteSupplier();

  const handleDeleteSupplier = (id: string) => {
    deleteSupplier(id, {
      onSuccess: () => {
        setSelectedIds((prev) => prev.filter((item) => item !== id));
        setActiveDropdown(null);
      },
    });
  };

  const handleDeleteSelected = () => {
    selectedIds.forEach((id) => {
      deleteSupplier(id, {
        onSuccess: () => {
          setSelectedIds((prev) => prev.filter((item) => item !== id));
          setActiveDropdown(null);
        },
      });
    });
  };

  const handleSort = (field: 'companyName' | 'contactName') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <SupplierHeader />

      <SupplierFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
        onResetFilters={() => {
          setSearchTerm('');
          setStatusFilter('All Statuses');
          setCategoryFilter('All Categories');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <SupplierTable
          suppliers={suppliers}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewSupplier={(supplier) => router.push(`/suppliers/${supplier.id}`)}
          onEditSupplier={(supplier) => router.push(`/suppliers/${supplier.id}/edit`)}
          onDeleteSupplier={handleDeleteSupplier}
          onDeleteSelected={handleDeleteSelected}
        />

        <Pagination
          currentPage={data?.meta?.page ?? currentPage}
          totalPages={totalPages}
          totalFilteredCount={totalCount}
          pageSize={data?.meta?.limit ?? pageSize}
          onPageChange={setCurrentPage}
          entityLabel="suppliers"
        />
      </div>
    </main>
  );
}
