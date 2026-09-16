'use client';

import React, { useState, useMemo } from 'react';
import { Order } from './types';
import { formatCurrency } from '@/lib/utils';
import { INITIAL_ORDERS } from './mockData';
import OrderHeader from './OrderHeader';
import OrderFilters from './OrderFilters';
import OrderTable from './OrderTable';
import OrderPagination from './OrderPagination';
import OrderFormModal from './OrderFormModal';
import OrderDetailsModal from './OrderDetailsModal';

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [paymentFilter, setPaymentFilter] = useState('All Payments');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Sorting
  const [sortField, setSortField] = useState<'orderNumber' | 'date' | 'total' | 'items'>('orderNumber');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    items: 1,
    total: 0,
    status: 'Pending' as Order['status'],
    paymentStatus: 'Pending' as Order['paymentStatus'],
    date: new Date().toISOString().split('T')[0],
  });

  // Filter & Sort
  const filteredOrders = useMemo(() => {
    return orders
      .filter((ord) => {
        const matchesSearch =
          searchTerm === '' ||
          ord.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ord.customer.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
          statusFilter === 'All Statuses' || ord.status === statusFilter;

        const matchesPayment =
          paymentFilter === 'All Payments' || ord.paymentStatus === paymentFilter;

        return matchesSearch && matchesStatus && matchesPayment;
      })
      .sort((a, b) => {
        if (sortField === 'orderNumber') {
          return sortOrder === 'asc'
            ? a.orderNumber.localeCompare(b.orderNumber)
            : b.orderNumber.localeCompare(a.orderNumber);
        }
        if (sortField === 'date') {
          return sortOrder === 'asc'
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        }
        if (sortField === 'total') {
          return sortOrder === 'asc' ? a.total - b.total : b.total - a.total;
        }
        if (sortField === 'items') {
          return sortOrder === 'asc' ? a.items - b.items : b.items - a.items;
        }
        return 0;
      });
  }, [orders, searchTerm, statusFilter, paymentFilter, sortField, sortOrder]);

  // Paginated List
  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize));
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, currentPage, pageSize]);

  // Selection Handlers
  const handleSelectAll = (checked: boolean) => {
    setSelectedIds(checked ? paginatedOrders.map((o) => o.id) : []);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isAllSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((o) => selectedIds.includes(o.id));

  // Add / Edit Handlers
  const handleOpenAddModal = () => {
    setFormData({
      customerName: '',
      items: 1,
      total: 0,
      status: 'Pending',
      paymentStatus: 'Pending',
      date: new Date().toISOString().split('T')[0],
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (order: Order) => {
    setEditOrder(order);
    setFormData({
      customerName: order.customer.name,
      items: order.items,
      total: order.total,
      status: order.status,
      paymentStatus: order.paymentStatus,
      date: order.date,
    });
    setActiveDropdown(null);
  };

  const handleSaveOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName) return;

    if (editOrder) {
      setOrders((prev) =>
        prev.map((o) =>
          o.id === editOrder.id
            ? {
                ...o,
                customer: {
                  ...o.customer,
                  name: formData.customerName,
                  initials: formData.customerName
                    .split(' ')
                    .map((w) => w[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase(),
                },
                items: Number(formData.items),
                total: Number(formData.total),
                status: formData.status,
                paymentStatus: formData.paymentStatus,
                date: formData.date,
              }
            : o
        )
      );
      setEditOrder(null);
    } else {
      const initials = formData.customerName
        .split(' ')
        .map((w) => w[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();

      const nextNum = orders.length + 1249;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber: `#ORD-${nextNum}`,
        customer: {
          name: formData.customerName,
          initials: initials || 'OR',
          initialsBg: 'bg-indigo-100 text-indigo-700',
        },
        date: new Date(formData.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: Number(formData.items),
        total: Number(formData.total),
        status: formData.status,
        paymentStatus: formData.paymentStatus,
      };
      setOrders((prev) => [newOrder, ...prev]);
      setIsAddModalOpen(false);
    }
  };

  const handleDeleteOrder = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setSelectedIds((prev) => prev.filter((item) => item !== id));
    setActiveDropdown(null);
  };

  const handleDeleteSelected = () => {
    setOrders((prev) => prev.filter((o) => !selectedIds.includes(o.id)));
    setSelectedIds([]);
  };

  const handleSort = (field: 'orderNumber' | 'date' | 'total' | 'items') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <main className="space-y-6 max-w-7xl mx-auto pb-10">
      <OrderHeader onCreateOrder={handleOpenAddModal} />

      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        showMoreFilters={showMoreFilters}
        setShowMoreFilters={setShowMoreFilters}
        onResetFilters={() => {
          setSearchTerm('');
          setStatusFilter('All Statuses');
          setDateRange('Last 30 Days');
          setPaymentFilter('All Payments');
        }}
        onPageReset={() => setCurrentPage(1)}
      />

      <div className="bg-white border border-border rounded-2xl shadow-2xs overflow-hidden">
        <OrderTable
          orders={paginatedOrders}
          selectedIds={selectedIds}
          isAllSelected={isAllSelected}
          activeDropdown={activeDropdown}
          setActiveDropdown={setActiveDropdown}
          onSelectAll={handleSelectAll}
          onSelectOne={handleSelectOne}
          onSort={handleSort}
          onViewOrder={setViewOrder}
          onEditOrder={handleOpenEditModal}
          onDeleteOrder={handleDeleteOrder}
          onDeleteSelected={handleDeleteSelected}
          formatCurrency={formatCurrency}
        />

        <OrderPagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalFilteredCount={filteredOrders.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>

      <OrderFormModal
        isOpen={isAddModalOpen}
        editOrder={editOrder}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditOrder(null);
        }}
        onSubmit={handleSaveOrder}
      />

      <OrderDetailsModal
        order={viewOrder}
        onClose={() => setViewOrder(null)}
        onEdit={handleOpenEditModal}
        formatCurrency={formatCurrency}
      />
    </main>
  );
};
