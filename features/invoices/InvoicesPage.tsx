'use client';

import React, { useState, useMemo } from 'react';
import { Invoice } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_INVOICES } from './mockData';
import InvoiceHeader from './InvoiceHeader';
import InvoiceFilters from './InvoiceFilters';
import InvoiceTable from './InvoiceTable';
import Pagination from '@/components/shared/Pagination';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'invoiceNumber' | 'customer' | 'amount' | 'dueDate' | 'createdDate'>('createdDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Filter & Sort
  const filteredInvoices = useMemo(() => {
    return invoices
      .filter((inv) => {
        const matchesSearch =
          searchTerm === '' ||
          inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === 'All Statuses' || inv.status === statusFilter;

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
  }, [invoices, searchTerm, statusFilter, sortField, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInvoices.slice(start, start + pageSize);
  }, [filteredInvoices, currentPage, pageSize]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedInvoices.map((i) => i.id));
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
    paginatedInvoices.length > 0 &&
    paginatedInvoices.every((i) => selectedIds.includes(i.id));

  const handleDeleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((i) => i.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setInvoices((prev) => prev.filter((i) => !selectedIds.includes(i.id)));
    setSelectedIds([]);
  };

  const handleSort = (field: 'invoiceNumber' | 'customer' | 'amount' | 'dueDate' | 'createdDate') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <InvoiceHeader />

      <InvoiceFilters
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
        <InvoiceTable
          invoices={paginatedInvoices}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewInvoice={() => {}}
          onEditInvoice={() => {}}
          onDeleteInvoice={handleDeleteInvoice}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredInvoices.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          entityLabel="invoices"
        />
      </div>
    </main>
  );
}
