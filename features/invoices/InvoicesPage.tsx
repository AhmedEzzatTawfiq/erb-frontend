'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatCurrency } from '@/lib/utils';
import InvoiceHeader from './InvoiceHeader';
import InvoiceFilters from './InvoiceFilters';
import InvoiceTable from './InvoiceTable';
import Pagination from '@/components/shared/Pagination';
import { useInvoices } from './hooks/useInvoices';
import { useUpdateInvoiceStatus } from './hooks/useUpdateInvoiceStatus';
import { InvoiceStatus } from './types';

export default function InvoicesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const { data, isLoading, isError } = useInvoices({
    status: statusFilter !== 'All Statuses' ? (statusFilter.toLowerCase() as InvoiceStatus) : undefined,
    from: dateFrom || undefined,
    to: dateTo || undefined,
    search: searchTerm,
    page: currentPage,
    limit: pageSize,
  });

  const invoices = data?.data ?? [];
  const totalCount = data?.meta?.totalCount ?? data?.meta?.total ?? invoices.length;
  const totalPages = data?.meta?.totalPages ?? 1;

  // Client-side search filter
  const filteredInvoices = invoices.filter((inv) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      inv.id.toLowerCase().includes(term) ||
      (inv.customer?.companyName ?? '').toLowerCase().includes(term) ||
      (inv.order?.id ?? '').toLowerCase().includes(term)
    );
  });

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredInvoices.map((i) => i.id));
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
    filteredInvoices.length > 0 &&
    filteredInvoices.every((i) => selectedIds.includes(i.id));

  const { mutate: updateStatus } = useUpdateInvoiceStatus();

  const handleDeleteInvoice = (_id: string) => {
    //  deletion is not supported by backend.
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setSelectedIds([]);
  };

  const handleSort = () => {
    
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <InvoiceHeader />

      <InvoiceFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        onResetFilters={() => {
          setSearchTerm('');
          setStatusFilter('All Statuses');
          setDateFrom('');
          setDateTo('');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <InvoiceTable
          invoices={filteredInvoices}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewInvoice={(inv) => router.push(`/invoices/${inv.id}`)}
          onEditInvoice={(inv) => router.push(`/invoices/${inv.id}/edit`)}
          onDeleteInvoice={handleDeleteInvoice}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <Pagination
          currentPage={data?.meta?.page ?? currentPage}
          totalPages={totalPages}
          totalFilteredCount={totalCount}
          pageSize={data?.meta?.limit ?? pageSize}
          onPageChange={setCurrentPage}
          entityLabel="invoices"
        />
      </div>
    </main>
  );
}
