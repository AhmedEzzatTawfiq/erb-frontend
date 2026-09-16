'use client';

import React, { useState, useMemo } from 'react';
import { Customer } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_CUSTOMERS } from './mockData';
import CustomerHeader from './CustomerHeader';
import CustomerFilters from './CustomerFilters';
import CustomerTable from './CustomerTable';
import CustomerPagination from './CustomerPagination';
import CustomerFormModal from './CustomerFormModal';
import CustomerDetailsModal from './CustomerDetailsModal';

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

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewCustomer, setViewCustomer] = useState<Customer | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    status: 'Active' as 'Active' | 'Inactive',
    orders: 0,
    totalSpent: 0,
  });

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

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      status: 'Active',
      orders: 0,
      totalSpent: 0,
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (customer: Customer) => {
    setEditCustomer(customer);
    setFormData({
      companyName: customer.companyName,
      contactName: customer.contactName,
      email: customer.email,
      phone: customer.phone,
      status: customer.status,
      orders: customer.orders,
      totalSpent: customer.totalSpent,
    });
    setActiveDropdown(null);
  };

  const handleSaveCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email) return;

    if (editCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === editCustomer.id
            ? {
                ...c,
                companyName: formData.companyName,
                contactName: formData.contactName,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                orders: Number(formData.orders),
                totalSpent: Number(formData.totalSpent),
              }
            : c
        )
      );
      setEditCustomer(null);
    } else {
      const initials = formData.companyName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      const newCust: Customer = {
        id: `cust-${Date.now()}`,
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone || '+1 (555) 000-0000',
        orders: Number(formData.orders) || 0,
        totalSpent: Number(formData.totalSpent) || 0,
        status: formData.status,
        initials: initials || 'CU',
        initialsBg: 'bg-indigo-100 text-indigo-700',
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setCustomers((prev) => [newCust, ...prev]);
      setIsAddModalOpen(false);
    }
  };

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
      <CustomerHeader onAddCustomer={handleOpenAddModal} />

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
          onViewCustomer={setViewCustomer}
          onEditCustomer={handleOpenEditModal}
          onDeleteCustomer={handleDeleteCustomer}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <CustomerPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredCustomers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <CustomerFormModal
        isOpen={isAddModalOpen}
        editCustomer={editCustomer}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditCustomer(null);
        }}
        onSubmit={handleSaveCustomer}
      />

      <CustomerDetailsModal
        customer={viewCustomer}
        onClose={() => setViewCustomer(null)}
        onEdit={handleOpenEditModal}
        formatCurrency={formatCurrency}
      />
    </main>
  );
};
