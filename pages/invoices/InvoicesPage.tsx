'use client';

import React, { useState, useMemo } from 'react';
import { Invoice } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_INVOICES } from './mockData';
import InvoiceHeader from './InvoiceHeader';
import InvoiceFilters from './InvoiceFilters';
import InvoiceTable from './InvoiceTable';
import InvoicePagination from './InvoicePagination';
import InvoiceFormModal from './InvoiceFormModal';
import InvoiceDetailsModal from './InvoiceDetailsModal';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<
    'invoiceNumber' | 'customer' | 'amount' | 'dueDate' | 'createdDate'
  >('invoiceNumber');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewInvoice, setViewInvoice] = useState<Invoice | null>(null);
  const [editInvoice, setEditInvoice] = useState<Invoice | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customer: '',
    orderNumber: '',
    amount: 0,
    dueDate: '',
    createdDate: new Date().toISOString().split('T')[0],
    status: 'Draft' as Invoice['status'],
  });

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
        if (sortField === 'amount') {
          return sortOrder === 'asc' ? a.amount - b.amount : b.amount - a.amount;
        }
        const valA = a[sortField] as string;
        const valB = b[sortField] as string;
        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [invoices, searchTerm, statusFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / pageSize));
  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredInvoices.slice(start, start + pageSize);
  }, [filteredInvoices, currentPage, pageSize]);

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedInvoices.map((inv) => inv.id) : []);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    paginatedInvoices.length > 0 &&
    paginatedInvoices.every((inv) => selectedIds.includes(inv.id));

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setFormData({
      customer: '',
      orderNumber: '',
      amount: 0,
      dueDate: '',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'Draft',
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (invoice: Invoice) => {
    setEditInvoice(invoice);
    setFormData({
      customer: invoice.customer,
      orderNumber: invoice.orderNumber,
      amount: invoice.amount,
      dueDate: invoice.dueDate,
      createdDate: invoice.createdDate,
      status: invoice.status,
    });
    setActiveDropdown(null);
  };

  const formatDateLabel = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer || !formData.amount) return;

    if (editInvoice) {
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === editInvoice.id
            ? {
                ...inv,
                customer: formData.customer,
                orderNumber: formData.orderNumber,
                amount: Number(formData.amount),
                dueDate: formData.dueDate ? formatDateLabel(formData.dueDate) : inv.dueDate,
                createdDate: formData.createdDate ? formatDateLabel(formData.createdDate) : inv.createdDate,
                status: formData.status,
              }
            : inv
        )
      );
      setEditInvoice(null);
    } else {
      const nextNum = invoices.length + 16;
      const paddedNum = String(nextNum).padStart(3, '0');
      const newInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        invoiceNumber: `INV-2023-${paddedNum}`,
        customer: formData.customer,
        orderNumber: formData.orderNumber || `ORD-${Date.now()}`,
        amount: Number(formData.amount),
        dueDate: formData.dueDate ? formatDateLabel(formData.dueDate) : 'TBD',
        createdDate: formData.createdDate
          ? formatDateLabel(formData.createdDate)
          : formatDateLabel(new Date().toISOString()),
        status: formData.status,
      };
      setInvoices((prev) => [newInvoice, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setInvoices((prev) => prev.filter((inv) => !selectedIds.includes(inv.id)));
    setSelectedIds([]);
  };

  const handleSort = (
    field: 'invoiceNumber' | 'customer' | 'amount' | 'dueDate' | 'createdDate'
  ) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <InvoiceHeader onCreateInvoice={handleOpenAddModal} />

      <InvoiceFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateFrom={dateFrom}
        setDateFrom={setDateFrom}
        dateTo={dateTo}
        setDateTo={setDateTo}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
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
          invoices={paginatedInvoices}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewInvoice={setViewInvoice}
          onEditInvoice={handleOpenEditModal}
          onDeleteInvoice={handleDeleteInvoice}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <InvoicePagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredInvoices.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <InvoiceFormModal
        isOpen={isAddModalOpen}
        editInvoice={editInvoice}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditInvoice(null);
        }}
        onSubmit={handleSaveInvoice}
      />

      <InvoiceDetailsModal
        invoice={viewInvoice}
        onClose={() => setViewInvoice(null)}
        onEdit={handleOpenEditModal}
        formatCurrency={formatCurrency}
      />
    </main>
  );
};
