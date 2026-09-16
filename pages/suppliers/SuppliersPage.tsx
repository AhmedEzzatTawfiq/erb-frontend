'use client';

import React, { useState, useMemo } from 'react';
import { Supplier } from './types';
import { INITIAL_SUPPLIERS } from './mockData';
import SupplierHeader from './SupplierHeader';
import SupplierFilters from './SupplierFilters';
import SupplierTable from './SupplierTable';
import SupplierPagination from './SupplierPagination';
import SupplierFormModal from './SupplierFormModal';
import SupplierDetailsModal from './SupplierDetailsModal';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
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
  const pageSize = 5;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewSupplier, setViewSupplier] = useState<Supplier | null>(null);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    status: 'Active' as 'Active' | 'Inactive' | 'Pending',
    productsSupplied: [] as string[],
  });

  // Filter & Sort
  const filteredSuppliers = useMemo(() => {
    return suppliers
      .filter((sup) => {
        const matchesSearch =
          searchTerm === '' ||
          sup.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sup.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sup.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sup.phone.includes(searchTerm);

        const matchesStatus =
          statusFilter === 'All Statuses' || sup.status === statusFilter;

        const matchesCategory =
          categoryFilter === 'All Categories' ||
          sup.productsSupplied.includes(categoryFilter);

        return matchesSearch && matchesStatus && matchesCategory;
      })
      .sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      });
  }, [suppliers, searchTerm, statusFilter, categoryFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredSuppliers.length / pageSize));
  const paginatedSuppliers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSuppliers.slice(start, start + pageSize);
  }, [filteredSuppliers, currentPage, pageSize]);

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(paginatedSuppliers.map((s) => s.id));
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
    paginatedSuppliers.length > 0 &&
    paginatedSuppliers.every((s) => selectedIds.includes(s.id));

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setFormData({
      companyName: '',
      contactName: '',
      email: '',
      phone: '',
      status: 'Active',
      productsSupplied: [],
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (supplier: Supplier) => {
    setEditSupplier(supplier);
    setFormData({
      companyName: supplier.companyName,
      contactName: supplier.contactName,
      email: supplier.email,
      phone: supplier.phone,
      status: supplier.status,
      productsSupplied: [...supplier.productsSupplied],
    });
    setActiveDropdown(null);
  };

  const handleSaveSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.companyName || !formData.contactName || !formData.email) return;

    if (editSupplier) {
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === editSupplier.id
            ? {
                ...s,
                companyName: formData.companyName,
                contactName: formData.contactName,
                email: formData.email,
                phone: formData.phone,
                status: formData.status,
                productsSupplied: formData.productsSupplied,
              }
            : s
        )
      );
      setEditSupplier(null);
    } else {
      const initials = formData.companyName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      const newSupplier: Supplier = {
        id: `sup-${Date.now()}`,
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        phone: formData.phone || '+1 (555) 000-0000',
        productsSupplied: formData.productsSupplied,
        status: formData.status,
        initials: initials || 'SP',
        initialsBg: 'bg-indigo-100 text-indigo-700',
        joinedDate: new Date().toISOString().split('T')[0],
      };
      setSuppliers((prev) => [newSupplier, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteSupplier = (id: string) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setSuppliers((prev) => prev.filter((s) => !selectedIds.includes(s.id)));
    setSelectedIds([]);
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
      <SupplierHeader onAddSupplier={handleOpenAddModal} />

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
          suppliers={paginatedSuppliers}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewSupplier={setViewSupplier}
          onEditSupplier={handleOpenEditModal}
          onDeleteSupplier={handleDeleteSupplier}
          onDeleteSelected={handleDeleteSelected}
        />

        <SupplierPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredSuppliers.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <SupplierFormModal
        isOpen={isAddModalOpen}
        editSupplier={editSupplier}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditSupplier(null);
        }}
        onSubmit={handleSaveSupplier}
      />

      <SupplierDetailsModal
        supplier={viewSupplier}
        onClose={() => setViewSupplier(null)}
        onEdit={handleOpenEditModal}
      />
    </main>
  );
};
